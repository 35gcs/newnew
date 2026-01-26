'use client';

import { useState, useEffect } from 'react';
import {
  TrainingPlan,
  TrainingDay,
  ScheduledExercise,
  DayOfWeek,
  formatDayOfWeek,
  getCurrentDayOfWeek,
  PlanProgress,
} from '@/types/training-plan';
import {
  calculateProgress,
  markDayComplete,
  isDayCompletedToday,
  getWeekCompletions,
} from '@/lib/plan-storage';

interface WeeklyPlanViewProps {
  plan: TrainingPlan;
  onPlanUpdate: (plan: TrainingPlan) => void;
  onRetest: () => void;
  onViewResults: () => void;
}

function ProgressCard({ progress, retestDate }: { progress: PlanProgress; retestDate: string }) {
  const retestDateFormatted = new Date(retestDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{progress.completedWorkouts}</div>
          <div className="text-sm text-gray-500">Workouts Done</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">{progress.currentStreak}</div>
          <div className="text-sm text-gray-500">Day Streak</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">{progress.completionRate}%</div>
          <div className="text-sm text-gray-500">Completion Rate</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600">{progress.daysUntilRetest}</div>
          <div className="text-sm text-gray-500">Days to Retest</div>
        </div>
      </div>

      {progress.daysUntilRetest <= 7 && progress.daysUntilRetest > 0 && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800">
            <span className="font-medium">Retest coming up!</span> Your 30-day reassessment is on {retestDateFormatted}.
            This will help measure your progress and update your exercise program.
          </p>
        </div>
      )}

      {progress.daysUntilRetest === 0 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <span className="font-medium">Time to retest!</span> It's been 30 days. Take a new assessment to see your improvements!
          </p>
        </div>
      )}
    </div>
  );
}

