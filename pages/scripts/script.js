let carbonLevel = 0;
const maxCarbon = 100;
const carbonBar = document.getElementById("carbonMeter");
const emailList = document.getElementById("emailList");

let score = 0;

let questions = [
  {
    question: "Qual destas práticas ajuda a reduzir a pegada de carbono digital?",
    options: [
      "Desligar o computador quando não estiver usando",
      "Deixar vídeos em autoplay",
      "Manter 50 abas abertas",
      "Assistir vídeos em 4K no celular"
    ],
    correct: 0
  },
  {
    question: "Qual prática melhora a segurança no mundo digital?",
    options: [
      "Usar a mesma senha em todos os sites",
      "Compartilhar senhas por e-mail",
      "Ativar autenticação de dois fatores",
      "Desligar o antivírus"
    ],
    correct: 2
  },
  {
    question: "Qual ação reduz o impacto ambiental de e-mails?",
    options: [
      "Enviar e-mails com anexos grandes",
      "Excluir e-mails antigos regularmente",
      "Manter lixo eletrônico cheio",
      "Enviar mensagens para todos os contatos sempre"
    ],
    correct: 1
  }
];

const maliciousGifs = [
  "./assets/gifs/hack1.gif",
];

const emailQueue = [
  // E-mails falsos (phishing)
  {
    title: "Promoção exclusiva da Amazon!",
    from: "oferta@amazon-oficial.com",
    body: "Aproveite nossa super promoção! Ganhe 50% de desconto na sua próxima compra. Não perca essa oportunidade imperdível.",
    bodyFull: "Olá! Somos da equipe de ofertas da Amazon e preparamos algo especial para você. Nesta promoção exclusiva, além dos 50% de desconto, você receberá um voucher adicional de frete grátis para usar em toda a sua próxima compra. Mas atenção: a oferta é válida somente nas próximas 24 horas. Acesse agora mesmo o link abaixo, confira nossas categorias em destaque e garanta já os melhores produtos pelo menor preço. Boas compras e obrigado por escolher a Amazon!",
    isSafe: false
  },
  {
    title: "Alerta do banco urgente",
    from: "suporte@bancoalerta.com",
    body: "Detectamos atividade suspeita na sua conta, atualize seus dados bancários agora mesmo para evitar bloqueio.",
    bodyFull: "Prezado cliente, nossa equipe de segurança identificou acessos incomuns que podem comprometer o saldo e as transações da sua conta. Para sua proteção, solicitamos que confirme imediatamente suas informações através do link seguro abaixo. Caso não regularize dentro das próximas 2 horas, sua conta será temporariamente suspensa até que possamos garantir sua segurança. Em caso de dúvida, entre em contato pelo nosso telefone de suporte 24h. Agradecemos sua colaboração e lamentamos qualquer inconveniente.",
    isSafe: false
  },
  {
    title: "Ganhe um iPhone agora!",
    from: "promo@apple-vencedores.com",
    body: "Você foi selecionado! Clique e responda 3 perguntas e ganhe um iPhone novinho. Não fique de fora dessa!",
    bodyFull: "Parabéns! Após um sorteio exclusivo, seu e-mail foi escolhido para participar da nossa campanha 'iPhone dos Sonhos'. Basta responder rapidamente três perguntas simples sobre seus hábitos de consumo de tecnologia para confirmar sua participação. Em seguida, você receberá um código único para resgatar seu novo iPhone 13 Pro Max gratuitamente. Mas atenção: as vagas são limitadas e a promoção termina à meia-noite de hoje. Aproveite antes que acabe!",
    isSafe: false
  },
  {
    title: "Receita Federal - reembolso",
    from: "reembolso@rf-gov.com.br",
    body: "Você tem valores a receber. Clique no link e cadastre sua conta para receber o reembolso da Receita.",
    bodyFull: "Caro contribuinte, após análise de sua declaração de imposto de renda, constatamos que você tem direito a um crédito de imposto no valor de R$ 1.254,00. Para agilizar seu reembolso, informe os dados da sua conta bancária e CPF no formulário seguro disponível no link. A Receita Federal reforça: o procedimento é indispensável para depósito automático. Não perca o prazo; faça o cadastro até o final do mês e receba o valor em até 5 dias úteis.",
    isSafe: false
  },
  {
    title: "Seu CPF está irregular",
    from: "cpf@serpro-suporte.com",
    body: "Identificamos uma irregularidade no seu CPF. Acesse o link para regularização imediata.",
    bodyFull: "Olá, cidadão. Detectamos que há pendências cadastrais no seu CPF junto ao SERPRO, o que pode impedir certas operações bancárias e financeiras. Para regularizar em poucos minutos, acesse o portal oficial através do link abaixo e siga o passo a passo de identificação. Ao concluir, você receberá a certidão negativa atualizada diretamente no seu e‑mail. Atente-se: caso não regularize em até 48 horas, seu CPF poderá ser suspenso para novas operações.",
    isSafe: false
  },
  {
    title: "WhatsApp Gold liberado",
    from: "exclusive@whatsgold.com",
    body: "Versão gold do WhatsApp liberada só hoje! Instale agora e veja as novidades incríveis.",
    bodyFull: "Olá! Seja um dos primeiros a testar o WhatsApp Gold, nossa versão premium com recursos exclusivos: chamadas em grupo com até 50 participantes, temas personalizados e criptografia de ponta ainda mais reforçada. O download está disponível apenas hoje e o acesso é restrito a convites limitados. Clique no link, instale o APK e aproveite funcionalidades que não estarão nas versões convencionais. Garanta já seu acesso antes que o convite expire!",
    isSafe: false
  },
  {
    title: "Netflix cancelou seu acesso",
    from: "netflix@cancelamento.com",
    body: "Sua conta foi cancelada. Atualize o pagamento imediatamente para não perder acesso aos conteúdos.",
    bodyFull: "Prezado assinante, identificamos uma falha no processamento do seu último pagamento, o que resultou no bloqueio temporário da sua conta Netflix. Para reativar e continuar assistindo suas séries e filmes favoritos sem interrupções, atualize os dados do cartão cadastrado através do link seguro abaixo. Caso não regularize em 24 horas, sua assinatura será encerrada e seu histórico de recomendações, perdido. Aguardamos sua atualização para mais maratonas!",
    isSafe: false
  },
  {
    title: "Sua senha vazou na internet",
    from: "seguranca@protecao.com",
    body: "Urgente! sua senha está circulando na internete. Clique aqui para mudar antes que seja tarde demais.",
    bodyFull: "Olá, notamos que seu e‑mail e senha foram publicados em um fórum público de vazamentos de dados, o que pode colocar suas contas em risco. Para minimizar danos, altere imediatamente suas senhas principais e ative a autenticação em duas etapas nos serviços mais críticos. Você pode começar o procedimento clicando no link abaixo, que o guiará por um processo seguro de redefinição. Proteja-se antes que invasores usem essas informações.",
    isSafe: false
  },

  // E-mails reais (seguros)
  {
    title: "Confirmação de pagamento da Amazon",
    from: "no-reply@amazon.com.br",
    body: "Seu pagamento foi confirmado com sucesso. Seu pedido será enviado em breve. Acompanhe seu pedido pelo app.",
    bodyFull: "Olá! Seu pagamento referente ao pedido #123-4567890-1234567 foi aprovado com sucesso. Em até 24 horas, o status do seu pedido mudará para 'Em preparação para envio'. Você pode acompanhar cada etapa pelo aplicativo Amazon, além de receber notificações automáticas sobre o rastreamento. Agradecemos a preferência e estamos à disposição para qualquer dúvida.",
    isSafe: true
  },
  {
    title: "Atualização de segurança disponível",
    from: "atendimento@softwareseguro.com",
    body: "Uma nova atualização de segurança está disponível para o seu dispositivo. Recomendamos instalá-la o quanto antes.",
    bodyFull: "Caro usuário, lançamos hoje a versão 4.8.2 do nosso software, incluindo correções críticas contra vulnerabilidades de acesso não autorizado e melhorias de desempenho. Para manter seu ambiente protegido, abra o aplicativo, vá em 'Configurações > Atualizações' e clique em 'Instalar agora'. O procedimento leva menos de dois minutos e não requer reinicialização. Manter-se atualizado é fundamental para sua segurança digital.",
    isSafe: true
  },
  {
    title: "Comprovante de transferência bancária",
    from: "noreply@banco.com.br",
    body: "Olá! Seu comprovante de transferência está disponível em anexo. Qualquer dúvida, entre em contato com nosso suporte.",
    bodyFull: "Olá, conforme solicitado, anexamos o comprovante da transferência de R$ 2.450,00 realizada em 10 de maio de 2025 para a conta destination@example.com.Confira os detalhes de data, hora e identificador da transação. Se houver qualquer divergência, entre imediatamente em contato com nosso atendimento pelo telefone 0800-123-4567. Obrigado por usar nossos serviços.",
    isSafe: true
  },
  {
    title: "Mudança de política de privacidade",
    from: "privacidade@empresa.com.br",
    body: "Atualizamos nossa política de privacidade. Leia as mudanças e saiba como protegemos seus dados.",
    bodyFull: "Prezado usuário, para fortalecer nossa transparência, revisamos nossa política de privacidade para detalhar como coletamos, usamos e armazenamos suas informações pessoais. Entre as principais alterações, destacamos o novo direito de portabilidade de dados e esclarecimentos sobre cookies de terceiros. Acesse o link abaixo para ler o documento completo e entre em contato em privacidade@empresa.com.br caso tenha dúvidas ou queira exercer seus direitos.",
    isSafe: true
  },
  {
    title: "Nota fiscal disponível",
    from: "fiscal@comprasonline.com",
    body: "Sua nota fiscal está disponível para download. Acesse seu histórico de pedidos para visualizar.",
    bodyFull: "Olá! Sua nota fiscal eletrônica Nº 2025.12345.6789 já está disponível no nosso portal. Para baixá-la, entre em 'Meus Pedidos' e clique em 'Emitir Nota Fiscal'. Caso tenha dificuldades no processo ou precise de segunda via em PDF, acesse o link de suporte ou responda este e‑mail. Estamos à disposição para garantir sua comodidade.",
    isSafe: true
  },
  {
    title: "Novo dispositivo conectado",
    from: "seguranca@provedor.com",
    body: "Um novo dispositivo acessou sua conta recentemente. Se não foi você, altere sua senha imediatamente.",
    bodyFull: "Olá! Registramos acesso à sua conta em um dispositivo nunca antes utilizado em 14 de maio de 2025 às 15:32 (UTC−03:00). Caso reconheça essa atividade, não é necessário fazer nada. Se não, acesse agora nossas configurações de segurança e altere sua senha. Você também pode ativar a verificação em dois passos para maior proteção. Em caso de dúvida, fale com nosso suporte 24h.",
    isSafe: true
  },
  {
    title: "Renovação de assinatura concluída",
    from: "assinatura@streaming.com",
    body: "Sua assinatura foi renovada com sucesso. Obrigado por continuar com a gente!",
    bodyFull: "Prezado assinante, informamos que sua assinatura anual foi automaticamente renovada em 14 de maio de 2025. Agora você continuará tendo acesso ilimitado ao nosso catálogo, incluindo lançamentos exclusivos e filmes premiados. Você receberá seu comprovante e a próxima fatura em até 48 horas. Agradecemos a confiança e desejamos ótimas sessões!",
    isSafe: true
  }
];

