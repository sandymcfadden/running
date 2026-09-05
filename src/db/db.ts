import Dexie, { type Table } from 'dexie';
import dexieCloud from 'dexie-cloud-addon';
import type { Program, DayLog } from '../types';

const db = new Dexie('RunningCalendarDB', { addons: [dexieCloud] }) as Dexie & {
  programs: Table<Program, string>;
  dayLogs: Table<DayLog, string>;
};

db.version(1).stores({
  programs: '++id, startDate',
  dayLogs: '++id, &date',
});

// Migrate from auto-increment integer ids to Dexie Cloud UUID string ids
db.version(2).stores({
  programs: '@id, startDate',
  dayLogs: '@id, &date',
}).upgrade(async tx => {
  const programs = await tx.table('programs').toArray();
  await tx.table('programs').clear();
  if (programs.length > 0) {
    await tx.table('programs').bulkAdd(programs.map(({ id: _id, ...rest }) => rest));
  }
  const dayLogs = await tx.table('dayLogs').toArray();
  await tx.table('dayLogs').clear();
  if (dayLogs.length > 0) {
    await tx.table('dayLogs').bulkAdd(dayLogs.map(({ id: _id, ...rest }) => rest));
  }
});

if (import.meta.env.VITE_DEXIE_CLOUD_URL) {
  db.cloud.configure({
    databaseUrl: import.meta.env.VITE_DEXIE_CLOUD_URL,
    requireAuth: false,
  });
}

export { db };
