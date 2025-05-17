let carbonLevel = 0;
const maxCarbon = 100;
const carbonBar = document.getElementById("carbonMeter");
const emailList = document.getElementById("emailList");

let score = 0;

const maliciousGifs = [
  "./assets/gifs/hack1.gif",
];

let gameEnded = false;

function handleUserError() {
    gerarPopUpMalicioso();
}

document.getElementById("restartBtn").addEventListener("click", reiniciarJogo);

function reiniciarJogo() {
    location.reload();
}

// 4) Modal de fim de jogo
function showEndModal() {
    if (gameEnded) {
        return;  // ⛔️ impede múltiplas execuções
    }

    gameEnded = true;

    const endModal = document.createElement("div");
    endModal.className = "end-modal";
    endModal.innerHTML = `
        <div class="modal-content">
            <h2>🎉 Fim de jogo!</h2>
            <p>Sua pontuação: <strong>${score.toFixed(1)}</strong> de ${totalEmails}</p>
            <button id="playAgainBtn">Jogar Novamente</button>
        </div>`;

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

function updateCarbon(delta) {
    carbonLevel = Math.min(maxCarbon, Math.max(0, carbonLevel + delta));
    carbonBar.style.width = `${carbonLevel}%`;
    if (carbonLevel >= maxCarbon) {
        showEndModal();
    }
}

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