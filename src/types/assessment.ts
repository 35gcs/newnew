// Movement Screen Types

export type ScoreLevel = 1 | 2 | 3; // 1 = Poor, 2 = Moderate, 3 = Good

export interface CompensationPattern {
  id: string;
  name: string;
  description: string;
  indicatesIssueWith: string[];
}

export interface MovementScreen {
  id: string;
  name: string;
  category: 'mobility' | 'stability' | 'movement_pattern';
  description: string;
  purpose: string;
  instructions: string[];
  scoringCriteria: {
    score1: string;
    score2: string;
    score3: string;
  };
  compensationPatterns: CompensationPattern[];
  affectedBodyRegions: BodyRegion[];
  videoUrl?: string;
  imageUrl?: string;
}

export type BodyRegion =
  | 'ankle'
  | 'knee'
  | 'hip'
  | 'lumbar_spine'
  | 'thoracic_spine'
  | 'cervical_spine'
  | 'shoulder'
  | 'elbow'
  | 'wrist'
  | 'core';

export type MovementDysfunction =
  | 'ankle_dorsiflexion_deficit'
  | 'hip_flexion_deficit'
  | 'hip_extension_deficit'
  | 'hip_internal_rotation_deficit'
  | 'hip_external_rotation_deficit'
  | 'thoracic_extension_deficit'
  | 'thoracic_rotation_deficit'
  | 'shoulder_flexion_deficit'
  | 'shoulder_external_rotation_deficit'
  | 'shoulder_internal_rotation_deficit'
  | 'core_stability_deficit'
  | 'single_leg_stability_deficit'
  | 'hip_hinge_pattern_dysfunction'
  | 'squat_pattern_dysfunction';

export interface ScreenResult {
  screenId: string;
  score: ScoreLevel;
  side?: 'left' | 'right' | 'bilateral';
  compensationsObserved: string[];
  painReported: boolean;
  notes?: string;
}

export interface AssessmentSession {
  id: string;
  userId?: string;
  date: string;
  results: ScreenResult[];
  identifiedDysfunctions: MovementDysfunction[];
  recommendedExercises: string[];
  overallScore: number;
}

// Exercise Types

export type ExerciseCategory =
  | 'mobility'
  | 'stability'
  | 'activation'
  | 'strengthening'
  | 'stretching'
  | 'motor_control';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  difficulty: DifficultyLevel;
  targetRegions: BodyRegion[];
  targetsDysfunctions: MovementDysfunction[];
  description: string;
  instructions: string[];
  sets: string;
  reps: string;
  holdTime?: string;
  frequency: string;
  contraindications: string[];
  progressions: string[];
  regressions: string[];
  videoUrl?: string;
  imageUrl?: string;
}

export interface ExerciseProgram {
  id: string;
  name: string;
  description: string;
  exercises: {
    exerciseId: string;
    order: number;
    customSets?: string;
    customReps?: string;
  }[];
  frequency: string;
  duration: string;
  targetDysfunctions: MovementDysfunction[];
}
