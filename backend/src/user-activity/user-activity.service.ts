import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActivity, ActivityType } from './user-activity.entity';
import { CreateUserActivityDto } from './dto/create-user-activity.dto';
import { GetUserActivityDto } from './dto/get-user-activity.dto';
import { User } from '../user/user.entity';

@Injectable()
export class UserActivityService {
  constructor(
    @InjectRepository(UserActivity)
    private readonly userActivityRepository: Repository<UserActivity>,
  ) {}

  // MET values for different activities (calories burned per hour per kg of body weight)
  private readonly activityMETs = {
    [ActivityType.WALKING]: 3.5,
    [ActivityType.JOGGING]: 7,
    [ActivityType.RUNNING]: 11.5,
    [ActivityType.CYCLING]: 8,
    [ActivityType.SWIMMING]: 6,
    [ActivityType.WEIGHTLIFTING]: 3,
    [ActivityType.YOGA]: 2.5,
    [ActivityType.DANCING]: 4.5,
    [ActivityType.GYM]: 4,
    [ActivityType.SPORTS]: 8,
    [ActivityType.OTHER]: 3,
  };

  async createActivity(createUserActivityDto: CreateUserActivityDto, user: User) {
    const { startTime, endTime, userWeightAtStart, activityType, distance, duration } = createUserActivityDto;

    // Calculate duration in minutes if not provided
    let calculatedDuration = duration;
    if (!calculatedDuration) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      calculatedDuration = (end.getTime() - start.getTime()) / (1000 * 60); // Convert to minutes
    }

    // Calculate calories burned
    let caloriesBurned = 0;
    if (userWeightAtStart && calculatedDuration) {
      const metValue = this.activityMETs[activityType];
      const hours = calculatedDuration / 60;
      caloriesBurned = (metValue * userWeightAtStart * hours);
    }

    const activity = this.userActivityRepository.create({
      ...createUserActivityDto,
      user,
      duration: calculatedDuration,
      caloriesBurned: Math.round(caloriesBurned),
    });

