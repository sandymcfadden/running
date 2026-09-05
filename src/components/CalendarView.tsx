import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { format, addMonths, subMonths } from 'date-fns';
import { db } from '../db/db';
import { getRunTypeForDate, getCalendarDays, today } from '../utils/program';
import { getRunType, RUN_TYPES } from '../data/runTypes';
import type { DayStatus, RunType } from '../types';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const STATUS_ICON: Record<DayStatus, string> = {
  completed: '✓',
  partial: '~',
  skipped: '✗',
};

interface DayProps {
  dateStr: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
  runType: RunType | null;
  status?: DayStatus;
  onClick: () => void;
}

function CalendarDay({ dateStr, isCurrentMonth, isToday, isPast, runType, status, onClick }: DayProps) {
  const dayNum = parseInt(dateStr.split('-')[2], 10);
  const opacity = isCurrentMonth ? 1 : 0.35;
  const bgColor = runType ? runType.color : '#e5e7eb';

  return (
    <button
      onClick={onClick}
      className="relative aspect-square p-1 rounded-lg border border-white/50 transition-transform hover:scale-105 hover:z-10 focus:outline-none focus:ring-2 focus:ring-green-400 focus:z-10"
      style={{ backgroundColor: bgColor, opacity }}
    >
      {isToday && (
        <span className="absolute inset-0 rounded-lg ring-2 ring-green-900 ring-offset-1 pointer-events-none" />
      )}
      <span className="absolute top-1 left-1.5 text-xs font-bold text-white/90 drop-shadow leading-none">
        {dayNum}
      </span>
      {runType && runType.id !== 'rest' && (
        <span className="absolute bottom-1 left-0 right-0 text-center text-[9px] font-semibold text-white/90 drop-shadow leading-none hidden sm:block truncate px-0.5">
          {runType.name}
        </span>
      )}
      {status && (isPast || isToday) && (
        <span
          className="absolute top-0.5 right-1 text-xs font-bold leading-none"
          style={{ color: status === 'completed' ? '#fff' : status === 'skipped' ? '#fca5a5' : '#fde68a' }}
        >
          {STATUS_ICON[status]}
        </span>
      )}
    </button>
  );
}

interface Props {
  onDayClick: (date: string) => void;
  distanceUnit: 'km' | 'mi';
}

export function CalendarView({ onDayClick }: Props) {
  const todayStr = today();
  const [current, setCurrent] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const year = current.getFullYear();
  const month = current.getMonth();
  const days = getCalendarDays(year, month);

  const monthStart = format(new Date(year, month, 1), 'yyyy-MM-dd');
  const monthEnd = format(new Date(year, month + 1, 0), 'yyyy-MM-dd');

  const programs = useLiveQuery(() => db.programs.toArray(), []);
  const dayLogs = useLiveQuery(
    () => db.dayLogs.where('date').between(monthStart, monthEnd, true, true).toArray(),
    [monthStart, monthEnd],
  );

  const logMap = new Map(dayLogs?.map(l => [l.date, { status: l.status, override: l.runTypeOverride, runTypeId: l.runTypeId }]));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrent(d => subMonths(d, 1))}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 font-bold text-lg leading-none"
        >
          ‹
        </button>
        <h2 className="text-lg font-semibold text-gray-800">
          {format(current, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => setCurrent(d => addMonths(d, 1))}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 font-bold text-lg leading-none"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center text-xs font-medium text-gray-500 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map(dateStr => {
          const isCurrentMonth =
            dateStr >= format(new Date(year, month, 1), 'yyyy-MM-dd') &&
            dateStr <= format(new Date(year, month + 1, 0), 'yyyy-MM-dd');
          const logEntry = logMap.get(dateStr);
          const { runType: scheduledType } = programs ? getRunTypeForDate(programs, dateStr) : { runType: null };
          const displayType = logEntry?.override
            ? (getRunType(logEntry.override) ?? scheduledType)
            : scheduledType ?? (logEntry?.runTypeId ? getRunType(logEntry.runTypeId) ?? null : null);

          return (
            <CalendarDay
              key={dateStr}
              dateStr={dateStr}
              isCurrentMonth={isCurrentMonth}
              isToday={dateStr === todayStr}
              isPast={dateStr < todayStr}
              runType={displayType ?? null}
              status={logEntry?.status}
              onClick={() => onDayClick(dateStr)}
            />
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs font-medium text-gray-500 mb-2">Run types</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5">
          {RUN_TYPES.map(rt => (
            <div key={rt.id} className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: rt.color }} />
              <span className="text-xs text-gray-600">{rt.name}</span>
            </div>
          ))}
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-gray-200" />
            <span className="text-xs text-gray-600">No program</span>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-xs text-gray-500">✓ Completed &nbsp; ~ Partial &nbsp; ✗ Skipped</span>
        </div>
      </div>
    </div>
  );
}
