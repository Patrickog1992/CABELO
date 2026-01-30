import React from 'react';

export interface QuizAnswers {
  age: string;
  hairline: string;
  dandruff: string;
  lossAmount: string;
  noticeTime: string;
  goals: string[];
  hairType: string;
  hairLength: string;
  timeSpent: string;
  hereditary: string;
  stress: string;
}

export type StepType = 
  | 'INTRO' 
  | 'QUESTION' 
  | 'INTERSTITIAL_IMAGE' 
  | 'INTERSTITIAL_TEXT' 
  | 'ANALYSIS_DHT' 
  | 'ANALYSIS_GRAPH' 
  | 'LOADING_SEQUENCE' 
  | 'SALES_PAGE';

export interface QuestionOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface QuizStepConfig {
  id: keyof QuizAnswers | 'intro' | 'interstitial_1' | 'interstitial_2' | 'interstitial_3' | 'analysis_1' | 'analysis_2' | 'loading' | 'sales';
  type: StepType;
  question?: string;
  description?: string;
  options?: QuestionOption[];
  multiSelect?: boolean;
  imageUrl?: string;
  imageCaption?: string;
  nextLabel?: string;
  content?: React.ReactNode;
}