let currentLanguage = 'pt';
let carbonLevel = 0;
const maxCarbon = 100;
const carbonBar = document.getElementById("carbonMeter");
const emailList = document.getElementById("emailList");

let questions = [];

// ⬇️ Carregar perguntas do JSON
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
    });

    function gerarPopUpMalicioso() {
        console.log("Gerando pop-up malicioso...");  // Para debugar
    
        const popup = document.createElement("div");
        popup.className = "popup"; // A classe que definimos acima para o estilo
    
        // Exemplo de GIF malicioso
        const gif = document.createElement("img");
        gif.src = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjF3MXZrNXZhNDFscnBsemZvZ203Zm1mN2JjbXNwaGMyZ3F4dzJ1cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NVBR6cLvUjV9C/giphy.gif";  // Pode alterar para qualquer GIF ou imagem maliciosa
    
        popup.appendChild(gif);
        document.body.appendChild(popup);
    
        setTimeout(function() {
            gerarPopUpMalicioso(); // Gera outro pop-up a cada 500ms
        }, 500);
    }
    

// ⬇️ Função para adicionar emails dinamicamente (com pop-up malicioso)
function generateEmail(title, snippet, isSafe = true) {
    const emailItem = document.createElement("div");
    emailItem.classList.add("email-item");

    emailItem.innerHTML = `
    <div class="info">
      <div class="title">${title}</div>
      <div class="snippet">${snippet}</div>
    </div>
    <div class="actions">
      <button class="green-btn">🔓</button>
      <button class="red-btn">🔒</button>
    </div>
    <div class="time">00:00</div>
  `;

    const greenBtn = emailItem.querySelector(".green-btn");
    const redBtn = emailItem.querySelector(".red-btn");

    greenBtn.addEventListener('click', () => {
        if (isSafe) {
            updateCarbon(-10);
        } else {
            updateCarbon(10);
            showQuizModal();
        }
    });

    redBtn.addEventListener('click', () => {
        if (!isSafe) {
            updateCarbon(-10);
        } else {
            updateCarbon(10);
            showQuizModal();
        }
    });

    emailList.appendChild(emailItem);
}

// ⬇️ Atualizar medidor de carbono
function updateCarbon(change) {
    carbonLevel = Math.max(0, Math.min(maxCarbon, carbonLevel + change));
    carbonBar.style.width = `${carbonLevel}%`;

    if (carbonLevel >= maxCarbon) {
        alert("🌍 Jogo encerrado! Pegada de carbono excedida!");
        location.reload();
    }
}

// ⬇️ Modal de Quiz (simples e direto)
function showQuizModal() {
    if (!questions || questions.length === 0) {
      console.error("Erro: Perguntas não carregadas corretamente!");
      return;
    }
  
    // Selecionar uma pergunta aleatória
    const question = questions[Math.floor(Math.random() * questions.length)];
  
    // Verificar se a pergunta contém o idioma atual
    if (!question[currentLanguage]) {
      console.error("Erro: Idioma não encontrado nas perguntas.");
      return;
    }
  
    // Acessar a pergunta e as opções no idioma atual
    const questionData = question[currentLanguage];
  
    // Criar o modal com as perguntas e opções
    const modal = document.createElement("div");
    modal.className = "quiz-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <p>${questionData.question}</p>
        ${questionData.options.map((opt, i) =>
          `<button onclick="handleQuizAnswer(${i}, ${question.correct})">${opt}</button>`
        ).join("")}
      </div>
    `;
    document.body.appendChild(modal);
  }
  

// ⬇️ Avaliação da resposta
window.handleQuizAnswer = function (selected, correct) {
    const modal = document.querySelector('.quiz-modal');

    if (selected === correct) {
        updateCarbon(-5); // Diminui pegada de carbono
    } else {
        updateCarbon(5);  // Aumenta pegada de carbono
        gerarPopUpMalicioso();  // Gera pop-up malicioso devido ao erro
    }

    modal.remove();  // Remove o modal após a resposta
};

// ⬇️ Adicionar e-mails ao longo do tempo
let emailTimer = setInterval(() => {
    generateEmail("Site seguro exemplo", "Resumo: Você acha que esse site é seguro?", Math.random() > 0.5);
    if (carbonLevel >= maxCarbon) clearInterval(emailTimer);
}, 5000);

// Estilo para o pop-up malicioso
const style = document.createElement('style');
style.innerHTML = `
  .popup {
    width: 300px;
    height: 200px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 2px solid black;
    z-index: 9999;
    text-align: center;
  }
  .popup img {
    width: 100%;
    height: 100%;
  }
`;
document.head.appendChild(style);