// 2) Total de emails
const totalEmails = emailQueue.length;

// (Opcional) embaralhar os emails
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
shuffleArray(emailQueue);

let emailIndex = 0;
let gameEnded = false;

function handleUserError() {
  gerarPopUpMalicioso();
}

document.getElementById("restartBtn").addEventListener("click", reiniciarJogo);

function reiniciarJogo() {
  location.reload();
}

function gerarPopUpMalicioso() {
  const popup = document.createElement("div");
  popup.className = "popup";
  const gif = document.createElement("img");

  const randomIndex = Math.floor(Math.random() * maliciousGifs.length);
  gif.src = maliciousGifs[randomIndex];
  popup.appendChild(gif);

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const randX = Math.floor(Math.random() * (vw - 300));
  const randY = Math.floor(Math.random() * (vh - 200));

  popup.style.left = `${randX}px`;
  popup.style.top = `${randY}px`;
  popup.style.transform = "translate(0, 0)";

  document.body.appendChild(popup);
}

const modal = document.createElement("div");
modal.className = "quiz-modal";

function showQuizModal() {
  if (!questions.length) return console.error('Perguntas não disponíveis');

  const questionObj = questions[Math.floor(Math.random() * questions.length)];

  const opts = questionObj.options.map((opt, idx) =>
    `<button data-index="${idx}">${opt}</button>`
  ).join("");

  modal.innerHTML = `
    <div class="modal-content">
      <p>${questionObj.question}</p>
      <div class="opts-quiz">
        ${opts}
      <div>
    </div>
  `;

  modal.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = parseInt(btn.getAttribute('data-index'), 10);
      const correct = questionObj.correct;

      modal.querySelectorAll('button').forEach((b, idx) => {
        if (idx === correct) {
          b.style.backgroundColor = "green";
          b.style.color = "white";
        } else if (idx === selected) {
          b.style.backgroundColor = "red";
          b.style.color = "white";
        }
        b.disabled = true;
      });

      if (selected !== correct) {
        updateCarbon(5);
      } else {
        updateCarbon(-5);

        const popups = document.querySelectorAll(".popup");
        if (popups.length > 0) {
          popups[0].remove();
        }
      }

      setTimeout(() => {
        modal.remove();
        if (selected === correct) nextEmail();
      }, 2000);
    });
  });

  document.body.appendChild(modal);
}

