import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Users,
  User,
  Phone,
  Smile,
  Mic,
  Target,
  LayoutTemplate,
  Rocket,
  Zap,
  MousePointerClick,
  Smartphone,
  ShieldCheck,
  PanelTop,
  Briefcase,
  Layers,
  Search,
  MessageCircle,
  Lightbulb,
  Crosshair,
  Presentation,
  TrendingUp,
  ChevronDown,
  Megaphone,
} from 'lucide-react';

const waLink =
  'https://wa.me/5562999465725?text=Ol%C3%A1%2C%20quero%20criar%20uma%20landing%20page%20para%20minha%20oferta.';

export const trackContactEvent = () => {
  const eventID = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
  
  // Extract fbp and fbc cookies if present
  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  };
  
  const fbp = getCookie('_fbp');
  const fbc = getCookie('_fbc');

  // Trigger frontend event with eventID for deduplication
  if (typeof window !== 'undefined' && 'fbq' in window) {
    (window as any).fbq('track', 'Contact', {}, { eventID });
  }

  // Trigger GA4 event
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'generate_lead', {
      method: 'WhatsApp',
      event_category: 'Contact',
      event_label: 'WhatsApp Button'
    });
  }

  // Trigger backend CAPI event
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventName: 'Contact',
      eventID,
      sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
      fbp,
      fbc,
    }),
  }).catch((err) => console.error('Error sending CAPI event:', err));
};

const getImageSrc = (id: string) => `https://lh3.googleusercontent.com/d/${id}?v=${Date.now()}`;

const images = {
  comoFunciona: getImageSrc('1wnPEFSubXFwyBCjpz8J3Ask6uBFxs77T'),
  evolucaoLead: getImageSrc('1MrsUT4wWwu3fzePYJzRlh3uVM7_7mQ5x'),
  mosaico: getImageSrc('1pdF12mPub6l8lQ6w8IRg5f-8D76mW-du'),
  paginaQualificacao: getImageSrc('1JLHrPXSkRh5W8mAgHCxPHRKgp86xkr_8'),
  prof1: getImageSrc('1KMiw6v10t4yhN2Kv0WIFw9Zb68NivKIj'),
  prof2: getImageSrc('1lBDULsl8cOLMMfzQoakhm4vd2hQG11hc'),
  prof3: getImageSrc('1zudYJnyM78gWQlzSKghrZRcYEH_md7Ou'),
  prof4: getImageSrc('1wa0g7YNL97QT-UgsXGT7tzD4M1QC3bM_'),
};

