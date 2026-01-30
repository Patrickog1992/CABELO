import React, { useState, useEffect } from 'react';
import { QuizAnswers, StepType } from './types';
import { QUIZ_STEPS } from './constants';
import { QuizStep } from './components/QuizStep';
import { AnalysisDHT, AnalysisGraph } from './components/Analysis';
import { LoadingSequence } from './components/LoadingSequence';
import { SalesPage } from './components/SalesPage';

const App: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    age: '',
    hairline: '',
    dandruff: '',
    lossAmount: '',
    noticeTime: '',
    goals: [],
    hairType: '',
    hairLength: '',
    timeSpent: '',
    hereditary: '',
    stress: '',
  });

  const currentStep = QUIZ_STEPS[currentStepIndex];
  
  // Calculate progress percentage, excluding sales page
  const progress = Math.min(100, Math.round((currentStepIndex / (QUIZ_STEPS.length - 2)) * 100));

  const handleAnswer = (value: string | string[], shouldAdvance = true) => {
    // Update state based on step ID
    if (currentStep.id !== 'intro' && currentStep.id !== 'interstitial_1' && currentStep.id !== 'interstitial_2' && currentStep.id !== 'analysis_1' && currentStep.id !== 'analysis_2' && currentStep.id !== 'loading' && currentStep.id !== 'sales') {
        setAnswers(prev => ({
          ...prev,
          [currentStep.id]: value
        }));
    }

    // Move to next step only if shouldAdvance is true
    if (shouldAdvance) {
      setTimeout(() => {
          if (currentStepIndex < QUIZ_STEPS.length - 1) {
              setCurrentStepIndex(prev => prev + 1);
              window.scrollTo(0, 0);
          }
      }, 150);
    }
  };

  // Helper for rendering content based on type
  const renderStepContent = () => {
    switch (currentStep.type) {
      case 'INTRO':
      case 'QUESTION':
      case 'INTERSTITIAL_IMAGE':
      case 'INTERSTITIAL_TEXT':
        const selectedValue = (answers[currentStep.id as keyof QuizAnswers] as string | string[]) || [];
        const selectedArray = Array.isArray(selectedValue) ? selectedValue : (selectedValue ? [selectedValue] : []);
        
        return (
          <QuizStep 
            step={currentStep} 
            onAnswer={handleAnswer} 
            selectedValues={selectedArray}
          />
        );
      case 'ANALYSIS_DHT':
        return <AnalysisDHT onNext={() => handleAnswer('next', true)} />;
      case 'ANALYSIS_GRAPH':
        return <AnalysisGraph onNext={() => handleAnswer('next', true)} />;
      case 'LOADING_SEQUENCE':
        return <LoadingSequence onComplete={() => handleAnswer('complete', true)} />;
      case 'SALES_PAGE':
        return <SalesPage answers={answers} />;
      default:
        return <div>Unknown step type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar (Hidden on Intro and Sales Page) */}
      {currentStep.type !== 'INTRO' && currentStep.type !== 'SALES_PAGE' && (
        <div className="fixed top-0 left-0 w-full h-2 bg-gray-100 z-50">
          <div 
            className="h-full bg-green-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Main Content Area */}
      <main className={`flex flex-col ${currentStep.type === 'SALES_PAGE' ? '' : 'min-h-screen justify-center py-12 px-4'}`}>
        
        {/* Logo - Displayed on all steps except Sales Page */}
        {currentStep.type !== 'SALES_PAGE' && (
           <div className="flex justify-center mb-8 w-full max-w-xl mx-auto">
             <img 
               src="https://i.imgur.com/NjraWbE.png" 
               alt="Método Cresce Cabelo" 
               className="w-[100px] h-[100px] object-contain" 
             />
           </div>
        )}

        {renderStepContent()}
      </main>
    </div>
  );
};

export default App;