// 3) handleResposta com pontuação
function handleResposta(acertou) {
  if (acertou) {
    score += 1;
    updateCarbon(-10);
    nextEmail();
  } else {
    if (window._tentativa === 1) {
      window._tentativa++;
      gerarPopUpMalicioso();
      showQuizModal();
    } else {
      score -= 0.5;
      updateCarbon(10);
      nextEmail();
    }
  }
}

function generateEmail(title, snippet, isSafe = true, from = 'unknown@domain.com', bodyFull) {
  const time = new Date().toLocaleTimeString();
  const emailItem = document.createElement("div");
  emailItem.className = "email-item";
  emailItem.innerHTML = `
    <div class="info">
    <div class="title">${title}</div>
    <div class="snippet">${snippet}</div>
  </div>

  <div class="bottom-row">
    <div class="actions">
      <button class="green-btn">🔓</button>
      <button class="red-btn">🔒</button>
      <div class="time">${time}</div>
    </div>
  </div>
  `;

  const [yesBtn, noBtn] = emailItem.querySelectorAll('button');
  window._tentativa = 1;


  const disableButtons = () => {
    yesBtn.disabled = true;
    noBtn.disabled = true;
  };

  // Flag para impedir o clique no e-mail quando o cadeado for ativado
  let isLocked = false;

  yesBtn.addEventListener('click', () => {
    if (yesBtn.disabled) return;
    yesBtn.disabled = true;
    noBtn.disabled = true;
    isLocked = true; // Impede clique no email
    emailItem.style.pointerEvents = 'none'; // Evita clique no container
    handleResposta(!isSafe); // invertido aqui
  });


  noBtn.addEventListener('click', () => {
    if (noBtn.disabled) return;
    yesBtn.disabled = true;
    noBtn.disabled = true;
    handleResposta(isSafe); // invertido aqui
    isLocked = true;
    emailItem.style.pointerEvents = 'none';
  });

  emailItem.addEventListener("click", () => {
    if (isLocked) return; // Se estiver bloqueado, não faz nada
    showEmailDetail({ title, snippet, bodyFull, isSafe, from, time });
  });

  emailList.appendChild(emailItem);
}