const FadeIn = ({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

const Section = ({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`py-20 md:py-32 px-6 scroll-mt-24 ${className}`}>
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);

const Button = ({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-bold rounded-[14px] transition-all duration-300 px-8 py-4 text-[16px]';
  const primaryStyle =
    'bg-terracotta text-white shadow-md shadow-terracotta/20 hover:bg-caramel hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0';
  const secondaryStyle =
    'bg-transparent border border-sand-400 text-earth-900 hover:bg-sand-400/20 active:bg-sand-400/40';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only track "Contact" if it's a WhatsApp link or primary CTA
    if (href.includes('wa.me') || variant === 'primary') {
      trackContactEvent();
    }
  };

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className={`${baseStyle} ${variant === 'primary' ? primaryStyle : secondaryStyle} ${className}`}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

const Card = ({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text?: string;
}) => (
  <div className="h-full bg-white p-8 rounded-2xl border border-sand-400 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
    <div className="bg-sand-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shrink-0">
      <Icon className="w-6 h-6 text-copper" />
    </div>
    <h3 className="text-xl font-bold text-earth-900 mb-2">{title}</h3>
    {text && <p className="text-earth-800 leading-relaxed font-medium max-w-[95%]">{text}</p>}
  </div>
);

const InteractiveImage = ({
  src,
  alt,
  className = '',
  containerClass = 'bg-white p-2 md:p-3',
  imageClass = 'h-auto object-contain',
}: {
  src: string;
  alt: string;
  className?: string;
  containerClass?: string;
  imageClass?: string;
}) => (
  <div className={`rounded-[32px] md:rounded-[36px] relative border border-sand-400/20 shadow-xl shadow-earth-900/5 flex items-center justify-center ${containerClass} ${className}`}>
    <motion.img
      src={src}
      alt={alt}
      className={`w-full rounded-[24px] md:rounded-[28px] transform-gpu origin-center cursor-default ${imageClass}`}
      initial={{ scale: 1.02 }}
      whileInView={{ scale: 1 }}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px 0px -10% 0px' }}
    />
  </div>
);



export default function App() {
  return (
    <div className="min-h-screen bg-sand-100 font-sans selection:bg-terracotta/20">
      {/* Navbar Minimalist */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-sand-100/90 backdrop-blur-md border-b border-sand-400/20 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-semibold text-earth-900 text-xl tracking-tight">
            
          </div>
          <div className="flex items-center gap-8">
            <a
              href="#para-quem-e"
              className="text-earth-800 hover:text-terracotta transition-colors text-sm font-medium"
            >
              Para quem é
            </a>
            <a
              href="#como-funciona"
              className="text-earth-800 hover:text-terracotta transition-colors text-sm font-medium"
            >
              Como funciona
            </a>
            <Button href={waLink} className="px-5 py-2.5 text-sm">
              Falar comigo
            </Button>
          </div>
        </div>
      </nav>

      <main className="md:pt-20">
        {/* 1. Hero */}
        <section className="relative min-h-[auto] lg:min-h-[90vh] flex items-center pt-24 md:pt-24 pb-16 md:pb-24 px-6 overflow-hidden border-b border-sand-400 bg-sand-100">
          
          {/* Background integrado para Desktop */}
          <div className="hidden lg:block absolute inset-0 z-0 overflow-hidden">
             {/* Leve brilho quente (radial-gradient) atrás do celular */}
             <div className="absolute top-0 right-0 w-[50%] h-full bg-[radial-gradient(circle_at_center,rgba(230,222,213,0.7)_0%,transparent_70%)]"></div>
             
             {/* Imagem do Mockup */}
             <img 
                 src={images.paginaQualificacao} 
                 alt="Mockup Celular" 
                 className="absolute top-0 right-0 w-[55%] h-full object-cover object-[center_right] opacity-100"
             />
             
             {/* Overlay com gradiente solicitado para fusão e leitura do texto */}
             <div 
                className="absolute inset-0 pointer-events-none" 
                style={{
                   background: 'linear-gradient(to right, #F7F4EF 0%, rgba(247,244,239,0.95) 45%, rgba(247,244,239,0.45) 75%, rgba(247,244,239,0) 100%)'
                }}
             ></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10 w-full grid lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center text-left">
            {/* Texto à esquerda */}
            <div className="pt-2 md:pt-8 w-full max-w-full">
              <FadeIn>
                <div className="inline-flex items-center bg-white border border-sand-400 shadow-sm rounded-full px-4 py-1.5 mb-6">
                  <span className="text-[13px] sm:text-sm font-bold text-earth-900 flex items-center gap-2 tracking-wide uppercase">
                    <Target className="w-4 h-4 text-copper" /> Qualifique seus contatos
                  </span>
                </div>
                <h1 className="text-[36px] sm:text-[42px] md:text-5xl lg:text-[4rem] font-extrabold tracking-tight text-earth-900 leading-[1.05] mb-5 w-full break-words">
                  Seus anúncios levam para o WhatsApp, mas os leads chegam
                  sem contexto?
                </h1>
                <p className="text-[17px] sm:text-[19px] md:text-[21px] text-earth-800 leading-relaxed max-w-[540px] font-medium mb-8">
                  Crio páginas de qualificação para campanhas de WhatsApp Ads,
                  com perguntas simples antes do atendimento. Receba contatos mais organizados e prontos para comprar.
                </p>
                
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 md:gap-4 text-earth-900 font-bold mb-10 text-[13px] sm:text-[14px] md:text-base pb-2">
                  <span className="flex items-center gap-1.5 md:gap-2 bg-white px-3 py-2 md:px-3 md:py-2 rounded-xl border border-sand-400 shadow-sm"><Megaphone className="w-4 h-4 text-copper"/> Anúncio</span>
                  <ArrowRight className="w-4 h-4 text-earth-800 shrink-0 hidden sm:block" />
                  <span className="flex items-center gap-1.5 md:gap-2 bg-white px-3 py-2 md:px-3 rounded-xl border border-sand-400 shadow-sm"><LayoutTemplate className="w-4 h-4 text-copper"/> Filtro</span>
                  <ArrowRight className="w-4 h-4 text-earth-800 shrink-0 hidden sm:block" />
                  <span className="flex items-center gap-1.5 md:gap-2 bg-[#25D366]/10 text-[#128C7E] px-3 py-2 md:px-3 rounded-xl border border-[#25D366]/30 shadow-sm mt-2 sm:mt-0"><MessageCircle className="w-4 h-4"/> WhatsApp</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full">
                  <Button href={waLink} className="w-full sm:w-auto flex-1 sm:flex-none text-[15px] sm:text-base font-bold">
                    Criar minha página de qualificação
                    <ArrowRight className="ml-2 w-5 h-5 shrink-0" />
                  </Button>
                  <Button href="#como-funciona" variant="secondary" className="w-full sm:w-auto flex-1 sm:flex-none bg-white border-sand-400 font-bold hover:bg-sand-50 text-[15px] sm:text-base">
                    Ver como funciona
                  </Button>
                </div>
              </FadeIn>
            </div>
            
            {/* Mobile Imagem Direita (context card) */}
            <div className="lg:hidden mt-10 w-full flex justify-center">
              <FadeIn delay={0.2} className="relative z-10 w-full max-w-sm">
                <div className="bg-white rounded-2xl shadow-sm border border-sand-400/30 overflow-hidden">
                  <div className="p-4 border-b border-sand-400/10 text-center bg-white">
                    <h3 className="font-semibold text-earth-900 text-[15px] mb-3">Como o lead chega melhor</h3>
                    <div className="flex flex-col gap-2 items-center text-earth-800">
                      <div className="flex flex-wrap justify-center items-center gap-2 text-[11px] sm:text-[12px] font-medium">
                        <span className="flex items-center gap-1 bg-sand-50 px-2 py-1 rounded-md border border-sand-400/20"><Megaphone className="w-3 h-3 text-copper"/> Anúncio</span>
                        <ArrowRight className="w-3 h-3 text-sand-400" />
                        <span className="flex items-center gap-1 bg-sand-50 px-2 py-1 rounded-md border border-sand-400/20"><LayoutTemplate className="w-3 h-3 text-copper"/> Filtro</span>
                        <ArrowRight className="w-3 h-3 text-sand-400" />
                        <span className="flex items-center gap-1 bg-[#25D366]/10 px-2 py-1 rounded-md border border-[#25D366]/20 text-[#128C7E]"><MessageCircle className="w-3 h-3"/> WhatsApp</span>
                      </div>
                      <p className="mt-1 text-[13px] font-medium">A pessoa responde antes de chamar.</p>
                    </div>
                  </div>
                  <div className="relative p-6 pt-5 flex justify-center bg-sand-50/50">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(233,216,199,0.5)_0%,transparent_70%)] blur-2xl"></div>
                    <img
                      src={images.paginaQualificacao}
                      alt="Página de Qualificação contextualizada"
                      className="w-full max-w-[260px] h-auto drop-shadow-xl relative z-10 object-contain rounded-[1rem]"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 2. Problema */}
        <Section className="bg-sand-50 border-y border-sand-400/50">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16 px-4">
              <h2 className="text-[32px] sm:text-4xl md:text-5xl font-extrabold text-earth-900 mb-6 tracking-tight leading-tight">
                Nem toda conversa no WhatsApp é um bom lead
              </h2>
              <p className="text-[17px] md:text-xl text-earth-800 leading-relaxed max-w-2xl mx-auto font-medium">
                Muitas campanhas geram mensagens, mas parte dos contatos chega 
                sem informação ou só perguntando preço. Isso toma tempo do atendimento.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto px-4">
              {[
                { text: 'Muitos curiosos chegando no WhatsApp', icon: Users },
                { text: 'Pouca informação antes do atendimento', icon: Search },
                { text: 'Dificuldade para saber quais leads são bons', icon: Target },
                { text: 'Campanhas focadas em volume, não qualidade', icon: TrendingUp },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-sand-400 rounded-2xl p-6 flex flex-col items-center gap-4 shadow-sm text-center transform transition-transform hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-xl bg-sand-100 flex items-center justify-center shrink-0 border border-sand-400/50">
                    <item.icon className="w-6 h-6 text-copper" />
                  </div>
                  <span className="text-earth-900 font-bold text-[15px] md:text-base leading-snug">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </Section>

        {/* 3. Solução */}
        <Section className="bg-white border-b border-sand-400/30">
          <div className="grid lg:grid-cols-[48%_52%] gap-10 lg:gap-16 items-center max-w-[1240px] mx-auto px-4">
            <FadeIn>
              <div className="inline-flex items-center bg-sand-100 border border-sand-400 rounded-full px-3 py-1 mb-5">
                <span className="text-[12px] font-bold text-earth-900 tracking-wide uppercase">
                  O fluxo ideal
                </span>
              </div>
              <h2 className="text-[32px] sm:text-[38px] md:text-4xl lg:text-5xl font-extrabold text-earth-900 mb-5 break-words tracking-tight leading-[1.1]">
                Seu lead chega no WhatsApp sabendo o que quer
              </h2>
              <p className="text-[17px] md:text-lg text-earth-800 mb-8 leading-relaxed font-medium max-w-[500px]">
                A página organiza as respostas do visitante e prepara uma mensagem com contexto para iniciar a conversa estruturada.
              </p>
              
              <div className="flex flex-col gap-4">
                 {/* Card 1 */}
                 <div className="bg-sand-50 border border-sand-400 rounded-[14px] p-4 lg:p-5 shadow-sm flex items-start gap-4">
                   <div className="w-10 h-10 rounded-xl bg-white border border-sand-400 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                     <Megaphone className="w-5 h-5 text-copper"/>
                   </div>
                   <div>
                     <div className="font-bold text-earth-900 text-base mb-1">1. Anúncio Meta</div>
                     <p className="text-earth-800 text-[14px] font-medium">A pessoa clica no anúncio e demonstra interesse na oferta.</p>
                   </div>
                 </div>
                 
                 <ArrowRight className="w-5 h-5 text-earth-800 mx-auto rotate-90 my-[-4px]" />
                 
                 {/* Card 2 */}
                 <div className="bg-white border-2 border-copper shadow-md rounded-[14px] p-4 lg:p-5 relative flex items-start gap-4">
                   <div className="w-10 h-10 rounded-xl bg-terracotta shadow-sm flex items-center justify-center shrink-0 mt-0.5">
                      <LayoutTemplate className="w-5 h-5 text-white"/>
                   </div>
                   <div className="flex-1">
                     <div className="font-extrabold text-earth-900 text-base mb-1">2. Página de qualificação</div>
                     <p className="text-earth-800 text-[14px] mb-3 font-medium">Filtra intenção antes do WhatsApp.</p>
                     
                     <div className="inline-flex items-start gap-2 bg-sand-50 border border-sand-400 px-3 py-2 rounded-lg text-[13px] font-medium w-full max-w-full">
                       <Zap className="w-4 h-4 text-copper shrink-0 mt-0.5"/>
                       <span className="text-earth-900 leading-relaxed"><strong className="text-copper font-bold">Lado Comercial:</strong> Evento de lead enviado para otimizar a campanha.</span>
                     </div>
                   </div>
                 </div>
                 
                 <ArrowRight className="w-5 h-5 text-earth-800 mx-auto rotate-90 my-[-4px]" />
                 
                 {/* Card 3 */}
                 <div className="bg-[#FFFDF8] border border-[#25D366]/40 shadow-sm rounded-[14px] p-4 lg:p-5 flex items-start gap-4">
                   <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center shrink-0 mt-0.5">
                     <MessageCircle className="w-5 h-5 text-[#128C7E]"/>
                   </div>
                   <div>
                     <div className="font-bold text-earth-900 text-base mb-1">3. Atendimento com contexto</div>
                     <p className="text-earth-800 text-[14px] font-medium">Você recebe o contato estruturado, reduzindo tempo gasto.</p>
                   </div>
                 </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2} className="relative z-10 w-full mt-10 lg:mt-0 lg:pl-10 flex justify-center">
              <div className="relative w-full max-w-[360px] md:max-w-[420px] mx-auto">
                 {/* Glow and shadow for integration */}
                 <div className="absolute inset-0 bg-[#25D366] blur-[100px] rounded-full opacity-15 mix-blend-multiply pointer-events-none transform scale-90 translate-y-8"></div>
                 
                 {/* WhatsApp Mockup */}
                 <div className="relative bg-[#EFEAE2] rounded-[2rem] overflow-hidden border-[6px] border-white shadow-2xl flex flex-col h-[520px] md:h-[600px] ring-1 ring-sand-400/20 max-w-full">
                   
                   {/* Header */}
                   <div className="bg-[#075E54] px-4 md:px-5 py-3 md:py-4 flex items-center gap-3 shrink-0 shadow-md relative z-10">
                     <div className="w-9 h-9 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                       <User className="w-5 h-5 md:w-6 md:h-6 text-white/80" />
                     </div>
                     <div className="flex-1 min-w-0">
                       <div className="font-semibold text-white truncate text-[15px] md:text-[17px]">Contato recebido</div>
                       <div className="text-xs text-white/80 truncate">online</div>
                     </div>
                     <Phone className="w-4 h-4 md:w-5 md:h-5 text-white/90 shrink-0" />
                   </div>
                   
                   {/* Chat Area */}
                   <div className="flex-1 p-4 md:p-5 lg:p-6 overflow-y-auto flex flex-col gap-4 relative justify-end pb-8">
                     {/* Background Pattern (Optional subtle element) */}
                     <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
                     
                     {/* Data badge */}
                     <div className="flex justify-center mb-1 relative z-10">
                       <div className="bg-[#E1F3FB] text-[#4A6877] text-[10px] md:text-[11px] font-medium px-2.5 py-1 rounded-lg shadow-sm">
                         HOJE
                       </div>
                     </div>
                     
                     {/* Message bubble */}
                     <div className="bg-white rounded-2xl rounded-tl-sm p-3.5 md:p-4 shadow-sm w-[92%] lg:w-[85%] relative border border-black/5 self-start text-earth-900 text-[14px] md:text-[15px] leading-relaxed max-w-full z-10">
                       <div className="absolute top-0 -left-2 w-0 h-0 border-[8px] border-transparent border-t-white border-r-white"></div>
                       
                       <p className="mb-3">
                         Olá! Vim pelo anúncio e respondi a qualificação:
                       </p>
                       
                       <div className="flex flex-col gap-1 mb-3">
                         <div>*Serviço:* Limpeza residencial</div>
                         <div>*Urgência:* Esta semana</div>
                         <div>*Orçamento:* R$ 300 a R$ 500</div>
                         <div>*Melhor horário:* Manhã</div>
                         <div>*Origem:* Anúncio Meta</div>
                       </div>
                       
                       <p>
                         Quero saber mais sobre as opções.
                       </p>
                       
                       <div className="text-[10px] text-earth-800/60 text-right mt-1 font-medium">
                         09:41
                       </div>
                     </div>
                   </div>
                   
                   {/* Input Area */}
                   <div className="bg-[#F0F0F0] px-3 md:px-4 py-2.5 md:py-3 flex items-center gap-2.5 md:gap-3 shrink-0 mt-auto relative z-10">
                     <Smile className="w-5 h-5 md:w-6 md:h-6 text-earth-800/60 shrink-0" />
                     <div className="flex-1 bg-white rounded-full px-3 md:px-4 py-1.5 md:py-2 text-earth-800/60 text-[13px] md:text-sm shadow-sm border border-black/5 min-w-0">
                       Mensagem
                     </div>
                     <Mic className="w-5 h-5 md:w-6 md:h-6 text-earth-800/60 shrink-0" />
                   </div>
                 </div>
                 
                 <div className="mt-6 text-center text-sm font-medium text-earth-800 bg-sand-50 py-2 px-4 rounded-xl inline-block mx-auto border border-sand-400/20 shadow-sm w-full">
                   O lead chega com contexto para facilitar a conversa.
                 </div>
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* 4. Como funciona */}
        <Section id="como-funciona" className="bg-sand-100 border-t border-sand-400">
          <div className="max-w-[1240px] mx-auto">
            <FadeIn className="text-center max-w-3xl mx-auto mb-10 md:mb-14 px-4">
              <div className="inline-flex items-center bg-white border border-sand-400 shadow-sm rounded-full px-3 py-1 mb-5">
                <span className="text-[12px] font-bold text-earth-900 tracking-wide uppercase">
                  O Passo a Passo
                </span>
              </div>
              <h2 className="text-[32px] sm:text-[38px] md:text-4xl lg:text-5xl font-extrabold text-earth-900 mb-4 tracking-tight">
                Como funciona na prática
              </h2>
              <p className="text-earth-800 text-lg md:text-xl font-medium leading-relaxed">
                Entre o clique no anúncio e a conversa no WhatsApp, a página organiza as informações do lead.
              </p>
            </FadeIn>

            <FadeIn className="mb-12 max-w-[960px] mx-auto w-full relative px-4">
              <div className="bg-white p-2.5 sm:p-5 rounded-2xl shadow-md border border-sand-400 relative z-10 w-full overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-sand-50/50 to-white/60 pointer-events-none"></div>
                 <img
                   src={images.comoFunciona}
                   alt="Como funciona o funil"
                   className="w-full h-auto object-contain relative z-10 rounded-xl"
                 />
              </div>
            </FadeIn>

            <div className="max-w-[1120px] mx-auto relative mb-12 px-4">
              {/* Desktop connector line */}
              <div className="hidden lg:block absolute top-[35px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-sand-400 to-transparent z-0"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-5 relative z-10">
                {[
                  { num: '1', title: 'Clique', text: 'A pessoa clica no seu anúncio do Facebook/Instagram.' },
                  { num: '2', title: 'Acesso', text: 'Acessa uma página rápida e focada na oferta.' },
                  { num: '3', title: 'Filtro', text: 'Responde perguntas simples de qualificação.', highlight: true },
                  { num: '4', title: 'Registro', text: 'As informações são salvas e eventos são emitidos.' },
                  { num: '5', title: 'WhatsApp', text: 'O lead é enviado para a conversa com o contexto pronto.', highlight: true },
                ].map((step, i) => (
                  <div key={i} className="relative group">
                    {/* Mobile vertical connector */}
                    {i < 4 && (
                       <div className="lg:hidden absolute left-[35px] sm:left-[39px] top-[60px] bottom-[-24px] w-[2px] bg-sand-400 z-0"></div>
                    )}
                    
                    <FadeIn delay={i * 0.1} className={`h-full bg-white p-5 lg:p-6 rounded-2xl transition-all flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-4 lg:gap-4 relative z-10 border ${step.highlight ? 'border-terracotta shadow-md' : 'border-sand-400 shadow-sm'}`}>
                      
                      <div className={`w-12 h-12 lg:w-16 lg:h-16 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-bold text-lg lg:text-xl shrink-0 transition-colors ${step.highlight ? 'bg-terracotta text-white' : 'bg-sand-100 text-earth-900 border border-sand-400'}`}>
                        {step.num}
                      </div>
                      
                      <div className="flex-1 mt-0.5 lg:mt-0">
                        <h3 className="font-bold text-[17px] lg:text-lg mb-1 lg:mb-2 text-earth-900 tracking-tight">{step.title}</h3>
                        <p className="text-[14px] lg:text-[14.5px] text-earth-800 leading-relaxed font-medium lg:w-[110%] lg:-ml-[5%]">{step.text}</p>
                      </div>
                    </FadeIn>
                  </div>
                ))}
              </div>
            </div>
            
            <FadeIn delay={0.5} className="text-center px-4">
              <div className="inline-flex items-center gap-3 text-[14px] md:text-[15px] font-bold text-earth-900 bg-white px-5 md:px-7 py-3 md:py-3.5 rounded-[14px] border border-sand-400 shadow-sm max-w-full text-left md:text-center leading-relaxed">
                <Zap className="w-5 h-5 text-terracotta shrink-0 hidden md:block" />
                <span className="flex-1 break-words">
                  Esses dados ajudam a campanha a entender melhor quais contatos têm mais valor para otimização.
                </span>
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* 5. Exemplos de Perguntas */}
        <Section className="bg-white border-t border-sand-400/50">
          <div className="max-w-4xl mx-auto px-4">
             <FadeIn className="text-center mb-12">
               <h2 className="text-[32px] sm:text-4xl md:text-5xl font-extrabold text-earth-900 mb-6 tracking-tight leading-tight">
                 Perguntas simples que ajudam a separar curiosos de oportunidades
               </h2>
               <p className="text-[17px] md:text-xl text-earth-800 leading-relaxed max-w-2xl mx-auto font-medium">
                 As perguntas são adaptadas para cada negócio, sem deixar o processo longo ou cansativo.
               </p>
             </FadeIn>
             
             <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {[
                  'Qual serviço você procura?',
                  'Em qual cidade você está?',
                  'Para quando precisa do atendimento?',
                  'Qual o seu nível de urgência?',
                  'Sua empresa já investe em tráfego?',
                  'Qual seu orçamento aproximado?',
                ].map((pergunta, i) => (
                  <React.Fragment key={i}>
                    <FadeIn delay={i * 0.1}>
                      <div className="bg-[#FFFDF8] border border-sand-400 p-4 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-2.5 h-2.5 rounded-sm bg-terracotta shrink-0"></div>
                        <span className="font-bold text-earth-900 text-[15px]">{pergunta}</span>
                      </div>
                    </FadeIn>
                  </React.Fragment>
                ))}
             </div>
          </div>
        </Section>

        {/* 6. Para quem serve */}
        <Section id="para-quem-e" className="bg-[#1C1A18] text-sand-50 py-16 md:py-24 overflow-hidden relative border-y border-earth-900">
          <div className="max-w-[1240px] mx-auto grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center px-4">
            
            {/* Esquerda: Texto */}
            <FadeIn className="flex flex-col">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-xs font-bold text-sand-100 mb-6 self-start tracking-wide uppercase">
                Para quem é
              </div>
              
              <h2 className="text-[36px] sm:text-[42px] md:text-5xl lg:text-[54px] font-extrabold mb-6 text-white leading-[1.05] tracking-tight">
                Ideal para quem anuncia<br className="hidden sm:block" /> e atende pelo WhatsApp
              </h2>
              
              <p className="text-sand-100/90 text-[17px] md:text-[19px] font-medium leading-relaxed mb-8 max-w-[500px]">
                Se sua campanha gera conversas, uma página de qualificação ajuda a filtrar melhor quem realmente tem intenção antes do atendimento.
              </p>
              
              <div className="flex flex-col gap-3 mb-10 w-full max-w-[520px]">
                {[
                  'Prestadores de serviço em geral',
                  'Clínicas de saúde e estética',
                  'Corretores e imobiliárias',
                  'Venda de cursos e eventos',
                  'Campanhas de promoções específicas',
                  'Empresas com alto volume de mensagens',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-[#262320] border border-white/10 px-4 py-3.5 rounded-xl hover:bg-white/10 transition-colors shadow-sm">
                    <div className="w-6 h-6 rounded-md bg-terracotta flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-bold text-[15px] md:text-[16px] leading-tight">{item}</span>
                  </div>
                ))}
              </div>
              
              <Button href={waLink} className="w-full sm:w-auto self-start bg-terracotta text-white hover:bg-caramel border-none text-[15px] sm:text-base font-bold px-6 md:px-8 py-3.5 md:py-4 shadow-lg shadow-terracotta/20 rounded-xl">
                Ver se serve para meu negócio
              </Button>
            </FadeIn>

            {/* Direita: Mosaico */}
            <FadeIn delay={0.2} className="relative w-full mt-10 lg:mt-0 lg:pl-10">
              <div className="relative w-full max-w-[420px] lg:max-w-[500px] mx-auto">
                {/* Glow and effects */}
                <div className="absolute inset-0 bg-terracotta/10 blur-[100px] rounded-full pointer-events-none transform scale-90 translate-y-4"></div>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 relative z-10 items-center">
                  {/* Coluna 1 do Grid */}
                  <div className="flex flex-col gap-3 sm:gap-4 w-full transform -translate-y-4 md:-translate-y-8">
                     <div className="bg-[#262320] border border-white/10 p-2 sm:p-3 rounded-2xl md:rounded-[2rem] shadow-xl shadow-black/40 overflow-hidden ml-auto w-full md:w-[95%]">
                       <img src={images.prof1} className="w-full h-auto object-cover rounded-xl md:rounded-2xl bg-white/5" alt="Profissional 1"/>
                     </div>
                     <div className="bg-[#262320] border border-white/10 p-2 sm:p-3 rounded-2xl md:rounded-[2rem] shadow-xl shadow-black/40 overflow-hidden w-full">
                       <img src={images.prof3} className="w-full h-auto object-cover rounded-xl md:rounded-2xl bg-white/5" alt="Profissional 3"/>
                     </div>
                  </div>
                  
                  {/* Coluna 2 do Grid */}
                  <div className="flex flex-col gap-3 sm:gap-4 w-full transform translate-y-4 md:translate-y-8">
                     <div className="bg-[#262320] border border-white/10 p-2 sm:p-3 rounded-2xl md:rounded-[2rem] shadow-xl shadow-black/40 overflow-hidden w-full">
                       <img src={images.prof2} className="w-full h-auto object-cover rounded-xl md:rounded-2xl bg-white/5" alt="Profissional 2"/>
                     </div>
                     <div className="bg-[#262320] border border-white/10 p-2 sm:p-3 rounded-2xl md:rounded-[2rem] shadow-xl shadow-black/40 overflow-hidden mr-auto w-full md:w-[95%]">
                       <img src={images.prof4} className="w-full h-auto object-cover rounded-xl md:rounded-2xl bg-white/5" alt="Profissional 4"/>
                     </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            
          </div>
        </Section>
        
        {/* 7. O que está incluso */}
        <Section className="bg-sand-100 py-16 md:py-24 border-b border-sand-400">
           <div className="max-w-[1240px] mx-auto px-4">
            <FadeIn className="text-center mb-10 md:mb-14">
              <div className="inline-flex items-center bg-white border border-sand-400 shadow-sm rounded-full px-3 py-1 mb-5">
                <span className="text-[12px] font-bold text-earth-900 tracking-wide uppercase">
                  Página Completa
                </span>
              </div>
              <h2 className="text-[32px] sm:text-[38px] md:text-4xl lg:text-5xl font-extrabold text-earth-900 mb-4 tracking-tight">
                O que você recebe
              </h2>
              <p className="text-earth-800 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                Uma estrutura pronta para transformar anúncios em contatos organizados no WhatsApp.
              </p>
            </FadeIn>

            <FadeIn className="max-w-[960px] mx-auto mb-12 w-full">
               <div className="bg-white p-2.5 sm:p-5 rounded-[1.25rem] sm:rounded-[2rem] shadow-md border border-sand-400 relative z-10 w-full overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-sand-50/50 to-white/70 pointer-events-none"></div>
                 <img src={images.mosaico} alt="O que você recebe" className="w-full h-auto object-contain relative z-10 rounded-xl" />
               </div>
            </FadeIn>
            
            <FadeIn className="max-w-[1120px] mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-12">
                {[
                  { text: 'Página de qualificação personalizada', highlight: true },
                  { text: 'Texto de oferta ajustado p/ conversão', highlight: false },
                  { text: 'Perguntas estratégicas do seu negócio', highlight: true },
                  { text: 'Registro de leads em painel', highlight: true },
                  { text: 'Configuração de eventos p/ Meta Ads', highlight: false },
                  { text: 'Botão integrado ao seu WhatsApp', highlight: true },
                  { text: 'Estrutura técnica otimizada', highlight: false },
                  { text: 'Orientação para uso nas campanhas', highlight: false },
                ].map((item, i) => (
                  <div key={i} className={`flex flex-col bg-white p-5 lg:p-6 rounded-[14px] border transition-all ${item.highlight ? 'border-terracotta shadow-md' : 'border-sand-400 shadow-sm'} items-start h-full hover:-translate-y-1 hover:shadow-md`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mb-4 ${item.highlight ? 'bg-terracotta' : 'bg-sand-100 border border-sand-400'}`}>
                      <CheckCircle2 className={`w-5 h-5 ${item.highlight ? 'text-white' : 'text-earth-900'}`} />
                    </div>
                    <span className={`text-[15px] md:text-base leading-snug ${item.highlight ? 'font-bold text-earth-900' : 'font-medium text-earth-800'}`}>{item.text}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="text-center flex flex-col items-center">
              <p className="text-earth-900 font-bold mb-5 text-[15px] md:text-base">
                Pronto para receber contatos mais organizados?
              </p>
              <Button href={waLink} className="w-full sm:w-auto bg-terracotta text-white hover:bg-caramel border-none text-[15px] sm:text-base font-bold px-8 py-3.5 md:py-4 shadow-lg shadow-terracotta/20 transition-all rounded-[14px]">
                Quero esse kit para minha campanha
              </Button>
            </FadeIn>
          </div>
        </Section>

        {/* 8. CTA Final */}
        <Section className="bg-[#1C1A18] text-sand-50 text-center py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-terracotta/20 via-transparent to-transparent pointer-events-none" />
          <FadeIn className="max-w-3xl mx-auto relative px-4">
            <Lightbulb className="w-12 h-12 text-terracotta mx-auto mb-8 drop-shadow-sm" />
            <h2 className="text-[36px] sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold mb-8 text-white leading-[1.05] tracking-tight">
              Quer receber leads mais preparados no seu WhatsApp?
            </h2>
            <p className="text-[18px] md:text-xl text-sand-100/90 mb-12 leading-relaxed font-medium">
              Crie uma página de qualificação para seus anúncios e mude a forma como os contatos chegam para o seu atendimento.
            </p>
            
            <Button href={waLink} className="!bg-terracotta !text-white hover:!bg-caramel shadow-xl hover:-translate-y-1 hover:shadow-terracotta/30 font-bold text-[16px] md:text-lg px-8 md:px-10 py-4 md:py-5 transition-all rounded-[14px] w-full sm:w-auto">
              Criar minha página agora
              <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </FadeIn>
        </Section>
        
        {/* Footer Real */}
        <footer className="py-8 bg-sand-100 text-center text-earth-800 text-sm font-medium">
          <p>© {new Date().getFullYear()} • Soluções de Qualificação para WhatsApp Ads</p>
        </footer>
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-[#25D366]/30 hover:bg-[#20bd5a] hover:scale-110 hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Falar no WhatsApp"
        onClick={() => {
          trackContactEvent();
        }}
      >
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="fill-current stroke-none">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}
