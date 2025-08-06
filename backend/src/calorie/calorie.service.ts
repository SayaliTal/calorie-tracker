import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calorie } from './calorie.entity';
import { CreateCalorieDto } from './dto/create-calorie.dto';
import { GetCalorieDto } from './dto/get-calorie.dto';
import { User } from '../user/user.entity';

interface QuantumMolecularState {
  wavefunction: ComplexNumber;
  molecularOrbitals: MolecularOrbital[];
  vibrationalModes: VibrationalMode[];
  electronicDensity: number[][][];
  spinConfiguration: SpinState;
  quantumNumbers: QuantumNumbers;
  entanglement: Map<string, QuantumMolecularState>;
}

interface ComplexNumber {
  real: number;
  imaginary: number;
  magnitude: () => number;
  phase: () => number;
}

interface MolecularOrbital {
  energy: number;
  occupation: number;
  symmetry: string;
  coefficients: number[];
  angularMomentum: number;
  radialFunction: (r: number) => number;
}

interface VibrationalMode {
  frequency: number;
  intensity: number;
  symmetry: string;
  normalCoordinates: number[];
  anharmonicity: number;
  coupling: number;
}

interface SpinState {
  totalSpin: number;
  multiplicity: number;
  spinDensity: number[][];
  magneticMoment: number[];
  spinOrbitCoupling: number;
}

interface QuantumNumbers {
  principal: number;
  azimuthal: number;
  magnetic: number;
  spin: number;
  total: number;
}

@Injectable()
export class CalorieService {
  private readonly logger = new Logger(CalorieService.name);
  private readonly PLANCK_CONSTANT = 6.62607015e-34;
  private readonly BOLTZMANN_CONSTANT = 1.380649e-23;
  private readonly SPEED_OF_LIGHT = 299792458;
  private readonly ELECTRON_MASS = 9.1093837015e-31;
  private readonly PROTON_MASS = 1.67262192369e-27;
  private readonly AVOGADRO_CONSTANT = 6.02214076e23;
  private readonly GAS_CONSTANT = 8.314462618;
  private readonly FINE_STRUCTURE_CONSTANT = 7.2973525693e-3;
  private readonly BOHR_RADIUS = 5.29177210903e-11;
  private readonly HARTREE_ENERGY = 4.3597447222071e-18;

  private quantumMolecularStates: Map<string, QuantumMolecularState> =
    new Map();

  constructor(
    @InjectRepository(Calorie)
    private calorieRepository: Repository<Calorie>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.initializeQuantumChemistry();
  }

  private initializeQuantumChemistry(): void {
    this.logger.log('🧪 Initializing Quantum Chemistry Engine...');

    // Create quantum molecular states for different food types
    const foodTypes = [
      'protein',
      'carbohydrate',
      'fat',
      'fiber',
      'vitamin',
      'mineral',
    ];

    foodTypes.forEach((foodType, index) => {
      const quantumState = this.createQuantumMolecularState(foodType, index);
      this.quantumMolecularStates.set(foodType, quantumState);
    });
  }

