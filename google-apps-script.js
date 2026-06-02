/**
 * Integração da LP de Qualificação com Google Sheets
 * 
 * INSTRUÇÕES DE INSTALAÇÃO:
 * 1. Abra sua planilha do Google Sheets.
 * 2. Acesse: Extensões > Apps Script.
 * 3. Apague o código existente e cole este código completo lá.
 * 4. Altere a variável `SECRET_TOKEN` abaixo para uma senha segura da sua escolha.
 * 5. Clique no ícone de disquete (Salvar).
 * 6. Clique em "Implantar" > "Nova implantação".
 * 7. Selecione o tipo "App da Web".
 * 8. Descrição: "Integração LP WhatsApp".
 * 9. Executar como: "Eu".
 * 10. Quem tem acesso: "Qualquer pessoa" (isso é importante para a Vercel conseguir acessar).
 * 11. Clique em "Implantar" e conceda as permissões de acesso à sua própria conta Google.
 * 12. Copie a "URL do app da Web" fornecida no final.
 * 
 * CONFIGURAÇÃO NA VERCEL:
 * Acesse as variáveis de ambiente (Environment Variables) do projeto na Vercel e adicione:
 * - GOOGLE_SHEETS_WEBAPP_URL = <Cole a URL do app da Web que você copiou>
 * - GOOGLE_SHEETS_WEBAPP_TOKEN = <Digite o mesmo SECRET_TOKEN que você configurou no script>
 */

const SECRET_TOKEN = "querominhapagina@2026";

// Nomes das abas
const TAB_LEADS = "Leads";
const TAB_EVENTS = "Eventos";

// Nomes amigáveis dos eventos (Status do Funil)
const STATUS_MAP = {
  'FilterOpen': 'Filtro aberto',
  'QualificationStart': 'Filtro iniciado',
  'QualificationStep': 'Respondendo perguntas',
  'QualificationComplete': 'Filtro concluído',
  'Lead': 'Lead gerado',
  'Contact': 'WhatsApp aberto'
};

// Ordem de precedência dos status no funil (maior = mais avançado)
const FUNNEL_WEIGHT = {
  'Filtro aberto': 1,
  'Filtro iniciado': 2,
  'Respondendo perguntas': 3,
  'Filtro concluído': 4,
  'Lead gerado': 5,
  'WhatsApp aberto': 6
};

// ============================================================================
// RECEBIMENTO DOS DADOS (Webhook)
// ============================================================================
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responseJson({ status: 'error', message: 'Payload vazio' }, 400);
    }
    
    var payload = JSON.parse(e.postData.contents);
    
    // Validação de token
    if (payload.token !== SECRET_TOKEN) {
      return responseJson({ status: 'error', message: 'Token inválido' }, 401);
    }
    
    // Configura a planilha
    setupSpreadsheet();
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // 1. Registrar na aba de Eventos
    registrarEvento(ss, payload);
    
    // 2. Atualizar ou Criar na aba de Leads
    upsertLead(ss, payload);
    
    return responseJson({ 
      status: 'success', 
      message: 'Processado com sucesso',
      spreadsheetName: ss.getName(),
      spreadsheetUrl: ss.getUrl()
    }, 200);
    
  } catch (err) {
    Logger.log("Erro: " + err.toString());
    return responseJson({ status: 'error', message: err.toString() }, 500);
  }
}

// Para evitar erro 405 Method Not Allowed se acessarem a URL pelo navegador
function doGet(e) {
  return responseJson({ status: 'ok', message: 'Integração Google Sheets para LP operante. Use POST para enviar dados.' }, 200);
}

function responseJson(data, code) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// PROCESSAMENTO
// ============================================================================

