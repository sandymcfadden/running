import Dexie, { type Table } from 'dexie';
import dexieCloud from 'dexie-cloud-addon';
import type { Program, DayLog } from '../types';

const cloudUrl = import.meta.env.VITE_DEXIE_CLOUD_URL as string | undefined;

const db = new Dexie('RunningCalendarDB', { addons: cloudUrl ? [dexieCloud] : [] }) as Dexie & {
  programs: Table<Program, string>;
  dayLogs: Table<DayLog, string>;
};

db.version(1).stores({
  programs: '++id, startDate',
  dayLogs: '++id, &date',
});

// Migrate integer ids to UUID strings
db.version(2).stores({
  programs: '&id, startDate',
  dayLogs: '&id, &date',
}).upgrade(async tx => {
  const programs = await tx.table('programs').toArray();
  await tx.table('programs').clear();
  if (programs.length > 0) {
    await tx.table('programs').bulkAdd(
      programs.map(({ id: _id, ...rest }) => ({ ...rest, id: crypto.randomUUID() }))
    );
  }
  const dayLogs = await tx.table('dayLogs').toArray();
  await tx.table('dayLogs').clear();
  if (dayLogs.length > 0) {
    await tx.table('dayLogs').bulkAdd(
      dayLogs.map(({ id: _id, ...rest }) => ({ ...rest, id: crypto.randomUUID() }))
    );
  }
});

if (cloudUrl) {
  db.cloud.configure({
    databaseUrl: cloudUrl,
    requireAuth: false,
  });
}

export { db };
