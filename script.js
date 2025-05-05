let currentLanguage = 'pt';
let carbonLevel = 0;
const maxCarbon = 100;
const carbonBar = document.getElementById("carbonMeter");
const emailList = document.getElementById("emailList");
let questions = [
  {
    pt: {
      question: "Qual destas práticas ajuda a reduzir a pegada de carbono digital?",
      options: [
        "Desligar o computador quando não estiver usando",
        "Deixar vídeos em autoplay",
        "Manter 50 abas abertas",
        "Assistir vídeos em 4K no celular"
      ]
    },
    en: {
      question: "Which of these reduces digital carbon footprint?",
      options: [
        "Turning off the computer when not in use",
        "Letting videos autoplay",
        "Keeping 50 tabs open",
        "Watching 4K videos on your phone"
      ]
    },
    correct: 0
  },
  {
    pt: {
      question: "Qual prática melhora a segurança no mundo digital?",
      options: [
        "Usar a mesma senha em todos os sites",
        "Compartilhar senhas por e-mail",
        "Ativar autenticação de dois fatores",
        "Desligar o antivírus"
      ]
    },
    en: {
      question: "What improves digital security?",
      options: [
        "Using the same password everywhere",
        "Sharing passwords via email",
        "Enabling two-factor authentication",
        "Turning off antivirus"
      ]
    },
    correct: 2
  },
  {
    pt: {
      question: "Qual ação reduz o impacto ambiental de e-mails?",
      options: [
        "Enviar e-mails com anexos grandes",
        "Excluir e-mails antigos regularmente",
        "Manter lixo eletrônico cheio",
        "Enviar mensagens para todos os contatos sempre"
      ]
    },
    en: {
      question: "What action reduces email carbon footprint?",
      options: [
        "Sending large attachments",
        "Deleting old emails regularly",
        "Keeping trash folder full",
        "Always mass mailing all contacts"
      ]
    },
    correct: 1
  }
];

// Lista de GIFs para os popups maliciosos
const maliciousGifs = [
  "../assets/gifs/hack1.gif",
];

// Lista de e-mails suspeitos reais
const emailQueue = [
  { title: "Promoção exclusiva da Amazon!", snippet: "Clique aqui para resgatar seu prêmio!", isSafe: false },
  { title: "Alerta do banco", snippet: "Sua conta será bloqueada. Atualize seus dados.", isSafe: false },
  { title: "Nova mensagem de voz", snippet: "Você recebeu uma nova mensagem. Acesse o link.", isSafe: false },
  { title: "Netflix: pagamento recusado", snippet: "Atualize seu cartão agora mesmo.", isSafe: false },
  { title: "Ganhe um iPhone grátis!", snippet: "Responda 3 perguntas e ganhe!", isSafe: false },
  { title: "Reembolso da Receita Federal", snippet: "Clique para receber seu reembolso.", isSafe: false },
  { title: "Whatsapp Gold disponível", snippet: "Versão exclusiva liberada para você.", isSafe: false },
  { title: "Instagram te pagará por seguidores", snippet: "Inscreva-se agora.", isSafe: false },
  { title: "Seu CPF está irregular", snippet: "Acesse para regularizar.", isSafe: false },
  { title: "Sua senha foi exposta", snippet: "Troque imediatamente por segurança.", isSafe: false },
  { title: "Seu dispositivo está com vírus", snippet: "Escaneie agora.", isSafe: false },
  { title: "Atualização de segurança", snippet: "Clique para instalar a última versão.", isSafe: false },
  { title: "Nova solicitação de amizade", snippet: "Veja quem te adicionou.", isSafe: false },
  { title: "Você foi sorteado!", snippet: "Receba agora sua premiação!", isSafe: false },
  { title: "Confirme sua identidade", snippet: "Clique no link para continuar usando sua conta.", isSafe: false },
];

let emailIndex = 0;

// Função central de erro: exibe pop-up e quiz
function handleUserError() {
  gerarPopUpMalicioso();
  showQuizModal();
}

document.getElementById("restartBtn").addEventListener("click", reiniciarJogo);

function reiniciarJogo() {
  location.reload();
}

// Pop-up malicioso
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

// Modal de quiz com destaque de resposta e fechamento automático
function showQuizModal() {
  if (!questions.length) return console.error('Perguntas não disponíveis');

  const questionObj = questions[Math.floor(Math.random() * questions.length)];
  const data = questionObj[currentLanguage];
  if (!data) return console.error('Idioma não encontrado na pergunta');

  const modal = document.createElement("div");
  modal.className = "quiz-modal";

  const opts = data.options.map((opt, idx) =>
    `<button data-index="${idx}">${opt}</button>`
  ).join("");

  modal.innerHTML = `
    <div class="modal-content">
      <p>${data.question}</p>
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
      
        // Remove um popup GIF se existir
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

// Geração de e-mail da fila
function generateEmail(title, snippet, isSafe = true) {
  const emailItem = document.createElement("div");
  emailItem.className = "email-item";
  emailItem.innerHTML = `
    <div class="info">
      <div class="title">${title}</div>
      <div class="snippet">${snippet}</div>
    </div>
    <div class="actions">
      <button class="btn-yes">🔓</button>
      <button class="btn-no">🔒</button>
    </div>
    <div class="time">${new Date().toLocaleTimeString()}</div>
  `;

  const [yesBtn, noBtn] = emailItem.querySelectorAll('button');

  yesBtn.addEventListener('click', () => {
    if (isSafe) {
      updateCarbon(-10);
      nextEmail();
    } else {
      updateCarbon(10);
      handleUserError();
    }
  });

  noBtn.addEventListener('click', () => {
    if (!isSafe) {
      updateCarbon(-10);
      nextEmail();
    } else {
      updateCarbon(10);
      handleUserError();
    }
  });

  emailList.appendChild(emailItem);
}

// Função para mostrar próximo e-mail da fila
function nextEmail() {
  if (emailIndex >= emailQueue.length) {
    alert("📬 Todos os e-mails foram processados!");
    return;
  }

  const { title, snippet, isSafe } = emailQueue[emailIndex];
  generateEmail(title, snippet, isSafe);
  emailIndex++;
}

// Atualiza medidor de carbono
function updateCarbon(delta) {
  carbonLevel = Math.min(maxCarbon, Math.max(0, carbonLevel + delta));
  carbonBar.style.width = `${carbonLevel}%`;
  if (carbonLevel >= maxCarbon) {
    alert("🌍 Jogo encerrado! Pegada de carbono excedida.");
    location.reload();
  }
}

// Começa com o primeiro e-mail
nextEmail();

// Estilos
const style = document.createElement('style');
style.innerHTML = `
  .popup {
    position: fixed;
    z-index: 9999; /* GIFs */
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
    z-index: 10000; /* Maior que os GIFs */
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