function registrarEvento(ss, payload) {
  var sheet = ss.getSheetByName(TAB_EVENTS);
  var dataHora = new Date(payload.timestamp || new Date());
  
  var cd = payload.customData || {};
  var statusAmigavel = STATUS_MAP[payload.eventName] || payload.eventName;
  
  // Extrair UTMs
  var fallbackUtms = extrairUTMs(payload.sourceUrl);
  var utmsFromPayload = payload.utms || {};
  var utms = {
    source: utmsFromPayload.utm_source || fallbackUtms.source,
    medium: utmsFromPayload.utm_medium || fallbackUtms.medium,
    campaign: utmsFromPayload.utm_campaign || utmsFromPayload.campaign_name || fallbackUtms.campaign,
    adset: utmsFromPayload.utm_term || utmsFromPayload.adset_name || fallbackUtms.adset,
    ad: utmsFromPayload.utm_content || utmsFromPayload.ad_name || fallbackUtms.ad
  };
  
  var nome = cd.name || '';
  var fone = cd.phone || '';
  // Pegar phone do first_answer etc se aplicável não é ideal, usar os que passamos no custom_data
  
  var etapaRaw = cd.step_name || '';
  var etapaAmigavel = etapaRaw === 'currentAds' ? 'Anúncios' 
    : etapaRaw === 'offerType' ? 'Oferta'
    : etapaRaw === 'mainProblem' ? 'Problema'
    : etapaRaw === 'filterGoal' ? 'Filtro'
    : etapaRaw === 'timeframe' ? 'Prazo'
    : etapaRaw;

  // Cria a linha
  var row = [
    dataHora,           // Data/hora
    nome,               // Nome
    fone,               // WhatsApp
    payload.eventName,  // Evento
    etapaAmigavel,      // Etapa
    statusAmigavel,     // Status do funil
    utms.campaign,      // Campanha
    utms.adset,         // Grupo de anúncios
    utms.ad,            // Anúncio
    cd.cta_label || ''  // CTA de origem
  ];
  
  sheet.appendRow(row);
}

