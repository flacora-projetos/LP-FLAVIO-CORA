import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Users,
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

const getImageSrc = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

const images = {
  hero: getImageSrc('193E2ctonYx7-JD4CfRbDjiGLBmb240l-'),
  audience: getImageSrc('1M5os2ST34KchJ4lwysw4fNG2X3s1pj1T'),
  applications: getImageSrc('1gaeBkt1SE-grm-NQQDlzNL55fueoVlZx'),
  problem: getImageSrc('1B-IXVFJTzvRDcVGeXVfhiWPUrTmjSoP9'),
  deliverables: getImageSrc('10CAdoh_go8JhzMFSB-NIe7EIxdn7RBs2'),
  differentials: getImageSrc('1LJglJcN-Jvhq8FVnpoFvC-wB1pIFC15f'),
  process: getImageSrc('1504H3TiIR0LtFdVbvwrZmnesD64p0eBg'),
  examples: getImageSrc('1Da-mIYm0yHO3oDdV7GC1vS6srFseIzAD'),
  comparison: getImageSrc('1P1Y74YH9n-d_svXCDb0Nx9iuyQK7Zbpk'),
  authority: getImageSrc('19kUhTWcm0vu3K5xrOwpqi82Zhxb3ULVK'),
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

function FAQItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-sand-400/30 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left text-lg font-semibold text-earth-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper/50 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-100 rounded-sm"
        aria-expanded={isOpen}
      >
        <span className="pr-6">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-copper shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 text-earth-800 leading-relaxed text-base space-y-3">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

const faqs = [
  {
    question: 'Quanto custa uma landing page?',
    answer: 'Os projetos começam a partir de R$ 500,00 para páginas simples e objetivas. O valor final pode variar conforme o tamanho da página, materiais disponíveis, nível de personalização e necessidades específicas do projeto.',
  },
  {
    question: 'A página tem mensalidade?',
    answer: 'Não. Para landing pages simples, a hospedagem inicial pode ser feita em uma estrutura sem mensalidade, ideal para páginas institucionais, campanhas, serviços, eventos, imóveis e ofertas pontuais. Caso o projeto cresça muito, tenha alto volume de acessos ou precise de recursos mais avançados, pode ser necessário migrar para uma solução paga. Se isso acontecer, você será avisado antes. Nada de surpresa escondida no rodapé, porque a vida já tem boleto suficiente.',
  },
  {
    question: 'O que está incluso na hospedagem?',
    answer: 'Está incluso deixar a landing page publicada no ar, com carregamento rápido e acesso por link. A página pode funcionar com um endereço temporário ou com um domínio próprio, caso o cliente queira comprar um.',
  },
  {
    question: 'Preciso comprar um domínio?',
    answer: 'Não é obrigatório. A landing page pode ser publicada com um link próprio da plataforma de hospedagem. Mas, se você quiser um endereço mais profissional, como suaempresa.com.br, é possível comprar um domínio e conectar à página.',
  },
  {
    question: 'A compra do domínio está inclusa?',
    answer: 'Não. O domínio é um custo separado, pago pelo cliente diretamente ao serviço de registro escolhido. Eu posso orientar na escolha, compra e configuração, mas o domínio fica no nome do cliente. Isso é importante porque o endereço da sua marca deve ser seu, não preso na mão de fornecedor. Pequena vitória contra o caos digital.',
  },
  {
    question: 'O domínio precisa ser renovado?',
    answer: 'Sim. Normalmente, domínios são pagos por período, geralmente anual. Se não renovar, o endereço pode sair do ar ou ficar disponível para outra pessoa registrar.',
  },
  {
    question: 'O que eu preciso enviar para criar a landing page?',
    answer: (
      <>
        <p>Para criar uma página boa, preciso de algumas informações básicas:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>nome da empresa, profissional, produto ou serviço;</li>
          <li>objetivo da página e público que você quer atingir;</li>
          <li>principais benefícios e diferenciais da sua oferta;</li>
          <li>fotos, vídeos ou materiais visuais disponíveis;</li>
          <li>número de WhatsApp ou outro canal de contato;</li>
          <li>links importantes e identidade visual, se houver.</li>
        </ul>
        <p className="mt-2">Se você ainda não tiver tudo pronto, posso ajudar a organizar o briefing antes da criação da página.</p>
      </>
    ),
  },
  {
    question: 'Preciso ter fotos profissionais?',
    answer: 'Ajuda bastante, mas não é obrigatório. Fotos reais aumentam a confiança e deixam a página mais personalizada. Quando não há fotos boas, é possível usar imagens de apoio, elementos visuais, ícones e uma direção visual mais limpa. Mas, sempre que possível, fotos reais fazem diferença.',
  },
  {
    question: 'A página funciona no celular?',
    answer: 'Sim. A landing page é pensada para funcionar bem no celular, porque boa parte das pessoas acessa anúncios, redes sociais e links pelo smartphone. A ideia é que a pessoa entenda a oferta rápido e consiga chamar no WhatsApp sem precisar ficar caçando botão pela página como se fosse caça ao tesouro corporativo.',
  },
  {
    question: 'A página pode ter botão de WhatsApp?',
    answer: 'Sim. O botão de WhatsApp é uma das principais formas de contato da landing page. Ele pode aparecer no início, no meio, no final e também de forma fixa na tela, dependendo da estratégia da página.',
  },
  {
    question: 'Posso usar a landing page em anúncios?',
    answer: 'Sim. A página é criada justamente para apoiar campanhas de divulgação, como anúncios no Instagram, Facebook, Google, tráfego para WhatsApp, lançamentos, promoções, eventos e ofertas específicas.',
  },
  {
    question: 'É a mesma coisa que um site completo?',
    answer: 'Não. Uma landing page é uma página mais direta, criada para apresentar uma oferta específica e levar a pessoa para uma ação, como chamar no WhatsApp, pedir orçamento, agendar uma conversa ou se cadastrar. Um site completo costuma ter várias páginas, menus, blog e área institucional mais extensa. Para muitas campanhas e ofertas pontuais, uma landing page resolve melhor do que um site grande, caro e cheio de páginas que ninguém visita, esse monumento moderno ao excesso.',
  },
  {
    question: 'Dá para alterar a página depois?',
    answer: 'Sim. Textos, fotos, botões e seções podem ser ajustados depois, conforme a necessidade. Alterações simples podem ser combinadas conforme o escopo do projeto. Mudanças maiores, como refazer a estrutura inteira ou criar novas seções, podem exigir um novo orçamento.',
  },
  {
    question: 'A página aparece no Google?',
    answer: 'A página pode ser configurada com boas práticas básicas para ser encontrada, mas aparecer bem no Google depende de vários fatores, como concorrência, tempo, conteúdo, autoridade do domínio e estratégia de SEO. Para campanhas de curto prazo, o mais comum é usar a landing page junto com anúncios e redes sociais.',
  },
  {
    question: 'A landing page já vende sozinha?',
    answer: 'Ela ajuda muito, mas não faz mágica. A página organiza sua oferta, apresenta seus diferenciais e facilita o contato. O resultado também depende da qualidade da oferta, das fotos, do atendimento, do preço, do público e da campanha que leva pessoas até ela. Infelizmente, ainda não inventaram botão que conserta oferta ruim. Estão tentando, provavelmente com IA.',
  },
  {
    question: 'Quanto tempo leva para criar?',
    answer: 'Depende da complexidade da página e da organização dos materiais. Quanto mais claro estiver o briefing e quanto melhores forem os materiais enviados, mais rápido o processo anda.',
  },
  {
    question: 'Para quais tipos de oferta a landing page serve?',
    answer: 'Serve para divulgar serviços, imóveis, cursos, eventos, promoções, lançamentos, consultorias, atendimentos profissionais, campanhas locais, catálogos simples e outras ofertas que precisam de uma apresentação mais clara antes do contato.',
  },
];

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
              href="#aplicacoes"
              className="text-earth-800 hover:text-terracotta transition-colors text-sm font-medium"
            >
              Aplicações
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
        <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center pt-16 md:pt-24 pb-16 md:pb-24 px-6 overflow-hidden border-b border-sand-400/20">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={images.hero}
              alt="Apresentação do serviço de Landing Pages"
              className="w-full h-full object-cover object-[70%_center] md:object-[80%_center]"
            />
            {/* Overlays para garantir a leitura do texto */}
            <div className="absolute inset-0 bg-sand-100/85 md:hidden backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-sand-100/95 via-sand-100/85 to-sand-100/20 backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-sand-100 via-transparent to-transparent"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10 w-full">
            <div className="max-w-2xl lg:max-w-3xl">
              <FadeIn>
                <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold tracking-tight text-earth-900 leading-[1.05] mb-6">
                  Landing pages simples, bonitas e prontas para divulgar sua
                  oferta.
                </h1>
                <div className="inline-flex items-center bg-white/60 backdrop-blur-sm border border-sand-400/40 rounded-full px-4 py-1.5 mb-6 shadow-sm">
                  <span className="text-sm md:text-base font-semibold text-earth-900">
                    🚀 Landing pages a partir de R$ 500,00
                  </span>
                </div>
                <p className="text-base md:text-lg text-earth-900 leading-relaxed mb-6 font-medium max-w-2xl">
                  Uma landing page é uma página única, feita para apresentar uma oferta específica e levar o visitante a uma ação: chamar no WhatsApp, pedir orçamento, se cadastrar ou agendar uma conversa.
                </p>
                <p className="text-lg md:text-xl text-earth-800 leading-relaxed mb-10 max-w-2xl">
                  Criação de páginas estratégicas para divulgar serviços, promoções, imóveis, cursos, eventos e ofertas pontuais.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href={waLink} className="flex-1 sm:flex-none">
                    Quero criar minha LP
                    <ArrowRight className="ml-2 w-5 h-5 shrink-0" />
                  </Button>
                  <Button href="#aplicacoes" variant="secondary" className="flex-1 sm:flex-none bg-sand-50/50 backdrop-blur-md border-sand-400/50 hover:bg-sand-50/80">
                    Ver onde usar
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 2. Seção de Esclarecimento Rápido */}
        <Section className="bg-sand-50/50 border-y border-sand-400/10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-earth-900 mb-6 tracking-tight">
                Não é um site completo.<br />É uma página feita para gerar ação.
              </h2>
              <p className="text-lg text-earth-800 leading-relaxed max-w-2xl mx-auto mb-6">
                Se você precisa divulgar algo de forma objetiva, talvez não precise de um site completo. Precise apenas de uma página clara, bem construída e pensada para gerar contato.
              </p>
              <p className="text-lg text-earth-800 leading-relaxed max-w-2xl mx-auto">
                Meu trabalho é criar landing pages simples e objetivas para
                campanhas, divulgações pontuais e ofertas específicas.
                <br />
                <br />A ideia não é produzir um portal, um site institucional
                cheio de abas ou uma plataforma complexa. É criar uma
                página clara, rápida e bem estruturada para apresentar uma oferta
                e conduzir o visitante para o próximo passo.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
              {[
                { text: 'Campanhas de tráfego pago', icon: Target },
                { text: 'Promoções e ofertas', icon: Zap },
                { text: 'Captação de leads', icon: Users },
                { text: 'Divulgação de serviços', icon: Briefcase },
                { text: 'Lançamentos simples', icon: Rocket },
                { text: 'Contato via WhatsApp', icon: MessageCircle },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-sand-400/30 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:border-sand-400/60 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-sand-50 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-copper" />
                  </div>
                  <span className="text-earth-900 font-semibold text-sm md:text-base leading-tight">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </Section>

        {/* 3. Para quem é */}
        <Section id="para-quem-e">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-earth-900 mb-6">
                Para quem precisa divulgar uma oferta de forma simples e
                profissional.
              </h2>
              <p className="text-lg text-earth-800 mb-10 leading-relaxed">
                Uma LP funciona muito bem quando o objetivo é apresentar uma
                oferta específica sem distrair o visitante com várias páginas,
                menus e caminhos desnecessários.
              </p>
              <div className="grid sm:grid-cols-2 gap-x-4 gap-y-3">
                {[
                  'Profissionais liberais',
                  'Prestadores de serviço',
                  'Corretores de imóveis',
                  'Clínicas e estética',
                  'Professores e mentores',
                  'Infoprodutores',
                  'Pequenos negócios locais',
                  'E-commerces (campanhas)',
                  'Agências (para clientes)',
                  'Eventos e workshops',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-sand-50/50 p-3.5 rounded-xl border border-sand-400/20">
                    <CheckCircle2 className="w-5 h-5 text-copper shrink-0" />
                    <span className="text-earth-900 font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="lg:order-last order-first content-center">
              <InteractiveImage
                src={images.audience}
                alt="Diferentes públicos que podem usar landing pages"
                containerClass="bg-sand-100/80 p-2 md:p-3"
              />
            </FadeIn>
          </div>
        </Section>

        {/* 4. Aplicações práticas */}
        <Section id="aplicacoes" className="bg-sand-50 border-t border-sand-400/20">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-900 mb-6">
              Uma LP pode resolver situações bem pontuais do seu negócio.
            </h2>
          </FadeIn>

          <FadeIn className="mb-16 max-w-5xl mx-auto">
            <InteractiveImage
              src={images.applications}
              alt="Exemplos de aplicações práticas"
            />
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            <FadeIn delay={0.1}>
              <Card
                icon={Briefcase}
                title="Divulgação de serviços"
                text="Apresente seu serviço de forma clara, profissional e com CTA direto para orçamento ou WhatsApp."
              />
            </FadeIn>
            <FadeIn delay={0.2}>
              <Card
                icon={LayoutTemplate}
                title="Venda ou captação para imóveis"
                text="Transforme um imóvel em uma apresentação digital mais valorizada, com fotos, diferenciais e contato direto."
              />
            </FadeIn>
            <FadeIn delay={0.3}>
              <Card
                icon={Presentation}
                title="Cursos, mentorias e eventos"
                text="Explique a proposta, mostre autoridade, destaque benefícios e leve o visitante para inscrição ou conversa."
              />
            </FadeIn>
            <FadeIn delay={0.4}>
              <Card
                icon={Zap}
                title="Promoções e campanhas"
                text="Crie uma página específica para uma oferta sazonal, lançamento, condição especial ou campanha comercial."
              />
            </FadeIn>
            <FadeIn delay={0.5}>
              <Card
                icon={Users}
                title="Captação de leads"
                text="Use a LP para gerar contatos via formulário, WhatsApp, pré-cadastro ou página de aula gratuita."
              />
            </FadeIn>
            <FadeIn delay={0.6}>
              <Card
                icon={Layers}
                title="E-commerce e campanhas pontuais"
                text="Crie páginas para produtos específicos, kits, coleções, promoções sazonais ou ações bem segmentadas."
              />
            </FadeIn>
          </div>
        </Section>

        {/* 5. Problema que a LP resolve */}
        <Section>
          <div className="max-w-5xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold text-earth-900 mb-12 leading-tight tracking-tight max-w-4xl mx-auto">
                Seu anúncio pode chamar atenção. Mas se a página não convence, o
                clique vira desperdício.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} className="mb-16">
              <InteractiveImage
                src={images.problem}
                alt="Contraste entre uma jornada confusa e uma clara"
              />
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="text-left md:text-center max-w-3xl mx-auto space-y-6 text-lg text-earth-800 mb-16">
                <p>
                  Muita campanha perde resultado porque a pessoa clica no anúncio
                  e cai em uma página confusa, genérica, lenta ou sem um caminho
                  claro de conversão.
                </p>
                <p>
                  Quando as informações não estão claras, o visitante sai da página. E o dinheiro do
                  tráfego vai embora junto.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-left items-stretch">
                 <div className="h-full bg-sand-50 border border-sand-400/30 p-8 rounded-3xl flex flex-col">
                   <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-sand-400/20 shrink-0">
                      <Search className="w-6 h-6 text-copper" />
                   </div>
                   <h3 className="text-xl font-bold text-earth-900 mb-3">Atenção retida</h3>
                   <p className="text-earth-800 text-sm leading-relaxed text-balance">Uma página organizada responde rápido: o que é, para quem é e por que confiar.</p>
                 </div>
                 <div className="h-full bg-sand-50 border border-sand-400/30 p-8 rounded-3xl flex flex-col">
                   <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-sand-400/20 shrink-0">
                      <Zap className="w-6 h-6 text-copper" />
                   </div>
                   <h3 className="text-xl font-bold text-earth-900 mb-3">Redução de fricção</h3>
                   <p className="text-earth-800 text-sm leading-relaxed text-balance">Sem menus ou abas desnecessárias, o usuário foca exclusivamente na sua oferta principal.</p>
                 </div>
                 <div className="h-full bg-sand-50 border border-sand-400/30 p-8 rounded-3xl flex flex-col">
                   <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-sand-400/20 shrink-0">
                      <MousePointerClick className="w-6 h-6 text-copper" />
                   </div>
                   <h3 className="text-xl font-bold text-earth-900 mb-3">Ação direta</h3>
                   <p className="text-earth-800 text-sm leading-relaxed text-balance">Um botão CTA visível e direto aumenta absurdamente a chance de geração de contato ou lead.</p>
                 </div>
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* 6. O que eu entrego */}
        <Section className="bg-[#1C1A18] text-sand-50">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-sand-50 leading-tight">
                Uma landing page pensada do briefing até o botão final.
              </h2>
              <p className="text-sand-300 text-lg mb-10 leading-relaxed max-w-lg">
                A criação da LP inclui estratégia, texto, estrutura e orientação
                visual. A página é construída para ser simples de navegar,
                bonita no celular e focada em conversão.
              </p>
              <div className="space-y-4">
                {[
                  'Organização do briefing da oferta',
                  'Headline, subtítulos e copy completa',
                  'Seções de benefícios, diferenciais e prova',
                  'Direção visual compatível com sua marca',
                  'Botões para WhatsApp ou formulário',
                  'Página publicada (hospedagem simples grátis)',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-copper/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-copper" />
                    </div>
                    <span className="text-sand-100 font-medium md:text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="lg:order-last order-first content-center relative">
              <InteractiveImage
                src={images.deliverables}
                alt="Processo estruturado de entrega"
                containerClass="bg-[#282522] p-2 md:p-3"
              />
            </FadeIn>
          </div>
        </Section>

        {/* 7. Diferenciais */}
        <Section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-earth-900 mb-6">
                Mais estratégia do que template. Mais objetivo do que enrolação.
              </h2>
            </FadeIn>
          </div>

          <FadeIn className="mb-16 max-w-5xl mx-auto">
            <InteractiveImage
              src={images.differentials}
              alt="Imagem de apoio"
            />
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            <FadeIn delay={0.1}>
              <Card
                icon={Search}
                title="Copy focada"
                text="O texto não é só decorativo. Ele organiza a oferta, antecipa dúvidas e conduz a pessoa para a ação."
              />
            </FadeIn>
            <FadeIn delay={0.2}>
              <Card
                icon={Smartphone}
                title="Visual moderno"
                text="Layout limpo, responsivo e com boa leitura no celular, sem excesso de blocos disputando atenção."
              />
            </FadeIn>
            <FadeIn delay={0.3}>
              <Card
                icon={Crosshair}
                title="Feita para campanhas"
                text="A página já nasce pensando em anúncios, cliques, tráfego frio, escaneabilidade e foco na conversão."
              />
            </FadeIn>
            <FadeIn delay={0.4}>
              <Card
                icon={TrendingUp}
                title="Custo-benefício"
                text="Uma solução acessível para quem precisa de uma presença digital pontual, sem contratar um projeto grande e caro."
              />
            </FadeIn>
            <FadeIn delay={0.5}>
              <Card
                icon={ShieldCheck}
                title="Hospedagem gratuita"
                text="A LP pode ser publicada em uma estrutura moderna com custo zero de hospedagem para pequenos projetos."
              />
            </FadeIn>
            <FadeIn delay={0.6}>
              <Card
                icon={MessageCircle}
                title="Foco em WhatsApp"
                text="Ideal para negócios que querem levar o visitante direto para conversa, orçamento rápido ou atendimento ágil."
              />
            </FadeIn>
          </div>
        </Section>

        {/* 8. Como funciona */}
        <Section className="bg-sand-50 border-t border-sand-400/20">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-900 mb-6">
              Um processo simples para tirar sua oferta do improviso.
            </h2>
          </FadeIn>

          <FadeIn className="mb-10 max-w-5xl mx-auto">
            <InteractiveImage
              src={images.process}
              alt="Etapas do processo"
            />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { num: '1', title: 'Briefing', text: 'Você envia as informações, fotos e canais.' },
              { num: '2', title: 'Estratégia', text: 'Organizo a estrutura, benefícios e CTAs.' },
              { num: '3', title: 'Copy & Visual', text: 'Texto comercial e direção visual adequadas.' },
              { num: '4', title: 'Construção', text: 'Montagem focada em velocidade e mobile.' },
              { num: '5', title: 'Publicação', text: 'Pronta para anúncios, Insta e WhatsApp.' },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.1} className="bg-white p-6 rounded-3xl border border-sand-400/30 shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-sand-100 text-copper font-bold text-xl flex items-center justify-center mb-6 shadow-inner ring-1 ring-sand-400/20">
                  {step.num}
                </div>
                <h3 className="font-bold text-earth-900 mb-3">{step.title}</h3>
                <p className="text-sm text-earth-800 leading-relaxed text-balance">{step.text}</p>
              </FadeIn>
            ))}
          </div>
        </Section>

        {/* 9. Exemplos de páginas */}
        <Section>
          <FadeIn className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-900 mb-6">
              Alguns formatos de LP que fazem sentido para negócios reais.
            </h2>
          </FadeIn>
          
          <FadeIn className="mb-12 max-w-5xl mx-auto relative group">
             <InteractiveImage
               src={images.examples}
               alt="Exemplos"
             />
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              'Venda de imóvel',
              'Captação de curso',
              'Profissional liberal',
              'Clínica estética',
              'Página de WhatsApp',
              'Evento presencial',
              'Aula gratuita',
              'Consultoria',
              'Serviço local',
              'Lançamento simples',
              'E-commerce sazonal',
              'Campanhas B2B',
            ].map((item, i) => (
               <FadeIn delay={i * 0.05} key={i}>
                 <div className="bg-sand-50 border border-sand-400/30 px-3 py-4 rounded-2xl flex flex-col sm:flex-row items-center gap-3 font-semibold text-earth-900 justify-center text-center shadow-sm h-full hover:border-sand-400/60 transition-colors">
                    <PanelTop className="w-5 h-5 text-copper shrink-0 hidden sm:block opacity-80"/>
                    <span className="text-sm tracking-tight text-balance">{item}</span>
                 </div>
               </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4} className="mt-12 text-center text-earth-800 text-sm max-w-2xl mx-auto italic">
            Todas são páginas simples, diretas e focadas em uma ação principal. Não são sites completos com várias páginas.
          </FadeIn>
        </Section>

        {/* 10. Comparativo */}
        <Section className="bg-sand-100 border-t border-sand-400/20">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold text-earth-900 mb-6 tracking-tight">
                Você talvez não precise de um site completo. Talvez precise de <span className="text-copper">clareza</span>.
              </h2>
            </FadeIn>
          </div>

          <FadeIn className="mb-12 max-w-4xl mx-auto">
            <InteractiveImage
              src={images.comparison}
              alt="Comparativo visual entre Site completo e Landing Page"
            />
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16 items-stretch">
            <FadeIn delay={0.1} className="bg-sand-50 p-8 md:p-10 rounded-3xl border border-sand-400/40 h-full flex flex-col hover:border-sand-400/60 transition-colors">
              <h3 className="text-2xl font-bold text-earth-900 mb-6 pb-4 border-b border-sand-400/30">Site tradicional</h3>
              <ul className="space-y-4 md:space-y-6 flex-1">
                {['Mais páginas e complexidade', 'Mais tempo de produção', 'Custo muito mais elevado', 'Mais manutenção mensal', 'Mais distrações para o usuário', 'Melhor para presença institucional ampla'].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-earth-800 font-medium before:content-[''] before:w-1.5 before:h-1.5 before:bg-earth-800/30 before:rounded-full before:shrink-0">{item}</li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.2} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-earth-900/5 ring-1 ring-terracotta/20 relative overflow-hidden h-full flex flex-col">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />
              <h3 className="text-2xl font-bold text-terracotta mb-6 pb-4 border-b border-sand-400/30 relative">Landing page</h3>
              <ul className="space-y-4 md:space-y-6 relative flex-1">
                {['Uma oferta específica e clara', 'Produção enxuta e rápida', 'Custo altamente eficiente', 'Foco 100% em conversão', 'Ideal para receber anúncios', 'Melhor para campanhas pontuais'].map((item, i) => (
                   <li key={i} className="flex items-center gap-4 text-earth-900 font-medium before:content-[''] before:w-1.5 before:h-1.5 before:bg-terracotta/60 before:rounded-full before:shrink-0">{item}</li>
                ))}
              </ul>
            </FadeIn>
          </div>
          <FadeIn delay={0.3} className="text-center max-w-3xl mx-auto text-lg text-earth-800 leading-relaxed font-medium">
            Se o objetivo é divulgar uma oferta específica e gerar ação, uma LP bem feita pode ser muito mais eficiente do que um site cheio de abas que ninguém vai ler.
          </FadeIn>
        </Section>

        {/* 11. Autoridade */}
        <section className="relative min-h-[70vh] flex items-center py-24 px-6 overflow-hidden bg-[#1C1A18]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={images.authority}
              alt="Autoridade"
              className="w-full h-full object-cover object-[70%_center] md:object-[80%_center]"
            />
            {/* Overlays para garantir a leitura do texto */}
            <div className="absolute inset-0 bg-[#1C1A18]/85 md:hidden backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#1C1A18]/95 via-[#1C1A18]/85 to-[#1C1A18]/20 backdrop-blur-[2px]"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10 w-full">
            <div className="max-w-2xl lg:max-w-3xl">
              <FadeIn>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-sand-50 leading-tight">
                  Feita por quem entende de tráfego, copy e conversão.
                </h2>
                <div className="space-y-6 text-sand-300 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                  <p>
                    Meu trabalho une criação de página, visão de marketing e experiência com campanhas de tráfego pago. 
                  </p>
                  <p>
                    Isso ajuda a construir LPs pensadas para receber visitantes de anúncios, redes sociais e WhatsApp com uma mensagem clara e um caminho simples até a conversão definitiva.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['Tráfego Pago', 'Copywriting', 'Design de Conversão'].map((tag, i) => (
                    <span key={i} className="px-5 py-2.5 rounded-full border border-sand-400/20 text-sand-100 text-sm font-semibold tracking-wide bg-white/5 backdrop-blur-sm shadow-sm ring-1 ring-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 11.5 O que está incluso */}
        <Section className="bg-white border-t border-sand-400/20">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-earth-900 mb-6 tracking-tight">
                O que está incluso na criação
              </h2>
              <p className="text-xl text-earth-800 leading-relaxed font-medium">
                Sua landing page é entregue pronta para você começar a divulgar sua oferta.
              </p>
            </FadeIn>
            
            <FadeIn>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-10">
                {[
                  'Estrutura clara da página',
                  'Organização estratégica da oferta',
                  'Texto comercial básico (a partir do briefing)',
                  'Botão de contato para WhatsApp',
                  'Versão 100% adaptada para celular',
                  'Publicação inicial para acesso rápido',
                  'Orientação sobre conexão de domínio próprio',
                ].map((item, i) => (
                  <div key={i} className="flex flex-row items-center gap-4 bg-sand-50/50 p-4 rounded-2xl border border-sand-400/30">
                    <CheckCircle2 className="w-6 h-6 text-copper shrink-0" />
                    <span className="text-earth-900 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-earth-800 text-sm md:text-base leading-relaxed bg-sand-50 border border-sand-400/40 p-5 rounded-xl">
                <strong>Importante:</strong> os projetos começam no valor base, mas podem variar dependendo do tamanho da página, quantidade de seções, materiais disponíveis, nível de personalização do design e ajustes extras solicitados pelo projeto.
              </p>
            </FadeIn>
          </div>
        </Section>

        {/* 12. FAQ */}
        <Section className="bg-sand-50">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-earth-900 mb-6 tracking-tight">
                Perguntas frequentes
              </h2>
              <p className="text-xl text-earth-800 leading-relaxed font-medium">
                Tire suas dúvidas sobre criação, custos e funcionamento.
              </p>
            </FadeIn>
            <FadeIn className="bg-white rounded-[32px] p-6 md:p-10 border border-sand-400/30 shadow-xl shadow-earth-900/5">
              <div className="flex flex-col">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* 13. Oferta Comercial & CTA */}
        <Section className="bg-terracotta text-sand-50 text-center py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
          <FadeIn className="max-w-4xl mx-auto relative">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-sand-50 leading-tight tracking-tight">
              Uma LP profissional sem o custo pesado de um site completo.
            </h2>
            <p className="text-xl text-sand-100/90 mb-6 leading-relaxed max-w-3xl mx-auto">
              Ideal para quem precisa validar uma oferta, rodar uma campanha, divulgar um serviço ou criar uma presença digital específica sem entrar em um projeto demorado.
            </p>
            <p className="text-xl md:text-2xl text-sand-50 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
              Você recebe uma página objetiva e focada, com <span className="underline decoration-sand-300 underline-offset-4">baixo custo de criação e hospedagem gratuita</span> para projetos simples.
            </p>
            
            <Button href={waLink} className="!bg-sand-50 !text-terracotta hover:!bg-white hover:shadow-2xl hover:-translate-y-1 shadow-black/10 scale-100 font-bold text-lg px-10 py-5 transition-all mb-12">
              Quero criar minha LP
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            
            <div className="bg-black/15 border border-black/10 p-6 rounded-2xl text-sm md:text-base text-sand-100 mb-4 max-w-3xl mx-auto leading-relaxed shadow-inner">
              <strong>Observação importante:</strong> A hospedagem gratuita se aplica a páginas simples, dentro dos limites técnicos da estrutura utilizada. Projetos maiores ou complexos podem exigir outra estrutura.
            </div>
          </FadeIn>
        </Section>

        {/* 13. Rodapé Simplificado / Último CTA */}
        <Section className="bg-sand-50 pb-16 pt-24 border-b border-sand-400/20">
          <FadeIn className="max-w-3xl mx-auto text-center">
            <Lightbulb className="w-12 h-12 text-copper mx-auto mb-8 drop-shadow-sm" />
            <h2 className="text-3xl md:text-5xl font-bold text-earth-900 mb-8 tracking-tight">
              Quer transformar sua oferta em uma página pronta para gerar contatos?
            </h2>
            <p className="text-xl text-earth-800 mb-10 leading-relaxed font-medium">
              Me envie sua ideia e eu te ajudo a transformar sua oferta em uma landing page profissional, clara e bonita, com custo acessível.
            </p>
            <Button href={waLink} variant="primary" className="shadow-lg hover:shadow-xl px-10 py-5 text-lg font-bold group">
              <MessageCircle className="mr-2 w-6 h-6 group-hover:scale-110 transition-transform" />
              Falar sobre minha landing page
            </Button>
          </FadeIn>
        </Section>
        
        {/* Footer Real */}
        <footer className="py-8 bg-sand-100 text-center text-earth-800 text-sm font-medium">
          <p>© {new Date().getFullYear()} • Criação de Landing Pages Estratégicas</p>
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
