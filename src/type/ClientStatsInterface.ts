
export interface ClientStatRecord {
  cpu: number;
  ram: number;
  freeRam: number;
  networkIo: number;
  diskSpace: number;
  diskIo: number;

  dateTime: string;
}

export interface ClientStatsInterface {
  statList: ClientStatRecord[],
  anomalyList: {
    timestampMkS: number; // Данные в микросекундах
  }[],
}

export interface ClientChartStatsInterface extends ClientStatRecord {
  anomalyCount: number,
  currentMks: number,
}




