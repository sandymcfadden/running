import { useState, useEffect, useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { format, parseISO } from 'date-fns';
import { db } from '../db/db';
import { getRunTypeForDate, today, formatDistance, formatDuration } from '../utils/program';
import { RUN_TYPES, getRunType } from '../data/runTypes';
import type { DayStatus } from '../types';

interface Props {
  date: string;
  distanceUnit: 'km' | 'mi';
  onClose: () => void;
}

const STATUS_OPTIONS: { value: DayStatus; label: string; emoji: string; activeClass: string }[] = [
  { value: 'completed', label: 'Completed', emoji: '✓', activeClass: 'bg-green-500 text-white' },
  { value: 'partial',   label: 'Partial',   emoji: '~', activeClass: 'bg-yellow-400 text-white' },
  { value: 'skipped',   label: 'Skipped',   emoji: '✗', activeClass: 'bg-red-400 text-white' },
];

export function DayDetail({ date, distanceUnit, onClose }: Props) {
  const programs = useLiveQuery(() => db.programs.toArray(), []);
  const log = useLiveQuery(() => db.dayLogs.where('date').equals(date).first(), [date]);

  const [status, setStatus] = useState<DayStatus | null>(null);
  const [runTypeOverride, setRunTypeOverride] = useState<string | null>(null);
  const [distanceInput, setDistanceInput] = useState('');
  const [durationH, setDurationH] = useState('');
  const [durationM, setDurationM] = useState('');
  const [notes, setNotes] = useState('');
  const [showTypePicker, setShowTypePicker] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (log) {
      setStatus(log.status ?? null);
      setRunTypeOverride(log.runTypeOverride ?? null);
      if (log.distanceKm != null) {
        const display = distanceUnit === 'mi' ? log.distanceKm * 0.621371 : log.distanceKm;
        setDistanceInput(display.toFixed(2));
      } else {
        setDistanceInput('');
      }
      if (log.durationMinutes != null) {
        setDurationH(String(Math.floor(log.durationMinutes / 60)));
        setDurationM(String(log.durationMinutes % 60));
      } else {
        setDurationH(''); setDurationM('');
      }
      setNotes(log.notes ?? '');
    } else {
      setStatus(null); setRunTypeOverride(null);
      setDistanceInput(''); setDurationH(''); setDurationM('');
      setNotes('');
    }
    setShowTypePicker(false);
  }, [log, distanceUnit]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const { runType: scheduledType, targetDuration } = programs
    ? getRunTypeForDate(programs, date)
    : { runType: null, targetDuration: undefined };

  const hasOverride = runTypeOverride !== null && runTypeOverride !== scheduledType?.id;
  const displayType = runTypeOverride ? getRunType(runTypeOverride) : scheduledType;

  const todayStr = today();
  const isFuture = date > todayStr;
  const canSave = status !== null || hasOverride;

  async function save() {
    if (!canSave) return;
    setSaving(true);
    const now = new Date().toISOString();
    const effectiveTypeId = runTypeOverride ?? scheduledType?.id;

    let distanceKm: number | undefined;
    const dInput = parseFloat(distanceInput);
    if (!isNaN(dInput) && dInput > 0) {
      distanceKm = distanceUnit === 'mi' ? dInput / 0.621371 : dInput;
    }

    let durationMinutes: number | undefined;
    const h = parseInt(durationH) || 0;
    const m = parseInt(durationM) || 0;
    if (h > 0 || m > 0) durationMinutes = h * 60 + m;

    const fields = {
      status: status ?? undefined,
      runTypeOverride: hasOverride ? runTypeOverride! : undefined,
      runTypeId: effectiveTypeId,
      distanceKm,
      durationMinutes,
      notes: notes.trim() || undefined,
      updatedAt: now,
    };

    if (log) {
      await db.dayLogs.update(log.id!, fields);
    } else {
      await db.dayLogs.add({ date, ...fields });
    }
    setSaving(false);
    onClose();
  }

  async function clearLog() {
    if (log) await db.dayLogs.delete(log.id!);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-sm mx-auto p-5 pb-8 sm:pb-5 max-h-[90vh] overflow-y-auto">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">{format(parseISO(date), 'EEEE')}</p>
            <h3 className="text-xl font-semibold text-gray-900">{format(parseISO(date), 'MMMM d, yyyy')}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 -mt-1 -mr-1 rounded-lg">✕</button>
        </div>

        {/* Run type display + override */}
        <div className="mb-5">
          {displayType ? (
            <div className="px-3 py-2.5 rounded-xl" style={{ backgroundColor: displayType.color + '22' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: displayType.color }} />
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm">{displayType.name}</p>
                  {hasOverride && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/70 text-gray-500 font-medium">overridden</span>
                  )}
                </div>
                <button
                  onClick={() => setShowTypePicker(p => !p)}
                  className="text-xs text-green-700 hover:text-green-900 font-medium shrink-0"
                >
                  {showTypePicker ? 'Cancel' : 'Change'}
                </button>
              </div>
              {targetDuration && !hasOverride && (
                <p className="text-xs text-gray-500 ml-5">Target: {targetDuration}</p>
              )}
              <p className="text-xs text-gray-500 mt-1 ml-5">{displayType.description}</p>
            </div>
          ) : (
            <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-gray-100">
              <p className="text-sm text-gray-500">No program for this day</p>
              <button
                onClick={() => setShowTypePicker(p => !p)}
                className="text-xs text-green-700 hover:text-green-900 font-medium"
              >
                {showTypePicker ? 'Cancel' : 'Set type'}
              </button>
            </div>
          )}

          {showTypePicker && (
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {RUN_TYPES.map(rt => {
                const isSelected = (runTypeOverride ?? scheduledType?.id) === rt.id;
                const isScheduled = rt.id === scheduledType?.id;
                return (
                  <button
                    key={rt.id}
                    onClick={() => {
                      setRunTypeOverride(rt.id === scheduledType?.id ? null : rt.id);
                      setShowTypePicker(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-left transition-colors ${
                      isSelected ? 'border-transparent text-white' : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    style={isSelected ? { backgroundColor: rt.color } : {}}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: isSelected ? 'rgba(255,255,255,0.7)' : rt.color }}
                    />
                    <div className="min-w-0">
                      <span className={`text-xs font-semibold block ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                        {rt.name}
                      </span>
                      {isScheduled && (
                        <span className={`text-[10px] ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>scheduled</span>
                      )}
                    </div>
                  </button>
                );
              })}
              {hasOverride && (
                <button
                  onClick={() => { setRunTypeOverride(null); setShowTypePicker(false); }}
                  className="col-span-2 py-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  Reset to scheduled type
                </button>
              )}
            </div>
          )}
        </div>

        {/* Logging — past + today */}
        {!isFuture && (
          <>
            <p className="text-xs font-medium text-gray-600 mb-2">How did it go?</p>
            <div className="flex gap-2 mb-4">
              {STATUS_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setStatus(s => s === opt.value ? null : opt.value)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border-2 transition-colors ${
                    status === opt.value
                      ? opt.activeClass + ' border-transparent'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="block text-base leading-none mb-0.5">{opt.emoji}</span>
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Distance + duration */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Distance ({distanceUnit})</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={distanceInput}
                  onChange={e => setDistanceInput(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Duration</label>
                <div className="flex gap-1 items-center">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={durationH}
                    onChange={e => setDurationH(e.target.value)}
                    placeholder="0h"
                    className="w-full px-2 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <span className="text-gray-400 text-xs">:</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={durationM}
                    onChange={e => setDurationM(e.target.value)}
                    placeholder="00m"
                    className="w-full px-2 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>
            </div>

            {/* Show pace if both distance and duration entered */}
            {distanceInput && (parseFloat(durationH) > 0 || parseFloat(durationM) > 0) && (() => {
              const distKm = distanceUnit === 'mi'
                ? parseFloat(distanceInput) / 0.621371
                : parseFloat(distanceInput);
              const totalMin = (parseInt(durationH) || 0) * 60 + (parseInt(durationM) || 0);
              if (distKm > 0 && totalMin > 0) {
                const paceMin = totalMin / (distanceUnit === 'mi' ? parseFloat(distanceInput) : distKm);
                const pm = Math.floor(paceMin);
                const ps = Math.round((paceMin - pm) * 60);
                return (
                  <p className="text-xs text-gray-400 text-center mb-3">
                    Pace: {pm}:{ps.toString().padStart(2, '0')} min/{distanceUnit}
                    {' · '}
                    {formatDistance(distKm, 'km')} · {formatDuration(totalMin)}
                  </p>
                );
              }
              return null;
            })()}

            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Notes (optional)"
              rows={2}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
            />
          </>
        )}

        {/* Show previous log summary if exists */}
        {!isFuture && log && (log.distanceKm || log.durationMinutes) && (
          <div className="text-xs text-gray-400 text-center mb-3">
            Previously logged:{' '}
            {log.distanceKm ? formatDistance(log.distanceKm, distanceUnit) : ''}
            {log.distanceKm && log.durationMinutes ? ' · ' : ''}
            {log.durationMinutes ? formatDuration(log.durationMinutes) : ''}
          </div>
        )}

        <div className="flex gap-2">
          {log && (
            <button
              onClick={clearLog}
              className="px-4 py-2 rounded-xl text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              Clear
            </button>
          )}
          {canSave && (
            <button
              onClick={save}
              disabled={saving}
              className="flex-1 py-2 rounded-xl bg-green-600 text-white text-sm font-medium disabled:opacity-40 hover:bg-green-700 transition-colors"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          )}
          {!canSave && !log && (
            <button onClick={onClose} className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-500 text-sm font-medium">
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
