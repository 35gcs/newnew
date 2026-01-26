import { Exercise } from '@/types/assessment';
import {
  TrainingPlan,
  WeeklySchedule,
  TrainingDay,
  ScheduledExercise,
  DayOfWeek,
  DAYS_OF_WEEK,
  getRetestDate,
  getTodayString,
} from '@/types/training-plan';
import { RecommendationResult } from './recommendation-engine';

// Optimal training day distributions based on days per week
const TRAINING_DAY_PATTERNS: Record<number, DayOfWeek[]> = {
  2: ['monday', 'thursday'],
  3: ['monday', 'wednesday', 'friday'],
  4: ['monday', 'tuesday', 'thursday', 'friday'],
  5: ['monday', 'tuesday', 'wednesday', 'friday', 'saturday'],
  6: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  7: DAYS_OF_WEEK,
};

interface ExerciseWithPriority {
  exercise: Exercise;
  priority: 'essential' | 'recommended' | 'beneficial';
  frequency: number; // times per week
}

function parseExerciseFrequency(exercise: Exercise): number {
  const freq = exercise.frequency.toLowerCase();
  if (freq.includes('daily')) return 7;
  if (freq.includes('5') || freq.includes('4-5')) return 5;
  if (freq.includes('4')) return 4;
  if (freq.includes('3-4') || freq.includes('3')) return 3;
  if (freq.includes('2-3') || freq.includes('2')) return 2;
  return 3; // default
}

function distributeExercises(
  exercises: ExerciseWithPriority[],
  trainingDays: DayOfWeek[]
): Map<DayOfWeek, ScheduledExercise[]> {
  const schedule = new Map<DayOfWeek, ScheduledExercise[]>();

  // Initialize all training days
  trainingDays.forEach(day => schedule.set(day, []));

  // Sort exercises: essential first, then by frequency (higher first)
  const sortedExercises = [...exercises].sort((a, b) => {
    const priorityOrder = { essential: 0, recommended: 1, beneficial: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return b.frequency - a.frequency;
  });

  // Distribute exercises across days
  for (const { exercise, priority, frequency } of sortedExercises) {
    // Determine which days this exercise should be on
    const daysNeeded = Math.min(frequency, trainingDays.length);

    // Find days with fewest exercises (load balancing)
    const daysByLoad = [...trainingDays].sort((a, b) => {
      const loadA = schedule.get(a)?.length || 0;
      const loadB = schedule.get(b)?.length || 0;
      return loadA - loadB;
    });

    // Spread exercises evenly across the week
    const selectedDays: DayOfWeek[] = [];
    const step = Math.max(1, Math.floor(trainingDays.length / daysNeeded));

    for (let i = 0; i < daysNeeded; i++) {
      const dayIndex = (i * step) % daysByLoad.length;
      const day = daysByLoad[dayIndex];
      if (!selectedDays.includes(day)) {
        selectedDays.push(day);
      } else {
        // Find next available day
        for (const d of daysByLoad) {
          if (!selectedDays.includes(d)) {
            selectedDays.push(d);
            break;
          }
        }
      }
    }

    // Add exercise to selected days
    const scheduledExercise: Omit<ScheduledExercise, 'order'> = {
      exerciseId: exercise.id,
      exercise,
      sets: parseInt(exercise.sets.split('-')[0]) || 3,
      reps: exercise.reps,
    };

    for (const day of selectedDays.slice(0, daysNeeded)) {
      const dayExercises = schedule.get(day) || [];
      dayExercises.push({
        ...scheduledExercise,
        order: dayExercises.length + 1,
      });
      schedule.set(day, dayExercises);
    }
  }

  // Re-order exercises within each day by category for logical flow
  const categoryOrder = ['mobility', 'activation', 'stability', 'motor_control', 'strengthening', 'stretching'];

  for (const [day, dayExercises] of schedule) {
    const sorted = [...dayExercises].sort((a, b) => {
      const orderA = categoryOrder.indexOf(a.exercise.category);
      const orderB = categoryOrder.indexOf(b.exercise.category);
      return orderA - orderB;
    });

    // Update order numbers
    sorted.forEach((ex, idx) => {
      ex.order = idx + 1;
    });

    schedule.set(day, sorted);
  }

  return schedule;
}

export function generateWeeklySchedule(
  analysis: RecommendationResult,
  trainingDaysPerWeek: number
): WeeklySchedule {
  const trainingDays = TRAINING_DAY_PATTERNS[trainingDaysPerWeek] || TRAINING_DAY_PATTERNS[3];

  // Prepare exercises with priorities and frequencies
  const exercisesWithPriority: ExerciseWithPriority[] = analysis.exercises.map(({ exercise, priority }) => ({
    exercise,
    priority,
    frequency: parseExerciseFrequency(exercise),
  }));

  // Distribute exercises across training days
  const exerciseDistribution = distributeExercises(exercisesWithPriority, trainingDays);

  // Build the weekly schedule
  const days: TrainingDay[] = DAYS_OF_WEEK.map(dayOfWeek => {
    const isTrainingDay = trainingDays.includes(dayOfWeek);
    return {
      dayOfWeek,
      exercises: exerciseDistribution.get(dayOfWeek) || [],
      isRestDay: !isTrainingDay,
    };
  });

  return {
    days,
    trainingDaysPerWeek,
  };
}

export function createTrainingPlan(
  analysis: RecommendationResult,
  trainingDaysPerWeek: number
): TrainingPlan {
  const today = getTodayString();
  const weeklySchedule = generateWeeklySchedule(analysis, trainingDaysPerWeek);

  return {
    id: `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    assessmentDate: today,
    retestDate: getRetestDate(today),
    trainingDaysPerWeek,
    weeklySchedule,
    completionHistory: [],
    exerciseIds: analysis.exercises.map(e => e.exercise.id),
  };
}

export function getTrainingDayOptions(): { value: number; label: string }[] {
  return [
    { value: 2, label: '2 days per week' },
    { value: 3, label: '3 days per week' },
    { value: 4, label: '4 days per week' },
    { value: 5, label: '5 days per week' },
    { value: 6, label: '6 days per week' },
    { value: 7, label: 'Every day' },
  ];
}
