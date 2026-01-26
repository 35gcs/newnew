import {
  ScreenResult,
  MovementDysfunction,
  Exercise,
  AssessmentSession,
  BodyRegion,
} from '@/types/assessment';
import { movementScreens, getScreenById } from './movement-screens';
import { exercises, getExercisesByDysfunction } from './exercises';

// Mapping from screen IDs and compensations to dysfunctions
const compensationToDysfunction: Record<string, MovementDysfunction[]> = {
  // Overhead Squat compensations
  'heel-rise': ['ankle_dorsiflexion_deficit'],
  'forward-lean': ['ankle_dorsiflexion_deficit', 'hip_flexion_deficit', 'thoracic_extension_deficit'],
  'arms-fall-forward': ['shoulder_flexion_deficit', 'thoracic_extension_deficit'],
  'knee-valgus': ['hip_external_rotation_deficit', 'core_stability_deficit'],
  'lumbar-flexion': ['hip_flexion_deficit', 'core_stability_deficit'],

  // Single Leg Balance compensations
  'hip-drop': ['single_leg_stability_deficit'],
  'trunk-lean': ['single_leg_stability_deficit', 'core_stability_deficit'],
  'ankle-wobble': ['single_leg_stability_deficit'],

  // Hip Hinge compensations
  'lumbar-rounding': ['hip_flexion_deficit', 'hip_hinge_pattern_dysfunction'],
  'knee-dominant': ['hip_hinge_pattern_dysfunction'],
  'weight-forward': ['hip_hinge_pattern_dysfunction'],

  // Shoulder Mobility compensations
  'spine-extension': ['shoulder_flexion_deficit'],
  'shoulder-hike': ['shoulder_flexion_deficit'],

  // Thoracic Rotation compensations
  'hip-rotation': ['thoracic_rotation_deficit'],
  'lumbar-rotation': ['thoracic_rotation_deficit'],

  // Ankle Dorsiflexion compensations
  'heel-rise-df': ['ankle_dorsiflexion_deficit'],
  'foot-pronation': ['ankle_dorsiflexion_deficit'],

  // Hip 90/90 compensations
  'sit-bone-lift': ['hip_internal_rotation_deficit', 'hip_external_rotation_deficit'],

  // Active Straight Leg Raise compensations
  'down-leg-lift': ['core_stability_deficit', 'hip_extension_deficit'],
  'knee-bend': ['hip_flexion_deficit'],
};

// Screen score to dysfunction mapping
const screenScoreToDysfunction: Record<string, Record<number, MovementDysfunction[]>> = {
  'overhead-squat': {
    1: ['squat_pattern_dysfunction', 'ankle_dorsiflexion_deficit', 'hip_flexion_deficit', 'thoracic_extension_deficit'],
    2: ['squat_pattern_dysfunction'],
  },
  'single-leg-balance': {
    1: ['single_leg_stability_deficit', 'core_stability_deficit'],
    2: ['single_leg_stability_deficit'],
  },
  'hip-hinge': {
    1: ['hip_hinge_pattern_dysfunction', 'hip_flexion_deficit'],
    2: ['hip_hinge_pattern_dysfunction'],
  },
  'shoulder-mobility': {
    1: ['shoulder_flexion_deficit', 'shoulder_internal_rotation_deficit', 'shoulder_external_rotation_deficit'],
    2: ['shoulder_internal_rotation_deficit', 'shoulder_external_rotation_deficit'],
  },
  'thoracic-rotation': {
    1: ['thoracic_rotation_deficit'],
    2: ['thoracic_rotation_deficit'],
  },
  'ankle-dorsiflexion': {
    1: ['ankle_dorsiflexion_deficit'],
    2: ['ankle_dorsiflexion_deficit'],
  },
  'hip-90-90': {
    1: ['hip_internal_rotation_deficit', 'hip_external_rotation_deficit'],
    2: ['hip_internal_rotation_deficit'],
  },
  'active-straight-leg-raise': {
    1: ['hip_flexion_deficit', 'core_stability_deficit'],
    2: ['hip_flexion_deficit'],
  },
};

// Priority ranking for dysfunctions (lower = higher priority)
const dysfunctionPriority: Record<MovementDysfunction, number> = {
  'core_stability_deficit': 1,
  'hip_hinge_pattern_dysfunction': 2,
  'squat_pattern_dysfunction': 2,
  'single_leg_stability_deficit': 3,
  'ankle_dorsiflexion_deficit': 4,
  'hip_flexion_deficit': 4,
  'hip_extension_deficit': 4,
  'thoracic_extension_deficit': 5,
  'thoracic_rotation_deficit': 5,
  'hip_internal_rotation_deficit': 6,
  'hip_external_rotation_deficit': 6,
  'shoulder_flexion_deficit': 7,
  'shoulder_internal_rotation_deficit': 7,
  'shoulder_external_rotation_deficit': 7,
};