function upsertLead(ss, payload) {
  var sheet = ss.getSheetByName(TAB_LEADS);
  var cd = payload.customData || {};
  
  // Identificador do Lead
  // Como nem sempre temos FBP/FBC, usamos externalId ou phone como chave
  var leadKey = payload.externalId;
  if (!leadKey && cd.phone) {
    leadKey = cd.phone.replace(/\\D/g, ''); // só números
  }
  if (!leadKey) {
    leadKey = payload.fbc || payload.fbp;
  }
  if (!leadKey) {
    leadKey = "anon_" + new Date().getTime(); // fallback
  }

  // Prepara dados
  var statusAmigavel = STATUS_MAP[payload.eventName] || payload.eventName;
  var fallbackUtms = extrairUTMs(payload.sourceUrl);
  var utmsFromPayload = payload.utms || {};
  var utms = {
    source: utmsFromPayload.utm_source || fallbackUtms.source,
    medium: utmsFromPayload.utm_medium || fallbackUtms.medium,
    campaign: utmsFromPayload.utm_campaign || utmsFromPayload.campaign_name || fallbackUtms.campaign,
    adset: utmsFromPayload.utm_term || utmsFromPayload.adset_name || fallbackUtms.adset,
    ad: utmsFromPayload.utm_content || utmsFromPayload.ad_name || fallbackUtms.ad
  };
  var dataHora = new Date(payload.timestamp || new Date());
  
  // Formatar Arrays
  var offerType = formatArray(cd.offer_type || cd.offerType);
  var currentAds = formatArray(cd.current_ads || cd.currentAds);
  var mainProblem = formatArray(cd.main_problem || cd.mainProblem);
  var filterGoal = formatArray(cd.filter_goal || cd.filterGoal);
  var timeframe = formatArray(cd.timeframe);

  // Apenas tentar identificar se o cara mandou um contact e podemos extrair dados de respostas
  // Note: O customData envia as chaves mapeadas. Na QualificationComplete manda offer_type com _, etc.
  
  // Construir mensagem do WhatsApp para a coluna final
  var msgWhatsApp = montarMensagem(cd);
  
  // Buscar se o Lead já existe
  var data = sheet.getDataRange().getValues();
  var rowIndex = -1;
  var existingRow = [];
  
  // Procurar leadKey na coluna escondida (A)
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(leadKey)) {
      rowIndex = i + 1;
      existingRow = data[i];
      break;
    }
  }
  
  var finalStatus = statusAmigavel;
  var dataDoLead = dataHora;
  
  if (rowIndex > -1) {
    // Atualiza
    var currentStatus = existingRow[17]; // Status do funil eq Q (índice 16 + 1(Key))? Vamos conferir as colunas abaixo
    var currentWeight = FUNNEL_WEIGHT[currentStatus] || 0;
    var newWeight = FUNNEL_WEIGHT[statusAmigavel] || 0;
    
    if (newWeight > currentWeight) {
      finalStatus = statusAmigavel;
    } else {
      finalStatus = currentStatus;
    }
    
    // Manter a data inicial do lead
    dataDoLead = existingRow[1] || dataHora;
    
    // Fazer merge de campos para não apagar o que já foi preenchido
    var newRowValues = [
      leadKey,                                      // 0: Chave Interna (Oculta)
      dataDoLead,                                   // 1: Data do lead
      cd.name || existingRow[2],                    // 2: Nome
      cd.businessName || existingRow[3],            // 3: Negócio
      cd.phone || existingRow[4],                   // 4: WhatsApp
      '',                                           // 5: E-mail (não pedido hoje, mas reservado)
      offerType || existingRow[6],                  // 6: Tipo de oferta
      currentAds || existingRow[7],                 // 7: Onde anuncia hoje
      mainProblem || existingRow[8],                // 8: Principais problemas
      filterGoal || existingRow[9],                 // 9: O que quer filtrar
      timeframe || existingRow[10],                 // 10: Prazo desejado
      utms.source || existingRow[11],               // 11: Origem
      utms.medium || existingRow[12],               // 12: Mídia
      utms.campaign || existingRow[13],             // 13: Campanha
      utms.adset || existingRow[14],                // 14: Grupo de anúncios
      utms.ad || existingRow[15],                   // 15: Anúncio
      cd.cta_label || existingRow[16],              // 16: CTA de origem
      finalStatus,                                  // 17: Status do funil
      statusAmigavel,                               // 18: Último evento
      msgWhatsApp || existingRow[19]                // 19: Mensagem WhatsApp
    ];
    
    sheet.getRange(rowIndex, 1, 1, newRowValues.length).setValues([newRowValues]);
    
  } else {
    // Cria
    var newRowValues = [
      leadKey,                                      // 0: Chave Interna (Oculta)
      dataDoLead,                                   // 1: Data do lead
      cd.name || '',                                // 2: Nome
      cd.businessName || '',                        // 3: Negócio
      cd.phone || '',                               // 4: WhatsApp
      '',                                           // 5: E-mail
      offerType || '',                              // 6: Tipo de oferta
      currentAds || '',                             // 7: Onde anuncia hoje
      mainProblem || '',                            // 8: Principais problemas
      filterGoal || '',                             // 9: O que quer filtrar
      timeframe || '',                              // 10: Prazo desejado
      utms.source || 'Não informado',               // 11: Origem
      utms.medium || 'Não informado',               // 12: Mídia
      utms.campaign || 'Não informado',             // 13: Campanha
      utms.adset || 'Não informado',                // 14: Grupo de anúncios
      utms.ad || 'Não informado',                   // 15: Anúncio
      cd.cta_label || '',                           // 16: CTA de origem
      finalStatus,                                  // 17: Status do funil
      statusAmigavel,                               // 18: Último evento
      msgWhatsApp || ''                             // 19: Mensagem WhatsApp
    ];
    
    sheet.appendRow(newRowValues);
  }
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

function formatArray(value) {
  if (!value) return '';
  if (Array.isArray(value)) return value.join(', ');
  return value;
}

