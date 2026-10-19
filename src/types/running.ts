export interface RunEntry {
  id: string;
  dayOfWeek: string;
  date: string;
  distance: number | null;
  pace: string | null;
  avgHR: number | null;
  maxHR: number | null;
  notes: string;
  activityType: 'run' | 'speedwork' | 'tennis' | 'cycling' | 'basketball' | 'rest' | 'other';
}

export interface WeeklyStats {
  weekNumber: number;
  startDate: string;
  endDate: string;
  totalMiles: number;
  runCount: number;
  avgPace: string | null;
  avgHR: number | null;
}

export interface RunningPlan {
  id: string;
  entries: RunEntry[];
  daysPerWeek: number;
  createdAt: string;
}
