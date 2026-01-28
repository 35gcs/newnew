'use client';

import { useState } from 'react';
import { TrainingPlan, DayCompletion, DAYS_OF_WEEK, DayOfWeek } from '@/types/training-plan';

interface CalendarProps {
  plan: TrainingPlan;
  onSelectDate: (date: string, completion?: DayCompletion) => void;
}

export function Calendar({ plan, onSelectDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getCompletionForDate = (day: number): DayCompletion | undefined => {
    const dateStr = formatDateString(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return plan.completionHistory.find(c => c.date === dateStr);
  };

  const formatDateString = (year: number, month: number, day: number): string => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isToday = (day: number): boolean => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isPastDate = (day: number): boolean => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isAfterPlanStart = (day: number): boolean => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const planStart = new Date(plan.assessmentDate);
    planStart.setHours(0, 0, 0, 0);
    return date >= planStart;
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const days = getMonthDays(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Count completions for current month
  const monthCompletions = plan.completionHistory.filter(c => {
    const date = new Date(c.date);
    return date.getMonth() === currentMonth.getMonth() &&
           date.getFullYear() === currentMonth.getFullYear() &&
           c.completed;
  }).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Calendar</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm font-medium text-gray-900 min-w-[140px] text-center">
            {monthName}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Month stats */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">{monthCompletions}</span> workouts completed this month
        </p>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const completion = getCompletionForDate(day);
          const today = isToday(day);
          const past = isPastDate(day);
          const afterStart = isAfterPlanStart(day);
          const hasNotes = completion?.notes && completion.notes.length > 0;

          return (
            <button
              key={day}
              onClick={() => {
                const dateStr = formatDateString(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                onSelectDate(dateStr, completion);
              }}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm relative transition-all ${
                today
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : completion?.completed
                  ? 'bg-green-100 hover:bg-green-200'
                  : past && afterStart
                  ? 'bg-gray-100 hover:bg-gray-200'
                  : 'hover:bg-gray-100'
              }`}
            >
              <span className={`${
                today
                  ? 'font-bold text-blue-600'
                  : completion?.completed
                  ? 'font-medium text-green-700'
                  : 'text-gray-700'
              }`}>
                {day}
              </span>
              {completion?.completed && (
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-0.5" />
              )}
              {hasNotes && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-100 rounded border border-green-200" />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-yellow-400 rounded-full" />
          <span>Has notes</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-50 rounded ring-1 ring-blue-500" />
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
