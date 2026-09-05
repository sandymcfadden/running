import { SyncButton } from './SyncButton';

type View = 'calendar' | 'programs';

interface Props {
  view: View;
  onViewChange: (v: View) => void;
}

export function Header({ view, onViewChange }: Props) {
  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏃</span>
          <span className="font-semibold text-lg tracking-tight">Running Calendar</span>
          {import.meta.env.VITE_DEXIE_CLOUD_URL && <SyncButton />}
        </div>
        <nav className="flex gap-1 bg-green-800 rounded-lg p-1">
          <button
            onClick={() => onViewChange('calendar')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              view === 'calendar' ? 'bg-white text-green-800' : 'text-green-100 hover:text-white'
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => onViewChange('programs')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              view === 'programs' ? 'bg-white text-green-800' : 'text-green-100 hover:text-white'
            }`}
          >
            Programs
          </button>
        </nav>
      </div>
    </header>
  );
}
