const questions = [
    {
        question: "Qual destas práticas ajuda a reduzir a pegada de carbono digital?",
        options: [
            {id: 1, text: "Desligar o computador quando não estiver usando"},
            {id: 2, text: "Deixar vídeos em autoplay"},
            {id: 3, text: "Manter 50 abas abertas"},
            {id: 4, text: "Assistir vídeos em 4K no celular"}
        ],
        correct: 1
    },
    {
        question: "Qual prática melhora a segurança no mundo digital?",
        options: [
            {id: 1, text: "Usar a mesma senha em todos os sites"},
            {id: 2, text: "Compartilhar senhas por e-mail"},
            {id: 3, text: "Ativar autenticação de dois fatores"},
            {id: 4, text: "Desligar o antivírus"}
        ],
        correct: 3
    },
    {
        question: "Qual ação reduz o impacto ambiental de e-mails?",
        options: [
            {id: 1, text: "Enviar e-mails com anexos grandes"},
            {id: 2, text: "Excluir e-mails antigos regularmente"},
            {id: 3, text: "Manter lixo eletrônico cheio"},
            {id: 4, text: "Enviar mensagens para todos os contatos sempre"}
        ],
        correct: 2
    }
]

function gerarPopUpMalicioso() {
    let popup = document.getElementById("popup");

    let modalQuiz = document.getElementById("modal-quiz");

    if (!modalQuiz) {
        return;
    }

    const rect = modalQuiz.getBoundingClientRect();

    let popupSize = 200;

    const gif = document.getElementById("gif");
    const randomIndex = Math.floor(Math.random() * maliciousGifs.length);

    gif.src = maliciousGifs[randomIndex];

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    let randX = Math.floor(Math.random() * (vw - 200));
    let randY = Math.floor(Math.random() * (vh - 200));

    if ((vw - rect.width) > (popupSize * 2)) {
        if ((randX > rect.left || randX + popupSize > rect.left) && (randX < (rect.left + rect.width) || randX + popupSize < (rect.left + rect.width))) {
            randX = rect.left + rect.width + 10;
        }
    } else {
        if ((randY > rect.top || randY + popupSize > rect.top) && (randY < (rect.top + rect.height) || randY + popupSize < (rect.top + rect.height))) {
            randY = rect.top + rect.height + 10;
        }
    }

    popup.style.left = `${randX}px`;
    popup.style.top = `${randY}px`;

    popup.style.transform = "translate(0, 0)";
}

setInterval(() => {
    gerarPopUpMalicioso()
}, 5000)

const modal = document.createElement("div");
modal.className = "modal";

function showQuizModal() {
    if (!questions.length) {
        return console.error('Perguntas não disponíveis');
    }

    const questionObj = questions[Math.floor(Math.random() * questions.length)];

    let opts = questionObj.options
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .map((option) => `<button data-index="${option.id}">${option.text}</button>`)
        .join("");

    modal.innerHTML = `
        <div id="modal-quiz" class="modal-content">
            <p>${questionObj.question}</p>
            <div class="opts-quiz">
                ${opts}
            <div>
        </div>`;

    modal.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const selected = parseInt(btn.getAttribute('data-index'), 10);
            const correct = questionObj.correct;

            modal.querySelectorAll('button').forEach((b) => {
                let dataIndexSelected = parseInt(b.getAttribute('data-index'), 10)
                if (dataIndexSelected === correct) {
                    b.style.backgroundColor = "green";
                    b.style.color = "white";
                } else if (dataIndexSelected === selected) {
                    b.style.backgroundColor = "red";
                    b.style.color = "white";
                }

                b.disabled = true;
            });

            if (selected !== correct) {
                updateCarbon(5);
            } else {
                updateCarbon(-5);

                const popup = document.getElementById("popup");
                popup.style.display = 'none';
            }

            setTimeout(() => {
                modal.remove();
                if (selected === correct) {
                    nextEmail();
                }
            }, 2000);
        });
    });

    document.body.appendChild(modal);

    document.getElementById("popup").style.display = 'block';
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
            showQuizModal();
            gerarPopUpMalicioso();
        } else {
            score -= 0.5;
            updateCarbon(10);
            nextEmail();
        }
    }
}