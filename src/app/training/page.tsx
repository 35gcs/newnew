'use client';

import { useState, useEffect } from 'react';
import { WeeklyPlanView } from '@/components/WeeklyPlanView';
import { loadPlan, savePlan, clearPlan } from '@/lib/plan-storage';
import { TrainingPlan } from '@/types/training-plan';
import { createDemoPlan, getTrainingDayOptions } from '@/lib/schedule-generator';
import Link from 'next/link';

export default function TrainingPage() {
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [selectedDays, setSelectedDays] = useState<number>(3);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const existingPlan = loadPlan();
    if (existingPlan) {
      setPlan(existingPlan);
    }
    setIsLoading(false);
  }, []);

  const handleCreatePlan = () => {
    const newPlan = createDemoPlan(selectedDays);
    savePlan(newPlan);
    setPlan(newPlan);
  };

  const handlePlanUpdate = (updatedPlan: TrainingPlan) => {
    setPlan(updatedPlan);
  };

  const handleReset = () => {
    clearPlan();
    setPlan(null);
  };

  const options = getTrainingDayOptions();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Show training plan with calendar if exists
  if (plan) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <WeeklyPlanView
          plan={plan}
          onPlanUpdate={handlePlanUpdate}
          onRetest={handleReset}
          onViewResults={() => {}}
        />
      </div>
    );
  }

  // Show days per week selection
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your Training Plan</h1>
          <p className="text-gray-600">
            Choose how many days per week you want to train
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            How many days per week can you commit?
          </h2>

          <div className="space-y-3">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedDays(option.value)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedDays === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{option.label}</span>
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

        <button
          onClick={handleCreatePlan}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors mb-4"
        >
          Create My Plan
        </button>

        <Link
          href="/"
          className="block text-center text-gray-500 hover:text-gray-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
