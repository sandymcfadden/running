export interface RunType {
  id: string;
  name: string;
  description: string;
  color: string;
  effortLevel: 'rest' | 'easy' | 'moderate' | 'hard' | 'race';
}

export interface ProgramDay {
  runTypeId: string;
  targetDuration?: string; // e.g. "50–70 min"
}

export interface Program {
  id?: number;
  name: string;
  startDate: string; // YYYY-MM-DD — day 0 of the program
  days: ProgramDay[]; // days[0] = startDate, days[1] = startDate+1, etc.
  createdAt: string;
}

export type DayStatus = 'completed' | 'partial' | 'skipped';

export interface DayLog {
  id?: number;
  date: string; // YYYY-MM-DD, unique index
  status?: DayStatus;
  runTypeOverride?: string;
  runTypeId?: string; // effective type snapshotted at save time
  distanceKm?: number;
  durationMinutes?: number;
  notes?: string;
  updatedAt: string;
}
