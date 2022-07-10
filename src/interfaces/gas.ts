export interface GasFees {
  maxPriorityFee: number;
  maxFee: number;
}

export interface GasStationResponse {
  safeLow: GasFees;
  standard: GasFees;
  fast: GasFees;
  estimatedBaseFee: number;
  blockTime: number;
  blockNumber: number;
}

export type GasPriority = 'safeLow' | 'standard' | 'fast';
