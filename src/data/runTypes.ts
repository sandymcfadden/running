import type { RunType } from '../types';

export const RUN_TYPES: RunType[] = [
  {
    id: 'rest',
    name: 'Rest',
    description: 'Full rest day — no running. Recovery is part of training.',
    color: '#9ca3af',
    effortLevel: 'rest',
  },
  {
    id: 'easy',
    name: 'Easy Run',
    description: 'Comfortable, conversational pace. You should be able to speak full sentences.',
    color: '#4ade80',
    effortLevel: 'easy',
  },
  {
    id: 'long-run',
    name: 'Long Run',
    description: 'Longer easy run to build aerobic base and endurance. Keep it relaxed.',
    color: '#16a34a',
    effortLevel: 'easy',
  },
  {
    id: 'fast-finish-long',
    name: 'Fast Finish Long',
    description: 'A long run that finishes at a faster pace, simulating race-end fatigue.',
    color: '#0d9488',
    effortLevel: 'moderate',
  },
  {
    id: 'progressive',
    name: 'Progressive Run',
    description: 'Starts at an easy pace and gets faster toward the end. Often the last 5–20 min at medium-hard effort.',
    color: '#a78bfa',
    effortLevel: 'moderate',
  },
  {
    id: 'steady-state',
    name: 'Steady State Run',
    description: 'Sustained moderate-hard effort, faster than easy but not as intense as tempo. Comfortably hard.',
    color: '#6366f1',
    effortLevel: 'moderate',
  },
  {
    id: 'tempo',
    name: 'Tempo Run',
    description: 'Medium effort that improves lactate threshold. Breathing is fast but controlled. Comfortably hard.',
    color: '#f59e0b',
    effortLevel: 'hard',
  },
  {
    id: 'tempo-intervals',
    name: 'Tempo Intervals',
    description: 'Broken-up tempo runs with short recovery intervals between. Effort builds from medium to medium-hard.',
    color: '#fb923c',
    effortLevel: 'hard',
  },
  {
    id: 'cruise-intervals',
    name: 'Cruise Intervals',
    description: 'Medium-hard effort with short recovery intervals. Breathing is fast and on the verge of out of control.',
    color: '#f97316',
    effortLevel: 'hard',
  },
  {
    id: 'fartlek',
    name: 'Fartlek Run',
    description: 'Speed play — alternating fast bursts at 5K–10K effort with slower recovery intervals.',
    color: '#60a5fa',
    effortLevel: 'hard',
  },
  {
    id: 'speed',
    name: 'Speed Workout',
    description: 'Hard to very hard. 5K race pace or faster with recovery intervals between repeats.',
    color: '#ef4444',
    effortLevel: 'hard',
  },
  {
    id: 'half-marathon',
    name: 'Half Marathon',
    description: 'Race day! 21.1 km / 13.1 miles.',
    color: '#eab308',
    effortLevel: 'race',
  },
];

export function getRunType(id: string): RunType | undefined {
  return RUN_TYPES.find(t => t.id === id);
}
