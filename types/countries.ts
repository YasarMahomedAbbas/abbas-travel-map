export interface Country {
  name: string;
  coordinates: [number, number];
  dateRange: string;
  color: string;
  startDate: Date;
  endDate?: Date;
} 