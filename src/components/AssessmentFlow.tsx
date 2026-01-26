'use client';

import { useAssessment } from '@/lib/assessment-context';
import { ProgressBar } from './ProgressBar';
import { MovementScreenCard } from './MovementScreenCard';
import { ResultsDashboard } from './ResultsDashboard';

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

  // Show results if assessment is complete
  if (state.isComplete && state.analysis) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <ResultsDashboard analysis={state.analysis} onReset={reset} />
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