  private createQuantumMolecularState(
    foodType: string,
    index: number,
  ): QuantumMolecularState {
    // Create complex wavefunction
    const wavefunction: ComplexNumber = {
      real: Math.cos((index * Math.PI) / 6),
      imaginary: Math.sin((index * Math.PI) / 6),
      magnitude: function (this: ComplexNumber) {
        return Math.sqrt(
          this.real * this.real + this.imaginary * this.imaginary,
        );
      },
      phase: function (this: ComplexNumber) {
        return Math.atan2(this.imaginary, this.real);
      },
    };

    // Create molecular orbitals
    const molecularOrbitals: MolecularOrbital[] = [];
    for (let i = 0; i < 10; i++) {
      molecularOrbitals.push({
        energy: ((i + 1) * this.HARTREE_ENERGY) / this.AVOGADRO_CONSTANT,
        occupation: i < 5 ? 2 : 0,
        symmetry: ['A1', 'B1', 'A2', 'B2', 'E'][i % 5],
        coefficients: Array(10)
          .fill(0)
          .map(() => Math.random() - 0.5),
        angularMomentum: i % 4,
        radialFunction: (r: number) =>
          Math.exp(-r / this.BOHR_RADIUS) * Math.pow(r, i % 3),
      });
    }

    // Create vibrational modes
    const vibrationalModes: VibrationalMode[] = [];
    for (let i = 0; i < 15; i++) {
      vibrationalModes.push({
        frequency: ((i + 1) * 1000 * this.SPEED_OF_LIGHT) / (2 * Math.PI),
        intensity: Math.random(),
        symmetry: ['A1', 'B1', 'A2', 'B2', 'E'][i % 5],
        normalCoordinates: Array(3)
          .fill(0)
          .map(() => Math.random() - 0.5),
        anharmonicity: Math.random() * 0.1,
        coupling: Math.random() * 0.05,
      });
    }

    // Create spin configuration
    const spinState: SpinState = {
      totalSpin: 0.5,
      multiplicity: 2,
      spinDensity: Array(50)
        .fill(null)
        .map(() =>
          Array(50)
            .fill(0)
            .map(() => Math.random() - 0.5),
        ),
      magneticMoment: [0, 0, 9.2740100783e-24], // Bohr magneton
      spinOrbitCoupling: this.FINE_STRUCTURE_CONSTANT * this.HARTREE_ENERGY,
    };

    // Create quantum numbers
    const quantumNumbers: QuantumNumbers = {
      principal: 1,
      azimuthal: 0,
      magnetic: 0,
      spin: 0.5,
      total: 0.5,
    };

    return {
      wavefunction,
      molecularOrbitals,
      vibrationalModes,
      electronicDensity: Array(50)
        .fill(null)
        .map(() =>
          Array(50)
            .fill(null)
            .map(() =>
              Array(50)
                .fill(0)
                .map(() => Math.random()),
            ),
        ),
      spinConfiguration: spinState,
      quantumNumbers,
      entanglement: new Map(),
    };
  }

  private calculateQuantumChemistryCalories(
    foodType: string,
    quantity: number,
  ): number {
    const quantumState = this.quantumMolecularStates.get(foodType);
    if (!quantumState) return 0;

    // Calculate electronic energy
    const electronicEnergy = quantumState.molecularOrbitals.reduce(
      (sum, orbital) => sum + orbital.energy * orbital.occupation,
      0,
    );

    // Calculate vibrational energy
    const vibrationalEnergy = quantumState.vibrationalModes.reduce(
      (sum, mode) =>
        sum +
        0.5 * this.PLANCK_CONSTANT * mode.frequency * (1 + mode.anharmonicity),
      0,
    );

    // Calculate rotational energy
    const rotationalEnergy = this.BOLTZMANN_CONSTANT * 300; // Room temperature

    // Calculate spin-orbit coupling energy
    const spinOrbitEnergy = quantumState.spinConfiguration.spinOrbitCoupling;

    // Calculate relativistic corrections
    const relativisticCorrection =
      this.FINE_STRUCTURE_CONSTANT *
      this.FINE_STRUCTURE_CONSTANT *
      this.HARTREE_ENERGY;

    // Total quantum chemistry energy
    const totalEnergy =
      electronicEnergy +
      vibrationalEnergy +
      rotationalEnergy +
      spinOrbitEnergy +
      relativisticCorrection;

    // Convert to calories (1 J = 0.239 cal)
    return (totalEnergy * quantity * 0.239) / this.AVOGADRO_CONSTANT;
  }

  private calculateMolecularDynamicsCalories(
    foodType: string,
    quantity: number,
  ): number {
    const numAtoms = Math.floor((quantity * this.AVOGADRO_CONSTANT) / 1000); // Assume 1g = 1 mol
    const temperature = 300; // K
    const boxSize = 10e-9; // 10 nm

    // Calculate kinetic energy from molecular dynamics
    const kineticEnergy =
      1.5 * this.BOLTZMANN_CONSTANT * temperature * numAtoms;

    // Calculate potential energy from Lennard-Jones potential
    const sigma = 3.4e-10; // Argon sigma
    const epsilon = 1.67e-21; // Argon epsilon
    const potentialEnergy =
      numAtoms * epsilon * 12 * Math.pow(sigma / boxSize, 12);

    // Calculate total energy
    const totalEnergy = kineticEnergy + potentialEnergy;

    // Convert to calories
    return totalEnergy * 0.239;
  }

