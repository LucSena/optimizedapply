// src/contexts/ResumeCreationContext.tsx
'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type ResumeCreationState = {
  step: number;
  templateId: string | null;
  formData: {
    title: string;
    personalInfo: {
      fullName: string;
      email: string;
      phone?: string;
      address?: string;
      linkedin?: string;
      website?: string;
    } | null;
    professionalSummary: {
      summary: string;
    } | null;
    workExperiences: Array<{
      company: string;
      position: string;
      startDate: Date;
      endDate?: Date;
      description: string;
    }>;
    educations: Array<{
      institution: string;
      degree: string;
      fieldOfStudy: string;
      startDate: Date;
      endDate?: Date;
    }>;
    skills: Array<{
      name: string;
      level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
    }>;
    languages: Array<{
      name: string;
      level: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'FLUENT' | 'NATIVE';
    }>;
    certifications: Array<{
      name: string;
      issuer: string;
      date: Date;
    }>;
    projects: Array<{
      name: string;
      description: string;
      url?: string;
    }>;
  };
};

type ResumeCreationAction = 
  | { type: 'SET_TEMPLATE'; payload: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<ResumeCreationState['formData']> };

const initialState: ResumeCreationState = {
  step: 1,
  templateId: null,
  formData: {
    title: '',
    personalInfo: null,
    professionalSummary: null,
    workExperiences: [],
    educations: [],
    skills: [],
    languages: [],
    certifications: [],
    projects: [],
  }
};

const ResumeCreationContext = createContext<{
  state: ResumeCreationState;
  dispatch: React.Dispatch<ResumeCreationAction>;
} | null>(null);

function resumeCreationReducer(state: ResumeCreationState, action: ResumeCreationAction): ResumeCreationState {
  switch (action.type) {
    case 'SET_TEMPLATE':
      return {
        ...state,
        templateId: action.payload
      };
    case 'NEXT_STEP':
      return {
        ...state,
        step: state.step + 1
      };
    case 'PREV_STEP':
      return {
        ...state,
        step: Math.max(1, state.step - 1)
      };
    case 'SET_STEP':
      return {
        ...state,
        step: action.payload
      };
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload
        }
      };
    default:
      return state;
  }
}

export function ResumeCreationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeCreationReducer, initialState);

  return (
    <ResumeCreationContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeCreationContext.Provider>
  );
}

export function useResumeCreation() {
  const context = useContext(ResumeCreationContext);
  if (!context) {
    throw new Error('useResumeCreation must be used within a ResumeCreationProvider');
  }
  return context;
}