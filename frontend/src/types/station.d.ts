export interface Station {
  stationId: string;
  isInstalled: number;
  isRenting: number;
  isReturning: number;
  lastReported: number;
  numBikesAvailable: number;
  numBikesAvailableTypes: {
    classic: number;
    electric: number;
    smart: number;
  };
  numDocksAvailable: number;
}
