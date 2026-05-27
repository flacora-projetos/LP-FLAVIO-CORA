import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';

interface QualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (answers: Record<string, string>) => void;
  ctaLabel: string;
}

const steps = [
  {
    key: 'offerType',
    question: 'Que tipo de oferta você quer divulgar?',
    options: [
      'Serviço local',
      'Clínica / estética / saúde',
      'Imóvel / imobiliária',
      'Curso / evento',
      'Promoção específica',
      'Outro tipo de negócio',
    ],
  },
  {
    key: 'currentAds',
    question: 'Você já anuncia hoje?',
    options: [
      'Sim, no Instagram/Facebook',
      'Sim, no Google',
      'Sim, em mais de uma plataforma',
      'Ainda não anuncio',
      'Estou planejando começar',
    ],
  },
  {
    key: 'mainProblem',
    question: 'Qual é o maior problema nos contatos hoje?',
    options: [
      'Muita gente curiosa',
      'Pessoas chamam sem contexto',
      'Muitos perguntam preço e somem',
      'Poucos contatos chegam no WhatsApp',
      'Quero organizar melhor o atendimento',
    ],
  },
  {
    key: 'filterGoal',
    question: 'O que você gostaria que a página ajudasse a filtrar?',
    options: [
      'Tipo de serviço desejado',
      'Urgência do cliente',
      'Faixa de orçamento',
      'Região de atendimento',
      'Perfil ou necessidade do cliente',
      'Ainda não sei exatamente',
    ],
  },
  {
    key: 'timeframe',
    question: 'Quando você quer colocar isso no ar?',
    options: [
      'O quanto antes',
      'Ainda esta semana',
      'Nos próximos 15 dias',
      'Neste mês',
      'Estou só pesquisando',
    ],
  },
  {
    key: 'identification',
    question: 'Como posso identificar seu pedido?',
    inputs: [
      { key: 'name', label: 'Nome', placeholder: 'Seu nome', required: true },
      { key: 'businessName', label: 'Nome do negócio', placeholder: 'Empresa (opcional)', required: false },
      { key: 'phone', label: 'Seu WhatsApp', placeholder: '(11) 99999-9999', required: false, description: 'Ajuda a identificar melhor seu atendimento quando você chamar.' },
    ],
  },
];

export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  const eventID = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
  
  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  };

  const setCookie = (name: string, value: string, days: number) => {
    if (typeof document === 'undefined') return;
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  };

  const fbp = getCookie('_fbp');
  let fbc = getCookie('_fbc');

  if (!fbc && typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    if (fbclid) {
      fbc = `fb.1.${Date.now()}.${fbclid}`;
      setCookie('_fbc', fbc, 90);
    }
  }

  let externalId = '';
  if (typeof window !== 'undefined') {
    externalId = localStorage.getItem('anon_external_id') || '';
    if (!externalId) {
      externalId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
      localStorage.setItem('anon_external_id', externalId);
    }
  }

  const { name: piiName, phone: piiPhone, ...safeParams } = params;

  if (typeof window !== 'undefined' && 'fbq' in window) {
    // Determine whether to use track or trackCustom based on standard events
    const standardEvents = ['Contact', 'Lead'];
    const trackMethod = standardEvents.includes(eventName) ? 'track' : 'trackCustom';
    
    (window as any).fbq(trackMethod, eventName, safeParams, { eventID });
  }

  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventName,
      eventID,
      customData: params,
      sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
      fbp,
      fbc,
      externalId,
      clientUserAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    }),
  }).catch((err) => console.error('Error sending CAPI event:', err));
};