function showEmailDetail(email) {
  // Esconde a lista de e-mails e o rodapé
  document.querySelector(".email-list").style.display = "none";
  document.querySelector(".footer").style.display = "none";

  // Criação da nova tela de detalhes
  const detail = document.createElement("div");
  detail.id = "emailDetailView";
  detail.style.padding = "20px";
  detail.innerHTML = `
    <div class="email-header">
      <img id="voltarBtn" class="back-icon" src="./assets/arrow-back.png" alt="Voltar" />
      <div class="email-info">
        <strong>${email.title}</strong>
        <span class="email-from">de: ${email.from}</span>
      </div>
      <span class="email-time">${email.time}</span>
    </div>
    <hr />
    <div class="email-body">
      <p>${email.bodyFull}</p>
    </div>
  `;

  // Adiciona o conteúdo à página???
  document.querySelector(".main-content").appendChild(detail);

  // Função para voltar à lista de e-mails
  document.getElementById("voltarBtn").addEventListener("click", () => {
    detail.remove();
    document.querySelector(".email-list").style.display = "block";
    document.querySelector(".footer").style.display = "flex";
  });

}

// 4) Modal de fim de jogo
function showEndModal() {
  if (gameEnded) return;  // ⛔️ impede múltiplas execuções
  gameEnded = true;

  const endModal = document.createElement("div");
  endModal.className = "end-modal";
  endModal.innerHTML = `
      <div class="modal-content">
        <h2>🎉 Fim de jogo!</h2>
        <p>Sua pontuação: <strong>${score.toFixed(1)}</strong> de ${totalEmails}</p>
        <button id="playAgainBtn">Jogar Novamente</button>
      </div>
    `;
  document.body.appendChild(endModal);

  const style = document.createElement("style");
  style.innerHTML = `
      .end-modal {
        position: fixed; inset:0;
        background: rgba(0,0,0,0.6);
        display: flex; align-items: center; justify-content: center;
        z-index: 2000;
      }
      .end-modal .modal-content {
        background: #fff; padding:20px; border-radius:8px;
        text-align:center; max-width:320px; width:90%;
        box-shadow:0 4px 12px rgba(0,0,0,0.15);
      }
      .end-modal button {
        margin-top:16px; padding:8px 16px; border:none;
        background:#007bff; color:#fff; cursor:pointer; border-radius:4px;
        font-size:16px;
      }
    `;
  document.head.appendChild(style);

  document.getElementById("playAgainBtn").addEventListener("click", () => {
    location.reload();
  });
}

