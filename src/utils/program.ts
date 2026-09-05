import type { Program, RunType } from '../types';
import { RUN_TYPES } from '../data/runTypes';
import { format } from 'date-fns';

function parseLocal(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function getRunTypeForDate(programs: Program[], dateStr: string): { runType: RunType | null; targetDuration?: string; targetDistanceKm?: number } {
  if (!programs.length) return { runType: null };

  const applicable = programs
    .filter(p => p.startDate <= dateStr)
    .sort((a, b) => b.startDate.localeCompare(a.startDate));

  if (!applicable.length) return { runType: null };
  const program = applicable[0];

  const start = parseLocal(program.startDate);
  const target = parseLocal(dateStr);
  const dayOffset = Math.round((target.getTime() - start.getTime()) / 86_400_000);

  if (dayOffset < 0 || dayOffset >= program.days.length) return { runType: null };

  const day = program.days[dayOffset];
  const runType = RUN_TYPES.find(t => t.id === day.runTypeId) ?? null;
  return { runType, targetDuration: day.targetDuration, targetDistanceKm: day.targetDistanceKm };
}

export function getCalendarDays(year: number, month: number): string[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = (first.getDay() + 6) % 7; // Mon=0 … Sun=6
  const endPad = last.getDay() === 0 ? 0 : 7 - last.getDay();
  const days: string[] = [];

  for (let i = startPad; i > 0; i--) {
    days.push(format(new Date(year, month, 1 - i), 'yyyy-MM-dd'));
  }
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(format(new Date(year, month, d), 'yyyy-MM-dd'));
  }
  for (let i = 1; i <= endPad; i++) {
    days.push(format(new Date(year, month + 1, i), 'yyyy-MM-dd'));
  }

  return days;
}

export function today(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function formatDistance(km: number, unit: 'km' | 'mi'): string {
  if (unit === 'mi') {
    return `${(km * 0.621371).toFixed(2)} mi`;
  }
  return `${km.toFixed(2)} km`;
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
