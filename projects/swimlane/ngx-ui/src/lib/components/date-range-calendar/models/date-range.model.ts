export interface DateRangeForm {
  startRaw: string;
  endRaw: string;
  startDate: Date | null;
  endDate: Date | null;
}

export interface PresetConfig {
  label: string;
  expression?: string;
  range?: () => [Date | null, Date | null];
}