export interface RecommendationResult {
  dysfunctions: {
    dysfunction: MovementDysfunction;
    severity: 'high' | 'moderate' | 'low';
    sourceScreens: string[];
  }[];
  exercises: {
    exercise: Exercise;
    priority: 'essential' | 'recommended' | 'beneficial';
    targetsDysfunctions: MovementDysfunction[];
  }[];
  overallScore: number;
  riskAreas: BodyRegion[];
  summary: string;
}

export function analyzeAssessment(results: ScreenResult[]): RecommendationResult {
  // Step 1: Identify all dysfunctions from scores and compensations
  const dysfunctionMap = new Map<MovementDysfunction, { count: number; sourceScreens: Set<string> }>();

  for (const result of results) {
    const screen = getScreenById(result.screenId);
    if (!screen) continue;

    // Add dysfunctions based on score
    const scoreDysfunctions = screenScoreToDysfunction[result.screenId]?.[result.score] || [];
    for (const dysfunction of scoreDysfunctions) {
      const existing = dysfunctionMap.get(dysfunction) || { count: 0, sourceScreens: new Set() };
      existing.count++;
      existing.sourceScreens.add(screen.name);
      dysfunctionMap.set(dysfunction, existing);
    }

    // Add dysfunctions based on observed compensations
    for (const compensation of result.compensationsObserved) {
      const compensationDysfunctions = compensationToDysfunction[compensation] || [];
      for (const dysfunction of compensationDysfunctions) {
        const existing = dysfunctionMap.get(dysfunction) || { count: 0, sourceScreens: new Set() };
        existing.count++;
        existing.sourceScreens.add(screen.name);
        dysfunctionMap.set(dysfunction, existing);
      }
    }
  }

  // Step 2: Rank dysfunctions by severity
  const rankedDysfunctions: RecommendationResult['dysfunctions'] = [];
  for (const [dysfunction, data] of dysfunctionMap.entries()) {
    let severity: 'high' | 'moderate' | 'low';
    if (data.count >= 3) {
      severity = 'high';
    } else if (data.count >= 2) {
      severity = 'moderate';
    } else {
      severity = 'low';
    }

    rankedDysfunctions.push({
      dysfunction,
      severity,
      sourceScreens: Array.from(data.sourceScreens),
    });
  }

  // Sort by priority (built-in priority ranking)
  rankedDysfunctions.sort((a, b) => {
    // First by severity
    const severityOrder = { high: 0, moderate: 1, low: 2 };
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    // Then by dysfunction priority
    return dysfunctionPriority[a.dysfunction] - dysfunctionPriority[b.dysfunction];
  });

  // Step 3: Get recommended exercises
  const exerciseMap = new Map<string, {
    exercise: Exercise;
    targetsDysfunctions: Set<MovementDysfunction>;
    priorityScore: number;
  }>();

  for (const { dysfunction, severity } of rankedDysfunctions) {
    const matchingExercises = getExercisesByDysfunction(dysfunction);
    const priorityMultiplier = severity === 'high' ? 3 : severity === 'moderate' ? 2 : 1;

    for (const exercise of matchingExercises) {
      const existing = exerciseMap.get(exercise.id) || {
        exercise,
        targetsDysfunctions: new Set(),
        priorityScore: 0,
      };
      existing.targetsDysfunctions.add(dysfunction);
      existing.priorityScore += priorityMultiplier;
      exerciseMap.set(exercise.id, existing);
    }
  }

  // Convert to array and rank
  const rankedExercises: RecommendationResult['exercises'] = [];
  for (const [, data] of exerciseMap.entries()) {
    let priority: 'essential' | 'recommended' | 'beneficial';
    if (data.priorityScore >= 6) {
      priority = 'essential';
    } else if (data.priorityScore >= 3) {
      priority = 'recommended';
    } else {
      priority = 'beneficial';
    }

    rankedExercises.push({
      exercise: data.exercise,
      priority,
      targetsDysfunctions: Array.from(data.targetsDysfunctions),
    });
  }

  // Sort exercises: essential first, then by number of dysfunctions targeted, then by difficulty
  const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
  rankedExercises.sort((a, b) => {
    const priorityOrder = { essential: 0, recommended: 1, beneficial: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (a.targetsDysfunctions.length !== b.targetsDysfunctions.length) {
      return b.targetsDysfunctions.length - a.targetsDysfunctions.length;
    }
    return difficultyOrder[a.exercise.difficulty] - difficultyOrder[b.exercise.difficulty];
  });

  // Step 4: Calculate overall score
  let totalPossibleScore = results.length * 3;
  let actualScore = results.reduce((sum, r) => sum + r.score, 0);
  const overallScore = Math.round((actualScore / totalPossibleScore) * 100);

  // Step 5: Identify risk areas
  const riskAreas = new Set<BodyRegion>();
  for (const result of results) {
    if (result.score <= 2) {
      const screen = getScreenById(result.screenId);
      if (screen) {
        for (const region of screen.affectedBodyRegions) {
          riskAreas.add(region);
        }
      }
    }
  }

  // Step 6: Generate summary
  const summary = generateSummary(rankedDysfunctions, overallScore, Array.from(riskAreas));

  return {
    dysfunctions: rankedDysfunctions,
    exercises: rankedExercises.slice(0, 12), // Limit to 12 exercises
    overallScore,
    riskAreas: Array.from(riskAreas),
    summary,
  };
}

function generateSummary(
  dysfunctions: RecommendationResult['dysfunctions'],
  score: number,
  riskAreas: BodyRegion[]
): string {
  const highPriority = dysfunctions.filter(d => d.severity === 'high');
  const moderatePriority = dysfunctions.filter(d => d.severity === 'moderate');

  let summary = '';

  if (score >= 80) {
    summary = 'Your movement quality is excellent! ';
  } else if (score >= 60) {
    summary = 'Your movement quality is good with some areas for improvement. ';
  } else if (score >= 40) {
    summary = 'Your movement assessment reveals several areas that need attention. ';
  } else {
    summary = 'Your assessment indicates significant movement restrictions that should be addressed. ';
  }

  if (highPriority.length > 0) {
    const issues = highPriority.slice(0, 3).map(d =>
      formatDysfunctionName(d.dysfunction)
    ).join(', ');
    summary += `Priority areas to address: ${issues}. `;
  }

  if (riskAreas.length > 0) {
    const areas = riskAreas.slice(0, 3).map(formatRegionName).join(', ');
    summary += `Focus your corrective exercises on the ${areas}. `;
  }

  summary += 'Follow the personalized exercise program below consistently for best results.';

  return summary;
}

function formatDysfunctionName(dysfunction: MovementDysfunction): string {
  const names: Record<MovementDysfunction, string> = {
    'ankle_dorsiflexion_deficit': 'ankle mobility',
    'hip_flexion_deficit': 'hip flexibility',
    'hip_extension_deficit': 'hip extension',
    'hip_internal_rotation_deficit': 'hip internal rotation',
    'hip_external_rotation_deficit': 'hip external rotation',
    'thoracic_extension_deficit': 'upper back extension',
    'thoracic_rotation_deficit': 'upper back rotation',
    'shoulder_flexion_deficit': 'shoulder mobility',
    'shoulder_external_rotation_deficit': 'shoulder external rotation',
    'shoulder_internal_rotation_deficit': 'shoulder internal rotation',
    'core_stability_deficit': 'core stability',
    'single_leg_stability_deficit': 'single leg balance',
    'hip_hinge_pattern_dysfunction': 'hip hinge pattern',
    'squat_pattern_dysfunction': 'squat pattern',
  };
  return names[dysfunction] || dysfunction.replace(/_/g, ' ');
}

function formatRegionName(region: BodyRegion): string {
  const names: Record<BodyRegion, string> = {
    'ankle': 'ankles',
    'knee': 'knees',
    'hip': 'hips',
    'lumbar_spine': 'lower back',
    'thoracic_spine': 'upper back',
    'cervical_spine': 'neck',
    'shoulder': 'shoulders',
    'elbow': 'elbows',
    'wrist': 'wrists',
    'core': 'core',
  };
  return names[region] || region;
}

export function createAssessmentSession(results: ScreenResult[]): AssessmentSession {
  const analysis = analyzeAssessment(results);

  return {
    id: generateId(),
    date: new Date().toISOString(),
    results,
    identifiedDysfunctions: analysis.dysfunctions.map(d => d.dysfunction),
    recommendedExercises: analysis.exercises.map(e => e.exercise.id),
    overallScore: analysis.overallScore,
  };
}

function generateId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
