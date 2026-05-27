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
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 px-8 py-4 text-[16px]';
  const primaryStyle =
    'bg-terracotta text-sand-50 shadow-md shadow-terracotta/20 hover:bg-caramel hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0';
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
  <div className="h-full bg-sand-50 p-8 rounded-3xl border border-sand-400/30 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
    <div className="bg-sand-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shrink-0">
      <Icon className="w-6 h-6 text-copper" />
    </div>
    <h3 className="text-xl font-semibold text-earth-900 mb-3">{title}</h3>
    {text && <p className="text-earth-800 leading-relaxed max-w-[95%]">{text}</p>}
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
        <section className="relative min-h-[auto] lg:min-h-[100vh] flex items-center pt-24 md:pt-24 pb-16 md:pb-24 px-6 overflow-hidden border-b border-sand-400/20 bg-[#F7F4EF]">
          
          {/* Background integrado para Desktop */}
          <div className="hidden lg:block absolute inset-0 z-0 overflow-hidden">
             {/* Leve brilho quente (radial-gradient) atrás do celular */}
             <div className="absolute top-0 right-0 w-[50%] h-full bg-[radial-gradient(circle_at_center,rgba(233,216,199,0.7)_0%,transparent_70%)]"></div>
             
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
                   background: 'linear-gradient(to right, #F7F4EF 0%, rgba(247,244,239,0.92) 38%, rgba(247,244,239,0.45) 65%, rgba(247,244,239,0) 100%)'
                }}
             ></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10 w-full grid lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center text-left">
            {/* Texto à esquerda */}
            <div className="pt-2 md:pt-8 w-full max-w-full">
              <FadeIn>
                <div className="inline-flex items-center bg-white/70 backdrop-blur-md border border-sand-400/40 rounded-full px-4 py-1.5 mb-6 shadow-sm">
                  <span className="text-[13px] sm:text-sm md:text-base font-semibold text-earth-900 flex items-center gap-2">
                    <Target className="w-4 h-4 text-copper" /> Qualifique seus contatos
                  </span>
                </div>
                <h1 className="text-[38px] sm:text-[42px] md:text-5xl lg:text-[4rem] font-bold tracking-tight text-earth-900 leading-[1.1] md:leading-[1.05] mb-5 w-full break-words drop-shadow-sm">
                  Seus anúncios levam para o WhatsApp, mas os leads chegam
                  sem contexto?
                </h1>
                <p className="text-[17px] sm:text-[19px] md:text-xl text-earth-800 leading-relaxed max-w-[540px] font-medium mb-8">
                  Crio páginas de qualificação para campanhas de WhatsApp Ads,
                  com perguntas simples antes do atendimento. Assim, sua empresa
                  recebe contatos mais organizados e com mais chance de virar
                  oportunidade.
                </p>
                
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 md:gap-4 text-earth-800 font-medium mb-10 text-[13px] sm:text-[14px] md:text-base pb-2">
                  <span className="flex items-center gap-1.5 md:gap-2 bg-white/60 backdrop-blur-md px-2.5 py-1.5 md:px-3 rounded-lg border border-sand-400/20 shadow-sm"><Megaphone className="w-3.5 h-3.5 md:w-4 md:h-4 text-copper"/> Anúncio</span>
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-sand-400 shrink-0 hidden sm:block" />
                  <span className="flex items-center gap-1.5 md:gap-2 bg-white/60 backdrop-blur-md px-2.5 py-1.5 md:px-3 rounded-lg border border-sand-400/20 shadow-sm"><LayoutTemplate className="w-3.5 h-3.5 md:w-4 md:h-4 text-copper"/> Filtro</span>
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-sand-400 shrink-0 hidden sm:block" />
                  <span className="flex items-center gap-1.5 md:gap-2 bg-[#25D366]/15 backdrop-blur-md text-[#128C7E] px-2.5 py-1.5 md:px-3 rounded-lg border border-[#25D366]/20 shadow-sm mt-2 sm:mt-0"><MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4"/> WhatsApp com contexto</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full">
                  <Button href={waLink} className="w-full sm:w-auto flex-1 sm:flex-none text-[15px] sm:text-base">
                    Quero melhorar meus leads
                    <ArrowRight className="ml-2 w-5 h-5 shrink-0" />
                  </Button>
                  <Button href="#como-funciona" variant="secondary" className="w-full sm:w-auto flex-1 sm:flex-none bg-[#F7F4EF]/80 backdrop-blur-md border-sand-400/50 hover:bg-[#F7F4EF] text-[15px] sm:text-base">
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
        <Section className="bg-sand-50 border-y border-sand-400/10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-earth-900 mb-6 tracking-tight">
                Nem toda conversa no WhatsApp é um bom lead
              </h2>
              <p className="text-lg text-earth-800 leading-relaxed max-w-2xl mx-auto">
                Muitas campanhas geram mensagens, mas parte dos contatos chega 
                sem informação, sem perfil ou só perguntando preço. Isso toma 
                tempo do atendimento e dificulta a leitura do que está funcionando.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto">
              {[
                { text: 'Muitos curiosos chegando no WhatsApp', icon: Users },
                { text: 'Pouca informação antes do atendimento', icon: Search },
                { text: 'Dificuldade para saber quais leads são bons', icon: Target },
                { text: 'Campanhas focadas em volume, não qualidade', icon: TrendingUp },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-sand-400/30 rounded-2xl p-6 flex flex-col items-center gap-4 shadow-sm text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-sand-50 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-copper" />
                  </div>
                  <span className="text-earth-900 font-medium text-base leading-tight">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </Section>

        {/* 3. Solução */}
        <Section className="bg-white">
          <div className="grid lg:grid-cols-[48%_52%] gap-10 lg:gap-16 items-center max-w-[1240px] mx-auto">
            <FadeIn>
              <h2 className="text-[34px] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-earth-900 mb-5 break-words tracking-tight leading-tight">
                Seu lead chega no WhatsApp sabendo o que quer
              </h2>
              <p className="text-[17px] md:text-lg text-earth-800 mb-5 leading-relaxed font-medium">
                A página organiza as respostas do visitante e prepara uma mensagem com contexto para iniciar a conversa no WhatsApp.
              </p>
              <p className="text-[17px] md:text-lg text-earth-800 mb-8 leading-relaxed font-medium">
                O WhatsApp continua sendo o canal final da conversa. A diferença é que a pessoa já chega pronta para o atendimento, enviando os dados de forma estruturada.
              </p>
              
              <div className="flex flex-col gap-3">
                 {/* Card 1 */}
                 <div className="bg-sand-50 border border-sand-400/30 rounded-xl p-4 shadow-sm flex items-start gap-4">
                   <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center shrink-0 mt-0.5">
                     <Megaphone className="w-5 h-5 text-copper"/>
                   </div>
                   <div>
                     <div className="font-semibold text-earth-900 mb-1">1. Anúncio Meta</div>
                     <p className="text-earth-800 text-sm">A pessoa clica no anúncio e demonstra interesse.</p>
                   </div>
                 </div>
                 
                 <ArrowRight className="w-5 h-5 text-sand-400 mx-auto rotate-90 my-0.5" />
                 
                 {/* Card 2 */}
                 <div className="bg-white border-2 border-copper/30 shadow-md rounded-xl p-4 relative flex items-start gap-4">
                   <div className="w-10 h-10 rounded-lg bg-copper flex items-center justify-center shrink-0 mt-0.5">
                      <LayoutTemplate className="w-5 h-5 text-white"/>
                   </div>
                   <div className="flex-1">
                     <div className="font-bold text-earth-900 mb-1">2. Página de qualificação</div>
                     <p className="text-earth-800 text-[13px] md:text-sm mb-3">Ela responde perguntas simples antes do contato.</p>
                     
                     <div className="inline-flex items-start gap-2 bg-terracotta/5 border border-terracotta/10 px-2.5 md:px-3 py-2 rounded-lg text-xs w-full max-w-full">
                       <Zap className="w-3.5 h-3.5 text-terracotta shrink-0 mt-0.5"/>
                       <span className="text-earth-800 leading-relaxed"><strong className="text-terracotta">Evento para Meta Ads:</strong> Ajuda a campanha a identificar leads com mais intenção.</span>
                     </div>
                   </div>
                 </div>
                 
                 <ArrowRight className="w-5 h-5 text-sand-400 mx-auto rotate-90 my-0.5" />
                 
                 {/* Card 3 */}
                 <div className="bg-[#25D366]/5 border border-[#25D366]/20 shadow-sm rounded-xl p-4 flex items-start gap-4">
                   <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 flex items-center justify-center shrink-0 mt-0.5">
                     <MessageCircle className="w-5 h-5 text-[#128C7E]"/>
                   </div>
                   <div>
                     <div className="font-semibold text-[#128C7E] mb-1">3. WhatsApp com contexto</div>
                     <p className="text-earth-800 text-sm">Você recebe um lead mais completo e fácil de atender.</p>
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
        <Section id="como-funciona" className="bg-sand-50 border-t border-sand-400/20">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-900 mb-6">
              Como funciona na prática
            </h2>
          </FadeIn>

          <FadeIn className="mb-12 max-w-5xl mx-auto">
             <img
               src={images.comoFunciona}
               alt="Como funciona"
               className="w-full h-auto drop-shadow-xl"
             />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto mb-12">
            {[
              { num: '1', title: 'Clique', text: 'A pessoa clica no seu anúncio do Facebook/Instagram.' },
              { num: '2', title: 'Acesso', text: 'Acessa uma página rápida e focada na oferta principal.' },
              { num: '3', title: 'Filtro', text: 'Responde perguntas simples de qualificação.' },
              { num: '4', title: 'Registro', text: 'As informações são salvas e eventos são emitidos.' },
              { num: '5', title: 'WhatsApp', text: 'O lead é enviado para a conversa com o contexto pronto.' },
            ].map((step, i) => (
    <React.Fragment key={i}>
      <FadeIn delay={i * 0.1} className="bg-white p-5 rounded-2xl border border-sand-400/30 shadow-sm flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-full bg-sand-100 text-copper font-bold text-lg flex items-center justify-center mb-4 ring-1 ring-sand-400/20 shrink-0">
          {step.num}
        </div>
        <h3 className="font-bold text-earth-900 mb-2">{step.title}</h3>
        <p className="text-sm text-earth-800 leading-relaxed">{step.text}</p>
      </FadeIn>
    </React.Fragment>
            ))}
          </div>
          
          <FadeIn delay={0.5} className="text-center">
            <p className="text-base font-medium text-earth-800 bg-white inline-block px-6 py-3 rounded-full border border-sand-400/20 shadow-sm shadow-earth-900/5">
              💡 Esses dados ajudam a campanha a entender melhor quais contatos têm mais valor.
            </p>
          </FadeIn>
        </Section>

        {/* 5. Exemplos de Perguntas */}
        <Section className="bg-white">
          <div className="max-w-4xl mx-auto">
             <FadeIn className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-bold text-earth-900 mb-6">
                 Perguntas simples que ajudam a separar curiosos de oportunidades
               </h2>
               <p className="text-lg text-earth-800 leading-relaxed max-w-2xl mx-auto">
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
                      <div className="bg-sand-50 border border-sand-400/30 p-4 rounded-xl flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-copper shrink-0"></div>
                        <span className="font-medium text-earth-900">{pergunta}</span>
                      </div>
                    </FadeIn>
                  </React.Fragment>
                ))}
             </div>
          </div>
        </Section>

        {/* 6. Para quem serve */}
        <Section id="para-quem-e" className="bg-[#1C1A18] text-sand-50">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-sand-50 leading-tight tracking-tight">
                Ideal para quem anuncia e atende pelo WhatsApp
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  'Prestadores de serviço em geral',
                  'Corretores e imobiliárias',
                  'Clínicas de saúde e estética',
                  'Venda de cursos e eventos',
                  'Campanhas de promoções específicas',
                  'Empresas que recebem volume alto de mensagens',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full bg-copper/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-copper" />
                    </div>
                    <span className="text-sand-100 font-medium md:text-lg">{item}</span>
                  </div>
                ))}
              </div>
              <Button href={waLink} className="bg-terracotta text-sand-50 hover:bg-copper border-none text-lg px-8 py-4">
                Falar sobre meu negócio
              </Button>
            </FadeIn>
            <FadeIn delay={0.2} className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-6 place-items-end">
                 <div className="flex items-end justify-center"><img src={images.prof1} className="w-full max-w-[200px] object-contain drop-shadow-lg" alt="Profissional 1"/></div>
                 <div className="flex items-end justify-center mb-12"><img src={images.prof2} className="w-full max-w-[200px] object-contain drop-shadow-lg" alt="Profissional 2"/></div>
                 <div className="flex items-end justify-center"><img src={images.prof3} className="w-full max-w-[200px] object-contain drop-shadow-lg" alt="Profissional 3"/></div>
                 <div className="flex items-end justify-center mb-12"><img src={images.prof4} className="w-full max-w-[200px] object-contain drop-shadow-lg" alt="Profissional 4"/></div>
              </div>
            </FadeIn>
          </div>
        </Section>
        
        {/* 7. O que está incluso */}
        <Section className="bg-sand-100">
           <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-earth-900 mb-6 tracking-tight">
                O que você recebe
              </h2>
            </FadeIn>

            <FadeIn className="max-w-5xl mx-auto mb-12 hidden md:block">
               <img src={images.mosaico} alt="Mova seu projeto" className="w-full h-auto drop-shadow-2xl" />
            </FadeIn>
            
            <FadeIn>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-10">
                {[
                  'Página de qualificação personalizada',
                  'Texto da oferta ajustado para conversão',
                  'Perguntas estratégicas para o seu negócio',
                  'Registro dos leads (planilha ou painel simples)',
                  'Configuração de eventos básicos para Meta',
                  'Botão final direcionando ao WhatsApp',
                  'Estrutura ideal para campanhas de Leads',
                ].map((item, i) => (
                  <div key={i} className="flex flex-row gap-4 bg-white p-5 rounded-2xl border border-sand-400/30 shadow-sm items-start">
                    <CheckCircle2 className="w-5 h-5 text-copper shrink-0 mt-0.5" />
                    <span className="text-earth-900 font-medium leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* 8. CTA Final */}
        <Section className="bg-terracotta text-sand-50 text-center py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
          <FadeIn className="max-w-3xl mx-auto relative">
            <Lightbulb className="w-12 h-12 text-sand-50/80 mx-auto mb-8 drop-shadow-sm" />
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-sand-50 leading-tight tracking-tight">
              Quer receber leads mais preparados antes da conversa no WhatsApp?
            </h2>
            <p className="text-xl text-sand-100/90 mb-12 leading-relaxed font-medium">
              Crie uma página de qualificação para seus anúncios e facilite o caminho entre o clique, o interesse e o atendimento.
            </p>
            
            <Button href={waLink} className="!bg-sand-50 !text-terracotta hover:!bg-white shadow-xl hover:-translate-y-1 hover:shadow-2xl font-bold text-lg px-10 py-5 transition-all">
              Quero minha página de qualificação
              <ArrowRight className="ml-2 w-6 h-6" />
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
