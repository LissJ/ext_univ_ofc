/*
  Atualização de lógica: popups e quizzes em todos os erros do usuário
  Update logic: malicious pop-ups and quizzes whenever a user error occurs
*/
let currentLanguage = 'pt';
let carbonLevel = 0;
const maxCarbon = 100;
const carbonBar = document.getElementById("carbonMeter");
const emailList = document.getElementById("emailList");
let questions = [];

// Lista de GIFs para os popups maliciosos
const maliciousGifs = [
  "../assets/gifs/hack1.gif",
];

// Carrega perguntas do JSON
// Load quiz questions from JSON
fetch('questions.json')
  .then(response => response.json())
  .then(data => { questions = data; })
  .catch(err => console.error('Erro ao carregar perguntas:', err));

// Função central de erro: exibe pop-up e quiz
// Central error handler: show pop-up and quiz modal
function handleUserError() {
  gerarPopUpMalicioso();  // cria popup malicioso
  showQuizModal();        // abre modal de quiz
}

// Pop-up malicioso com posição aleatória e GIF aleatório
function gerarPopUpMalicioso() {
  const popup = document.createElement("div");
  popup.className = "popup";
  const gif = document.createElement("img");

  // Escolhe um GIF aleatório da lista
  const randomIndex = Math.floor(Math.random() * maliciousGifs.length);
  gif.src = maliciousGifs[randomIndex];

  popup.appendChild(gif);

  // Posição aleatória na tela
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const randX = Math.floor(Math.random() * (vw - 300));
  const randY = Math.floor(Math.random() * (vh - 200));

  popup.style.left = `${randX}px`;
  popup.style.top = `${randY}px`;
  popup.style.transform = "translate(0, 0)";

  document.body.appendChild(popup);
}

// Modal de quiz
function showQuizModal() {
  if (!questions.length) return console.error('Perguntas não disponíveis');

  const questionObj = questions[Math.floor(Math.random() * questions.length)];
  const data = questionObj[currentLanguage];
  if (!data) return console.error('Idioma não encontrado na pergunta');

  const modal = document.createElement("div");
  modal.className = "quiz-modal";

  // monta conteúdo do quiz
  const opts = data.options.map((opt, idx) =>
    `<button data-index="${idx}">${opt}</button>`
  ).join("");

  modal.innerHTML = `
    <div class="modal-content">
      <p>${data.question}</p>
      ${opts}
    </div>
  `;

  // evento das opções
  modal.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = parseInt(btn.getAttribute('data-index'), 10);
      const correct = questionObj.correct;
      modal.remove();
      if (selected !== correct) {
        // erro de resposta
        updateCarbon(5);
        handleUserError();
      } else {
        // resposta certa
        updateCarbon(-5);
      }
    });
  });

  document.body.appendChild(modal);
}

// Geração de e-mails dinamicamente
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
    } else {
      updateCarbon(10);
      handleUserError();
    }
  });
  
  noBtn.addEventListener('click', () => {
    if (!isSafe) {
      updateCarbon(-10);
    } else {
      updateCarbon(10);
      handleUserError();
    }
  });

  emailList.appendChild(emailItem);
}

// Atualiza medidor de carbono
function updateCarbon(delta) {
  carbonLevel = Math.min(maxCarbon, Math.max(0, carbonLevel + delta));
  carbonBar.style.width = `${carbonLevel}%`;
  if (carbonLevel >= maxCarbon) {
    alert("🌍 Jogo encerrado! Pegada de carbono excedida.");
    clearInterval(emailTimer);
    location.reload();
  }
}

// Inicia envio de e-mails a cada 5s
const emailTimer = setInterval(() => {
  const safe = Math.random() > 0.5;
  generateEmail("Novo site detectado", "Você confia neste site?", safe);
}, 5000);

// Estilos para pop-up e quiz
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
    z-index: 9998;
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