export function QualificationModal({ isOpen, onClose, onComplete, ctaLabel }: QualificationModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  // For the final step (text inputs)
  const [nameInput, setNameInput] = useState('');
  const [businessInput, setBusinessInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');

  // Track opening
  React.useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setAnswers({});
      setIsFinished(false);
      setNameInput('');
      setBusinessInput('');
      setPhoneInput('');
      document.body.style.overflow = 'hidden';

      trackEvent('FilterOpen', {
        cta_label: ctaLabel,
        page_path: window.location.pathname,
      });
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, ctaLabel]);

  const handleOptionSelect = (key: string, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (currentStep === 0) {
      trackEvent('QualificationStart', { cta_label: ctaLabel, first_answer: value });
    } else {
      trackEvent('QualificationStep', { step_number: currentStep + 1, step_name: key, answer: value, cta_label: ctaLabel });
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishFilter(newAnswers);
    }
  };

  const handleNextInput = () => {
    if (!nameInput.trim()) return;

    const newAnswers = {
      ...answers,
      name: nameInput,
      businessName: businessInput,
      phone: phoneInput,
    };
    setAnswers(newAnswers);
    trackEvent('QualificationStep', { step_number: currentStep + 1, step_name: 'identification', cta_label: ctaLabel });
    finishFilter(newAnswers);
  };

  const finishFilter = (finalAnswers: Record<string, string>) => {
    setIsFinished(true);
    trackEvent('QualificationComplete', {
      cta_label: ctaLabel,
      offer_type: finalAnswers.offerType,
      current_ads: finalAnswers.currentAds,
      main_problem: finalAnswers.mainProblem,
      filter_goal: finalAnswers.filterGoal,
      timeframe: finalAnswers.timeframe,
      name: finalAnswers.name,
      phone: finalAnswers.phone,
    });
    trackEvent('Lead', {
      content_name: 'LP de qualificação WhatsApp Ads',
      lead_type: 'qualified_whatsapp_lead',
      cta_label: ctaLabel,
      name: finalAnswers.name,
      phone: finalAnswers.phone,
    });
  };

  const handleWhatsAppRedirect = () => {
    trackEvent('Contact', {
      destination: 'whatsapp',
      cta_label: 'filtro_finalizado',
      lead_type: 'qualified_whatsapp_lead',
      content_name: 'LP de qualificação WhatsApp Ads',
      offer_type: answers.offerType,
      current_ads: answers.currentAds,
      main_problem: answers.mainProblem,
      filter_goal: answers.filterGoal,
      timeframe: answers.timeframe,
      name: answers.name,
      phone: answers.phone,
    });
    
    // Trigger GA4 event
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'generate_lead', {
        method: 'WhatsApp',
        event_category: 'Contact',
        event_label: 'WhatsApp Filter Complete'
      });
    }

    // Call parent handler to do the actual redirect logic which will format the URL
    onComplete(answers);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center sm:items-center sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-earth-900/60 backdrop-blur-sm"
          onClick={onClose}
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          className="relative bg-[#FFFDF8] w-full sm:max-w-lg h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border-t sm:border border-sand-400"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-sand-400/50 bg-white z-10 shrink-0">
            <div>
              <p className="text-xs font-bold text-terracotta uppercase tracking-wider mb-1">Passo a passo</p>
              <h2 className="text-lg font-bold text-earth-900 leading-tight">
                {isFinished ? 'Tudo certo!' : 'Vamos entender sua necessidade?'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-sand-100 text-earth-800 hover:bg-sand-400/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isFinished && (
            <div className="bg-sand-50 h-1.5 w-full shrink-0">
              <div 
                className="bg-terracotta h-full transition-all duration-300 ease-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 sm:pb-8 flex flex-col">
            {!isFinished ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col"
                >
                  <p className="text-[15px] font-medium text-earth-800 mb-6 bg-sand-100 inline-block px-3 py-1.5 rounded-lg border border-sand-400 self-start">
                    Pergunta {currentStep + 1} de {steps.length}
                  </p>
                  
                  <h3 className="text-2xl font-extrabold text-earth-900 mb-6 leading-tight">
                    {steps[currentStep].question}
                  </h3>

                  {steps[currentStep].options ? (
                    <div className="flex flex-col gap-3 mt-auto sm:mt-0">
                      {steps[currentStep].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(steps[currentStep].key, option)}
                          className="w-full text-left px-5 py-4 rounded-[14px] bg-white border border-sand-400 shadow-sm hover:border-terracotta/50 hover:bg-sand-50 transition-all font-bold text-earth-900 text-[16px] flex items-center justify-between group"
                        >
                          {option}
                          <ArrowRight className="w-5 h-5 text-sand-400 group-hover:text-terracotta transition-colors" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5 mt-auto sm:mt-0">
                      <div>
                        <label className="block text-sm font-bold text-earth-900 mb-1.5">Seu nome</label>
                        <input 
                          type="text" 
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          placeholder="Ex: João Silva"
                          className="w-full px-4 py-3.5 rounded-[12px] bg-white border border-sand-400 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent font-medium text-earth-900 placeholder:text-earth-800/40"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-earth-900 mb-1.5">Nome do negócio <span className="text-earth-800 font-normal">(Opcional)</span></label>
                        <input 
                          type="text" 
                          value={businessInput}
                          onChange={(e) => setBusinessInput(e.target.value)}
                          placeholder="Ex: Clínica Sorriso"
                          className="w-full px-4 py-3.5 rounded-[12px] bg-white border border-sand-400 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent font-medium text-earth-900 placeholder:text-earth-800/40"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-earth-900 mb-1.5">Seu WhatsApp <span className="text-earth-800 font-normal">(Opcional)</span></label>
                        <input 
                          type="tel" 
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="w-full px-4 py-3.5 rounded-[12px] bg-white border border-sand-400 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent font-medium text-earth-900 placeholder:text-earth-800/40 mb-1"
                        />
                        <p className="text-xs text-earth-800">Ajuda a identificar melhor seu atendimento quando você chamar.</p>
                      </div>
                      
                      <button
                        onClick={handleNextInput}
                        disabled={!nameInput.trim()}
                        className="mt-4 w-full bg-terracotta text-white font-bold py-4 rounded-[14px] shadow-md hover:bg-caramel disabled:opacity-50 disabled:hover:bg-terracotta transition-colors flex items-center justify-center"
                      >
                        Ver tudo pronto
                      </button>
                      <p className="text-[11px] text-center text-earth-800/80 mt-1 pb-1">
                        Suas informações serão usadas apenas para preparar o atendimento e melhorar a mensuração da campanha.
                      </p>
                    </div>
                  )}
                  
                  {currentStep > 0 && (
                    <button 
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="mt-6 font-medium text-earth-800 hover:text-terracotta flex items-center justify-center gap-2 self-center sm:self-start py-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Voltar etapa
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center text-center justify-center py-4 sm:py-8"
              >
                <div className="w-16 h-16 bg-[#25D366]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#25D366]/30">
                  <MessageCircle className="w-8 h-8 text-[#25D366]" />
                </div>
                <h3 className="text-2xl font-extrabold text-earth-900 mb-3 leading-tight">
                  Já organizei suas respostas.
                </h3>
                <p className="text-[16px] text-earth-800 mb-8 font-medium max-w-sm">
                  Agora é só me enviar no WhatsApp para eu entender seu caso com mais clareza.
                </p>
                
                <div className="bg-sand-50 rounded-xl p-4 text-left border border-sand-400 w-full mb-8 text-[14px] text-earth-800 font-medium">
                  <div className="flex justify-between mb-2 pb-2 border-b border-sand-400/50">
                    <span>Oferta:</span> <span className="font-bold text-earth-900">{answers.offerType}</span>
                  </div>
                  <div className="flex justify-between mb-2 pb-2 border-b border-sand-400/50">
                    <span>Problema:</span> <span className="font-bold text-earth-900 text-right max-w-[60%]">{answers.mainProblem}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Filtro:</span> <span className="font-bold text-earth-900">{answers.filterGoal}</span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold text-[16px] px-8 py-4 shadow-lg shadow-[#25D366]/30 transition-all rounded-[14px] flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" /> Enviar mensagem no WhatsApp
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