function DayCard({
  day,
  isToday,
  isCompleted,
  weekCompletion,
  onComplete,
  onViewExercises,
}: {
  day: TrainingDay;
  isToday: boolean;
  isCompleted: boolean;
  weekCompletion: boolean;
  onComplete: () => void;
  onViewExercises: () => void;
}) {
  if (day.isRestDay) {
    return (
      <div className={`p-4 rounded-lg border ${isToday ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-medium ${isToday ? 'text-blue-900' : 'text-gray-700'}`}>
              {formatDayOfWeek(day.dayOfWeek)}
              {isToday && <span className="ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">Today</span>}
            </h3>
            <p className="text-sm text-gray-500">Rest Day</p>
          </div>
          <div className="text-2xl">😴</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg border transition-all ${
      isToday
        ? 'border-blue-400 bg-blue-50 ring-2 ring-blue-400'
        : weekCompletion
        ? 'border-green-300 bg-green-50'
        : 'border-gray-200 bg-white hover:border-gray-300'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className={`font-semibold ${isToday ? 'text-blue-900' : weekCompletion ? 'text-green-900' : 'text-gray-900'}`}>
            {formatDayOfWeek(day.dayOfWeek)}
            {isToday && <span className="ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">Today</span>}
          </h3>
          <p className="text-sm text-gray-500">{day.exercises.length} exercises</p>
        </div>
        {weekCompletion && (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      <div className="space-y-1 mb-3">
        {day.exercises.slice(0, 3).map((ex) => (
          <div key={ex.exerciseId} className="text-sm text-gray-600 truncate">
            • {ex.exercise.name}
          </div>
        ))}
        {day.exercises.length > 3 && (
          <div className="text-sm text-gray-400">+{day.exercises.length - 3} more</div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={onViewExercises}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          View Exercises
        </button>
        {isToday && !isCompleted && (
          <button
            onClick={onComplete}
            className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
}

function ExerciseModal({
  day,
  isCompleted,
  onClose,
  onComplete,
}: {
  day: TrainingDay;
  isCompleted: boolean;
  onClose: () => void;
  onComplete: () => void;
}) {
  const [checkedExercises, setCheckedExercises] = useState<Set<string>>(new Set());

  const toggleExercise = (id: string) => {
    setCheckedExercises(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const allChecked = checkedExercises.size === day.exercises.length;
  const isToday = getCurrentDayOfWeek() === day.dayOfWeek;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{formatDayOfWeek(day.dayOfWeek)}'s Workout</h2>
            <p className="text-sm text-gray-500">{day.exercises.length} exercises</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {day.exercises.map((scheduled) => (
              <div
                key={scheduled.exerciseId}
                className={`p-4 rounded-lg border transition-all ${
                  checkedExercises.has(scheduled.exerciseId)
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isToday && !isCompleted && (
                    <button
                      onClick={() => toggleExercise(scheduled.exerciseId)}
                      className={`w-6 h-6 rounded border-2 flex-shrink-0 flex items-center justify-center mt-0.5 ${
                        checkedExercises.has(scheduled.exerciseId)
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {checkedExercises.has(scheduled.exerciseId) && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  )}
                  {isCompleted && (
                    <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{scheduled.exercise.name}</h4>
                    <div className="flex gap-4 text-sm text-gray-600 mt-1">
                      <span>{scheduled.sets} sets</span>
                      <span>{scheduled.reps}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{scheduled.exercise.description}</p>
                    <details className="mt-2">
                      <summary className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">
                        View instructions
                      </summary>
                      <ol className="mt-2 list-decimal list-inside text-sm text-gray-600 space-y-1">
                        {scheduled.exercise.instructions.map((instruction, idx) => (
                          <li key={idx}>{instruction}</li>
                        ))}
                      </ol>
                    </details>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isToday && !isCompleted && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onComplete}
              disabled={!allChecked}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                allChecked
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {allChecked ? 'Complete Workout' : `Check all exercises (${checkedExercises.size}/${day.exercises.length})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function WeeklyPlanView({ plan, onPlanUpdate, onRetest, onViewResults }: WeeklyPlanViewProps) {
  const [selectedDay, setSelectedDay] = useState<TrainingDay | null>(null);
  const [progress, setProgress] = useState<PlanProgress | null>(null);
  const [weekCompletions, setWeekCompletions] = useState<Map<DayOfWeek, boolean>>(new Map());
  const [currentDay, setCurrentDay] = useState<DayOfWeek | null>(null);

  useEffect(() => {
    setCurrentDay(getCurrentDayOfWeek());
    setProgress(calculateProgress(plan));
    setWeekCompletions(getWeekCompletions(plan));
  }, [plan]);

  const handleComplete = (day: TrainingDay) => {
    const exerciseIds = day.exercises.map(e => e.exerciseId);
    const updatedPlan = markDayComplete(plan, day.dayOfWeek, exerciseIds);
    onPlanUpdate(updatedPlan);
    setSelectedDay(null);
  };

  const isCompletedToday = (dayOfWeek: DayOfWeek) => isDayCompletedToday(plan, dayOfWeek);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Training Plan</h1>
          <p className="text-gray-600">{plan.trainingDaysPerWeek} days per week</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onViewResults}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
          >
            View Assessment
          </button>
          {progress && progress.daysUntilRetest === 0 && (
            <button
              onClick={onRetest}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Take Retest
            </button>
          )}
        </div>
      </div>

      {/* Progress Card */}
      {progress && <ProgressCard progress={progress} retestDate={plan.retestDate} />}

      {/* Week View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">This Week</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {plan.weeklySchedule.days.map((day) => (
            <DayCard
              key={day.dayOfWeek}
              day={day}
              isToday={day.dayOfWeek === currentDay}
              isCompleted={isCompletedToday(day.dayOfWeek)}
              weekCompletion={weekCompletions.get(day.dayOfWeek) || false}
              onComplete={() => handleComplete(day)}
              onViewExercises={() => setSelectedDay(day)}
            />
          ))}
        </div>
      </div>

      {/* Exercise Modal */}
      {selectedDay && (
        <ExerciseModal
          day={selectedDay}
          isCompleted={weekCompletions.get(selectedDay.dayOfWeek) || false}
          onClose={() => setSelectedDay(null)}
          onComplete={() => handleComplete(selectedDay)}
        />
      )}
    </div>
  );
}
