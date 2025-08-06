export interface MolecularDynamics {
  positions: number[][];
  velocities: number[][];
  forces: number[][];
  boxSize: number;
  timestep: number;
  temperature: number;
  pressure: number;
  energy: number;
  kineticEnergy: number;
  potentialEnergy: number;
  totalMomentum: number[];
  angularMomentum: number[];
}
