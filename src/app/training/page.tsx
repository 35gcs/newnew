'use client';

import { useState, useEffect } from 'react';
import { PlanSetup } from '@/components/PlanSetup';
import { WeeklyPlanView } from '@/components/WeeklyPlanView';
import { loadPlan, savePlan, clearPlan } from '@/lib/plan-storage';
import { TrainingPlan } from '@/types/training-plan';
import { createDemoPlan } from '@/lib/schedule-generator';
import Link from 'next/link';

export default function TrainingPage() {
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const existingPlan = loadPlan();
    if (existingPlan) {
      setPlan(existingPlan);
    }
    setIsLoading(false);
  }, []);

  const handleCreatePlan = (daysPerWeek: number) => {
    const newPlan = createDemoPlan(daysPerWeek);
    savePlan(newPlan);
    setPlan(newPlan);
    setShowSetup(false);
  };

  const handlePlanUpdate = (updatedPlan: TrainingPlan) => {
    setPlan(updatedPlan);
  };

  const handleReset = () => {
    clearPlan();
    setPlan(null);
    setShowSetup(false);
  };

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

  if (showSetup) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <PlanSetup
          onComplete={handleCreatePlan}
          onBack={() => setShowSetup(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Training Plan</h1>
        <p className="text-gray-600 mb-8">
          Create a personalized training plan to track your corrective exercises.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => setShowSetup(true)}
            className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Training Plan
          </button>

          <Link
            href="/assessment"
            className="block w-full px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Take Full Assessment First
          </Link>
        </div>
      </div>
    </div>
  );
}
