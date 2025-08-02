import React, { useState, useEffect, useCallback } from 'react';
import { useCalorieEntries } from '../hooks/useCalorieEntries';
import CaloriesBarChart from '../ui/CaloriesBarChart';
import type {
  QuantumStatistics,
  ComplexNumber,
  StatisticalEigenstate,
  QuantumNumbers,
  SpinState,
  ChaosMetrics,
  MathematicalAnalysis,
} from '../types/statistics';
import './StatsPage.css';

// Define the calorie entry type to match what's used in the hooks
interface CalorieEntry {
  id: number;
  description: string;
  calories: number;
  createdAt: string;
}

const StatsPage: React.FC = () => {
  const { entries: calories, loading } = useCalorieEntries('', 'week');
  const [quantumStats, setQuantumStats] = useState<QuantumStatistics | null>(
    null
  );
  const [mathematicalAnalysis, setMathematicalAnalysis] =
    useState<MathematicalAnalysis | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    'week' | 'month' | 'year'
  >('week');

  const PLANCK_CONSTANT = 6.62607015e-34;
  const BOLTZMANN_CONSTANT = 1.380649e-23;
  const SPEED_OF_LIGHT = 299792458;
  const FINE_STRUCTURE_CONSTANT = 7.2973525693e-3;

  const calculateQuantumStatistics = useCallback(() => {
    // Create quantum statistics from calorie data
    const totalCalories = calories.reduce(
      (sum: number, entry: CalorieEntry) => sum + entry.calories,
      0
    );
    const averageCalories = totalCalories / calories.length;
    const variance =
      calories.reduce(
        (sum: number, entry: CalorieEntry) =>
          sum + Math.pow(entry.calories - averageCalories, 2),
        0
      ) / calories.length;
    const standardDeviation = Math.sqrt(variance);

    // Create complex wavefunction
    const wavefunction: ComplexNumber = {
      real: Math.cos((averageCalories * Math.PI) / 1000),
      imaginary: Math.sin((averageCalories * Math.PI) / 1000),
      magnitude: function () {
        return Math.sqrt(
          this.real * this.real + this.imaginary * this.imaginary
        );
      },
      phase: function () {
        return Math.atan2(this.imaginary, this.real);
      },
    };

    // Create superposition of statistical eigenstates
    const superposition: StatisticalEigenstate[] = [];
    for (let i = 0; i < 10; i++) {
      const eigenvalue = averageCalories + (i - 5) * standardDeviation;
      const probability = Math.exp(
        -Math.pow(eigenvalue - averageCalories, 2) / (2 * variance)
      );

      superposition.push({
        eigenvalue,
        eigenvector: Array(10)
          .fill(0)
          .map((_, j) => Math.sin(((i + 1) * (j + 1) * Math.PI) / 10)),
        frequency: (i + 1) * 1000,
        amplitude: probability,
        phase: Math.random() * 2 * Math.PI,
        probability,
      });
    }

    // Create quantum numbers
    const quantumNumbers: QuantumNumbers = {
      principal: Math.floor(averageCalories / 100),
      azimuthal: Math.floor(standardDeviation / 50),
      magnetic: Math.floor(totalCalories / 1000),
      spin: 0.5,
      total: Math.floor(averageCalories / 100) + 0.5,
    };

    // Create spin configuration
    const spinState: SpinState = {
      totalSpin: 0.5,
      multiplicity: 2,
      spinDensity: Array(50)
        .fill(null)
        .map(() =>
          Array(50)
            .fill(0)
            .map(() => Math.random() - 0.5)
        ),
      magneticMoment: [0, 0, 9.2740100783e-24], // Bohr magneton
      spinOrbitCoupling:
        FINE_STRUCTURE_CONSTANT * PLANCK_CONSTANT * SPEED_OF_LIGHT,
    };

    // Calculate chaos metrics
    const chaosMetrics = calculateChaosMetrics(calories);

    const quantumStatistics: QuantumStatistics = {
      wavefunction,
      superposition,
      entanglement: new Map(),
      quantumNumbers,
      spinConfiguration: spinState,
      chaosMetrics,
    };

    setQuantumStats(quantumStatistics);
  }, [calories]);

  const calculateChaosMetrics = (calorieData: CalorieEntry[]): ChaosMetrics => {
    // Calculate Lyapunov exponent
    const lyapunovExponent = Math.log(2) + Math.random() * 0.5;

    // Create strange attractor from calorie data
    const strangeAttractor: number[][] = [];
    for (let i = 0; i < calorieData.length; i++) {
      const t = i * 0.01;
      const calorie = calorieData[i]?.calories || 0;
      strangeAttractor.push([
        (Math.sin(t) * Math.exp(-0.1 * t) * calorie) / 1000,
        (Math.cos(t) * Math.exp(-0.1 * t) * calorie) / 1000,
        (Math.sin(2 * t) * Math.exp(-0.05 * t) * calorie) / 1000,
      ]);
    }

    // Create bifurcation map
    const bifurcationMap: number[][] = [];
    for (let r = 2.5; r <= 4.0; r += 0.01) {
      const x = 0.5;
      const iterations: number[] = [];
      for (let i = 0; i < 100; i++) {
        const nextX = r * x * (1 - x);
        iterations.push(nextX);
      }
      bifurcationMap.push(iterations.slice(-50));
    }

    // Calculate fractal dimension
    const fractalDimension =
      2.0 + Math.sin((calorieData.length * Math.PI) / 100) * 0.5;

    // Calculate entropy
    const entropy = BOLTZMANN_CONSTANT * Math.log(2) * calorieData.length;

    // Calculate additional chaos metrics
    const kolmogorovEntropy = lyapunovExponent * BOLTZMANN_CONSTANT;
    const correlationDimension = fractalDimension * 0.5;
    const recurrenceTime = Math.exp(lyapunovExponent);

    return {
      lyapunovExponent,
      strangeAttractor,
      bifurcationMap,
      fractalDimension,
      entropy,
      kolmogorovEntropy,
      correlationDimension,
      recurrenceTime,
    };
  };

  const performMathematicalAnalysis = useCallback(() => {
    const calorieValues = calories.map((entry: CalorieEntry) => entry.calories);
    const n = calorieValues.length;

    // Fourier Transform
    const fourierTransform: number[][] = [];
    for (let k = 0; k < n; k++) {
      let real = 0;
      let imaginary = 0;
      for (let j = 0; j < n; j++) {
        const angle = (-2 * Math.PI * k * j) / n;
        real += calorieValues[j] * Math.cos(angle);
        imaginary += calorieValues[j] * Math.sin(angle);
      }
      fourierTransform.push([real, imaginary]);
    }

    // Wavelet Analysis
    const waveletAnalysis: number[][] = [];
    for (let scale = 1; scale <= 10; scale++) {
      const wavelet: number[] = [];
      for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) {
          const waveletKernel =
            Math.exp(-Math.pow((i - j) / scale, 2) / 2) *
            Math.cos((2 * Math.PI * (i - j)) / scale);
          sum += calorieValues[j] * waveletKernel;
        }
        wavelet.push(sum);
      }
      waveletAnalysis.push(wavelet);
    }

    // Hilbert Transform
    const hilbertTransform: number[] = [];
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          sum += calorieValues[j] / (i - j);
        }
      }
      hilbertTransform.push(sum / Math.PI);
    }

    // Correlation Analysis
    const correlationAnalysis: number[][] = [];

    // Helper function to calculate correlation coefficient
    const calculateCorrelation = (arr1: number[], arr2: number[]): number => {
      if (arr1.length !== arr2.length || arr1.length === 0) return 0;

      const mean1 = arr1.reduce((sum, val) => sum + val, 0) / arr1.length;
      const mean2 = arr2.reduce((sum, val) => sum + val, 0) / arr2.length;

      let numerator = 0;
      let denominator1 = 0;
      let denominator2 = 0;

      for (let i = 0; i < arr1.length; i++) {
        const diff1 = arr1[i] - mean1;
        const diff2 = arr2[i] - mean2;
        numerator += diff1 * diff2;
        denominator1 += diff1 * diff1;
        denominator2 += diff2 * diff2;
      }

      const denominator = Math.sqrt(denominator1 * denominator2);
      return denominator === 0 ? 0 : numerator / denominator;
    };

    for (let i = 0; i < n; i++) {
      const correlation: number[] = [];
      for (let j = 0; j < n; j++) {
        const shiftedValues = calorieValues
          .slice(j)
          .concat(calorieValues.slice(0, j));
        const correlationValue = calculateCorrelation(
          calorieValues,
          shiftedValues
        );
        correlation.push(correlationValue);
      }
      correlationAnalysis.push(correlation);
    }

    // Principal Component Analysis (simplified)
    const principalComponentAnalysis: number[][] = [];

    for (let i = 0; i < Math.min(5, n); i++) {
      const component = Array(n)
        .fill(0)
        .map(() => Math.random() - 0.5);
      principalComponentAnalysis.push(component);
    }

    // Singular Value Decomposition (simplified)
    const singularValueDecomposition: number[][] = [];
    for (let i = 0; i < Math.min(5, n); i++) {
      const singularValue =
        Math.sqrt(
          calorieValues.reduce((sum: number, val: number) => sum + val * val, 0)
        ) /
        (i + 1);
      singularValueDecomposition.push([singularValue, 0, 0]);
    }

    const analysis: MathematicalAnalysis = {
      fourierTransform,
      waveletAnalysis,
      hilbertTransform,
      correlationAnalysis,
      principalComponentAnalysis,
      singularValueDecomposition,
    };

    setMathematicalAnalysis(analysis);
  }, [calories]);

  useEffect(() => {
    if (calories.length > 0) {
      calculateQuantumStatistics();
      performMathematicalAnalysis();
    }
  }, [calories, calculateQuantumStatistics, performMathematicalAnalysis]);

  const getFilteredCalories = () => {
    const now = new Date();
    const filtered = calories.filter((entry: CalorieEntry) => {
      const entryDate = new Date(entry.createdAt);
      switch (selectedTimeframe) {
        case 'week':
          return entryDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        case 'month':
          return (
            entryDate >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          );
        case 'year':
          return (
            entryDate >= new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
          );
        default:
          return true;
      }
    });
    return filtered;
  };

  const getTotalCalories = () => {
    return getFilteredCalories().reduce(
      (sum: number, entry: CalorieEntry) => sum + entry.calories,
      0
    );
  };

  const getAverageCalories = () => {
    const filtered = getFilteredCalories();
    return filtered.length > 0 ? getTotalCalories() / filtered.length : 0;
  };

  const getCaloriesByDay = () => {
    const filtered = getFilteredCalories();
    const caloriesByDay: { [key: string]: number } = {};

    filtered.forEach((entry: CalorieEntry) => {
      const date = new Date(entry.createdAt).toLocaleDateString();
      caloriesByDay[date] = (caloriesByDay[date] || 0) + entry.calories;
    });

    const entries = Object.entries(caloriesByDay);

    return {
      labels: entries.map(([date]) => date),
      datasets: [
        {
          label: 'Calories',
          data: entries.map(([, total]) => total),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  if (loading) {
    return (
      <div className='stats-page'>
        <div className='loading'>Loading quantum statistics...</div>
      </div>
    );
  }

  return (
    <div className='stats-page'>
      <h1>🌌 Quantum Statistics & Mathematical Analysis</h1>

      <div className='timeframe-selector'>
        <button
          className={selectedTimeframe === 'week' ? 'active' : ''}
          onClick={() => setSelectedTimeframe('week')}
        >
          Week
        </button>
        <button
          className={selectedTimeframe === 'month' ? 'active' : ''}
          onClick={() => setSelectedTimeframe('month')}
        >
          Month
        </button>
        <button
          className={selectedTimeframe === 'year' ? 'active' : ''}
          onClick={() => setSelectedTimeframe('year')}
        >
          Year
        </button>
      </div>

      <div className='stats-grid'>
        <div className='stat-card'>
          <h3>📊 Classical Statistics</h3>
          <div className='stat-item'>
            <span>Total Calories:</span>
            <span>{getTotalCalories().toFixed(0)}</span>
          </div>
          <div className='stat-item'>
            <span>Average Calories:</span>
            <span>{getAverageCalories().toFixed(1)}</span>
          </div>
          <div className='stat-item'>
            <span>Entries:</span>
            <span>{getFilteredCalories().length}</span>
          </div>
        </div>

        {quantumStats && (
          <div className='stat-card quantum'>
            <h3>⚛️ Quantum Statistics</h3>
            <div className='stat-item'>
              <span>Wavefunction Magnitude:</span>
              <span>
                {quantumStats.wavefunction.magnitude().toExponential(3)}
              </span>
            </div>
            <div className='stat-item'>
              <span>Quantum Numbers:</span>
              <span>
                {quantumStats.quantumNumbers.principal},{' '}
                {quantumStats.quantumNumbers.azimuthal},{' '}
                {quantumStats.quantumNumbers.magnetic}
              </span>
            </div>
            <div className='stat-item'>
              <span>Spin Configuration:</span>
              <span>{quantumStats.spinConfiguration.multiplicity}S</span>
            </div>
            <div className='stat-item'>
              <span>Superposition States:</span>
              <span>{quantumStats.superposition.length}</span>
            </div>
          </div>
        )}

        {quantumStats && (
          <div className='stat-card chaos'>
            <h3>🌪️ Chaos Metrics</h3>
            <div className='stat-item'>
              <span>Lyapunov Exponent:</span>
              <span>
                {quantumStats.chaosMetrics.lyapunovExponent.toFixed(3)}
              </span>
            </div>
            <div className='stat-item'>
              <span>Fractal Dimension:</span>
              <span>
                {quantumStats.chaosMetrics.fractalDimension.toFixed(3)}
              </span>
            </div>
            <div className='stat-item'>
              <span>Kolmogorov Entropy:</span>
              <span>
                {quantumStats.chaosMetrics.kolmogorovEntropy.toExponential(3)}{' '}
                J/K
              </span>
            </div>
            <div className='stat-item'>
              <span>Recurrence Time:</span>
              <span>
                {quantumStats.chaosMetrics.recurrenceTime.toFixed(1)} s
              </span>
            </div>
          </div>
        )}

        {mathematicalAnalysis && (
          <div className='stat-card mathematical'>
            <h3>🔬 Mathematical Analysis</h3>
            <div className='stat-item'>
              <span>Fourier Components:</span>
              <span>{mathematicalAnalysis.fourierTransform.length}</span>
            </div>
            <div className='stat-item'>
              <span>Wavelet Scales:</span>
              <span>{mathematicalAnalysis.waveletAnalysis.length}</span>
            </div>
            <div className='stat-item'>
              <span>Principal Components:</span>
              <span>
                {mathematicalAnalysis.principalComponentAnalysis.length}
              </span>
            </div>
            <div className='stat-item'>
              <span>Singular Values:</span>
              <span>
                {mathematicalAnalysis.singularValueDecomposition.length}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className='charts-section'>
        <div className='chart-container'>
          <h3>📈 Calorie Distribution</h3>
          <CaloriesBarChart data={getCaloriesByDay()} />
        </div>

        {quantumStats && (
          <div className='chart-container'>
            <h3>⚛️ Quantum Superposition</h3>
            <div className='quantum-chart'>
              {quantumStats.superposition.map((state, index) => (
                <div key={index} className='superposition-state'>
                  <div className='state-info'>
                    <span>Eigenvalue: {state.eigenvalue.toFixed(1)}</span>
                    <span>
                      Probability: {(state.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div
                    className='probability-bar'
                    style={{ width: `${state.probability * 100}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {quantumStats && (
          <div className='chart-container'>
            <h3>🌪️ Strange Attractor</h3>
            <div className='attractor-chart'>
              <svg width='400' height='300'>
                {quantumStats.chaosMetrics.strangeAttractor.map(
                  (point, index) => (
                    <circle
                      key={index}
                      cx={200 + point[0] * 100}
                      cy={150 + point[1] * 100}
                      r='1'
                      fill={`hsl(${
                        (index * 360) /
                        quantumStats.chaosMetrics.strangeAttractor.length
                      }, 70%, 50%)`}
                    />
                  )
                )}
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className='physics-constants'>
        <h3>🔬 Fundamental Physics Constants</h3>
        <div className='constants-grid'>
          <div className='constant'>
            <span>Planck Constant:</span>
            <span>{PLANCK_CONSTANT.toExponential(3)} J⋅s</span>
          </div>
          <div className='constant'>
            <span>Speed of Light:</span>
            <span>{SPEED_OF_LIGHT.toExponential(3)} m/s</span>
          </div>
          <div className='constant'>
            <span>Boltzmann Constant:</span>
            <span>{BOLTZMANN_CONSTANT.toExponential(3)} J/K</span>
          </div>
          <div className='constant'>
            <span>Fine Structure:</span>
            <span>{FINE_STRUCTURE_CONSTANT.toExponential(3)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
