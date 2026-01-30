import React, { useState, useEffect } from 'react';
import { QuizAnswers } from '../types';
import { Button } from './Button';

interface SalesPageProps {
  answers: QuizAnswers;
}

// Inline Icons to avoid dependency issues
const CheckIcon = () => (
  <svg className="text-green-600 flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="none" className="inline-block">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const FAQ_ITEMS = [
  { q: "O Método Cresce Cabelo funciona para qualquer tipo de cabelo?", a: "Sim! O método foi desenvolvido considerando as especificidades de cabelos lisos, ondulados, crespos e cacheados, com adaptações específicas no plano." },
  { q: "Em quanto tempo vejo resultados?", a: "A maioria dos homens nota redução da queda na 1ª semana e fios mais grossos a partir da 3ª semana, conforme nosso cronograma." },
  { q: "Preciso comprar produtos caros?", a: "Não. O método foca em técnicas manuais, receitas naturais e ajustes na rotina que você pode fazer com o que já tem ou encontra facilmente." },
  { q: "E se não funcionar para mim?", a: "Oferecemos uma garantia incondicional de 30 dias. Se não notar melhoras, devolvemos 100% do seu dinheiro." },
  { q: "Como acesso o material?", a: "O acesso é imediato e digital. Você receberá os dados de acesso no seu e-mail logo após a confirmação do pagamento." }
];

const RECENT_PURCHASES = [
  { name: "Ricardo S.", loc: "São Paulo, SP" },
  { name: "João P.", loc: "Rio de Janeiro, RJ" },
  { name: "André M.", loc: "Belo Horizonte, MG" },
  { name: "Lucas F.", loc: "Curitiba, PR" },
  { name: "Mateus O.", loc: "Salvador, BA" },
  { name: "Felipe K.", loc: "Porto Alegre, RS" },
  { name: "Bruno T.", loc: "Recife, PE" },
];

