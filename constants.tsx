import { QuizStepConfig } from './types';
import React from 'react';

// Using SVGs directly for hairline options to ensure they render as requested "small drawings"
const HairlineFront = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" className="mx-auto mb-2 text-gray-700">
    <path d="M20,80 Q50,20 80,80" fill="none" stroke="currentColor" strokeWidth="4" />
    <path d="M20,80 L20,100 M80,80 L80,100" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const HairlineCrown = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" className="mx-auto mb-2 text-gray-700">
    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="4" />
    <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.2" />
  </svg>
);

const HairlineBoth = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" className="mx-auto mb-2 text-gray-700">
     <path d="M20,80 Q50,40 80,80" fill="none" stroke="currentColor" strokeWidth="4" />
     <circle cx="50" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="4" />
  </svg>
);

const HairlinePatch = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" className="mx-auto mb-2 text-gray-700">
    <circle cx="30" cy="30" r="10" fill="currentColor" opacity="0.3" />
    <circle cx="70" cy="60" r="15" fill="currentColor" opacity="0.3" />
    <circle cx="40" cy="70" r="8" fill="currentColor" opacity="0.3" />
  </svg>
);

export const QUIZ_STEPS: QuizStepConfig[] = [
  {
    id: 'intro',
    type: 'INTRO',
    question: "Descubra por que seu cabelo não cresce e o que fazer para ativar o crescimento natural a partir de hoje",
    description: "Responda o quiz e veja como estimular o crescimento do seu cabelo em poucos dias",
    imageUrl: "https://i.imgur.com/9vErHbj.jpeg"
  },
  {
    id: 'age',
    type: 'QUESTION',
    question: "Quantos anos você tem?",
    options: [
      { label: "20-29 anos", value: "20-29" },
      { label: "30-39 anos", value: "30-39" },
      { label: "40-49 anos", value: "40-49" },
      { label: "Mais de 50 anos", value: "50+" },
    ]
  },
  {
    id: 'hairline',
    type: 'QUESTION',
    question: "Linha do cabelo",
    options: [
      { label: "Recuando na frente", value: "Frontal", icon: <HairlineFront /> },
      { label: "Coroa", value: "Coroa", icon: <HairlineCrown /> },
      { label: "Um pouco de ambos", value: "Ambos", icon: <HairlineBoth /> },
      { label: "Falhas irregulares", value: "Falhas", icon: <HairlinePatch /> },
      { label: "Prevenção (Ainda não cheguei a lugar nenhum)", value: "Prevenção" },
    ]
  },
  {
    id: 'dandruff',
    type: 'QUESTION',
    question: "Você apresenta sintomas de caspa no couro cabeludo? Descamação, coceira, vermelhidão ou ardência?",
    options: [
      { label: "Sim", value: "Sim" },
      { label: "Não", value: "Não" },
    ]
  },
  {
    id: 'lossAmount',
    type: 'QUESTION',
    question: "Quanto cabelo você perdeu?",
    options: [
      { label: "Bastante (É óbvio para todos)", value: "Bastante" },
      { label: "Alguns (As pessoas próximas percebem)", value: "Alguns" },
      { label: "Um pouco (Só eu percebo)", value: "Pouco" },
    ]
  },
  {
    id: 'noticeTime',
    type: 'QUESTION',
    question: "Quando você começou a notar mudanças no seu cabelo?",
    options: [
      { label: "Há mais de um ano", value: "Mais de 1 ano" },
      { label: "No ano passado", value: "1 ano" },
      { label: "Nos últimos meses", value: "Meses" },
      { label: "Não tenho certeza", value: "Incerto" },
    ]
  },
  {
    id: 'goals',
    type: 'QUESTION',
    question: "Que resultados você espera do seu tratamento?",
    description: "Escolha quantos quiser.",
    multiSelect: true,
    options: [
      { label: "Uma linha capilar mais forte e definida", value: "Linha forte" },
      { label: "Cabelos visivelmente mais grossos e volumosos", value: "Volume" },
      { label: "Maior cobertura do couro cabeludo", value: "Cobertura" },
      { label: "Fiquem com o cabelo que eu tenho", value: "Manutenção" },
      { label: "Tudo o que precede", value: "Tudo" },
    ],
    nextLabel: "Continuar"
  },
  {
    id: 'interstitial_1',
    type: 'INTERSTITIAL_TEXT',
    content: (
      <div className="flex flex-col items-center text-center space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
          Seu protocolo será gerado pelo<br />
          <span className="text-green-600">Dr. Rodolfo Vieira</span>
        </h2>

        <video 
          src="https://i.imgur.com/jBkCFZd.mp4" 
          poster="https://i.imgur.com/xXGi1ef.jpeg"
          className="rounded-xl shadow-lg w-full max-w-sm object-cover"
          controls
          playsInline
          preload="none"
        />
        
        <p className="text-sm font-bold tracking-widest text-gray-500 uppercase">
          CRIADOR DO MÉTODO CRESCE CABELO
        </p>

        <img 
          src="https://i.imgur.com/q4Ipwqk.jpeg" 
          alt="Dr. Rodolfo Vieira ganhando prêmio" 
          className="rounded-xl shadow-lg w-full max-w-sm object-cover"
          loading="lazy"
        />

        <p className="text-lg text-gray-700 font-medium">
          Ganhador de vários prêmios pela sua competência Rodolfo é conhecido nacionalmente pela sua capacidade intelectual
        </p>

        <img 
          src="https://i.imgur.com/YkG0pEl.jpeg" 
          alt="Dr. Rodolfo no programa" 
          className="rounded-xl shadow-lg w-full max-w-sm object-cover"
          loading="lazy"
        />
      </div>
    ),
    nextLabel: "Continuar"
  },
  {
    id: 'interstitial_rogerio',
    type: 'INTERSTITIAL_TEXT',
    content: (
      <div className="flex flex-col items-center text-center space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
          Veja o antes e depois do <span className="text-green-600">Rogério</span>
        </h2>

        <img 
          src="https://miro.medium.com/v2/resize:fit:1400/1*RTEwccA_FYzyjJm_2xAcKA.jpeg" 
          alt="Antes e depois do Rogério" 
          className="rounded-xl shadow-lg w-full max-w-sm object-cover"
          loading="lazy"
        />

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full max-w-sm relative">
          <div className="flex justify-center mb-3">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-700 italic mb-4">
            "Eu já tinha tentado de tudo e estava quase aceitando a calvície. O Método Cresce Cabelo foi minha última tentativa e, sinceramente, a melhor decisão que tomei. Em poucas semanas a queda parou e logo vi novos fios nascendo onde já estava ralo. Minha autoestima voltou com tudo!"
          </p>
          <p className="font-bold text-gray-900">- Rogério M., 42 anos</p>
        </div>
      </div>
    ),
    nextLabel: "Continuar"
  },
  {
    id: 'hairType',
    type: 'QUESTION',
    question: "Qual é o seu tipo de cabelo?",
    options: [
      { label: "Liso ou ondulado", value: "Liso/Ondulado" },
      { label: "Encaracolado ou crespo", value: "Encaracolado/Crespo" },
      { label: "Texturizado ou processado", value: "Texturizado" },
      { label: "Eu não tenho cabelo", value: "Sem cabelo" },
    ]
  },
  {
    id: 'hairLength',
    type: 'QUESTION',
    question: "Qual o comprimento do seu cabelo?",
    options: [
      { label: "Raspado, raspado ou careca", value: "Raspado" },
      { label: "Curto", value: "Curto" },
      { label: "Médio", value: "Médio" },
      { label: "Longo", value: "Longo" },
    ]
  },
  {
    id: 'timeSpent',
    type: 'QUESTION',
    question: "Quanto tempo você gasta cuidando do seu cabelo todos os dias?",
    description: "Oferecemos tratamentos rápidos, simples e que se adaptam à sua rotina.",
    options: [
      { label: "Menos de 5 minutos", value: "<5 min" },
      { label: "5 a 10 minutos", value: "5-10 min" },
      { label: "10+ minutos", value: "10+ min" },
    ]
  },
  {
    id: 'interstitial_2',
    type: 'INTERSTITIAL_IMAGE',
    question: "Uma agenda lotada não precisa impedir você de parecer e se sentir anos mais jovem.",
    description: "Ao avaliar suas respostas neste questionário, poderemos determinar seu tipo de cabelo e criar uma rotina de cuidados capilares prática e rápida para ajudá-lo(a) a alcançar seus objetivos.",
    imageUrl: "https://assets.checkoutchamp.com/Funnel/assets/images/f8e7a6c1-82db-4473-b6b4-13c7fa018cbd/b985900b-c47b-47f1-b1e8-8153723a2862/old.webp?versionId=dqXGvvLFMoLos4Sq_b3Js4_4eJjVyjae",
    nextLabel: "Continuar"
  },
  {
    id: 'hereditary',
    type: 'QUESTION',
    question: "A queda de cabelo é um problema hereditário na sua família?",
    description: "Perguntamos isso pois é uma causa muito comum e hereditário a queda de cabelo. Então se você tem algum historico de calvície na família tem uma boa chance de te afetar também.",
    options: [
      { label: "Sim", value: "Sim" },
      { label: "Não", value: "Não" },
      { label: "Não tenho certeza", value: "Incerto" },
    ]
  },
  {
    id: 'stress',
    type: 'QUESTION',
    question: "Com que frequência você costuma sentir estresse?",
    description: "Por que perguntamos: Se você passa por estresse, isso pode afetar seu cabelo. O estresse pode desencadear e piorar uma forma de queda temporária de cabelo chamada eflúvio telógeno, que interrompe o ciclo natural de crescimento do seu cabelo.",
    options: [
      { label: "O tempo todo", value: "Sempre" },
      { label: "Às vezes", value: "Às vezes" },
      { label: "Raramente", value: "Raramente" },
      { label: "Não tenho certeza", value: "Incerto" },
    ]
  },
  {
    id: 'analysis_1',
    type: 'ANALYSIS_DHT',
    nextLabel: "Continuar"
  },
  {
    id: 'analysis_2',
    type: 'ANALYSIS_GRAPH',
    nextLabel: "Continuar"
  },
  {
    id: 'loading',
    type: 'LOADING_SEQUENCE',
    nextLabel: "" // Auto-advance
  },
  {
    id: 'sales',
    type: 'SALES_PAGE',
    nextLabel: ""
  }
];

export const TESTIMONIALS_CAROUSEL = [
  { text: "Estou chocado com a rapidez dos resultados!", name: "Carlos M." },
  { text: "Meu cabelo está mais forte do que há 10 anos.", name: "João P." },
  { text: "Simples de usar e funciona de verdade.", name: "André S." },
  { text: "Minha esposa notou a diferença na segunda semana.", name: "Roberto L." }
];

export const GRAPH_DATA = [
  { name: 'Mês 1', uv: 20 },
  { name: 'Mês 2', uv: 35 },
  { name: 'Mês 3', uv: 60 },
  { name: 'Mês 4', uv: 80 },
  { name: 'Mês 5', uv: 95 },
];