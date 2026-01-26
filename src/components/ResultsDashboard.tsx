'use client';

import { useState } from 'react';
import { RecommendationResult } from '@/lib/recommendation-engine';
import { Exercise, MovementDysfunction, BodyRegion } from '@/types/assessment';

interface ResultsDashboardProps {
  analysis: RecommendationResult;
  onReset: () => void;
}

const dysfunctionLabels: Record<MovementDysfunction, string> = {
  'ankle_dorsiflexion_deficit': 'Ankle Dorsiflexion',
  'hip_flexion_deficit': 'Hip Flexion',
  'hip_extension_deficit': 'Hip Extension',
  'hip_internal_rotation_deficit': 'Hip Internal Rotation',
  'hip_external_rotation_deficit': 'Hip External Rotation',
  'thoracic_extension_deficit': 'Thoracic Extension',
  'thoracic_rotation_deficit': 'Thoracic Rotation',
  'shoulder_flexion_deficit': 'Shoulder Flexion',
  'shoulder_external_rotation_deficit': 'Shoulder External Rotation',
  'shoulder_internal_rotation_deficit': 'Shoulder Internal Rotation',
  'core_stability_deficit': 'Core Stability',
  'single_leg_stability_deficit': 'Single Leg Stability',
  'hip_hinge_pattern_dysfunction': 'Hip Hinge Pattern',
  'squat_pattern_dysfunction': 'Squat Pattern',
};

const regionLabels: Record<BodyRegion, string> = {
  'ankle': 'Ankles',
  'knee': 'Knees',
  'hip': 'Hips',
  'lumbar_spine': 'Lower Back',
  'thoracic_spine': 'Upper Back',
  'cervical_spine': 'Neck',
  'shoulder': 'Shoulders',
  'elbow': 'Elbows',
  'wrist': 'Wrists',
  'core': 'Core',
};

function ExerciseCard({
  exercise,
  priority,
  expanded,
  onToggle
}: {
  exercise: Exercise;
  priority: 'essential' | 'recommended' | 'beneficial';
  expanded: boolean;
  onToggle: () => void;
}) {
  const priorityColors = {
    essential: 'bg-red-100 text-red-800 border-red-200',
    recommended: 'bg-blue-100 text-blue-800 border-blue-200',
    beneficial: 'bg-green-100 text-green-800 border-green-200',
  };

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-gray-900">{exercise.name}</h4>
              <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${difficultyColors[exercise.difficulty]}`}>
                {exercise.difficulty}
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{exercise.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`text-xs px-2 py-1 rounded border capitalize ${priorityColors[priority]}`}>
              {priority}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="pt-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900">{exercise.sets}</div>
                <div className="text-xs text-gray-500">Sets</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900">{exercise.reps}</div>
                <div className="text-xs text-gray-500">Reps</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900">{exercise.frequency}</div>
                <div className="text-xs text-gray-500">Frequency</div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 mb-2">Instructions</h5>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>

            {/* Target Areas */}
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 mb-2">Target Areas</h5>
              <div className="flex flex-wrap gap-2">
                {exercise.targetRegions.map((region) => (
                  <span key={region} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
                    {regionLabels[region]}
                  </span>
                ))}
              </div>
            </div>

            {/* Progressions & Regressions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exercise.regressions.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2 text-sm">Make it Easier</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {exercise.regressions.map((regression, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-green-500">-</span> {regression}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {exercise.progressions.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2 text-sm">Make it Harder</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {exercise.progressions.map((progression, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-blue-500">+</span> {progression}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Contraindications */}
            {exercise.contraindications.length > 0 && (
              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <h5 className="font-medium text-amber-800 mb-1 text-sm">Precautions</h5>
                <ul className="text-xs text-amber-700">
                  {exercise.contraindications.map((contra, index) => (
                    <li key={index}>- {contra}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ResultsDashboard({ analysis, onReset }: ResultsDashboardProps) {
  const [expandedExercises, setExpandedExercises] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'essential' | 'recommended' | 'beneficial'>('all');

  const toggleExercise = (id: string) => {
    setExpandedExercises(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredExercises = filter === 'all'
    ? analysis.exercises
    : analysis.exercises.filter(e => e.priority === filter);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreRingColor = (score: number) => {
    if (score >= 80) return 'stroke-green-500';
    if (score >= 60) return 'stroke-yellow-500';
    if (score >= 40) return 'stroke-orange-500';
    return 'stroke-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Assessment Results</h1>
        <p className="text-gray-600">Personalized corrective exercise program based on your movement screens</p>
      </div>

      {/* Score Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Score Circle */}
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="12"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                className={getScoreRingColor(analysis.overallScore)}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(analysis.overallScore / 100) * 352} 352`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-3xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                {analysis.overallScore}%
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Movement Quality Score</h2>
            <p className="text-gray-600">{analysis.summary}</p>
          </div>
        </div>
      </div>

      {/* Risk Areas */}
      {analysis.riskAreas.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-amber-800 mb-3">Areas Requiring Attention</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.riskAreas.map((area) => (
              <span key={area} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                {regionLabels[area]}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Identified Issues */}
      {analysis.dysfunctions.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Identified Movement Dysfunctions</h3>
          <div className="space-y-3">
            {analysis.dysfunctions.map(({ dysfunction, severity, sourceScreens }) => (
              <div
                key={dysfunction}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <span className="font-medium text-gray-900">
                    {dysfunctionLabels[dysfunction]}
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Identified in: {sourceScreens.join(', ')}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  severity === 'high' ? 'bg-red-100 text-red-700' :
                  severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {severity} priority
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exercise Program */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="font-semibold text-gray-900 text-xl">Your Corrective Exercise Program</h3>

          {/* Filter */}
          <div className="flex gap-2">
            {(['all', 'essential', 'recommended', 'beneficial'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Exercise List */}
        <div className="space-y-3">
          {filteredExercises.length > 0 ? (
            filteredExercises.map(({ exercise, priority }) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                priority={priority}
                expanded={expandedExercises.has(exercise.id)}
                onToggle={() => toggleExercise(exercise.id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              No exercises match the selected filter.
            </p>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-blue-900 mb-3">Tips for Success</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="text-blue-500">1.</span>
            <span>Start with the essential exercises and perform them consistently for 2-4 weeks before adding more.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">2.</span>
            <span>Perform these exercises before your regular workouts or as a standalone routine.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">3.</span>
            <span>Focus on quality of movement over quantity. Move slowly and with control.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">4.</span>
            <span>Re-assess your movement every 4-6 weeks to track progress and update your program.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">5.</span>
            <span>If you experience pain, stop the exercise and consult a healthcare professional.</span>
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Take Assessment Again
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Print Exercise Program
        </button>
      </div>
    </div>
  );
}
