'use client';

import { TimetableEntry } from '../types';

interface TimetableViewProps {
  timetable: TimetableEntry[];
  isLoading?: boolean;
  viewMode?: 'week' | 'day';
  selectedDay?: number; // 1-7 for Monday-Sunday
}

const daysOfWeek = [
  { id: 1, name: 'Monday', short: 'Mon' },
  { id: 2, name: 'Tuesday', short: 'Tue' },
  { id: 3, name: 'Wednesday', short: 'Wed' },
  { id: 4, name: 'Thursday', short: 'Thu' },
  { id: 5, name: 'Friday', short: 'Fri' },
  { id: 6, name: 'Saturday', short: 'Sat' },
  { id: 7, name: 'Sunday', short: 'Sun' },
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

export function TimetableView({ 
  timetable, 
  isLoading = false, 
  viewMode = 'week',
  selectedDay = 1 
}: TimetableViewProps) {
  // Group timetable entries by day
  const timetableByDay = timetable.reduce((acc, entry) => {
    if (!acc[entry.dayOfWeek]) {
      acc[entry.dayOfWeek] = [];
    }
    acc[entry.dayOfWeek].push(entry);
    return acc;
  }, {} as Record<number, TimetableEntry[]>);

  // Sort entries by start time for each day
  Object.keys(timetableByDay).forEach(day => {
    timetableByDay[parseInt(day)].sort((a, b) => 
      a.startTime.localeCompare(b.startTime)
    );
  });

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getSubjectColor = (subjectName: string) => {
    const colors = [
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-green-100 text-green-800 border-green-200',
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-yellow-100 text-yellow-800 border-yellow-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
      'bg-red-100 text-red-800 border-red-200',
      'bg-orange-100 text-orange-800 border-orange-200',
    ];
    
    const hash = subjectName.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded mb-4"></div>
        <div className="grid grid-cols-7 gap-2">
          {[...Array(35)].map((_, index) => (
            <div key={index} className="h-16 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (timetable.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No timetable available</h3>
        <p className="text-gray-500">The timetable has not been set up yet.</p>
      </div>
    );
  }

  if (viewMode === 'day') {
    const dayEntries = timetableByDay[selectedDay] || [];
    const selectedDayName = daysOfWeek.find(d => d.id === selectedDay)?.name || 'Unknown';

    return (
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{selectedDayName}</h3>
        </div>
        
        <div className="p-4">
          {dayEntries.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No classes scheduled for {selectedDayName}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dayEntries.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-4 rounded-lg border ${getSubjectColor(entry.subject?.name || '')}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{entry.subject?.name}</h4>
                      <p className="text-sm opacity-75">
                        Teacher: {entry.teacher?.workspaceUser.user.name || 'Unknown'}
                      </p>
                      {entry.room && (
                        <p className="text-sm opacity-75">Room: {entry.room}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {formatTime(entry.startTime)} - {formatTime(entry.endTime)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Week view
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="grid grid-cols-8 border-b bg-gray-50">
            <div className="p-3 text-sm font-medium text-gray-900">Time</div>
            {daysOfWeek.map((day) => (
              <div key={day.id} className="p-3 text-sm font-medium text-gray-900 text-center">
                <div className="hidden sm:block">{day.name}</div>
                <div className="sm:hidden">{day.short}</div>
              </div>
            ))}
          </div>

          {/* Time slots */}
          {timeSlots.map((time, timeIndex) => (
            <div key={time} className="grid grid-cols-8 border-b">
              <div className="p-3 text-sm text-gray-600 bg-gray-50 border-r">
                {formatTime(time)}
              </div>
              
              {daysOfWeek.map((day) => {
                const dayEntries = timetableByDay[day.id] || [];
                const currentSlotEntry = dayEntries.find(entry => 
                  entry.startTime <= time && entry.endTime > time
                );

                return (
                  <div key={`${day.id}-${time}`} className="p-2 min-h-[60px] border-r last:border-r-0">
                    {currentSlotEntry && (
                      <div className={`p-2 rounded text-xs ${getSubjectColor(currentSlotEntry.subject?.name || '')}`}>
                        <div className="font-medium truncate">
                          {currentSlotEntry.subject?.name}
                        </div>
                        <div className="truncate opacity-75">
                          {currentSlotEntry.teacher?.workspaceUser.user.name || 'Unknown'}
                        </div>
                        {currentSlotEntry.room && (
                          <div className="truncate opacity-75">
                            {currentSlotEntry.room}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}