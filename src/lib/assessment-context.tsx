'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ScreenResult, ScoreLevel } from '@/types/assessment';
import { movementScreens } from './movement-screens';
import { analyzeAssessment, RecommendationResult } from './recommendation-engine';

interface AssessmentState {
  currentScreenIndex: number;
  results: ScreenResult[];
  isComplete: boolean;
  analysis: RecommendationResult | null;
}

type AssessmentAction =
  | { type: 'SET_SCREEN_INDEX'; index: number }
  | { type: 'SUBMIT_RESULT'; result: ScreenResult }
  | { type: 'GO_BACK' }
  | { type: 'COMPLETE_ASSESSMENT' }
  | { type: 'RESET_ASSESSMENT' };

const initialState: AssessmentState = {
  currentScreenIndex: 0,
  results: [],
  isComplete: false,
  analysis: null,
};

function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'SET_SCREEN_INDEX':
      return { ...state, currentScreenIndex: action.index };

    case 'SUBMIT_RESULT': {
      const existingIndex = state.results.findIndex(
        r => r.screenId === action.result.screenId
      );

      let newResults: ScreenResult[];
      if (existingIndex >= 0) {
        newResults = [...state.results];
        newResults[existingIndex] = action.result;
      } else {
        newResults = [...state.results, action.result];
      }

      const nextIndex = state.currentScreenIndex + 1;
      const isComplete = nextIndex >= movementScreens.length;

      return {
        ...state,
        results: newResults,
        currentScreenIndex: isComplete ? state.currentScreenIndex : nextIndex,
        isComplete,
        analysis: isComplete ? analyzeAssessment(newResults) : null,
      };
    }

    case 'GO_BACK':
      return {
        ...state,
        currentScreenIndex: Math.max(0, state.currentScreenIndex - 1),
      };

    case 'COMPLETE_ASSESSMENT': {
      const analysis = analyzeAssessment(state.results);
      return { ...state, isComplete: true, analysis };
    }

    case 'RESET_ASSESSMENT':
      return initialState;

    default:
      return state;
  }
}

interface AssessmentContextType {
  state: AssessmentState;
  currentScreen: typeof movementScreens[0] | null;
  totalScreens: number;
  progress: number;
  submitResult: (score: ScoreLevel, compensations: string[], painReported: boolean, notes?: string) => void;
  goBack: () => void;
  reset: () => void;
  goToScreen: (index: number) => void;
}

const AssessmentContext = createContext<AssessmentContextType | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  const currentScreen = movementScreens[state.currentScreenIndex] || null;
  const totalScreens = movementScreens.length;
  const progress = (state.currentScreenIndex / totalScreens) * 100;

  const submitResult = (
    score: ScoreLevel,
    compensations: string[],
    painReported: boolean,
    notes?: string
  ) => {
    if (!currentScreen) return;

    const result: ScreenResult = {
      screenId: currentScreen.id,
      score,
      compensationsObserved: compensations,
      painReported,
      notes,
    };

    dispatch({ type: 'SUBMIT_RESULT', result });
  };

  const goBack = () => dispatch({ type: 'GO_BACK' });
  const reset = () => dispatch({ type: 'RESET_ASSESSMENT' });
  const goToScreen = (index: number) => dispatch({ type: 'SET_SCREEN_INDEX', index });

  return (
    <AssessmentContext.Provider
      value={{
        state,
        currentScreen,
        totalScreens,
        progress,
        submitResult,
        goBack,
        reset,
        goToScreen,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
