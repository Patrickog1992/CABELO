import React from 'react';
import { QuizStepConfig } from '../types';
import { Button } from './Button';

interface QuizStepProps {
  step: QuizStepConfig;
  onAnswer: (value: string | string[], shouldAdvance?: boolean) => void;
  selectedValues: string[];
}

export const QuizStep: React.FC<QuizStepProps> = ({ step, onAnswer, selectedValues }) => {
  const handleOptionClick = (value: string) => {
    if (step.multiSelect) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
      // Pass false to prevent auto-advance for multi-select
      onAnswer(newValues, false);
    } else {
      // Pass true to auto-advance for single select
      onAnswer(value, true);
    }
  };

  const handleNext = () => {
    // Explicitly advance when button is clicked (for multi-select or interstitials)
    onAnswer(selectedValues, true);
  };

  if (step.type === 'INTRO') {
     return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fade-in py-8 px-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight max-w-2xl">
            {step.question}
          </h1>
          
          {step.imageUrl && (
            <img 
              src={step.imageUrl} 
              alt="Intro" 
              className="w-full max-w-md rounded-xl shadow-lg object-cover"
            />
          )}

          <p className="text-lg text-gray-600 max-w-lg">
            {step.description}
          </p>
          
          <div className="w-full max-w-md">
            <Button onClick={() => onAnswer("start", true)} fullWidth className="animate-pulse">
              COMEÇAR AGORA
            </Button>
          </div>
        </div>
     )
  }

  if (step.type === 'INTERSTITIAL_IMAGE') {
    return (
      <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-900">{step.question}</h2>
        {step.description && <p className="text-gray-600">{step.description}</p>}
        {step.imageUrl && (
          <img 
            src={step.imageUrl} 
            alt="Quiz illustration" 
            className="rounded-lg shadow-lg max-w-full h-auto max-h-[300px] object-cover"
          />
        )}
        <Button onClick={handleNext} fullWidth className="max-w-md">
          {step.nextLabel || 'Continuar'}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 w-full max-w-xl mx-auto animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">{step.question}</h2>
        {step.description && <p className="text-gray-600 text-sm">{step.description}</p>}
      </div>

      <div className={`grid gap-3 ${step.options && step.options.length > 4 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {step.options?.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group
                ${isSelected 
                  ? 'border-green-600 bg-green-50 text-green-900' 
                  : 'border-gray-200 bg-white hover:border-green-300 text-gray-700'
                }`}
            >
              <div className="flex flex-col items-center md:flex-row md:items-center gap-3 w-full">
                {option.icon && <div className="text-gray-500 group-hover:text-green-600">{option.icon}</div>}
                <span className="font-medium text-lg w-full text-center md:text-left">{option.label}</span>
              </div>
              {step.multiSelect && (
                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${isSelected ? 'bg-green-600 border-green-600' : 'border-gray-300'}
                 `}>
                    {isSelected && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                 </div>
              )}
            </button>
          );
        })}
      </div>

      {step.multiSelect && (
        <Button onClick={handleNext} disabled={selectedValues.length === 0} fullWidth>
          {step.nextLabel || 'Continuar'}
        </Button>
      )}
    </div>
  );
};