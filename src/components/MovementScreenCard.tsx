'use client';

import { useState } from 'react';
import { MovementScreen, ScoreLevel } from '@/types/assessment';

interface MovementScreenCardProps {
  screen: MovementScreen;
  onSubmit: (score: ScoreLevel, compensations: string[], painReported: boolean, notes?: string) => void;
  onBack?: () => void;
  showBack?: boolean;
}

export function MovementScreenCard({ screen, onSubmit, onBack, showBack = true }: MovementScreenCardProps) {
  const [selectedScore, setSelectedScore] = useState<ScoreLevel | null>(null);
  const [selectedCompensations, setSelectedCompensations] = useState<string[]>([]);
  const [painReported, setPainReported] = useState(false);
  const [notes, setNotes] = useState('');
  const [showInstructions, setShowInstructions] = useState(true);

  const handleCompensationToggle = (compensationId: string) => {
    setSelectedCompensations(prev =>
      prev.includes(compensationId)
        ? prev.filter(c => c !== compensationId)
        : [...prev, compensationId]
    );
  };

  const handleSubmit = () => {
    if (selectedScore) {
      onSubmit(selectedScore, selectedCompensations, painReported, notes || undefined);
    }
  };

  const scoreColors = {
    1: 'border-red-500 bg-red-50 hover:bg-red-100',
    2: 'border-yellow-500 bg-yellow-50 hover:bg-yellow-100',
    3: 'border-green-500 bg-green-50 hover:bg-green-100',
  };

  const selectedScoreColors = {
    1: 'border-red-600 bg-red-200 ring-2 ring-red-600',
    2: 'border-yellow-600 bg-yellow-200 ring-2 ring-yellow-600',
    3: 'border-green-600 bg-green-200 ring-2 ring-green-600',
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-2 capitalize">
          {screen.category.replace('_', ' ')}
        </span>
        <h2 className="text-2xl font-bold text-gray-900">{screen.name}</h2>
        <p className="text-gray-600 mt-2">{screen.description}</p>
      </div>

      {/* Instructions Toggle */}
      <button
        onClick={() => setShowInstructions(!showInstructions)}
        className="w-full text-left mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">Instructions</span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${showInstructions ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {showInstructions && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">How to Perform</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            {screen.instructions.map((instruction, index) => (
              <li key={index} className="text-sm">{instruction}</li>
            ))}
          </ol>
          <div className="mt-4 p-3 bg-blue-100 rounded">
            <p className="text-sm text-blue-900">
              <strong>Purpose:</strong> {screen.purpose}
            </p>
          </div>
        </div>
      )}

      {/* Scoring Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Score Your Movement</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[3, 2, 1].map((score) => (
            <button
              key={score}
              onClick={() => setSelectedScore(score as ScoreLevel)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedScore === score
                  ? selectedScoreColors[score as ScoreLevel]
                  : scoreColors[score as ScoreLevel]
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">Score {score}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  score === 3 ? 'bg-green-200 text-green-800' :
                  score === 2 ? 'bg-yellow-200 text-yellow-800' :
                  'bg-red-200 text-red-800'
                }`}>
                  {score === 3 ? 'Good' : score === 2 ? 'Moderate' : 'Needs Work'}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {score === 3 ? screen.scoringCriteria.score3 :
                 score === 2 ? screen.scoringCriteria.score2 :
                 screen.scoringCriteria.score1}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Compensations Section */}
      {screen.compensationPatterns.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Compensations Observed (select all that apply)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {screen.compensationPatterns.map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => handleCompensationToggle(pattern.id)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedCompensations.includes(pattern.id)
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${
                    selectedCompensations.includes(pattern.id)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedCompensations.includes(pattern.id) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 block">{pattern.name}</span>
                    <span className="text-sm text-gray-600">{pattern.description}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pain Question */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={painReported}
            onChange={(e) => setPainReported(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-gray-900">I experienced pain during this movement</span>
        </label>
        {painReported && (
          <p className="mt-2 text-sm text-amber-700 bg-amber-50 p-2 rounded">
            Note: If you experience pain during movement, consider consulting a healthcare professional before continuing.
          </p>
        )}
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label className="block font-medium text-gray-900 mb-2">Additional Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any observations about your movement..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={2}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {showBack && onBack && (
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Back
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={!selectedScore}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
            selectedScore
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
