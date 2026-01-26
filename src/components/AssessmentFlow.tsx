'use client';

import { useState, useEffect } from 'react';
import { useAssessment } from '@/lib/assessment-context';
import { ProgressBar } from './ProgressBar';
import { MovementScreenCard } from './MovementScreenCard';
import { ResultsDashboard } from './ResultsDashboard';
import { PlanSetup } from './PlanSetup';
import { WeeklyPlanView } from './WeeklyPlanView';
import { createTrainingPlan } from '@/lib/schedule-generator';
import { savePlan, loadPlan, clearPlan } from '@/lib/plan-storage';
import { TrainingPlan } from '@/types/training-plan';

type ViewState = 'assessment' | 'results' | 'plan-setup' | 'training-plan';

export function AssessmentFlow() {
  const {
    state,
    currentScreen,
    totalScreens,
    progress,
    submitResult,
    goBack,
    reset,
  } = useAssessment();

  const [viewState, setViewState] = useState<ViewState>('assessment');
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlan | null>(null);

  // Load existing plan on mount
  useEffect(() => {
    const existingPlan = loadPlan();
    if (existingPlan) {
      setTrainingPlan(existingPlan);
      setViewState('training-plan');
    }
  }, []);

  // Update view state when assessment completes
  useEffect(() => {
    if (state.isComplete && state.analysis && viewState === 'assessment') {
      setViewState('results');
    }
  }, [state.isComplete, state.analysis, viewState]);

  const handleCreatePlan = () => {
    setViewState('plan-setup');
  };

  const handlePlanSetupComplete = (daysPerWeek: number) => {
    if (!state.analysis) return;

    const plan = createTrainingPlan(state.analysis, daysPerWeek);
    savePlan(plan);
    setTrainingPlan(plan);
    setViewState('training-plan');
  };

  const handlePlanUpdate = (updatedPlan: TrainingPlan) => {
    setTrainingPlan(updatedPlan);
  };

  const handleRetest = () => {
    clearPlan();
    setTrainingPlan(null);
    reset();
    setViewState('assessment');
  };

  const handleViewResults = () => {
    setViewState('results');
  };

  const handleBackToResults = () => {
    setViewState('results');
  };

  const handleResetAssessment = () => {
    clearPlan();
    setTrainingPlan(null);
    reset();
    setViewState('assessment');
  };

  // Show training plan if exists
  if (viewState === 'training-plan' && trainingPlan) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <WeeklyPlanView
          plan={trainingPlan}
          onPlanUpdate={handlePlanUpdate}
          onRetest={handleRetest}
          onViewResults={handleViewResults}
        />
      </div>
    );
  }

  // Show plan setup
  if (viewState === 'plan-setup' && state.analysis) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <PlanSetup
          onComplete={handlePlanSetupComplete}
          onBack={handleBackToResults}
        />
      </div>
    );
  }

  // Show results if assessment is complete
  if (viewState === 'results' && state.analysis) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <ResultsDashboard
          analysis={state.analysis}
          onReset={handleResetAssessment}
          onCreatePlan={handleCreatePlan}
        />
      </div>
    );
  }

  // Show current screen
  if (!currentScreen) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading assessment...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <ProgressBar
          progress={progress}
          currentStep={state.currentScreenIndex + 1}
          totalSteps={totalScreens}
        />
        <MovementScreenCard
          screen={currentScreen}
          onSubmit={submitResult}
          onBack={goBack}
          showBack={state.currentScreenIndex > 0}
        />
      </div>
    </div>
  );
}