function reportPhishing(email) {
  const modalReport = document.createElement("div");
  modalReport.className = "report-modal";
  modalReport.innerHTML = `
    <div class="modal-content">
      <h3>Você está reportando o seguinte e-mail como phishing:</h3>
      <p>${email.title}</p>
      <button id="confirmReport">Confirmar</button>
      <button id="cancelReport">Cancelar</button>
    </div>
  `;
  document.body.appendChild(modalReport);

  document.getElementById("confirmReport").addEventListener("click", () => {
    alert("Phishing reportado com sucesso!");
    modalReport.remove();
    nextEmail();  // Vai para o próximo e-mail após o reporte.
  });

  document.getElementById("cancelReport").addEventListener("click", () => {
    modalReport.remove();  // Fecha a modal sem fazer nada.
  });
}

function nextEmail() {
  if (emailIndex >= emailQueue.length) {
    showEndModal();
    return;
  }

  const emailData = emailQueue[emailIndex];
  generateEmail(emailData.title, emailData.body, emailData.isSafe, emailData.from, emailData.bodyFull);
  emailIndex++;
}

function updateCarbon(delta) {
  carbonLevel = Math.min(maxCarbon, Math.max(0, carbonLevel + delta));
  carbonBar.style.width = `${carbonLevel}%`;
  if (carbonLevel >= maxCarbon) {
    showEndModal();
  }
}

nextEmail();


// —————— Temporizador de 150 segundos ——————
let gameTime = 300;  // tempo intermediário: 2m30s

const timerDisplay = document.createElement("div");
timerDisplay.id = "gameTimer";
timerDisplay.style.position = "fixed";
timerDisplay.style.top = "10px";
timerDisplay.style.right = "10px";
timerDisplay.style.padding = "6px 12px";
timerDisplay.style.background = "#222";
timerDisplay.style.color = "#fff";
timerDisplay.style.borderRadius = "4px";
timerDisplay.innerText = `Tempo: ${gameTime}s`;
document.body.appendChild(timerDisplay);

const countdown = setInterval(() => {
  gameTime--;
  timerDisplay.innerText = `Tempo: ${gameTime}s`;

  // aumenta a barra de carbono em 1/150 por segundo
  updateCarbon(maxCarbon / 300);

  if (gameTime <= 0) {
    clearInterval(countdown);
    carbonLevel = maxCarbon;
    carbonBar.style.width = "100%";
    showEndModal();
  }
}, 1000);
// —————— Fim do temporizador ——————


const style = document.createElement('style');
style.innerHTML = `
  .email-detail {
      padding: 24px;
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: auto;
    }
    .email-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .back-icon {
      font-size: 18px;
      margin-right: 10px;
      cursor: pointer;
    }
    .email-info {
      flex-grow: 1;
    }
    .email-info strong {
      display: block;
      // font-size: 16px;
      color: #000;
    }
    .email-from {
      color: #555;
      // font-size: 14px;
    }
    .email-time {
      font-size: 14px;
      color: #666;
      margin-right: 2%;
    }
    hr {
      border: none;
      border-top: 1px solid #bcd9f5;
      margin: 16px 0;
    }
    .email-body {
      margin-left: 33px;
      margin-right: 8%;
      // font-size: 14px;
      color: #222;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .email-actions {
      display: flex;
      gap: 20px;
    }
    .email-actions button {
      display: flex;
      align-items: center;
      gap: 8px;
      border: none;
      padding: 8px 14px;
      border-radius: 5px;
      font-size: 14px;
      cursor: pointer;
    }
    .btn-yes {
      // background-color: #4CAF50;
      color: black;
    }
    .btn-no {
      // background-color: #F44336;
      color: black;
    }
    .back-icon {
      width: 24px;
      height: 24px;
      margin-right: 10px;
      cursor: pointer;
      object-fit: contain; /* garante que a imagem mantenha proporção */
      display: inline-block;
      vertical-align: middle;
    }

    .quiz-modal {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;          /* para ficar acima de tudo */
    }

    .quiz-modal .modal-content {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      max-width: 90%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
`;

document.head.appendChild(style);