let carbonLevel = 0;
const maxCarbon = 100;
const carbonBar = document.getElementById("carbonMeter");
const emailList = document.getElementById("emailList");

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
  "../assets/gifs/hack1.gif",
];

const emailQueue = [
  {
    title: "Promoção exclusiva da Amazon!",
    from: "oferta@amazon.com",
    body: "Aproveite nossa super promoção! Ganhe 50% de desconto em sua próxima compra. Não perca essa oportunidade.",
    isSafe: false
  },
  {
    title: "Alerta do banco",
    from: "alerta@banco.com",
    body: "Sua conta será bloqueada devido a tentativas suspeitas. Atualize seus dados bancários imediatamente para evitar bloqueio.",
    isSafe: false
  },
  {
    title: "Nova mensagem de voz",
    from: "voz@mensagens.com",
    body: "Você recebeu uma nova mensagem de voz. Acesse o link abaixo para ouvir o áudio.",
    isSafe: false
  },
  {
    title: "Netflix: pagamento recusado",
    from: "suporte@netflix.com",
    body: "O pagamento do seu plano foi recusado. Atualize seus dados de pagamento agora para continuar acessando os conteúdos.",
    isSafe: false
  },
  {
    title: "Ganhe um iPhone grátis!",
    from: "oferta@apple.com",
    body: "Responda a 3 perguntas e tenha a chance de ganhar um iPhone! Não deixe essa oportunidade passar.",
    isSafe: false
  },
  {
    title: "Reembolso da Receita Federal",
    from: "receita@gov.br",
    body: "Clique no link abaixo para receber o seu reembolso da Receita Federal. Não perca tempo!",
    isSafe: false
  },
  {
    title: "Whatsapp Gold disponível",
    from: "oferta@whatsapp.com",
    body: "Versão exclusiva do WhatsApp liberada para você! Instale agora e tenha recursos inéditos.",
    isSafe: false
  },
  {
    title: "Instagram te pagará por seguidores",
    from: "suporte@instagram.com",
    body: "Ganhe dinheiro seguindo outras pessoas no Instagram! Aproveite esta oportunidade exclusiva.",
    isSafe: false
  },
  {
    title: "Seu CPF está irregular",
    from: "atendimento@serpro.com.br",
    body: "Atenção: seu CPF está irregular. Acesse para regularizar sua situação e evitar problemas futuros.",
    isSafe: false
  },
  {
    title: "Sua senha foi exposta",
    from: "seguranca@sites.com",
    body: "Alerta: sua senha foi exposta em um vazamento de dados. Troque imediatamente sua senha para manter sua conta segura.",
    isSafe: false
  },
  {
    title: "Seu dispositivo está com vírus",
    from: "suporte@antivirus.com",
    body: "Seu dispositivo foi infectado por um vírus. Faça o scan agora para garantir a segurança do seu sistema.",
    isSafe: false
  },
  {
    title: "Atualização de segurança",
    from: "suporte@software.com",
    body: "Uma nova atualização de segurança está disponível para o seu dispositivo. Instale agora para garantir a proteção.",
    isSafe: false
  },
  {
    title: "Nova solicitação de amizade",
    from: "social@facebook.com",
    body: "Você tem uma nova solicitação de amizade no Facebook. Clique no link abaixo para visualizar.",
    isSafe: false
  },
  {
    title: "Você foi sorteado!",
    from: "promo@concursos.com",
    body: "Parabéns! Você foi sorteado para ganhar um prêmio incrível. Clique para resgatar agora.",
    isSafe: false
  },
  {
    title: "Confirme sua identidade",
    from: "suporte@conta.com",
    body: "Confirme sua identidade para continuar usando sua conta. Acesse o link abaixo para completar a verificação.",
    isSafe: false
  }
];

let emailIndex = 0;

