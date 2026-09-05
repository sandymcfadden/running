import Dexie, { type Table } from 'dexie';
import type { Program, DayLog } from '../types';

class RunningDB extends Dexie {
  programs!: Table<Program>;
  dayLogs!: Table<DayLog>;

  constructor() {
    super('RunningCalendarDB');
    this.version(1).stores({
      programs: '++id, startDate',
      dayLogs: '++id, &date',
    });
  }
}

export const db = new RunningDB();
