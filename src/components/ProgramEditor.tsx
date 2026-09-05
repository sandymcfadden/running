import { useState, useEffect, useCallback } from 'react';
import { db } from '../db/db';
import type { ProgramDay } from '../types';
import { RUN_TYPES } from '../data/runTypes';
import { today } from '../utils/program';

interface Props {
  onClose: () => void;
}

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DEFAULT_WEEK: ProgramDay[] = [
  { runTypeId: 'rest' },
  { runTypeId: 'easy' },
  { runTypeId: 'rest' },
  { runTypeId: 'easy' },
  { runTypeId: 'rest' },
  { runTypeId: 'easy' },
  { runTypeId: 'long-run' },
];

export function ProgramEditor({ onClose }: Props) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(today());
  const [weeks, setWeeks] = useState<ProgramDay[][]>([DEFAULT_WEEK.map(d => ({ ...d }))]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  function addWeek() {
    setWeeks(w => [...w, DEFAULT_WEEK.map(d => ({ ...d }))]);
  }

  function removeWeek(i: number) {
    setWeeks(w => w.filter((_, idx) => idx !== i));
  }

  function setDayType(weekIdx: number, dayIdx: number, runTypeId: string) {
    setWeeks(w => w.map((week, wi) =>
      wi === weekIdx
        ? week.map((day, di) => di === dayIdx ? { ...day, runTypeId } : day)
        : week
    ));
  }

  async function save() {
    if (!startDate) { setError('Start date is required.'); return; }
    if (weeks.length === 0) { setError('Add at least one week.'); return; }

    setSaving(true);
    const days: ProgramDay[] = weeks.flat();
    await db.programs.add({
      name: name.trim() || `Program from ${startDate}`,
      startDate,
      days,
      createdAt: new Date().toISOString(),
    });
    setSaving(false);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-lg mx-auto p-5 pb-8 sm:pb-5 max-h-[90vh] overflow-y-auto">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-gray-900">New Program</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg">✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Name (optional)</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Spring Base Building"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Start date (Monday recommended)</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-gray-600">Weeks ({weeks.length} week{weeks.length !== 1 ? 's' : ''} · {weeks.length * 7} days)</label>
            </div>

            <div className="space-y-3">
              {weeks.map((week, wi) => (
                <div key={wi} className="border border-gray-200 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600">Week {wi + 1}</span>
                    {weeks.length > 1 && (
                      <button
                        onClick={() => removeWeek(wi)}
                        className="text-xs text-gray-300 hover:text-red-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {WEEK_DAYS.map((label, di) => {
                      const rt = RUN_TYPES.find(r => r.id === week[di].runTypeId);
                      return (
                        <div key={di} className="flex flex-col items-center gap-1">
                          <span className="text-[10px] text-gray-400 font-medium">{label}</span>
                          <select
                            value={week[di].runTypeId}
                            onChange={e => setDayType(wi, di, e.target.value)}
                            className="w-full text-[10px] rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-400 p-0.5"
                            style={{ backgroundColor: (rt?.color ?? '#e5e7eb') + '33' }}
                          >
                            {RUN_TYPES.map(r => (
                              <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addWeek}
              className="mt-2 w-full py-2 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-400 hover:border-green-300 hover:text-green-500 transition-colors"
            >
              + Add week
            </button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            onClick={save}
            disabled={saving}
            className="w-full py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium disabled:opacity-40 hover:bg-green-700 transition-colors"
          >
            {saving ? 'Saving…' : 'Save Program'}
          </button>
        </div>
      </div>
    </div>
  );
}
