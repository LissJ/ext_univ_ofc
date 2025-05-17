// Variáveis
let selectedDifficulty = 'easy';
const currentLanguage = 'pt';

let questionIndexes = {
    easy: 0,
    medium: 0,
    hard: 0
};

const questions = [
    // FÁCEIS
    {
        difficulty: 'easy',
        correct: 0,
        pt: {
            question: "Qual destas práticas ajuda a reduzir a pegada de carbono digital?",
            options: [
                "Desligar o computador quando não estiver usando",
                "Deixar vídeos em autoplay",
                "Manter 50 abas abertas",
                "Assistir vídeos em 4K no celular"
            ]
        }
    },
    {
        difficulty: 'easy',
        correct: 1,
        pt: {
            question: "Qual ação reduz o impacto ambiental de e-mails?",
            options: [
                "Enviar e-mails com anexos grandes",
                "Excluir e-mails antigos regularmente",
                "Manter lixo eletrônico cheio",
                "Enviar mensagens para todos os contatos sempre"
            ]
        }
    },
    {
        difficulty: 'easy',
        correct: 2,
        pt: {
            question: "Qual prática melhora a segurança no mundo digital?",
            options: [
                "Usar a mesma senha em todos os sites",
                "Compartilhar senhas por e-mail",
                "Ativar autenticação de dois fatores",
                "Desligar o antivírus"
            ]
        }
    },

    // MÉDIAS
    {
        difficulty: 'medium',
        correct: 3,
        pt: {
            question: "Qual dessas ações ajuda a economizar energia durante a navegação?",
            options: [
                "Assistir vídeos em 1080p o tempo todo",
                "Abrir várias abas de vídeos simultaneamente",
                "Manter o brilho da tela sempre no máximo",
                "Utilizar o modo escuro em aplicativos e sites"
            ]
        }
    },
    {
        difficulty: 'medium',
        correct: 2,
        pt: {
            question: "O que é considerado um comportamento digital sustentável?",
            options: [
                "Trocar de celular todo ano",
                "Baixar todos os arquivos antes de precisar",
                "Evitar downloads desnecessários e fazer streaming com moderação",
                "Deixar o carregador na tomada sempre"
            ]
        }
    },

    // DIFÍCEIS
    {
        difficulty: 'hard',
        correct: 1,
        pt: {
            question: "Qual é o maior responsável pelo consumo energético de serviços online?",
            options: [
                "O computador do usuário",
                "Os data centers que armazenam e processam dados",
                "A tela do celular",
                "A rede Wi-Fi doméstica"
            ]
        }
    },
    {
        difficulty: 'hard',
        correct: 0,
        pt: {
            question: "Como reduzir o impacto ambiental de um vídeo assistido online?",
            options: [
                "Assistir em menor resolução, como 480p",
                "Ativar legendas automáticas",
                "Assistir com fone de ouvido",
                "Colocar em tela cheia"
            ]
        }
    }
];


// Escuta os botões
function addDifficultyListeners() {
    ['easy', 'medium', 'hard'].forEach(level => {
        const btn = document.getElementById(level);
        if (btn) {
            btn.addEventListener('click', () => showDifficultyQuiz(level));
        }
    });
}
addDifficultyListeners();

function highlightSelectedButton(difficulty) {
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(difficulty);
    if (activeBtn) activeBtn.classList.add('active');
}


function showDifficultyQuiz(difficulty) {
    selectedDifficulty = difficulty;
    highlightSelectedButton(difficulty);
    resetCarbonMeter(); // 🔄 Reseta a barra de carbono ao mudar de dificuldade
    questionIndexes[selectedDifficulty] = 0; // 🔄 Reinicia o progresso
    showQuizInSection();
}


function showQuizInSection() {
    const quizArea = document.getElementById("quizContainer");
    const filteredQuestions = questions.filter(q => q.difficulty === selectedDifficulty);

    if (filteredQuestions.length === 0) {
        quizArea.innerHTML = `<p>Nenhuma pergunta disponível para esta dificuldade.</p>`;
        return;
    }

    const currentIndex = questionIndexes[selectedDifficulty];

    if (currentIndex >= filteredQuestions.length) {
        quizArea.innerHTML = `<p>🎉 Você completou todas as perguntas dessa dificuldade!</p>`;
        return;
    }

    const question = filteredQuestions[currentIndex];
    const data = question[currentLanguage];
    const letra = ["A", "B", "C", "D"];

    const quizHTML = `
        <div class="question-card fade-in">
            <div class="question-text">${currentIndex + 1} - ${data.question}</div>
            <div class="answer-options">
                ${data.options.map((opt, i) => `
                    <button onclick="handleQuizAnswer(${i}, ${question.correct}, this)">
                        <span class="option-letter">${letra[i]}</span>
                        <span class="option-text">${opt}</span>
                    </button>
                `).join("")}
            </div>
        </div>
    `;

    // Faz fade-out antes de trocar o conteúdo
    quizArea.classList.add("fade-out");

    setTimeout(() => {
        quizArea.innerHTML = quizHTML;
        quizArea.classList.remove("fade-out");
        quizArea.classList.add("fade-in");

        // Remove fade-in depois que animação terminar
        setTimeout(() => {
            quizArea.classList.remove("fade-in");
        }, 300);
    }, 300);
}

function handleQuizAnswer(selected, correct, btn) {
    const buttons = btn.parentNode.querySelectorAll("button");

    buttons.forEach((b, i) => {
        b.disabled = true;
        if (i === correct) b.classList.add("correct");
        if (b === btn && i !== correct) b.classList.add("wrong");
    });

    // Altera a barra de carbono
    if (selected === correct) {
        updateCarbonMeter(-10);
    } else {
        updateCarbonMeter(20);
    }

    // Avança para a próxima pergunta depois de 1 segundo
    setTimeout(() => {
        questionIndexes[selectedDifficulty]++;
        showQuizInSection();
    }, 1000);
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

let carbonLevel = 0; // 0 a 100%
const carbonBar = document.getElementById("carbonMeter");

function updateCarbonMeter(change) {
    carbonLevel = Math.min(100, Math.max(0, carbonLevel + change)); // limita entre 0 e 100
    carbonBar.style.width = carbonLevel + "%";

    if (carbonLevel >= 100) {
        setTimeout(() => {
            alert("Você perdeu! 🌱 Tente novamente.");
        }, 300);
    }
}

function resetCarbonMeter() {
    carbonLevel = 0;
    carbonBar.style.width = "0%";
}