export const SalesPage: React.FC<SalesPageProps> = ({ answers }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentTestimonialImage, setCurrentTestimonialImage] = useState(0);
  
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  // Purchase Popup State
  const [notification, setNotification] = useState<{name: string, loc: string} | null>(null);

  const testimonialImages = [
    "https://i.imgur.com/HkpCxQL.jpeg",
    "https://i.imgur.com/G0rhWVs.jpeg",
    "https://i.imgur.com/RQ5ZImt.jpeg"
  ];

  const testimonialTexts = [
    { name: "Marcos, 34 anos", text: "Eu já tinha desistido, mas esse método salvou minha autoestima." },
    { name: "Felipe, 42 anos", text: "Simples e direto. Parei de gastar com remédios inúteis." },
    { name: "Rafael, 28 anos", text: "Impressionante como meu cabelo ficou mais cheio em pouco tempo." }
  ];

  // Carousel Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialImage(prev => (prev + 1) % testimonialImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonialImages.length]);

  // Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Purchase Popup Effect
  useEffect(() => {
    const showRandomNotification = () => {
      const randomUser = RECENT_PURCHASES[Math.floor(Math.random() * RECENT_PURCHASES.length)];
      setNotification(randomUser);
      
      // Hide after 4 seconds
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    };

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(showRandomNotification, 3000);

    // Then show every 15-25 seconds
    const interval = setInterval(() => {
      showRandomNotification();
    }, 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCheckout = () => {
    window.location.href = "https://go.perfectpay.com.br/PPU38CQ6SEO";
  };

  // Personalization logic based on answers
  const getPersonalizedInsights = () => {
    return [
      { label: "Idade", value: answers.age, text: `Aos ${answers.age}, o metabolismo celular desacelera, mas é totalmente possível reverter com estímulo correto.` },
      { label: "Histórico", value: answers.hereditary === "Sim" ? "Hereditário" : "Não Hereditário", text: answers.hereditary === "Sim" ? "Genética forte detectada. O bloqueio de DHT natural será crucial no seu plano." : "Sua queda é provavelmente ambiental/estresse, o que facilita a recuperação rápida." },
      { label: "Estresse", value: answers.stress, text: answers.stress === "Sempre" ? "O cortisol está 'sufocando' seus folículos. Nosso módulo anti-estresse capilar é vital para você." : "Nível de estresse gerenciável, foco total na nutrição do bulbo." },
      { label: "Tempo de Queda", value: answers.noticeTime, text: `Você notou há "${answers.noticeTime}". Quanto mais cedo agirmos, melhor. Ainda há folículos vivos para salvar.` },
      { label: "Objetivo", value: "Densidade", text: "Seu foco em volume e cobertura é o ponto central do ritual de 2 minutos." }
    ];
  };

  const insights = getPersonalizedInsights();

  return (
    <div className="bg-white min-h-screen font-poppins pb-20">
      
      {/* Banner de Desconto - Posicionado estaticamente no topo (não acompanha o scroll) */}
      <div className="w-full bg-red-600 px-4 py-3 text-center shadow-lg">
        <p className="text-white font-bold text-xs md:text-sm">
          Você acabou de ganhar 70% de desconto que expira em : <span className="text-yellow-300 font-mono text-base md:text-lg ml-1">{formatTime(timeLeft)}</span>
        </p>
      </div>

      {/* Purchase Notification Popup */}
      {notification && (
        <div className="fixed top-24 right-2 z-50 bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-2 max-w-[180px] animate-fade-in-down flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-[10px] font-bold shrink-0">
            ✓
          </div>
          <div className="overflow-hidden">
            <p className="text-[9px] text-gray-500 leading-none mb-0.5">Acabou de comprar</p>
            <p className="text-[11px] font-bold text-gray-800 leading-tight truncate">{notification.name}</p>
            <p className="text-[9px] text-gray-400 truncate">{notification.loc}</p>
          </div>
        </div>
      )}

      {/* Header / Intro */}
      <div className="bg-gray-900 text-white p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Aqui está o seu PLANO PESSOAL para fazer seu cabelo crescer mais forte e mais cheio.</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-12">

        {/* Before / After Section */}
        <div className="flex flex-row gap-2 md:gap-4 overflow-hidden">
          <div className="w-1/2 flex flex-col">
            <div className="relative">
              <img 
                src="https://i.imgur.com/qXa3dCh.jpeg" 
                alt="Antes" 
                className="w-full h-48 md:h-64 object-cover rounded-lg shadow-md grayscale" 
                loading="eager"
              />
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">ANTES</div>
            </div>
            <div className="mt-3 space-y-2">
               <p className="text-xs md:text-sm text-red-600 font-bold flex items-center gap-1"><span className="text-lg">✖</span> Entradas profundas</p>
               <p className="text-xs md:text-sm text-red-600 font-bold flex items-center gap-1"><span className="text-lg">✖</span> Couro visível</p>
               <p className="text-xs md:text-sm text-red-600 font-bold flex items-center gap-1"><span className="text-lg">✖</span> Fios finos</p>
               <p className="text-xs md:text-sm text-red-600 font-bold flex items-center gap-1"><span className="text-lg">✖</span> Baixa autoestima</p>
            </div>
          </div>
          <div className="w-1/2 flex flex-col">
            <div className="relative">
              <img 
                src="https://i.imgur.com/CEDBaC0.jpeg" 
                alt="Depois" 
                className="w-full h-48 md:h-64 object-cover rounded-lg shadow-md"
                loading="eager"
              />
              <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">DEPOIS DO MÉTODO</div>
            </div>
            <div className="mt-3 space-y-2">
               <p className="text-xs md:text-sm text-green-700 font-bold flex items-center gap-1"><CheckIcon /> Linha recuperada</p>
               <p className="text-xs md:text-sm text-green-700 font-bold flex items-center gap-1"><CheckIcon /> Volume denso</p>
               <p className="text-xs md:text-sm text-green-700 font-bold flex items-center gap-1"><CheckIcon /> Fios grossos</p>
               <p className="text-xs md:text-sm text-green-700 font-bold flex items-center gap-1"><CheckIcon /> Confiança total</p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-blue-50 p-6 rounded-xl text-center space-y-4 border border-blue-100">
           <p className="font-bold text-lg text-blue-900">
             94% das pessoas com perfil semelhante ao seu percebem melhora no crescimento do cabelo em poucas semanas com o Método CRESCE CABELO.
           </p>
           <p className="text-gray-700">
             Junte-se a milhares de homens que estão usando este ritual de lavagem capilar de 2 minutos para ter cabelos mais grossos e cheios em apenas 10 semanas.
           </p>
        </div>

        {/* Analysis Section */}
        <div className="space-y-6">
           <h2 className="text-2xl font-bold text-center uppercase text-gray-800">Sua Análise Personalizada</h2>
           <p className="text-center text-gray-600 text-sm">Nosso sistema inteligente criou um plano personalizado com base nas suas respostas e objetivos capilares.</p>
           
           <div className="space-y-4">
             {insights.map((item, idx) => (
               <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">{item.value}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{item.text}</p>
               </div>
             ))}
           </div>
        </div>

        {/* What You Get */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center uppercase bg-gray-900 text-white py-3 rounded-lg">O QUE VOCÊ VAI RECEBER?</h2>
          <div className="grid gap-6">
            {[
              { title: "1. Guia Completo Método CRESCE CABELO", desc: "Um passo a passo simples para estimular o crescimento dos fios, fortalecer a raiz e reduzir a queda de cabelo naturalmente." },
              { title: "2. Plano Personalizado", desc: "Um plano criado com base nas suas respostas (idade, nível de queda, rotina e objetivos)." },
              { title: "3. Ritual Capilar Diário de 2 minutos", desc: "Uma rotina rápida e prática para aplicar no dia a dia sem atrapalhar sua vida." },
              { title: "4. Receita do Shampoo Ativador Natural", desc: "Instruções para preparar ou usar corretamente o método que ativa o couro cabeludo e os folículos capilares." },
              { title: "5. Lista de alimentos fortalecedores", desc: "O que comer e o que evitar para acelerar os resultados." },
              { title: "6. Os 5 erros fatais", desc: "Coisas comuns que fazem o cabelo cair mais rápido sem você perceber." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                 <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">{i+1}</div>
                 <div>
                   <h3 className="font-bold text-gray-900">{item.title}</h3>
                   <p className="text-sm text-gray-600">{item.desc}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="space-y-4">
           <h2 className="text-2xl font-bold text-center">O que dizem os nossos clientes</h2>
           <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-xl shadow-lg">
              <img 
                src={testimonialImages[currentTestimonialImage]} 
                alt="Cliente Satisfeito" 
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 backdrop-blur-sm text-white">
                 <div className="flex items-center gap-1 mb-1">
                   {[1,2,3,4,5].map(s => <StarIcon key={s} />)}
                 </div>
                 <p className="font-bold text-sm">{testimonialTexts[currentTestimonialImage].name}</p>
                 <p className="text-xs opacity-90 italic">"{testimonialTexts[currentTestimonialImage].text}"</p>
              </div>
           </div>
        </div>

        {/* Pizza Comparison */}
        <div className="bg-yellow-50 p-8 rounded-xl text-center space-y-4 border border-yellow-200">
           <h2 className="text-2xl font-bold text-yellow-800">🍕 E O MELHOR?</h2>
           <p className="text-gray-800 font-medium">Tudo isso custa menos que uma pizza.</p>
           <p className="text-sm text-gray-600">Um investimento acessível para você começar uma nova rotina, cuidar do seu cabelo e se sentir melhor todos os dias. Invista em você e dê o primeiro passo para a mudança que você merece.</p>
        </div>

        {/* Journey Timeline */}
        <div className="space-y-8">
           <h2 className="text-2xl font-bold text-center">🚀 SUA JORNADA COM O MÉTODO</h2>
           <div className="space-y-6 relative border-l-2 border-green-200 ml-4 pl-8">
              {[
                { time: "✅ 7 Dias — Primeira Semana", points: ["Menos queda de cabelo", "Couro cabeludo mais saudável", "Mais consciência nos seus cuidados", "Sua motivação aumenta"] },
                { time: "✅ 14 Dias — Segunda Semana", points: ["Seu couro cabeludo começa a responder", "Fios mais fortes", "Aparência mais cheia", "Mais confiança ao se olhar no espelho"] },
                { time: "✅ 21 Dias — Terceira Semana", points: ["Mais disciplina", "Mais controle sobre sua rotina", "Sensação de progresso real", "Você sente que está no comando"] }
              ].map((step, idx) => (
                <div key={idx} className="relative">
                   <div className="absolute -left-[41px] top-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>
                   <h3 className="font-bold text-lg text-gray-900 mb-2">{step.time}</h3>
                   <ul className="space-y-1">
                     {step.points.map((p, pIdx) => (
                       <li key={pIdx} className="text-sm text-gray-600 flex items-start gap-2">
                         <span className="text-green-500 mt-1">•</span> {p}
                       </li>
                     ))}
                   </ul>
                </div>
              ))}
           </div>
        </div>

        {/* Bonuses (Updated with exact text) */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-6">
           <div className="text-center">
             <h2 className="text-xl font-bold text-gray-900">🎁 GANHE 5 BÔNUS EXCLUSIVOS</h2>
             <p className="text-red-600 font-bold text-sm animate-pulse mt-1">⏰ Últimas 4 vagas restantes hoje</p>
             <p className="text-sm text-gray-700 mt-2">Ao garantir hoje o Método Cresce Cabelo, você recebe gratuitamente:</p>
           </div>
           
           <div className="space-y-6">
             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold text-sm text-gray-900">🎁 BÔNUS 1 — Plano de Ativação Capilar (30 Dias)</h4>
                <p className="text-xs text-gray-600 mt-1">Protocolo complementar para fortalecer os fios e estimular o crescimento.</p>
                <p className="text-xs text-gray-500 mt-2">Valor: <span className="text-gray-900 font-bold">R$ 97,00</span></p>
             </div>
             
             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold text-sm text-gray-900">🎁 BÔNUS 2 — Rotina de Disciplina Capilar</h4>
                <p className="text-xs text-gray-600 mt-1">Estratégias simples para manter constância e não abandonar o tratamento.</p>
                <p className="text-xs text-gray-600 mt-1">Estratégias simples para manter constância e não abandonar o tratamento.</p>
                <p className="text-xs text-gray-500 mt-2">Valor: <span className="text-gray-900 font-bold">R$ 67,00</span></p>
             </div>

             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold text-sm text-gray-900">🎁 BÔNUS 3 — Método Equilíbrio Nutricional para os Fios</h4>
                <p className="text-xs text-gray-600 mt-1">Práticas para melhorar a alimentação e reduzir fatores que causam queda.</p>
                <p className="text-xs text-gray-500 mt-2">Valor: <span className="text-gray-900 font-bold">R$ 87,00</span></p>
             </div>

             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold text-sm text-gray-900">🎁 BÔNUS 4 — Aula Especial: Hábitos que Bloqueiam o Crescimento do Cabelo</h4>
                <p className="text-xs text-gray-600 mt-1">Descubra comportamentos que estão impedindo seu cabelo de crescer.</p>
                <p className="text-xs text-gray-500 mt-2">Valor: <span className="text-gray-900 font-bold">R$ 127,00</span></p>
             </div>

             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold text-sm text-gray-900">🎁 BÔNUS 5 — Comunidade Exclusiva Cresce Cabelo</h4>
                <p className="text-xs text-gray-600 mt-1">Grupo fechado para apoio, motivação e acompanhamento da jornada.</p>
                <p className="text-xs text-gray-500 mt-2">Valor: <span className="text-gray-900 font-bold">R$ 97,00</span></p>
             </div>
           </div>
           
           <div className="text-center border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500">Valor total dos bônus: <span className="line-through font-bold">R$ 475,00</span></p>
              <p className="font-bold text-green-600 text-lg">🎉 Hoje você recebe tudo 100% grátis</p>
           </div>
        </div>

        {/* Pricing Offer */}
        <div className="bg-white border-2 border-green-500 rounded-2xl p-6 shadow-xl text-center space-y-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">OFERTA ESPECIAL</div>
           
           <div>
             <p className="text-gray-500 line-through text-lg">De R$ 497,00</p>
             <div className="flex items-center justify-center gap-2">
                <span className="text-xl text-green-600 font-bold">✅ Por apenas</span>
                <p className="text-5xl font-extrabold text-green-600 my-2">R$ 37,00</p>
             </div>
             <p className="text-sm text-gray-600">Pagamento único • Acesso vitalício</p>
           </div>

           <Button variant="primary" fullWidth className="text-xl py-6 animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.6)]" onClick={handleCheckout}>
              👉 QUERO O MÉTODO CRESCE CABELO AGORA!
           </Button>
           
           <p className="text-xs text-gray-500">Comece hoje uma rotina simples para fortalecer os fios, estimular o crescimento e recuperar sua autoestima.</p>
        </div>

        {/* Guarantee (Updated with exact text) */}
        <div className="bg-gray-100 p-6 rounded-xl text-center space-y-4">
           <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto text-2xl">🛡️</div>
           <h3 className="font-bold text-xl">GARANTIA TOTAL — RISCO ZERO</h3>
           <p className="text-sm text-gray-600">
             Você tem 30 dias completos para testar o Método Cresce Cabelo.
           </p>
           <p className="text-sm text-gray-600">Se você não perceber:</p>
           <ul className="text-sm text-gray-600 space-y-1">
             <li>Melhora na aparência dos fios</li>
             <li>Mais disciplina nos cuidados</li>
             <li>Satisfação com sua evolução</li>
           </ul>
           <p className="text-sm text-gray-600 font-medium">
             Basta enviar uma mensagem e devolvemos 100% do seu dinheiro.
           </p>
           <p className="text-sm text-gray-600 font-bold">Sem perguntas. Sem burocracia.</p>
        </div>

        {/* Cost Comparison Table (Updated with exact text) */}
        <div className="space-y-4">
           <h2 className="text-xl font-bold text-center">📊 Compare os custos para tentar tratar queda de cabelo</h2>
           <div className="space-y-3">
              <div className="bg-red-50 border border-red-100 p-4 rounded-lg">
                 <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-800">💊 Remédios e suplementos</span>
                 </div>
                 <p className="text-xs text-gray-600">Resultados temporários e alto custo</p>
                 <p className="text-red-600 font-bold mt-1">R$ 1.500 por mês</p>
              </div>

              <div className="bg-red-50 border border-red-100 p-4 rounded-lg">
                 <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-800">👨‍⚕️ Dermatologistas e clínicas</span>
                 </div>
                 <p className="text-xs text-gray-600">Sessões contínuas</p>
                 <p className="text-red-600 font-bold mt-1">R$ 800 por consulta</p>
              </div>

              <div className="bg-red-50 border border-red-100 p-4 rounded-lg">
                 <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-800">💉 Implantes e tratamentos estéticos</span>
                 </div>
                 <p className="text-xs text-gray-600">Riscos e valores elevados</p>
                 <p className="text-red-600 font-bold mt-1">R$ 20.000</p>
              </div>

              <div className="bg-green-50 border-2 border-green-500 shadow-md transform scale-105 p-4 rounded-lg relative">
                 <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-md">✅ MELHOR OPÇÃO</div>
                 <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-green-900">💇‍♂️ Método Cresce Cabelo</span>
                 </div>
                 <p className="text-xs text-green-700">Pagamento único</p>
                 <p className="text-green-700 font-bold mt-1">Apenas R$ 37,00</p>
              </div>
           </div>
        </div>

        {/* Final CTA (Updated with exact text) */}
        <div className="space-y-6 text-center pt-8 border-t">
           <h2 className="text-2xl font-bold">🚦 Agora você tem 2 escolhas…</h2>
           
           <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-left">
              <p className="text-red-600 font-bold flex items-center gap-2 mb-1">❌ Continuar sofrendo com queda de cabelo</p>
              <p className="text-sm text-gray-600 pl-6">Tentando soluções caras e sem constância.</p>
           </div>

           <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-left">
              <p className="text-green-600 font-bold flex items-center gap-2 mb-1">✅ Começar hoje com o Método Cresce Cabelo</p>
              <p className="text-sm text-gray-600 pl-6">Uma rotina simples, prática e acessível para recuperar seus fios.</p>
           </div>

           <Button variant="primary" fullWidth className="text-xl py-6 shadow-[0_0_20px_rgba(34,197,94,0.6)] animate-pulse" onClick={handleCheckout}>
              🔥 QUERO O MÉTODO CRESCE CABELO AGORA!
           </Button>
        </div>

        {/* FAQ */}
        <div className="pt-8">
           <h2 className="text-2xl font-bold text-center mb-6">Perguntas Frequentes</h2>
           <div className="space-y-2">
             {FAQ_ITEMS.map((item, index) => (
               <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                 <button 
                   onClick={() => toggleFaq(index)}
                   className="w-full text-left p-4 bg-gray-50 font-medium flex justify-between items-center focus:outline-none"
                 >
                   {item.q}
                   {openFaq === index ? <ChevronUpIcon /> : <ChevronDownIcon />}
                 </button>
                 {openFaq === index && (
                   <div className="p-4 bg-white text-sm text-gray-600 border-t border-gray-100">
                     {item.a}
                   </div>
                 )}
               </div>
             ))}
           </div>
        </div>

        <div className="text-center text-gray-400 text-xs py-8">
           <p>© 2024 Método Cresce Cabelo. Todos os direitos reservados.</p>
        </div>

      </div>
    </div>
  );
};