const questions = [
    {
        question: "Qual destas práticas ajuda a reduzir a pegada de carbono digital?",
        options: [
            { id: 1, text: "Desligar o computador quando não estiver usando" },
            { id: 2, text: "Deixar vídeos em autoplay" },
            { id: 3, text: "Manter 50 abas abertas" },
            { id: 4, text: "Assistir vídeos em 4K no celular" }
        ],
        correct: 1
    },
    {
        question: "Qual prática melhora a segurança no mundo digital?",
        options: [
            { id: 1, text: "Usar a mesma senha em todos os sites" },
            { id: 2, text: "Compartilhar senhas por e-mail" },
            { id: 3, text: "Ativar autenticação de dois fatores" },
            { id: 4, text: "Desligar o antivírus" },
        ],
        correct: 3
    },
    {
        question: "Qual ação reduz o impacto ambiental de e-mails?",
        options: [
            { id: 1, text: "Enviar e-mails com anexos grandes" },
            { id: 2, text: "Excluir e-mails antigos regularmente" },
            { id: 3, text: "Manter lixo eletrônico cheio" },
            { id: 4, text: "Enviar mensagens para todos os contatos sempre" },
        ],
        correct: 2
    },
    {
        question: "Qual é a melhor maneira de reduzir o consumo de energia ao usar dispositivos eletrônicos?",
        options: [
            { id: 1, text: "Deixar o dispositivo em modo de espera (standby)" },
            { id: 2, text: "Desligar completamente os dispositivos quando não estiverem em uso" },
            { id: 3, text: "Usar dispositivos sempre conectados à internet" },
            { id: 4, text: "Manter os dispositivos ligados por mais tempo para não consumir energia ao ligar novamente" },
        ],
        correct: 2
    },
    {
        question: "O que pode ser feito para reduzir o impacto ambiental dos centros de dados (data centers)?",
        options: [
            { id: 1, text: "Utilizar mais energia elétrica proveniente de fontes fósseis" },
            { id: 2, text: "Diminuir o uso de sistemas de refrigeração eficientes" },
            { id: 3, text: "Migrar para o uso de energias renováveis, como solar ou eólica" },
            { id: 4, text: "Aumentar a quantidade de servidores em funcionamento" },
        ],
        correct: 3

    },
    {
        question: "Qual é a maneira mais eficiente de reduzir o consumo de energia em casa?",
        options: [
            { id: 1, text: "Deixar aparelhos eletrônicos sempre ligados" },
            { id: 2, text: "Usar ar-condicionado em todos os ambientes" },
            { id: 3, text: "Desligar aparelhos quando não estiverem em uso" },
            { id: 4, text: "Deixar luzes acesas o tempo todo" },
        ],
        correct: 3
    },
    {
        question: "Por que é importante descarregar corretamente os dispositivos eletrônicos obsoletos?",
        options: [
            { id: 1, text: "Eles podem ser reutilizados sem custo adicional" },
            { id: 2, text: "Eles contêm metais pesados e materiais tóxicos que podem poluir o meio ambiente" },
            { id: 3, text: "Eles não têm valor de mercado" },
            { id: 4, text: "Eles aumentam o consumo de energia" },
        ],
        correct: 2
    },
    {
        question: "Qual o impacto do consumo de dispositivos eletrônicos sobre a sustentabilidade?",
        options: [
            { id: 1, text: "Eles geram um alto consumo de recursos naturais e energia" },
            { id: 2, text: "Eles não possuem impacto ambiental" },
            { id: 3, text: "Eles ajudam na conservação de recursos naturais" },
            { id: 4, text: "Eles reduzem a emissão de gases de efeito estufa" },
        ],
        correct: 1
    },
    {
        question: "Qual prática pode melhorar a segurança dos seus dados pessoais na internet?",
        options: [
            { id: 1, text: "Usar senhas fracas e fáceis de lembrar" },
            { id: 2, text: "Atualizar constantemente o software e sistemas de segurança" },
            { id: 3, text: "Compartilhar sua senha com amigos de confiança" },
            { id: 4, text: "Desabilitar o firewall do computador" },
        ],
        correct: 2
    },
    {
        question: "Qual é o maior desafio relacionado ao lixo eletrônico?",
        options: [
            { id: 1, text: "Eles contêm materiais recicláveis, mas são difíceis de processar" },
            { id: 2, text: "A demanda por dispositivos novos é muito baixa" },
            { id: 3, text: "Eles ocupam muito espaço nas casas" },
            { id: 4, text: "Eles são fáceis de desmontar e reutilizar" },
        ],
        correct: 1
    },
    {
        question: "Qual a vantagem de investir em energias renováveis, como solar ou eólica?",
        options: [
            { id: 1, text: "Reduzem os custos com energia a longo prazo" },
            { id: 2, text: "São mais caras que as fontes de energia convencionais" },
            { id: 3, text: "Geram mais poluição no processo de instalação" },
            { id: 4, text: "Não são eficientes em locais com pouca luz ou vento" },
        ],
        correct: 1

    },
    {
        question: "Como você pode contribuir para a preservação da biodiversidade no seu dia a dia?",
        options: [
            { id: 1, text: "Usando pesticidas em casa" },
            { id: 2, text: "Apoiando a produção de alimentos orgânicos" },
            { id: 3, text: "Plantando árvores somente em áreas urbanas" },
            { id: 4, text: "Comprando produtos alimentícios com muito embalagens plásticas" },
        ],
        correct: 2
    },
    {
        question: "O que é o conceito de 'economia circular'?",
        options: [
            { id: 1, text: "Produção e consumo sem considerar o impacto ambiental" },
            { id: 2, text: "Reutilizar materiais e produtos para prolongar sua vida útil" },
            { id: 3, text: "Descarte de produtos de maneira rápida e simples" },
            { id: 4, text: "Recolher resíduos apenas para reciclagem" },
        ],
        correct: 2
    },
    {
        question: "Como a reciclagem ajuda a reduzir a poluição?",
        options: [
            { id: 1, text: "Destrói resíduos tóxicos" },
            { id: 2, text: "Reduz o desperdício de recursos naturais" },
            { id: 3, text: "Aumenta a produção de resíduos" },
            { id: 4, text: "Aumenta o consumo de produtos plásticos" },
        ],
        correct: 2
    },
    {
        question: "Qual é a forma mais segura de proteger dados pessoais na internet?",
        options: [
            { id: 1, text: "Usar senhas simples e fáceis de lembrar" },
            { id: 2, text: "Evitar o uso de redes Wi-Fi públicas para transações importantes" },
            { id: 3, text: "Compartilhar senhas com amigos de confiança" },
            { id: 4, text: "Desativar a autenticação de dois fatores" },
        ],
        correct: 2
    },
    {
        question: "Qual a importância de usar softwares antivírus no seu computador?",
        options: [
            { id: 1, text: "Prevenir ataques de malware e roubo de dados" },
            { id: 2, text: "Aumentar a velocidade da internet" },
            { id: 3, text: "Garantir que o computador nunca falhe" },
            { id: 4, text: "Proteger o computador contra sobrecarga de energia" },
        ],
        correct: 1

    },
    {
        question: "Qual o impacto da obsolescência programada nos dispositivos eletrônicos sobre o meio ambiente?",
        options: [
            { id: 1, text: "Ela contribui para o aumento do lixo eletrônico e a demanda por novos recursos naturais" },
            { id: 2, text: "Ela melhora a eficiência energética dos dispositivos" },
            { id: 3, text: "Ela reduz o consumo de eletricidade" },
            { id: 4, text: "Ela torna os dispositivos mais baratos" },
        ],
        correct: 1

    },
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
                modal.remove();
                showEndModal();
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