function handleUserError() {
  gerarPopUpMalicioso();
  showQuizModal();
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
      ${opts}
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

function generateEmail(title, snippet, isSafe = true, from = 'unknown@domain.com') {
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
    </div>
    <div class="time">10:45</div>
  </div>
  `;

  const [yesBtn, noBtn] = emailItem.querySelectorAll('button');
  let tentativa = 1;

  const disableButtons = () => {
    yesBtn.disabled = true;
    noBtn.disabled = true;
  };

  const handleResposta = (acertou) => {
    if (acertou) {
      updateCarbon(-10);
      nextEmail();
    } else {
      if (tentativa === 1) {
        tentativa++;
        handleUserError(); // mostra pop-up e quiz
      } else {
        updateCarbon(10);
        nextEmail();
      }
    }
  };

  // Flag para impedir o clique no e-mail quando o cadeado for ativado
  let isLocked = false;

  yesBtn.addEventListener('click', () => {
    if (yesBtn.disabled) return;
    yesBtn.disabled = true;
    noBtn.disabled = true;
    handleResposta(isSafe);
  });

  noBtn.addEventListener('click', () => {
    if (noBtn.disabled) return;
    yesBtn.disabled = true;
    noBtn.disabled = true;
    handleResposta(!isSafe);
    isLocked = true; // Ativa a flag de bloqueio
    emailItem.style.pointerEvents = 'none'; // Desativa o clique no e-mail
  });

  emailItem.addEventListener("click", () => {
    if (isLocked) return; // Se estiver bloqueado, não faz nada
    showEmailDetail({ title, snippet, isSafe, from });
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
    <h2>${email.title}</h2>
    <p><strong>Remetente:</strong> ${email.from}</p> <!-- Remetente aparece aqui -->
    <p style="margin-top: 10px; font-size: 16px;">${email.snippet}</p> <!-- Exibe o snippet do corpo -->
    <div style="margin-top: 20px;">
      <button id="voltarBtn">🔙 Voltar</button>
      <div class="actions">
        <button class="btn-yes">🔓</button>
        <button class="btn-no">🔒</button>
    </div>
    </div>
  `;

  // Adiciona o conteúdo à página
  document.querySelector(".main-content").appendChild(detail);

  // Função para voltar à lista de e-mails
  document.getElementById("voltarBtn").addEventListener("click", () => {
    detail.remove();
    document.querySelector(".email-list").style.display = "block";
    document.querySelector(".footer").style.display = "flex";
  });

  // Função para lidar com as respostas do usuário
  document.getElementById("btnSim").addEventListener("click", () => {
    detail.remove();
    document.querySelector(".email-list").style.display = "block";
    document.querySelector(".footer").style.display = "flex";
    handleResposta(email.isSafe);
  });

  document.getElementById("btnNao").addEventListener("click", () => {
    detail.remove();
    document.querySelector(".email-list").style.display = "block";
    document.querySelector(".footer").style.display = "flex";
    handleResposta(!email.isSafe);
  });
}

function nextEmail() {
  if (emailIndex >= emailQueue.length) {
    alert("📬 Todos os e-mails foram processados!");
    return;
  }

  const emailData = emailQueue[emailIndex];
  generateEmail(emailData.title, emailData.body, emailData.isSafe, emailData.from);
  emailIndex++;
}

function updateCarbon(delta) {
  carbonLevel = Math.min(maxCarbon, Math.max(0, carbonLevel + delta));
  carbonBar.style.width = `${carbonLevel}%`;
  if (carbonLevel >= maxCarbon) {
    alert("🌍 Jogo encerrado! Pegada de carbono excedida.");
    location.reload();
  }
}

nextEmail();

const style = document.createElement('style');
style.innerHTML = `
  .popup {
    position: fixed;
    z-index: 9999;
    width: 200px;
    height: 200px;
    background: #fff;
  }
  .popup img { width: 100%; height: 100%; }
  .quiz-modal {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  }
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  .modal-content button {
    margin: 5px;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;
document.head.appendChild(style);