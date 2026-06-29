import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-sand-100 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-sand-400/40 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <a
            href="/"
            className="flex items-center gap-2 text-earth-800 hover:text-terracotta transition-colors font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao site
          </a>
          <span className="text-sand-400">|</span>
          <span className="text-earth-900 font-bold text-sm">Política de Privacidade e LGPD</span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl border border-sand-400/40 shadow-sm p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-earth-900 mb-2 tracking-tight">
            Política de Privacidade
          </h1>
          <p className="text-earth-800 font-medium mb-8 text-sm">
            Última atualização: junho de 2026
          </p>

          <div className="prose prose-sm max-w-none text-earth-800 leading-relaxed space-y-8">

            <section>
              <h2 className="text-xl font-bold text-earth-900 mb-3">1. Quem somos</h2>
              <p>
                Esta política se aplica ao site <strong className="text-earth-900">querominhapagina.com.br</strong>,
                operado por <strong className="text-earth-900">Flávio Corá</strong> (Voz Marketing),
                responsável pela criação e manutenção de páginas de qualificação para campanhas de WhatsApp Ads.
              </p>
              <p className="mt-3">
                Para dúvidas sobre esta política ou sobre o tratamento dos seus dados, entre em contato:{' '}
                <a href="mailto:contato@nandacora.com.br" className="text-terracotta hover:underline font-medium">
                  contato@nandacora.com.br
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-earth-900 mb-3">2. Quais dados coletamos</h2>
              <p>Ao preencher o filtro de qualificação neste site, podemos coletar:</p>
              <ul className="list-disc list-inside mt-3 space-y-1.5">
                <li><strong className="text-earth-900">Nome</strong> — para identificação do contato</li>
                <li><strong className="text-earth-900">Número de WhatsApp</strong> — para contato direto</li>
                <li><strong className="text-earth-900">E-mail</strong> — opcional, para comunicação adicional</li>
                <li><strong className="text-earth-900">Nome do negócio</strong> — para contextualizar o atendimento</li>
                <li><strong className="text-earth-900">Respostas ao filtro</strong> — tipo de oferta, plataformas utilizadas, problemas relatados, prazo</li>
              </ul>
              <p className="mt-3">
                Também coletamos dados técnicos de forma automática, como endereço IP, tipo de navegador,
                sistema operacional, páginas visitadas e tempo de permanência, por meio do Meta Pixel
                e do Google Analytics (GA4).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-earth-900 mb-3">3. Como usamos seus dados</h2>
              <p>Seus dados são utilizados exclusivamente para:</p>
              <ul className="list-disc list-inside mt-3 space-y-1.5">
                <li>Preparar e personalizar o atendimento no WhatsApp</li>
                <li>Identificar o perfil da demanda e propor a solução mais adequada</li>
                <li>Mensurar o desempenho das campanhas de anúncios (Meta Ads e Google Ads)</li>
                <li>Otimizar o algoritmo de entrega dos anúncios com base em eventos de qualificação</li>
              </ul>
              <p className="mt-3">
                Não utilizamos seus dados para envio de spam, listas de e-mail marketing
                ou qualquer finalidade não relacionada ao atendimento solicitado.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-earth-900 mb-3">4. Compartilhamento de dados</h2>
              <p>
                Seus dados podem ser compartilhados com as seguintes plataformas,
                exclusivamente para fins de mensuração e otimização de campanhas:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1.5">
                <li><strong className="text-earth-900">Meta (Facebook/Instagram)</strong> — via Pixel e Conversions API (CAPI)</li>
                <li><strong className="text-earth-900">Google Analytics (GA4)</strong> — para análise de comportamento</li>
              </ul>
              <p className="mt-3">
                Dados pessoais identificáveis (nome, telefone, e-mail) são enviados de forma
                hasheada (criptografada) às plataformas, nunca em texto puro.
                Não vendemos, alugamos ou cedemos seus dados a terceiros.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-earth-900 mb-3">5. Base legal para tratamento (LGPD)</h2>
              <p>
                O tratamento dos seus dados está fundamentado nas seguintes bases legais
                previstas na Lei Geral de Proteção de Dados (Lei nº 13.709/2018):
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1.5">
                <li><strong className="text-earth-900">Consentimento</strong> — ao preencher o formulário de qualificação, você consente com o uso dos dados para os fins descritos nesta política</li>
                <li><strong className="text-earth-900">Legítimo interesse</strong> — para mensuração e otimização de desempenho das campanhas</li>
                <li><strong className="text-earth-900">Execução de contrato</strong> — para prestação do serviço solicitado via WhatsApp</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-earth-900 mb-3">6. Por quanto tempo guardamos seus dados</h2>
              <p>
                Seus dados são mantidos pelo tempo necessário para a prestação do serviço e
                pelo prazo mínimo exigido por obrigações legais.
                Dados de mensuração de campanhas seguem as políticas de retenção das respectivas plataformas (Meta e Google).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-earth-900 mb-3">7. Seus direitos como titular</h2>
              <p>
                Em conformidade com a LGPD, você tem direito a:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1.5">
                <li>Confirmar a existência de tratamento dos seus dados</li>
                <li>Acessar os dados que temos sobre você</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação dos seus dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
                <li>Solicitar a portabilidade dos dados</li>
              </ul>
              <p className="mt-3">
                Para exercer qualquer um desses direitos, entre em contato:{' '}
                <a href="mailto:contato@nandacora.com.br" className="text-terracotta hover:underline font-medium">
                  contato@nandacora.com.br
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-earth-900 mb-3">8. Cookies e rastreamento</h2>
              <p>
                Este site utiliza cookies e tecnologias similares para rastreamento de
                comportamento de navegação e mensuração de campanhas publicitárias:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1.5">
                <li><strong className="text-earth-900">_fbp / _fbc</strong> — cookies do Meta Pixel para rastreamento de conversões</li>
                <li><strong className="text-earth-900">_ga / _gid</strong> — cookies do Google Analytics (GA4)</li>
                <li><strong className="text-earth-900">anon_external_id</strong> — identificador anônimo em localStorage para deduplicação de eventos</li>
              </ul>
              <p className="mt-3">
                Você pode desativar cookies nas configurações do seu navegador.
                Alguns recursos do site podem não funcionar corretamente sem eles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-earth-900 mb-3">9. Segurança</h2>
              <p>
                Adotamos medidas técnicas e organizacionais para proteger seus dados contra
                acesso não autorizado, perda, alteração ou divulgação indevida.
                A comunicação entre seu navegador e nossos servidores é criptografada via HTTPS.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-earth-900 mb-3">10. Alterações nesta política</h2>
              <p>
                Esta política pode ser atualizada periodicamente. Alterações relevantes
                serão comunicadas nesta página com a data de atualização.
                Recomendamos revisar este documento periodicamente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-earth-900 mb-3">11. Contato</h2>
              <p>
                Para qualquer dúvida relacionada a esta política ou ao tratamento dos seus dados:
              </p>
              <ul className="list-none mt-3 space-y-1.5">
                <li><strong className="text-earth-900">Responsável:</strong> Flávio Corá (Voz Marketing)</li>
                <li>
                  <strong className="text-earth-900">E-mail:</strong>{' '}
                  <a href="mailto:contato@nandacora.com.br" className="text-terracotta hover:underline font-medium">
                    contato@nandacora.com.br
                  </a>
                </li>
                <li>
                  <strong className="text-earth-900">Site:</strong>{' '}
                  <a href="https://querominhapagina.com.br" className="text-terracotta hover:underline font-medium">
                    querominhapagina.com.br
                  </a>
                </li>
              </ul>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-earth-800 text-sm font-medium">
        <p className="mb-2">© {new Date().getFullYear()} • Soluções de Qualificação para WhatsApp Ads</p>
        <a href="/" className="text-terracotta hover:underline text-xs">
          ← Voltar ao site
        </a>
      </footer>
    </div>
  );
}
