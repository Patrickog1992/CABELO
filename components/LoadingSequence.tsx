import React, { useEffect, useState } from 'react';
import { TESTIMONIALS_CAROUSEL } from '../constants';

const phrases = [
  "Analisando seu perfil capilar...",
  "Calculando projeção de crescimento...",
  "Selecionando os melhores ingredientes...",
  "Gerando seu plano personalizado..."
];

export const LoadingSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    // Process bars one by one
    if (completedSteps < phrases.length) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => prev + 1);
      }, 1500); // 1.5s per bar
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [completedSteps, onComplete]);

  // Carousel auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % TESTIMONIALS_CAROUSEL.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto space-y-8 py-10">
      <div className="space-y-6">
        {phrases.map((phrase, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-700">
               <span>{phrase}</span>
               {completedSteps > index && <span className="text-green-600">✓</span>}
            </div>
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-green-600 transition-all duration-1000 ease-out"
                 style={{ 
                   width: completedSteps > index ? '100%' : (completedSteps === index ? '100%' : '0%'),
                   transitionDelay: completedSteps === index ? '0ms' : '0ms' 
                  }}
               ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-gray-100">
         <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center animate-fade-in relative overflow-hidden min-h-[140px] flex flex-col justify-center">
            <p className="text-gray-600 italic mb-4">"{TESTIMONIALS_CAROUSEL[testimonialIndex].text}"</p>
            <p className="font-bold text-gray-900">{TESTIMONIALS_CAROUSEL[testimonialIndex].name}</p>
         </div>
      </div>
    </div>
  );
};