    return this.userActivityRepository.save(activity);
  }

  async getActivities(getUserActivityDto: GetUserActivityDto, user: User) {
    const { startDate, endDate, skip, limit } = getUserActivityDto;

    const query = this.userActivityRepository
      .createQueryBuilder('activity')
      .where('activity.userId = :userId', { userId: user.id })
      .andWhere('activity.deleted = :deleted', { deleted: false });

    if (startDate) {
      query.andWhere('activity.startTime >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('activity.endTime <= :endDate', { endDate });
    }
    if (skip) {
      query.skip(skip);
    }
    if (limit) {
      query.take(limit);
    }
    query.orderBy('activity.startTime', 'DESC');

    return query.getMany();
  }

  async getActivitiesByDay(getUserActivityDto: GetUserActivityDto, user: User) {
    const { startDate, endDate, skip = 0, limit = 10 } = getUserActivityDto;

    const query = this.userActivityRepository
      .createQueryBuilder('activity')
      .select([
        `strftime('%Y-%m-%d', activity.startTime) as date`,
        'COUNT(activity.id) as activityCount',
        'SUM(activity.caloriesBurned) as totalCaloriesBurned',
        'SUM(activity.duration) as totalDuration',
        'SUM(activity.distance) as totalDistance',
      ])
      .where('activity.userId = :userId', { userId: user.id })
      .andWhere('activity.deleted = :deleted', { deleted: false });

    if (startDate) {
      query.andWhere('activity.startTime >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('activity.endTime <= :endDate', { endDate });
    }

    query.groupBy('date').orderBy('date', 'DESC').skip(skip).take(limit);

    const raw: {
      date: string;
      activityCount: string | number;
      totalCaloriesBurned: string | number;
      totalDuration: string | number;
      totalDistance: string | number;
    }[] = await query.getRawMany();

    return raw.map((row) => ({
      date: String(row.date),
      activityCount: Number(row.activityCount),
      totalCaloriesBurned: Number(row.totalCaloriesBurned) || 0,
      totalDuration: Number(row.totalDuration) || 0,
      totalDistance: Number(row.totalDistance) || 0,
    }));
  }

  async getActivitiesByWeek(getUserActivityDto: GetUserActivityDto, user: User) {
    const { startDate, endDate, skip = 0, limit = 10 } = getUserActivityDto;

    const query = this.userActivityRepository
      .createQueryBuilder('activity')
      .select([
        `strftime('%Y-W%W', activity.startTime) as week`,
        `strftime('%Y-%m-%d', date(activity.startTime, 'weekday 0', '-6 days')) as weekStart`,
        `strftime('%Y-%m-%d', date(activity.startTime, 'weekday 0')) as weekEnd`,
        'COUNT(activity.id) as activityCount',
        'SUM(activity.caloriesBurned) as totalCaloriesBurned',
        'SUM(activity.duration) as totalDuration',
        'SUM(activity.distance) as totalDistance',
      ])
      .where('activity.userId = :userId', { userId: user.id })
      .andWhere('activity.deleted = :deleted', { deleted: false });

    if (startDate) {
      query.andWhere('activity.startTime >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('activity.endTime <= :endDate', { endDate });
    }

    query.groupBy('week').orderBy('week', 'DESC').skip(skip).take(limit);

    const raw: {
      week: string;
      weekStart: string;
      weekEnd: string;
      activityCount: string | number;
      totalCaloriesBurned: string | number;
      totalDuration: string | number;
      totalDistance: string | number;
    }[] = await query.getRawMany();

    return raw.map((row) => ({
      week: String(row.week),
      weekStart: String(row.weekStart),
      weekEnd: String(row.weekEnd),
      activityCount: Number(row.activityCount),
      totalCaloriesBurned: Number(row.totalCaloriesBurned) || 0,
      totalDuration: Number(row.totalDuration) || 0,
      totalDistance: Number(row.totalDistance) || 0,
    }));
  }

  async getCaloriesBurnedByDay(getUserActivityDto: GetUserActivityDto, user: User) {
    const { startDate, endDate, skip = 0, limit = 10 } = getUserActivityDto;

    const query = this.userActivityRepository
      .createQueryBuilder('activity')
      .select([
        `strftime('%Y-%m-%d', activity.startTime) as date`,
        'SUM(activity.caloriesBurned) as totalCaloriesBurned',
        'COUNT(DISTINCT activity.activityType) as uniqueActivities',
        'GROUP_CONCAT(DISTINCT activity.activityType) as activitiesPerformed',
      ])
      .where('activity.userId = :userId', { userId: user.id })
      .andWhere('activity.deleted = :deleted', { deleted: false });

    if (startDate) {
      query.andWhere('activity.startTime >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('activity.endTime <= :endDate', { endDate });
    }

    query.groupBy('date').orderBy('date', 'DESC').skip(skip).take(limit);

    const raw: {
      date: string;
      totalCaloriesBurned: string | number;
      uniqueActivities: string | number;
      activitiesPerformed: string;
    }[] = await query.getRawMany();

    return raw.map((row) => ({
      date: String(row.date),
      totalCaloriesBurned: Number(row.totalCaloriesBurned) || 0,
      uniqueActivities: Number(row.uniqueActivities),
      activitiesPerformed: String(row.activitiesPerformed).split(','),
    }));
  }

  async getCaloriesBurnedByWeek(getUserActivityDto: GetUserActivityDto, user: User) {
    const { startDate, endDate, skip = 0, limit = 10 } = getUserActivityDto;

    const query = this.userActivityRepository
      .createQueryBuilder('activity')
      .select([
        `strftime('%Y-W%W', activity.startTime) as week`,
        `strftime('%Y-%m-%d', date(activity.startTime, 'weekday 0', '-6 days')) as weekStart`,
        `strftime('%Y-%m-%d', date(activity.startTime, 'weekday 0')) as weekEnd`,
        'SUM(activity.caloriesBurned) as totalCaloriesBurned',
        'COUNT(DISTINCT activity.activityType) as uniqueActivities',
        'COUNT(activity.id) as totalSessions',
        'GROUP_CONCAT(DISTINCT activity.activityType) as activitiesPerformed',
      ])
      .where('activity.userId = :userId', { userId: user.id })
      .andWhere('activity.deleted = :deleted', { deleted: false });

    if (startDate) {
      query.andWhere('activity.startTime >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('activity.endTime <= :endDate', { endDate });
    }

    query.groupBy('week').orderBy('week', 'DESC').skip(skip).take(limit);

    const raw: {
      week: string;
      weekStart: string;
      weekEnd: string;
      totalCaloriesBurned: string | number;
      uniqueActivities: string | number;
      totalSessions: string | number;
      activitiesPerformed: string;
    }[] = await query.getRawMany();

    return raw.map((row) => ({
      week: String(row.week),
      weekStart: String(row.weekStart),
      weekEnd: String(row.weekEnd),
      totalCaloriesBurned: Number(row.totalCaloriesBurned) || 0,
      uniqueActivities: Number(row.uniqueActivities),
      totalSessions: Number(row.totalSessions),
      activitiesPerformed: String(row.activitiesPerformed).split(','),
    }));
  }

  async updateActivity(id: number, user: User, update: Partial<UserActivity>) {
    const activity = await this.userActivityRepository.findOne({
      where: { id, userId: user.id, deleted: false },
    });
    if (!activity) throw new Error('Activity not found');
    
    Object.assign(activity, update);
    return this.userActivityRepository.save(activity);
  }

  async softDeleteActivity(id: number, user: User) {
    const activity = await this.userActivityRepository.findOne({
      where: { id, userId: user.id, deleted: false },
    });
    if (!activity) throw new Error('Activity not found');
    
    activity.deleted = true;
    return this.userActivityRepository.save(activity);
  }
} 