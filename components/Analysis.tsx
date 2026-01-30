import React from 'react';
import { Button } from './Button';

export const AnalysisDHT: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="w-full max-w-xl mx-auto space-y-8 animate-fade-in text-center">
      <h2 className="text-2xl font-bold text-gray-900">Seu nível de queda de cabelo</h2>
      
      <div className="relative pt-8 pb-4">
        {/* Simplified Gauge Bar */}
        <div className="h-4 w-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-600 rounded-full"></div>
        <div className="absolute top-6 right-0 transform translate-x-1/4 -translate-y-1/2">
           <div className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-t-gray-800 border-r-[10px] border-r-transparent"></div>
        </div>
        <div className="flex justify-between text-sm font-semibold mt-2 text-gray-600">
          <span>Baixo</span>
          <span>Normal</span>
          <span>Médio</span>
          <span className="text-red-600 font-bold">Alto</span>
        </div>
      </div>

      <div className="bg-red-50 border border-red-100 p-6 rounded-xl space-y-4">
        <h3 className="text-xl font-bold text-red-700">Alto nível</h3>
        <p className="text-gray-700">
          Seu cabelo parece estar afinando rapidamente. Isso se deve ao alto nível de DHT, folículos capilares dormentes e diminuição do fluxo sanguíneo.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-left">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
             <div className="text-xs text-gray-500 uppercase">Tipo de envelhecimento</div>
             <div className="font-bold text-gray-800">Extrínseco</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
             <div className="text-xs text-gray-500 uppercase">Há espaço para melhorias</div>
             <div className="font-bold text-green-600">Alto</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
             <div className="text-xs text-gray-500 uppercase">Acionar</div>
             <div className="font-bold text-red-600">Sensibilidade ao DHT</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
             <div className="text-xs text-gray-500 uppercase">Impacto na aparência</div>
             <div className="font-bold text-gray-800">Perceptível</div>
          </div>
      </div>

      <Button onClick={onNext} fullWidth>Continuar</Button>
    </div>
  );
};

export const AnalysisGraph: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="w-full max-w-xl mx-auto space-y-6 animate-fade-in text-center">
       <h2 className="text-2xl font-bold text-gray-900">O plano definitivo para você conquistar uma cabeleira farta.</h2>
       <p className="text-gray-600">Com base nas suas respostas, esperamos que você observe um aumento visível na espessura e na saúde do seu cabelo até junho de 2026.</p>

       <div className="h-64 w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-end justify-center relative overflow-hidden">
          {/* Custom SVG Chart */}
          <svg viewBox="0 0 350 200" className="w-full h-full text-green-500">
            {/* Grid Lines */}
            <line x1="0" y1="160" x2="350" y2="160" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="0" y1="120" x2="350" y2="120" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="0" y1="80" x2="350" y2="80" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="0" y1="40" x2="350" y2="40" stroke="#f0f0f0" strokeWidth="1" />
            
            {/* Area Fill */}
            <path 
              d="M 20,180 L 20,160 L 90,140 L 170,80 L 250,50 L 330,20 L 330,180 Z" 
              fill="url(#gradient)" 
              opacity="0.2"
            />
            
            {/* Line */}
            <path 
              d="M 20,160 L 90,140 L 170,80 L 250,50 L 330,20" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            
            {/* Points */}
            <circle cx="20" cy="160" r="4" fill="white" stroke="currentColor" strokeWidth="3" />
            <circle cx="90" cy="140" r="4" fill="white" stroke="currentColor" strokeWidth="3" />
            <circle cx="170" cy="80" r="6" fill="white" stroke="currentColor" strokeWidth="3" />
            <circle cx="250" cy="50" r="4" fill="white" stroke="currentColor" strokeWidth="3" />
            <circle cx="330" cy="20" r="4" fill="white" stroke="currentColor" strokeWidth="3" />

            {/* Gradient Def */}
            <defs>
              <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
                <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
          
          {/* Labels */}
          <div className="absolute bottom-0 w-full flex justify-between px-2 text-xs text-gray-500 font-medium">
             <span className="w-10 text-center">Mês 1</span>
             <span className="w-10 text-center">Mês 2</span>
             <span className="w-10 text-center font-bold text-green-700">Mês 3</span>
             <span className="w-10 text-center">Mês 4</span>
             <span className="w-10 text-center">Mês 5</span>
          </div>
       </div>
       
       <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg font-medium border border-green-100">
         No 3º mês já vai ter melhorado bastante!
       </p>

       <Button onClick={onNext} fullWidth>Continuar</Button>
    </div>
  );
};