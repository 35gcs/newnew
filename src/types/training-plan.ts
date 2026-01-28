import { Exercise } from './assessment';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];

export interface ScheduledExercise {
  exerciseId: string;
  exercise: Exercise;
  sets: number;
  reps: string;
  order: number;
}

export interface TrainingDay {
  dayOfWeek: DayOfWeek;
  exercises: ScheduledExercise[];
  isRestDay: boolean;
}

export interface WeeklySchedule {
  days: TrainingDay[];
  trainingDaysPerWeek: number;
}

export interface DayCompletion {
  date: string; // ISO date string YYYY-MM-DD
  dayOfWeek: DayOfWeek;
  completed: boolean;
  exercisesCompleted: string[]; // exercise IDs
  notes?: string; // user notes for this session
}

export interface TrainingPlan {
  id: string;
  createdAt: string;
  assessmentDate: string;
  retestDate: string; // 30 days from assessment
  trainingDaysPerWeek: number;
  weeklySchedule: WeeklySchedule;
  completionHistory: DayCompletion[];
  exerciseIds: string[];
}

export interface PlanProgress {
  totalWorkouts: number;
  completedWorkouts: number;
  currentStreak: number;
  longestStreak: number;
  daysUntilRetest: number;
  completionRate: number;
}

export function calculateDaysUntilRetest(retestDate: string): number {
  const retest = new Date(retestDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  retest.setHours(0, 0, 0, 0);
  const diffTime = retest.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

export function getRetestDate(assessmentDate: string): string {
  const date = new Date(assessmentDate);
  date.setDate(date.getDate() + 30);
  return date.toISOString().split('T')[0];
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function getCurrentDayOfWeek(): DayOfWeek {
  const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
}

export function formatDayOfWeek(day: DayOfWeek): string {
  return day.charAt(0).toUpperCase() + day.slice(1);
}
