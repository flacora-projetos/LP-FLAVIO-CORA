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
} from 'lucide-react';

const waLink =
  'https://wa.me/5562999465725?text=Ol%C3%A1%2C%20quero%20criar%20uma%20landing%20page%20para%20minha%20oferta.';

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
  <section id={id} className={`py-20 md:py-32 px-6 ${className}`}>
    <div className="max-w-7xl mx-auto">{children}</div>
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
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 px-8 py-4 text-[16px]';
  const primaryStyle =
    'bg-terracotta text-sand-50 shadow-md shadow-terracotta/20 hover:bg-caramel hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0';
  const secondaryStyle =
    'bg-transparent border border-sand-400 text-earth-900 hover:bg-sand-400/20 active:bg-sand-400/40';

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className={`${baseStyle} ${variant === 'primary' ? primaryStyle : secondaryStyle} ${className}`}
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
  <div className="bg-sand-50 p-8 rounded-3xl border border-sand-400/30 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="bg-sand-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
      <Icon className="w-6 h-6 text-copper" />
    </div>
    <h3 className="text-xl font-semibold text-earth-900 mb-3">{title}</h3>
    {text && <p className="text-earth-800 leading-relaxed">{text}</p>}
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-sand-100 font-sans selection:bg-terracotta/20">
      {/* Navbar Minimalist */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-sand-100/80 backdrop-blur-md border-b border-sand-400/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-semibold text-earth-900 text-xl tracking-tight">
            Landing Pages
          </div>
          <div className="hidden md:flex items-center gap-8">
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

      <main className="pt-20">
        {/* 1. Hero */}
        <Section className="pb-16 pt-24 md:pt-32">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-earth-900 leading-[1.1] mb-6">
                Landing pages simples, bonitas e prontas para divulgar sua
                oferta.
              </h1>
              <p className="text-xl text-earth-800 leading-relaxed mb-8 font-medium">
                Criação de LPs estratégicas para campanhas, promoções, serviços,
                imóveis, cursos, eventos e ações pontuais, com foco em clareza,
                conversão e contato direto pelo WhatsApp.
              </p>
              <p className="text-earth-800 leading-relaxed mb-10">
                Se você precisa divulgar uma oferta específica, talvez não
                precise de um site completo. Uma landing page bem feita pode
                apresentar sua solução com clareza, valorizar seus diferenciais e
                levar o visitante para uma ação simples: chamar, cadastrar, pedir
                orçamento ou agendar uma conversa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href={waLink}>
                  Quero criar minha LP
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button href="#aplicacoes" variant="secondary">
                  Ver onde uma LP pode ser usada
                </Button>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="relative">
              <div className="aspect-[4/3] md:aspect-[3/4] lg:aspect-square rounded-[36px] overflow-hidden bg-sand-300 relative border border-sand-400/20 shadow-xl shadow-earth-900/5">
                <img
                  src={images.hero}
                  alt="Apresentação do serviço de Landing Pages"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* 2. Seção de Esclarecimento Rápido */}
        <Section className="bg-sand-50/50">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-earth-900 mb-6">
                Não é um site completo. É uma página feita para gerar ação.
              </h2>
              <p className="text-lg text-earth-800 leading-relaxed">
                Meu trabalho é criar landing pages simples e objetivas para
                campanhas, divulgações pontuais e ofertas específicas.
                <br />
                <br />A ideia não é construir um portal, um site institucional
                cheio de abas ou uma plataforma complexa. A ideia é criar uma
                página clara, rápida e bem estruturada para apresentar uma oferta
                e conduzir o visitante para o próximo passo.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {[
                { text: 'Campanhas de tráfego pago', icon: Target },
                { text: 'Promoções e ofertas específicas', icon: Zap },
                { text: 'Captação de leads', icon: Users },
                { text: 'Divulgação de serviços', icon: Briefcase },
                { text: 'Lançamentos simples', icon: Rocket },
                { text: 'Contato via WhatsApp', icon: MessageCircle },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-sand-100 border border-sand-400/40 rounded-full py-3 px-6 flex items-center gap-3 text-earth-900 font-medium whitespace-nowrap"
                >
                  <item.icon className="w-4 h-4 text-copper" />
                  {item.text}
                </div>
              ))}
            </div>
          </FadeIn>
        </Section>

        {/* 3. Para quem é */}
        <Section id="para-quem-e">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-center">
            <FadeIn>
              <div className="aspect-[4/5] rounded-[36px] overflow-hidden">
                <img
                  src={images.audience}
                  alt="Diferentes públicos que podem usar landing pages"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold text-earth-900 mb-6">
                Para quem precisa divulgar uma oferta de forma simples e
                profissional.
              </h2>
              <p className="text-lg text-earth-800 mb-10 leading-relaxed">
                Uma LP funciona muito bem quando o objetivo é apresentar uma
                oferta específica sem distrair o visitante com várias páginas,
                menus e caminhos desnecessários.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
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
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-copper shrink-0 mt-0.5" />
                    <span className="text-earth-900 font-medium">{item}</span>
                  </div>
                ))}
              </div>
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

          <FadeIn className="mb-16">
            <div className="w-full h-48 md:h-80 rounded-[32px] overflow-hidden shadow-lg shadow-earth-900/5">
              <img
                src={images.applications}
                alt="Exemplos de aplicações práticas"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                text="Transforme um imóvel em uma apresentação digital mais valorizada, com fotos, diferenciais, localização e contato direto."
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
                title="Promoções e campanhas rápidas"
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
                title="E-commerce e produtos pontuais"
                text="Crie páginas para produtos específicos, kits, coleções, campanhas sazonais ou ações promocionais."
              />
            </FadeIn>
          </div>
        </Section>

        {/* 5. Problema que a LP resolve */}
        <Section>
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold text-earth-900 mb-12 leading-tight">
                Seu anúncio pode chamar atenção. Mas se a página não convence, o
                clique vira desperdício.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} className="mb-16">
              <div className="aspect-[21/9] rounded-[36px] overflow-hidden shadow-xl shadow-earth-900/10">
                <img
                  src={images.problem}
                  alt="Contraste entre uma jornada confusa e uma clara"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-left md:text-center max-w-3xl mx-auto space-y-6 text-lg text-earth-800">
                <p>
                  Muita campanha perde resultado porque a pessoa clica no anúncio
                  e cai em uma página confusa, genérica, lenta ou sem um caminho
                  claro de conversão.
                </p>
                <p>O visitante precisa entender rapidamente:</p>
                <div className="flex flex-wrap justify-start md:justify-center gap-3 py-2">
                  {[
                    'o que você oferece',
                    'para quem é',
                    'qual problema resolve',
                    'quais são os diferenciais',
                    'por que confiar',
                    'qual é o próximo passo',
                  ].map((item, i) => (
                    <span
                      key={i}
                      className="bg-sand-300/30 text-earth-900 px-4 py-2 rounded-lg font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p>
                  Quando isso não está claro, ele sai da página. E o dinheiro do
                  tráfego vai embora junto, como se verba de anúncio nascesse em
                  árvore, essa ficção coletiva tão popular.
                </p>
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* 6. O que eu entrego */}
        <Section className="bg-earth-900 text-sand-50">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-sand-50">
                Uma landing page pensada do briefing até o botão final.
              </h2>
              <p className="text-sand-300 text-lg mb-10 leading-relaxed">
                A criação da LP inclui estratégia, texto, estrutura e orientação
                visual. A página é construída para ser simples de navegar,
                bonita no celular e focada em conversão.
              </p>
              <div className="space-y-4">
                {[
                  'Organização do briefing da oferta',
                  'Definição do público-alvo da página',
                  'Estrutura estratégica da LP',
                  'Headline, subtítulos e copy completa',
                  'Seções de benefícios, diferenciais e prova',
                  'Chamadas para ação ao longo da página',
                  'Direção visual compatível com sua marca',
                  'Orientação de uso de materiais reais',
                  'Botões para WhatsApp ou formulário',
                  'Página publicada (hospedagem grátis p/ projetos simples)',
                  'Ajustes básicos após a primeira versão',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-copper/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-copper" />
                    </div>
                    <span className="text-sand-100 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="lg:order-last order-first">
              <div className="aspect-[3/4] rounded-[36px] overflow-hidden border border-sand-400/10">
                <img
                  src={images.deliverables}
                  alt="Processo estruturado de entrega"
                  className="w-full h-full object-cover"
                />
              </div>
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

          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
            <div className="space-y-8">
              <FadeIn delay={0.1}>
                <Card
                  icon={Search}
                  title="Copy pensada para conversão"
                  text="O texto não é só decorativo. Ele organiza a oferta, antecipa dúvidas e conduz a pessoa para a ação."
                />
              </FadeIn>
              <FadeIn delay={0.2}>
                <Card
                  icon={Smartphone}
                  title="Visual moderno e direto"
                  text="Layout limpo, responsivo e com boa leitura no celular, sem excesso de blocos disputando atenção."
                />
              </FadeIn>
              <FadeIn delay={0.3}>
                <Card
                  icon={Crosshair}
                  title="Feita para campanhas"
                  text="A página já nasce pensando em anúncios, cliques, tráfego frio, escaneabilidade e conversão."
                />
              </FadeIn>
            </div>
            
            <FadeIn delay={0.4} className="hidden lg:block w-[320px]">
              <div className="aspect-[9/16] rounded-[36px] overflow-hidden bg-sand-300">
                <img src={images.differentials} alt="Imagem de apoio" className="w-full h-full object-cover" />
              </div>
            </FadeIn>

            <div className="space-y-8">
              <FadeIn delay={0.5}>
                <Card
                  icon={TrendingUp}
                  title="Baixo custo de criação"
                  text="Uma solução mais acessível para quem precisa de uma presença digital pontual, sem contratar um projeto grande."
                />
              </FadeIn>
              <FadeIn delay={0.6}>
                <Card
                  icon={ShieldCheck}
                  title="Hospedagem gratuita (p/ simples)"
                  text="A LP pode ser publicada em uma estrutura moderna com custo zero de hospedagem para projetos dentro dos limites."
                />
              </FadeIn>
              <FadeIn delay={0.7}>
                <Card
                  icon={MessageCircle}
                  title="Foco em WhatsApp e contato rápido"
                  text="Ideal para negócios que querem levar o visitante direto para conversa, orçamento ou atendimento comercial."
                />
              </FadeIn>
            </div>
          </div>
        </Section>

        {/* 8. Como funciona */}
        <Section className="bg-sand-50/80">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-900 mb-6">
              Um processo simples para tirar sua oferta do improviso.
            </h2>
          </FadeIn>

          <FadeIn className="mb-16">
            <div className="w-full h-48 md:h-72 rounded-[32px] overflow-hidden">
              <img
                src={images.process}
                alt="Etapas do processo"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { num: '1', title: 'Briefing', text: 'Você envia as informações, fotos e canais.' },
              { num: '2', title: 'Estratégia', text: 'Organizo a estrutura, benefícios e CTAs.' },
              { num: '3', title: 'Copy & Visual', text: 'Texto comercial e direção visual.' },
              { num: '4', title: 'Construção', text: 'Montagem focada em velocidade e mobile.' },
              { num: '5', title: 'Publicação', text: 'Pronta para anúncios, Insta e WhatsApp.' },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.1} className="bg-sand-100 p-6 rounded-3xl border border-sand-400/30">
                <div className="text-4xl font-black text-sand-300 mb-4">{step.num}</div>
                <h3 className="font-bold text-earth-900 mb-2">{step.title}</h3>
                <p className="text-sm text-earth-800">{step.text}</p>
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
          
          <FadeIn className="mb-16 scale-100">
             <div className="w-full h-32 md:h-64 rounded-3xl overflow-hidden grayscale contrast-125 opacity-80 mix-blend-multiply">
               {/* Usar a imagem como faixa, mas a instrução pedia imagem na vitrine */}
               <img src={images.examples} alt="Exemplos" className="w-full h-full object-cover hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
             </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 max-w-5xl mx-auto">
            <FadeIn delay={0.1}>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-earth-900 font-medium"><PanelTop className="w-5 h-5 text-copper"/> LP para venda de imóvel</li>
                <li className="flex items-center gap-3 text-earth-900 font-medium"><PanelTop className="w-5 h-5 text-copper"/> LP para captação de curso</li>
                <li className="flex items-center gap-3 text-earth-900 font-medium"><PanelTop className="w-5 h-5 text-copper"/> LP para profissional liberal</li>
                <li className="flex items-center gap-3 text-earth-900 font-medium"><PanelTop className="w-5 h-5 text-copper"/> LP para clínica estética</li>
              </ul>
            </FadeIn>
            <FadeIn delay={0.2}>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-earth-900 font-medium"><PanelTop className="w-5 h-5 text-copper"/> LP para WhatsApp</li>
                <li className="flex items-center gap-3 text-earth-900 font-medium"><PanelTop className="w-5 h-5 text-copper"/> LP para evento presencial</li>
                <li className="flex items-center gap-3 text-earth-900 font-medium"><PanelTop className="w-5 h-5 text-copper"/> LP para aula gratuita</li>
                <li className="flex items-center gap-3 text-earth-900 font-medium"><PanelTop className="w-5 h-5 text-copper"/> LP para mentoria</li>
              </ul>
            </FadeIn>
            <FadeIn delay={0.3}>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-earth-900 font-medium"><PanelTop className="w-5 h-5 text-copper"/> LP para serviço local</li>
                <li className="flex items-center gap-3 text-earth-900 font-medium"><PanelTop className="w-5 h-5 text-copper"/> LP para lançamento simples</li>
                <li className="flex items-center gap-3 text-earth-900 font-medium"><PanelTop className="w-5 h-5 text-copper"/> LP para consultoria</li>
                <li className="flex items-center gap-3 text-earth-900 font-medium"><PanelTop className="w-5 h-5 text-copper"/> LP para e-commerce (sazonal)</li>
              </ul>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} className="mt-12 text-center text-earth-800 text-sm max-w-2xl mx-auto italic">
            Todas são páginas simples, diretas e focadas em uma ação principal. Não são sites completos com várias páginas.
          </FadeIn>
        </Section>

        {/* 10. Comparativo */}
        <Section className="bg-sand-300/20">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-earth-900 mb-6">
                Você talvez não precise de um site completo. Talvez precise de uma página que venda uma ideia com clareza.
              </h2>
            </FadeIn>
          </div>

          <FadeIn className="mb-16">
            <div className="w-full h-48 md:h-80 rounded-[32px] overflow-hidden shadow-lg shadow-earth-900/5">
              <img
                src={images.comparison}
                alt="Comparativo visual entre Site completo e Landing Page"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <FadeIn delay={0.1} className="bg-sand-50 p-8 rounded-3xl border border-sand-400/40">
              <h3 className="text-2xl font-bold text-earth-900 mb-6 pb-4 border-b border-sand-400/30">Site tradicional</h3>
              <ul className="space-y-4">
                {['Mais páginas', 'Mais tempo de produção', 'Mais custo', 'Mais manutenção', 'Mais distrações', 'Melhor para presença institucional ampla'].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-earth-800 font-medium before:content-[''] before:w-1.5 before:h-1.5 before:bg-earth-800/30 before:rounded-full">{item}</li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.2} className="bg-white p-8 rounded-3xl shadow-xl shadow-earth-900/5 ring-1 ring-terracotta/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
              <h3 className="text-2xl font-bold text-terracotta mb-6 pb-4 border-b border-sand-400/30">Landing page</h3>
              <ul className="space-y-4 relative">
                {['Uma oferta específica', 'Produção mais rápida', 'Custo menor', 'Foco em conversão', 'Ideal para anúncios', 'Melhor para campanhas pontuais'].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-earth-900 font-medium before:content-[''] before:w-1.5 before:h-1.5 before:bg-terracotta/60 before:rounded-full">{item}</li>
                ))}
              </ul>
            </FadeIn>
          </div>
          <FadeIn delay={0.3} className="text-center max-w-3xl mx-auto text-lg text-earth-800 leading-relaxed font-medium">
            Se o objetivo é divulgar uma oferta específica e gerar ação, uma LP bem feita pode ser mais eficiente do que um site cheio de abas que ninguém vai visitar.
          </FadeIn>
        </Section>

        {/* 11. Autoridade / CTA Final */}
        <Section className="bg-earth-900 text-sand-50 pb-0">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-end pb-20">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-sand-50">
                Feita por quem entende de tráfego, copy e conversão.
              </h2>
              <div className="space-y-6 text-sand-300 text-lg leading-relaxed mb-12">
                <p>
                  Meu trabalho une criação de página, visão de marketing e experiência com campanhas de tráfego pago. Isso ajuda a construir LPs que não são apenas bonitas, mas pensadas para receber visitantes de anúncios, redes sociais e WhatsApp com uma mensagem clara e um caminho de conversão bem definido.
                </p>
                <p>
                  A página é criada com raciocínio comercial: o que destacar, o que cortar, qual ordem usar, onde posicionar os botões e como transformar características soltas em argumentos que fazem sentido para o público.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="relative h-full flex items-end">
              <div className="w-full aspect-square rounded-t-[36px] overflow-hidden -mb-20 object-cover">
                 <img src={images.authority} alt="Autoridade" className="w-full h-full object-cover object-top" />
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* 12. Oferta Comercial & CTA Final */}
        <Section className="bg-terracotta text-sand-50 text-center py-24 md:py-32">
          <FadeIn className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-sand-50 leading-tight">
              Uma LP profissional sem o custo pesado de um site completo.
            </h2>
            <p className="text-xl text-sand-100/90 mb-6 leading-relaxed max-w-3xl mx-auto">
              Ideal para quem precisa validar uma oferta, rodar uma campanha, divulgar um serviço ou criar uma presença digital específica sem entrar em um projeto caro e demorado.
            </p>
            <p className="text-lg text-sand-100/90 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
              Você recebe uma página objetiva, moderna e focada em conversão, com custo acessível de criação e <span className="underline decoration-sand-300 underline-offset-4">hospedagem gratuita para projetos simples</span>.
            </p>
            
            <div className="bg-white/10 border border-white/20 p-6 rounded-2xl text-sm text-sand-100/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              <strong>Observação importante:</strong> A hospedagem gratuita se aplica a páginas simples, dentro dos limites técnicos da estrutura utilizada. Projetos maiores, com banco de dados, áreas logadas, integrações complexas, e-commerce completo ou alto volume de tráfego podem exigir outra estrutura.
            </div>

            <Button href={waLink} className="bg-sand-50 text-terracotta hover:bg-white hover:shadow-xl shadow-black/10 scale-105">
              Quero criar minha LP
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </FadeIn>
        </Section>

        {/* 13. Rodapé Simplificado / Último CTA */}
        <Section className="bg-sand-100 py-24">
          <FadeIn className="max-w-2xl mx-auto text-center">
            <Lightbulb className="w-12 h-12 text-copper mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-earth-900 mb-6">
              Quer transformar sua oferta em uma página clara, bonita e pronta para gerar contatos?
            </h2>
            <p className="text-lg text-earth-800 mb-10 leading-relaxed font-medium">
              Me envie sua ideia, serviço, produto, imóvel, campanha ou promoção. Eu te ajudo a organizar a oferta e transformar isso em uma landing page profissional, com foco em conversão e custo acessível.
            </p>
            <Button href={waLink} variant="primary">
              <MessageCircle className="mr-2 w-5 h-5" />
              Falar sobre minha landing page
            </Button>
          </FadeIn>
        </Section>
        
        {/* Footer Real */}
        <footer className="py-8 border-t border-sand-400/20 text-center text-earth-800 text-sm">
          <p>© {new Date().getFullYear()} • Criação de Landing Pages Estratégicas</p>
        </footer>
      </main>
    </div>
  );
}