function montarMensagem(cd) {
  // Só monta mensagem se os dados existirem para montar
  if (!cd.offer_type && !cd.current_ads) return '';
  
  var formatList = function(val) {
    if (!val) return '• Não informado';
    var text = String(val);
    if (text.indexOf(',') > -1) {
      return text.split(',').map(function(item) { return '• ' + item.trim(); }).join('\\n');
    }
    return '• ' + text;
  };

  var msg = "Olá! Vim pela página e respondi o filtro de qualificação. ✅\\n\\n";
  msg += "*Resumo do pedido*\\n\\n";
  msg += "*Nome:* " + (cd.name || 'Não informado') + "\\n";
  msg += "*Negócio:* " + (cd.businessName || 'não informado') + "\\n";
  if (cd.phone) {
    msg += "*WhatsApp informado:* " + cd.phone + "\\n";
  }
  msg += "\\n📌 *Tipo de oferta*\\n" + formatList(cd.offer_type);
  msg += "\\n\\n📣 *Onde anuncia hoje*\\n" + formatList(cd.current_ads);
  msg += "\\n\\n⚠️ *Principais problemas nos contatos*\\n" + formatList(cd.main_problem);
  msg += "\\n\\n🎯 *O que quero filtrar*\\n" + formatList(cd.filter_goal);
  msg += "\\n\\n⏱️ *Prazo desejado*\\n" + (cd.timeframe || 'Não informado');
  
  return msg;
}

function extrairUTMs(url) {
  var result = {
    source: '',
    medium: '',
    campaign: '',
    adset: '',
    ad: ''
  };
  
  if (!url) return result;
  
  try {
    var qs = url.split('?')[1];
    if (qs) {
      var pairs = qs.split('&');
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        var key = decodeURIComponent(pair[0]).toLowerCase();
        var value = pair.length > 1 ? decodeURIComponent(pair[1]) : '';
        
        if (key === 'utm_source') result.source = value;
        if (key === 'utm_medium') result.medium = value;
        if (key === 'utm_campaign' || key === 'campaign_name') result.campaign = value;
        if (key === 'utm_term' || key === 'adset_name') result.adset = value;
        if (key === 'utm_content' || key === 'ad_name') result.ad = value;
      }
    }
  } catch (e) {}
  
  return result;
}

// Configura formatação e cabeçalhos na primeira execução
function setupSpreadsheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheetLeads = ss.getSheetByName(TAB_LEADS);
  if (!sheetLeads) {
    sheetLeads = ss.insertSheet(TAB_LEADS, 0); // No início
    var headerLeads = [
      'ID Interno (Oculto)',
      'Data do lead',
      'Nome',
      'Negócio',
      'WhatsApp',
      'E-mail',
      'Tipo de oferta',
      'Onde anuncia hoje',
      'Principais problemas',
      'O que quer filtrar',
      'Prazo desejado',
      'Origem',
      'Mídia',
      'Campanha',
      'Grupo de anúncios',
      'Anúncio',
      'CTA de origem',
      'Status do funil',
      'Último evento',
      'Mensagem enviada para WhatsApp'
    ];
    sheetLeads.appendRow(headerLeads);
    sheetLeads.getRange("1:1").setFontWeight("bold").setBackground("#f3f3f3");
    sheetLeads.hideColumns(1); // Esconder coluna ID
    sheetLeads.setFrozenRows(1);
    
    // Auto redimensionar algumas colunas essenciais
    sheetLeads.setColumnWidth(2, 140);
    sheetLeads.setColumnWidth(3, 160);
    sheetLeads.setColumnWidth(20, 250);
  }
  
  var sheetEvents = ss.getSheetByName(TAB_EVENTS);
  if (!sheetEvents) {
    sheetEvents = ss.insertSheet(TAB_EVENTS, 1);
    var headerEvents = [
      'Data/hora',
      'Nome',
      'WhatsApp',
      'Evento',
      'Etapa',
      'Status do funil',
      'Campanha',
      'Grupo de anúncios',
      'Anúncio',
      'CTA de origem'
    ];
    sheetEvents.appendRow(headerEvents);
    sheetEvents.getRange("1:1").setFontWeight("bold").setBackground("#f3f3f3");
    sheetEvents.setFrozenRows(1);
  }
}
