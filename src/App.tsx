import { useState } from 'react';
import { Header } from './components/Header';
import { CalendarView } from './components/CalendarView';
import { ProgramList } from './components/ProgramList';
import { DayDetail } from './components/DayDetail';

type View = 'calendar' | 'programs';

function getUnit(): 'km' | 'mi' {
  return (localStorage.getItem('distanceUnit') as 'km' | 'mi') ?? 'km';
}

function App() {
  const [view, setView] = useState<View>('calendar');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [distanceUnit, setDistanceUnit] = useState<'km' | 'mi'>(getUnit);

  function toggleUnit() {
    const next = distanceUnit === 'km' ? 'mi' : 'km';
    setDistanceUnit(next);
    localStorage.setItem('distanceUnit', next);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header view={view} onViewChange={setView} />
      <div className="max-w-2xl mx-auto px-4 pt-4 pb-1 flex justify-end">
        <button
          onClick={toggleUnit}
          className="text-xs text-gray-400 hover:text-gray-600 font-medium px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Distance: {distanceUnit}
        </button>
      </div>
      <main className="max-w-2xl mx-auto px-4 pb-5">
        {view === 'calendar' ? (
          <CalendarView onDayClick={setSelectedDate} distanceUnit={distanceUnit} />
        ) : (
          <ProgramList />
        )}
      </main>
      {selectedDate && (
        <DayDetail
          date={selectedDate}
          distanceUnit={distanceUnit}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}

export default App;
