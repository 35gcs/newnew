'use client';

import { useState } from 'react';
import { getTrainingDayOptions } from '@/lib/schedule-generator';

interface PlanSetupProps {
  onComplete: (daysPerWeek: number) => void;
  onBack: () => void;
}

export function PlanSetup({ onComplete, onBack }: PlanSetupProps) {
  const [selectedDays, setSelectedDays] = useState<number>(3);
  const options = getTrainingDayOptions();

  const getRecommendation = (days: number): string => {
    if (days <= 2) return 'Good for beginners or busy schedules';
    if (days === 3) return 'Recommended - great balance of recovery and consistency';
    if (days === 4) return 'Good for intermediate - allows focus on different areas';
    if (days >= 5) return 'Advanced - requires commitment but yields faster results';
    return '';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete!</h1>
        <p className="text-gray-600">
          Now let's create your personalized training plan.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          How many days per week can you commit to training?
        </h2>

        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedDays(option.value)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selectedDays === option.value
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900">{option.label}</span>
                  {selectedDays === option.value && (
                    <p className="text-sm text-blue-600 mt-1">
                      {getRecommendation(option.value)}
                    </p>
                  )}
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedDays === option.value
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedDays === option.value && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Your plan will include:</p>
            <ul className="space-y-1">
              <li>- Exercises distributed across your training days</li>
              <li>- Daily workout checklists to track completion</li>
              <li>- 30-day retest reminder to measure progress</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
        >
          Back to Results
        </button>
        <button
          onClick={() => onComplete(selectedDays)}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Create My Plan
        </button>
      </div>
    </div>
  );
}
