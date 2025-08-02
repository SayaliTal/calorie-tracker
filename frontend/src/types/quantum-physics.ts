export interface QuantumMolecularState {
  wavefunction: ComplexWavefunction;
  molecularOrbitals: MolecularOrbital[];
  vibrationalModes: VibrationalMode[];
  electronicDensity: number[][][];
  spinConfiguration: SpinState;
  quantumNumbers: QuantumNumbers;
  entanglement: Map<string, QuantumMolecularState>;
}

export interface ComplexWavefunction {
  real: number[][];
  imaginary: number[][];
  magnitude: () => number[][];
  phase: () => number[][];
  normalize: () => void;
}

export interface MolecularOrbital {
  energy: number;
  occupation: number;
  symmetry: string;
  coefficients: number[];
  angularMomentum: number;
  radialFunction: (r: number) => number;
}

export interface VibrationalMode {
  frequency: number;
  intensity: number;
  symmetry: string;
  normalCoordinates: number[];
  anharmonicity: number;
  coupling: number;
}

export interface SpinState {
  totalSpin: number;
  multiplicity: number;
  spinDensity: number[][];
  magneticMoment: number[];
  spinOrbitCoupling: number;
}

export interface QuantumNumbers {
  principal: number;
  azimuthal: number;
  magnetic: number;
  spin: number;
  total: number;
}

export interface ComputationalFluidDynamics {
  velocityField: number[][][];
  pressureField: number[][];
  temperatureField: number[][];
  turbulenceModel: string;
  reynoldsNumber: number;
  machNumber: number;
  boundaryConditions: BoundaryCondition[];
}

export interface BoundaryCondition {
  type: 'dirichlet' | 'neumann' | 'periodic' | 'quantum';
  value: number | number[];
  position: number[];
  timeDependence: (t: number) => number;
} 