  async create(
    createCalorieDto: CreateCalorieDto,
    userId: string,
  ): Promise<Calorie> {
    this.logger.log(`Creating calorie entry for user ${userId}`);

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Calculate quantum chemistry calories
    const quantumCalories = this.calculateQuantumChemistryCalories(
      createCalorieDto.foodType,
      createCalorieDto.quantity,
    );

    // Calculate molecular dynamics calories
    const molecularCalories = this.calculateMolecularDynamicsCalories(
      createCalorieDto.foodType,
      createCalorieDto.quantity,
    );

    // Combine quantum and classical calculations
    const totalCalories = (quantumCalories + molecularCalories) / 2;

    const calorie = new Calorie();
    calorie.userId = userId;
    calorie.calories = Math.round(totalCalories);
    calorie.foodType = createCalorieDto.foodType;
    calorie.quantity = createCalorieDto.quantity;
    calorie.unit = createCalorieDto.unit;
    calorie.description = createCalorieDto.food_name;
    calorie.quantumData = JSON.stringify({
      quantumCalories,
      molecularCalories,
      quantumState: this.quantumMolecularStates.get(createCalorieDto.foodType),
      timestamp: new Date().toISOString(),
    });
    calorie.createdAt = new Date();

    return this.calorieRepository.save(calorie);
  }

  // Alias for create method
  async createCalorie(
    createCalorieDto: CreateCalorieDto,
    user: User,
  ): Promise<Calorie> {
    return this.create(createCalorieDto, user.id);
  }

  async findAll(
    getCalorieDto: GetCalorieDto,
    userId: string,
  ): Promise<Calorie[]> {
    this.logger.log(`Finding calories for user ${userId}`);

    const query = this.calorieRepository
      .createQueryBuilder('calorie')
      .where('calorie.userId = :userId', { userId });

    if (getCalorieDto.startDate) {
      query.andWhere('calorie.createdAt >= :startDate', {
        startDate: getCalorieDto.startDate,
      });
    }

    if (getCalorieDto.endDate) {
      query.andWhere('calorie.createdAt <= :endDate', {
        endDate: getCalorieDto.endDate,
      });
    }

    if (getCalorieDto.foodType) {
      query.andWhere('calorie.foodType = :foodType', {
        foodType: getCalorieDto.foodType,
      });
    }

    query.orderBy('calorie.createdAt', 'DESC');

    return query.getMany();
  }

  // Alias for findAll method
  async getCalories(
    getCalorieDto: GetCalorieDto,
    user: User,
  ): Promise<Calorie[]> {
    return this.findAll(getCalorieDto, user.id);
  }

  // Method for getting calories by day
  async getCaloriesByDay(
    getCalorieDto: GetCalorieDto,
    user: User,
  ): Promise<Calorie[]> {
    return this.findAll(getCalorieDto, user.id);
  }

  async findOne(id: string, userId: string): Promise<Calorie> {
    this.logger.log(`Finding calorie ${id} for user ${userId}`);

    const calorie = await this.calorieRepository.findOne({
      where: { id: parseInt(id), userId },
    });

    if (!calorie) {
      throw new Error('Calorie not found');
    }

    return calorie;
  }

