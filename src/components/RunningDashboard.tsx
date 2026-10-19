'use client';

import { useState, useEffect } from 'react';
import { RunEntry } from '@/types/running';
import { runningData, calculateWeeklyStats, getTotalStats, getEntriesForDate } from '@/lib/running-data';

export function RunningDashboard() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 9, 1)); // October 2026
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [view, setView] = useState<'calendar' | 'stats'>('calendar');

  const entries = runningData;
  const weeklyStats = calculateWeeklyStats(entries);
  const totalStats = getTotalStats(entries);

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const formatDateString = (year: number, month: number, day: number): string => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getEntriesForDay = (day: number): RunEntry[] => {
    const dateStr = formatDateString(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return getEntriesForDate(entries, dateStr);
  };

  const getDayColor = (dayEntries: RunEntry[]): string => {
    if (dayEntries.length === 0) return '';
    const hasRun = dayEntries.some(e => e.activityType === 'run' || e.activityType === 'speedwork');
    const hasOther = dayEntries.some(e => e.activityType !== 'run' && e.activityType !== 'speedwork' && e.activityType !== 'rest');
    const isRest = dayEntries.every(e => e.activityType === 'rest');

    if (isRest) return 'bg-red-100';
    if (hasRun) return 'bg-green-100';
    if (hasOther) return 'bg-blue-100';
    return 'bg-gray-100';
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const days = getMonthDays(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const selectedEntries = selectedDate ? getEntriesForDate(entries, selectedDate) : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Running Dashboard</h1>
          <p className="text-gray-600">Track your training progress</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">{totalStats.totalMiles}</div>
            <div className="text-sm text-gray-500">Total Miles</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-3xl font-bold text-green-600">{totalStats.totalRuns}</div>
            <div className="text-sm text-gray-500">Total Runs</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-3xl font-bold text-purple-600">{totalStats.longestRun}</div>
            <div className="text-sm text-gray-500">Longest Run (mi)</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-3xl font-bold text-orange-600">{totalStats.avgPace || '-'}</div>
            <div className="text-sm text-gray-500">Avg Pace</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-3xl font-bold text-red-600">{totalStats.avgHR || '-'}</div>
            <div className="text-sm text-gray-500">Avg HR</div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'calendar'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => setView('stats')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'stats'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Weekly Stats
          </button>
        </div>

        {view === 'calendar' && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-lg font-semibold text-gray-900">{monthName}</span>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }

                  const dayEntries = getEntriesForDay(day);
                  const dateStr = formatDateString(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                  const isSelected = selectedDate === dateStr;
                  const totalMiles = dayEntries.reduce((sum, e) => sum + (e.distance || 0), 0);

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm relative transition-all ${
                        isSelected
                          ? 'ring-2 ring-blue-500 bg-blue-50'
                          : getDayColor(dayEntries) || 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="font-medium text-gray-700">{day}</span>
                      {totalMiles > 0 && (
                        <span className="text-xs text-gray-500">{totalMiles.toFixed(1)}</span>
                      )}
                      {dayEntries.some(e => e.notes) && (
                        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-100 rounded" />
                  <span>Run</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-100 rounded" />
                  <span>Cross-training</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-100 rounded" />
                  <span>Rest/Sick</span>
                </div>
              </div>
            </div>

            {/* Day Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedDate
                  ? new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                    })
                  : 'Select a day'}
              </h3>

              {selectedEntries.length === 0 ? (
                <p className="text-gray-500 text-sm">No activity recorded</p>
              ) : (
                <div className="space-y-4">
                  {selectedEntries.map((entry, idx) => (
                    <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          entry.activityType === 'run' ? 'bg-green-100 text-green-700' :
                          entry.activityType === 'speedwork' ? 'bg-purple-100 text-purple-700' :
                          entry.activityType === 'tennis' ? 'bg-yellow-100 text-yellow-700' :
                          entry.activityType === 'cycling' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {entry.activityType}
                        </span>
                      </div>

                      {entry.distance && (
                        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                          <div>
                            <span className="text-gray-500">Distance:</span>
                            <span className="ml-1 font-medium">{entry.distance} mi</span>
                          </div>
                          {entry.pace && (
                            <div>
                              <span className="text-gray-500">Pace:</span>
                              <span className="ml-1 font-medium">{entry.pace}</span>
                            </div>
                          )}
                          {entry.avgHR && (
                            <div>
                              <span className="text-gray-500">Avg HR:</span>
                              <span className="ml-1 font-medium">{entry.avgHR}</span>
                            </div>
                          )}
                          {entry.maxHR && (
                            <div>
                              <span className="text-gray-500">Max HR:</span>
                              <span className="ml-1 font-medium">{entry.maxHR}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {entry.notes && (
                        <p className="text-sm text-gray-600 italic">{entry.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'stats' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Week</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Miles</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Runs</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Avg Pace</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Avg HR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {weeklyStats.map((week) => (
                  <tr key={week.weekNumber} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Week {week.weekNumber}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(week.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(week.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{week.totalMiles}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-500">{week.runCount}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-500">{week.avgPace || '-'}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-500">{week.avgHR || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
