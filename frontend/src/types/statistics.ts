export interface QuantumStatistics {
  wavefunction: ComplexNumber;
  superposition: StatisticalEigenstate[];
  entanglement: Map<string, QuantumStatistics>;
  quantumNumbers: QuantumNumbers;
  spinConfiguration: SpinState;
  chaosMetrics: ChaosMetrics;
}

export interface ComplexNumber {
  real: number;
  imaginary: number;
  magnitude: () => number;
  phase: () => number;
}

export interface StatisticalEigenstate {
  eigenvalue: number;
  eigenvector: number[];
  frequency: number;
  amplitude: number;
  phase: number;
  probability: number;
}

export interface QuantumNumbers {
  principal: number;
  azimuthal: number;
  magnetic: number;
  spin: number;
  total: number;
}

export interface SpinState {
  totalSpin: number;
  multiplicity: number;
  spinDensity: number[][];
  magneticMoment: number[];
  spinOrbitCoupling: number;
}

export interface ChaosMetrics {
  lyapunovExponent: number;
  strangeAttractor: number[][];
  bifurcationMap: number[][];
  fractalDimension: number;
  entropy: number;
  kolmogorovEntropy: number;
  correlationDimension: number;
  recurrenceTime: number;
}

export interface MathematicalAnalysis {
  fourierTransform: number[][];
  waveletAnalysis: number[][];
  hilbertTransform: number[];
  correlationAnalysis: number[][];
  principalComponentAnalysis: number[][];
  singularValueDecomposition: number[][];
} 