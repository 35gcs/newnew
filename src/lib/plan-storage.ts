'use client';

import {
  TrainingPlan,
  DayCompletion,
  PlanProgress,
  calculateDaysUntilRetest,
  getTodayString,
  DayOfWeek,
} from '@/types/training-plan';

const STORAGE_KEY = 'movementrx_training_plan';

export function savePlan(plan: TrainingPlan): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
}

export function loadPlan(): TrainingPlan | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as TrainingPlan;
  } catch {
    return null;
  }
}

export function clearPlan(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function markDayComplete(
  plan: TrainingPlan,
  dayOfWeek: DayOfWeek,
  exerciseIds: string[]
): TrainingPlan {
  const today = getTodayString();

  // Check if already completed today
  const existingIndex = plan.completionHistory.findIndex(
    c => c.date === today && c.dayOfWeek === dayOfWeek
  );

  const completion: DayCompletion = {
    date: today,
    dayOfWeek,
    completed: true,
    exercisesCompleted: exerciseIds,
  };

  let updatedHistory: DayCompletion[];
  if (existingIndex >= 0) {
    updatedHistory = [...plan.completionHistory];
    updatedHistory[existingIndex] = completion;
  } else {
    updatedHistory = [...plan.completionHistory, completion];
  }

  const updatedPlan = {
    ...plan,
    completionHistory: updatedHistory,
  };

  savePlan(updatedPlan);
  return updatedPlan;
}

export function unmarkDayComplete(
  plan: TrainingPlan,
  date: string,
  dayOfWeek: DayOfWeek
): TrainingPlan {
  const updatedHistory = plan.completionHistory.filter(
    c => !(c.date === date && c.dayOfWeek === dayOfWeek)
  );

  const updatedPlan = {
    ...plan,
    completionHistory: updatedHistory,
  };

  savePlan(updatedPlan);
  return updatedPlan;
}

export function isDayCompletedToday(plan: TrainingPlan, dayOfWeek: DayOfWeek): boolean {
  const today = getTodayString();
  return plan.completionHistory.some(
    c => c.date === today && c.dayOfWeek === dayOfWeek && c.completed
  );
}

export function calculateProgress(plan: TrainingPlan): PlanProgress {
  const today = new Date();
  const assessmentDate = new Date(plan.assessmentDate);

  // Calculate total possible workouts since plan started
  const daysSinceStart = Math.floor(
    (today.getTime() - assessmentDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const weeksSinceStart = Math.max(1, Math.ceil(daysSinceStart / 7));
  const totalWorkouts = weeksSinceStart * plan.trainingDaysPerWeek;

  // Count completed workouts
  const completedWorkouts = plan.completionHistory.filter(c => c.completed).length;

  // Calculate streak
  const { currentStreak, longestStreak } = calculateStreaks(plan);

  // Days until retest
  const daysUntilRetest = calculateDaysUntilRetest(plan.retestDate);

  // Completion rate
  const completionRate = totalWorkouts > 0
    ? Math.round((completedWorkouts / totalWorkouts) * 100)
    : 0;

  return {
    totalWorkouts,
    completedWorkouts,
    currentStreak,
    longestStreak,
    daysUntilRetest,
    completionRate,
  };
}

function calculateStreaks(plan: TrainingPlan): { currentStreak: number; longestStreak: number } {
  if (plan.completionHistory.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Sort completions by date
  const sortedCompletions = [...plan.completionHistory]
    .filter(c => c.completed)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (sortedCompletions.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Get unique dates
  const uniqueDates = [...new Set(sortedCompletions.map(c => c.date))].sort();

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  const today = getTodayString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  // Calculate longest streak
  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = new Date(uniqueDates[i - 1]);
    const currDate = new Date(uniqueDates[i]);
    const diffDays = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  // Calculate current streak (must include today or yesterday)
  const lastCompletionDate = uniqueDates[uniqueDates.length - 1];
  if (lastCompletionDate === today || lastCompletionDate === yesterdayStr) {
    currentStreak = 1;
    for (let i = uniqueDates.length - 2; i >= 0; i--) {
      const currDate = new Date(uniqueDates[i + 1]);
      const prevDate = new Date(uniqueDates[i]);
      const diffDays = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  return { currentStreak, longestStreak };
}

export function getWeekCompletions(plan: TrainingPlan): Map<DayOfWeek, boolean> {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday

  // Get start of current week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);

  const completions = new Map<DayOfWeek, boolean>();
  const dayMap: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  // Initialize all days as incomplete
  dayMap.forEach(d => completions.set(d, false));

  // Check completions for this week
  for (const completion of plan.completionHistory) {
    if (completion.completed) {
      const completionDate = new Date(completion.date);
      if (completionDate >= startOfWeek && completionDate <= today) {
        completions.set(completion.dayOfWeek, true);
      }
    }
  }

  return completions;
}
