import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { format, parseISO, addDays } from 'date-fns';
import { db } from '../db/db';
import type { Program } from '../types';
import { getRunType } from '../data/runTypes';
import { today } from '../utils/program';
import { HALF_MARATHON_PROGRAM } from '../data/halfMarathonProgram';
import { ProgramEditor } from './ProgramEditor';
import { DataPortability } from './DataPortability';

function ProgramCard({ program, isCurrent, onDelete }: {
  program: Program;
  isCurrent: boolean;
  onDelete: () => void;
}) {
  const endDate = format(addDays(parseISO(program.startDate), program.days.length - 1), 'MMM d, yyyy');
  const weeks = Math.ceil(program.days.length / 7);

  const typeCounts = new Map<string, number>();
  for (const d of program.days) {
    typeCounts.set(d.runTypeId, (typeCounts.get(d.runTypeId) ?? 0) + 1);
  }
  const topTypes = [...typeCounts.entries()]
    .filter(([id]) => id !== 'rest')
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className={`rounded-2xl border p-4 ${isCurrent ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-900 text-sm">{program.name}</h4>
            {isCurrent && (
              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">Active</span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {format(parseISO(program.startDate), 'MMM d, yyyy')} → {endDate} · {weeks} weeks
          </p>
        </div>
        <button
          onClick={onDelete}
          className="text-gray-300 hover:text-red-400 transition-colors text-sm p-1"
        >
          ✕
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {topTypes.map(([id, count]) => {
          const rt = getRunType(id);
          return rt ? (
            <div key={id} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-gray-200">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: rt.color }} />
              <span className="text-xs text-gray-600">{rt.name} ×{count}</span>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export function ProgramList() {
  const [showEditor, setShowEditor] = useState(false);
  const [hmStartDate, setHmStartDate] = useState<string | null>(null);
  const todayStr = today();

  const programs = useLiveQuery(
    () => db.programs.orderBy('startDate').reverse().toArray(),
    [],
  );

  const currentProgram = programs?.find(p => {
    const endDate = format(addDays(parseISO(p.startDate), p.days.length - 1), 'yyyy-MM-dd');
    return p.startDate <= todayStr && todayStr <= endDate;
  }) ?? null;

  async function confirmHalfMarathon() {
    if (!hmStartDate) return;
    await db.programs.add({ ...HALF_MARATHON_PROGRAM, startDate: hmStartDate, createdAt: new Date().toISOString() });
    setHmStartDate(null);
  }

  async function deleteProgram(p: Program) {
    if (confirm(`Delete "${p.name}"? This won't affect your logged days.`)) {
      await db.programs.delete(p.id!);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">Programs</h2>
        <button
          onClick={() => setShowEditor(true)}
          className="px-4 py-1.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
        >
          + New
        </button>
      </div>

      {programs?.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          <p className="text-4xl mb-3">📅</p>
          <p className="font-medium text-gray-600">No programs yet</p>
          <p className="text-sm mt-1 mb-4">Create your own or load the built-in half marathon plan.</p>
          <button
            onClick={() => setHmStartDate(todayStr)}
            className="px-5 py-2 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Load Half Marathon Program
          </button>
        </div>
      )}

      <div className="space-y-3">
        {programs?.map(p => (
          <ProgramCard
            key={p.id}
            program={p}
            isCurrent={p.id === currentProgram?.id}
            onDelete={() => deleteProgram(p)}
          />
        ))}
      </div>

      {(programs?.length ?? 0) > 0 && (
        <button
          onClick={() => setHmStartDate(todayStr)}
          className="mt-3 w-full py-2 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-400 hover:border-green-300 hover:text-green-600 transition-colors"
        >
          + Load Half Marathon Program
        </button>
      )}

      {hmStartDate !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xs">
            <h3 className="font-semibold text-gray-900 mb-1">Half Marathon Program</h3>
            <p className="text-sm text-gray-500 mb-4">Choose a start date (Monday recommended). The 10-week plan runs for 70 days.</p>
            <label className="block text-xs font-medium text-gray-600 mb-1">Start date</label>
            <input
              type="date"
              value={hmStartDate}
              onChange={e => setHmStartDate(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setHmStartDate(null)}
                className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmHalfMarathon}
                disabled={!hmStartDate}
                className="flex-1 py-2 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-40 transition-colors"
              >
                Load Program
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-2xl text-xs text-gray-500 space-y-1">
        <p className="font-medium text-gray-600">How programs work</p>
        <p>Each program runs from its start date for a fixed number of days. The active program is whichever one covers today's date. You can have overlapping programs — the one with the latest start date takes priority.</p>
      </div>

      <DataPortability />

      {showEditor && <ProgramEditor onClose={() => setShowEditor(false)} />}
    </div>
  );
}
