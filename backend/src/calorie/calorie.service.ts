import { Injectable } from '@nestjs/common';
import { CreateCalorieDto } from './dto/create-calorie.dto';
import { Repository } from 'typeorm';
import { Calorie } from './calorie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { GetCalorieDto } from './dto/get-calorie.dto';

@Injectable()
export class CalorieService {
  constructor(
    @InjectRepository(Calorie)
    private readonly calorieRepository: Repository<Calorie>,
  ) {}

  createCalorie(createCalorieDto: CreateCalorieDto, user: User) {
    const calorie = this.calorieRepository.create({
      ...createCalorieDto,
      user,
    });
    return this.calorieRepository.save(calorie);
  }

  getCalories(getCalorieDto: GetCalorieDto, user: User) {
    const { startDate, endDate, skip, limit } = getCalorieDto;

    const query = this.calorieRepository
      .createQueryBuilder('calorie')
      .where('calorie.userId = :userId', { userId: user.id })
      .andWhere('calorie.deleted = :deleted', { deleted: false });

    if (startDate) {
      query.andWhere('calorie.createdAt >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('calorie.createdAt <= :endDate', { endDate });
    }
    if (skip) {
      query.skip(skip);
    }
    if (limit) {
      query.take(limit);
    }
    query.orderBy('calorie.createdAt', 'DESC');

    return query.getMany();
  }

  async updateCalorie(id: number, user: User, update: Partial<Calorie>) {
    const calorie = await this.calorieRepository.findOne({
      where: { id, userId: user.id, deleted: false },
    });
    if (!calorie) throw new Error('Calorie entry not found');
    Object.assign(calorie, update);
    return this.calorieRepository.save(calorie);
  }

  async softDeleteCalorie(id: number, user: User) {
    const calorie = await this.calorieRepository.findOne({
      where: { id, userId: user.id, deleted: false },
    });
    if (!calorie) throw new Error('Calorie entry not found');
    calorie.deleted = true;
    return this.calorieRepository.save(calorie);
  }

  async getCaloriesByDay(getCalorieDto: GetCalorieDto, user: User) {
    const { startDate, endDate, skip = 0, limit = 10 } = getCalorieDto;

    const query = this.calorieRepository
      .createQueryBuilder('calorie')
      .select([
        `strftime('%Y-%m-%d', calorie.createdAt) as date`,
        'SUM(calorie.calories) as totalCalories',
      ])
      .where('calorie.userId = :userId', { userId: user.id })
      .andWhere('calorie.deleted = :deleted', { deleted: false });

    if (startDate) {
      query.andWhere('calorie.createdAt >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('calorie.createdAt <= :endDate', { endDate });
    }

    query.groupBy('date').orderBy('date', 'DESC').skip(skip).take(limit);

    const raw: { date: string; totalCalories: string | number }[] =
      await query.getRawMany();

    return raw.map((row): { date: string; totalCalories: number } => ({
      date: String(row.date),
      totalCalories: Number(row.totalCalories),
    }));
  }

    async addTestData(user: User) {
    const FOOD_NAMES = [
      'Apple', 'Banana', 'Pizza', 'Burger', 'Salad', 'Chicken', 'Rice', 'Eggs', 'Pasta', 'Steak',
      'Fish', 'Soup', 'Sandwich', 'Fries', 'Ice Cream', 'Yogurt', 'Cereal', 'Juice', 'Milk', 'Coffee',
      'Chicken Soup', 'Omelette', 'Tofu', 'Beans', 'Bread', 'Muffin', 'Sushi', 'Dumplings', 'Curry', 'Noodles',
    ];
    function randomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getDateNDaysAgo(n: number) {
      const d = new Date();
      d.setDate(d.getDate() - n);
      d.setHours(randomInt(6, 8), randomInt(0, 59), randomInt(0, 59), 0);
      return d;
    }
    let totalInserted = 0;
    for (let daysAgo = 0; daysAgo < 30; daysAgo++) {
      let dailyTotal = 0;
      const dailyTarget = randomInt(1600, 2500);
      let mealCount = 0;
      const currentDate = getDateNDaysAgo(daysAgo);
      while (dailyTotal < dailyTarget) {
        const calorie = this.calorieRepository.create();
        calorie.description = FOOD_NAMES[randomInt(0, FOOD_NAMES.length - 1)];
        const maxCal = Math.min(500, dailyTarget - dailyTotal);
        if (maxCal < 50) break;
        calorie.calories = randomInt(50, maxCal);
        calorie.user = user;
        calorie.createdAt = new Date(currentDate.getTime() + mealCount * 3 * 60 * 60 * 1000);
        calorie.updatedAt = calorie.createdAt;
        await this.calorieRepository.save(calorie);
        dailyTotal += calorie.calories;
        mealCount++;
        totalInserted++;
      }
    }
    return { success: true, message: `Inserted ${totalInserted} records for 30 days for userId ${user.id}.` };
  }

  /**
   * Calculate calories needed to burn based on user weight and activity level
   * @param weightInKg - User's weight in kilograms
   * @param heightInCm - User's height in centimeters (optional, for more accurate calculations)
   * @param age - User's age (optional, for more accurate calculations)
   * @param gender - User's gender (optional, for more accurate calculations)
   * @param activityLevel - Activity level: 'sedentary', 'light', 'moderate', 'active', 'very_active'
   * @param goal - Goal: 'maintain', 'lose', 'gain'
   * @param targetWeightInKg - Target weight in kg (optional, for weight loss/gain goals)
   * @returns Object containing calorie calculations
   */
  calculateCaloriesToBurn(
    weightInKg: number,
    heightInCm?: number,
    age?: number,
    gender?: 'male' | 'female',
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active' = 'moderate',
    goal: 'maintain' | 'lose' | 'gain' = 'maintain',
    targetWeightInKg?: number
  ) {
    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,      // Little or no exercise
      light: 1.375,         // Light exercise 1-3 days/week
      moderate: 1.55,       // Moderate exercise 3-5 days/week
      active: 1.725,        // Hard exercise 6-7 days/week
      very_active: 1.9      // Very hard exercise, physical job
    };

    // Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
    let bmr = 0;
    if (heightInCm && age && gender) {
      // More accurate calculation with all parameters
      if (gender === 'male') {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
      } else {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
      }
    } else {
      // Simplified calculation using only weight (less accurate but still useful)
      bmr = weightInKg * 24; // Rough estimate: 24 calories per kg of body weight
    }

    // Calculate Total Daily Energy Expenditure (TDEE)
    const tdee = bmr * activityMultipliers[activityLevel];

    // Calculate calories for different goals
    let dailyCalories = tdee;
    let caloriesToBurn = 0;
    let weeklyCalorieDeficit = 0;

    switch (goal) {
      case 'lose':
        // For weight loss: create a calorie deficit
        // 1 kg of fat = 7700 calories
        if (targetWeightInKg && targetWeightInKg < weightInKg) {
          const weightToLose = weightInKg - targetWeightInKg;
          const totalCaloriesToBurn = weightToLose * 7700;
          // Assuming 12 weeks to reach target weight
          weeklyCalorieDeficit = totalCaloriesToBurn / 12;
        } else {
          // Default: 500 calorie daily deficit for 0.5 kg/week weight loss
          weeklyCalorieDeficit = 500 * 7;
        }
        dailyCalories = tdee - (weeklyCalorieDeficit / 7);
        caloriesToBurn = weeklyCalorieDeficit / 7;
        break;

      case 'gain':
        // For weight gain: create a calorie surplus
        if (targetWeightInKg && targetWeightInKg > weightInKg) {
          const weightToGain = targetWeightInKg - weightInKg;
          const totalCaloriesToGain = weightToGain * 7700;
          weeklyCalorieDeficit = -totalCaloriesToGain / 12; // Negative for surplus
        } else {
          // Default: 300 calorie daily surplus for 0.3 kg/week weight gain
          weeklyCalorieDeficit = -300 * 7;
        }
        dailyCalories = tdee - (weeklyCalorieDeficit / 7);
        caloriesToBurn = 0; // No calories to burn for weight gain
        break;

      case 'maintain':
      default:
        dailyCalories = tdee;
        caloriesToBurn = 0;
        break;
    }

    // Calculate calories burned through different activities (per hour)
    const activityCalories = {
      walking: Math.round(weightInKg * 3.5),           // 3.5 METs
      jogging: Math.round(weightInKg * 7),             // 7 METs
      running: Math.round(weightInKg * 11.5),          // 11.5 METs
      cycling: Math.round(weightInKg * 8),             // 8 METs
      swimming: Math.round(weightInKg * 6),             // 6 METs
      weightlifting: Math.round(weightInKg * 3),       // 3 METs
      yoga: Math.round(weightInKg * 2.5),              // 2.5 METs
      dancing: Math.round(weightInKg * 4.5),           // 4.5 METs
    };

    return {
      weightInKg,
      heightInCm,
      age,
      gender,
      activityLevel,
      goal,
      targetWeightInKg,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      dailyCalories: Math.round(dailyCalories),
      caloriesToBurn: Math.round(caloriesToBurn),
      weeklyCalorieDeficit: Math.round(weeklyCalorieDeficit),
      activityCalories,
      recommendations: {
        dailyCalorieIntake: Math.round(dailyCalories),
        dailyCalorieBurn: Math.round(caloriesToBurn),
        weeklyWeightChange: goal === 'lose' ? -0.5 : goal === 'gain' ? 0.3 : 0,
        activityMinutes: goal === 'lose' ? Math.round((caloriesToBurn / activityCalories.walking) * 60) : 0
      }
    };
  }
}