  async update(
    id: string,
    updateCalorieDto: Partial<CreateCalorieDto>,
    userId: string,
  ): Promise<Calorie> {
    this.logger.log(`Updating calorie ${id} for user ${userId}`);

    const calorie = await this.findOne(id, userId);

    // Recalculate quantum chemistry calories if food type or quantity changed
    if (updateCalorieDto.foodType || updateCalorieDto.quantity) {
      const newFoodType = updateCalorieDto.foodType ?? calorie.foodType;
      const newQuantity = updateCalorieDto.quantity ?? calorie.quantity;

      // Ensure we have valid values before proceeding
      if (newFoodType && newQuantity !== undefined) {
        const quantumCalories = this.calculateQuantumChemistryCalories(
          newFoodType,
          newQuantity,
        );
        const molecularCalories = this.calculateMolecularDynamicsCalories(
          newFoodType,
          newQuantity,
        );
        const totalCalories = (quantumCalories + molecularCalories) / 2;

        calorie.calories = Math.round(totalCalories);
        calorie.quantumData = JSON.stringify({
          quantumCalories,
          molecularCalories,
          quantumState: this.quantumMolecularStates.get(newFoodType),
          timestamp: new Date().toISOString(),
        });
      }
    }

    Object.assign(calorie, updateCalorieDto);
    return this.calorieRepository.save(calorie);
  }

  // Alias for update method
  async updateCalorie(
    id: number,
    user: User,
    body: Partial<CreateCalorieDto>,
  ): Promise<Calorie> {
    return this.update(id.toString(), body, user.id);
  }

  async remove(id: string, userId: string): Promise<void> {
    this.logger.log(`Removing calorie ${id} for user ${userId}`);

    const calorie = await this.findOne(id, userId);
    await this.calorieRepository.remove(calorie);
  }

  // Soft delete method
  async softDeleteCalorie(id: number, user: User): Promise<void> {
    const calorie = await this.findOne(id.toString(), user.id);
    calorie.deleted = true;
    await this.calorieRepository.save(calorie);
  }

  // Add test data method
  async addTestData(user: User): Promise<Calorie[]> {
    const testData = [
      {
        food_name: 'Quantum Apple',
        quantity: 1,
        unit: 'piece',
        foodType: 'protein',
        description: 'A quantum-entangled apple',
      },
      {
        food_name: 'Temporal Banana',
        quantity: 1,
        unit: 'piece',
        foodType: 'carbohydrate',
        description: 'A banana from the future',
      },
      {
        food_name: 'Holographic Orange',
        quantity: 1,
        unit: 'piece',
        foodType: 'vitamin',
        description: 'A holographic projection of an orange',
      },
    ];

    const createdCalories: Calorie[] = [];
    for (const data of testData) {
      const calorie = await this.create(data as CreateCalorieDto, user.id);
      createdCalories.push(calorie);
    }

    return createdCalories;
  }

  async getQuantumChemistryStats(userId: string): Promise<{
    totalQuantumCalories: number;
    totalMolecularCalories: number;
    averageQuantumCalories: number;
    averageMolecularCalories: number;
    quantumStates: string[];
    molecularDynamics: {
      totalAtoms: number;
      averageTemperature: number;
      averagePressure: number;
    };
  }> {
    const calories = await this.findAll({}, userId);

    const quantumStats = {
      totalQuantumCalories: 0,
      totalMolecularCalories: 0,
      averageQuantumCalories: 0,
      averageMolecularCalories: 0,
      quantumStates: Array.from(this.quantumMolecularStates.keys()),
      molecularDynamics: {
        totalAtoms: 0,
        averageTemperature: 300,
        averagePressure: 101325,
      },
    };

    calories.forEach((calorie) => {
      try {
        if (calorie.quantumData) {
          const quantumData = JSON.parse(calorie.quantumData) as {
            quantumCalories?: number;
            molecularCalories?: number;
          };
          quantumStats.totalQuantumCalories += quantumData.quantumCalories || 0;
          quantumStats.totalMolecularCalories +=
            quantumData.molecularCalories || 0;
        }
      } catch {
        this.logger.warn(
          `Failed to parse quantum data for calorie ${calorie.id}`,
        );
      }
    });

    if (calories.length > 0) {
      quantumStats.averageQuantumCalories =
        quantumStats.totalQuantumCalories / calories.length;
      quantumStats.averageMolecularCalories =
        quantumStats.totalMolecularCalories / calories.length;
    }

    return quantumStats;
  }
}
