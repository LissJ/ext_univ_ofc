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

    {
        difficulty: 'easy',
        correct: 0,
        pt: {
            question: "Qual dessas atitudes economiza energia no uso do computador?",
            options: [
                "Ativar o modo de economia de energia",
                "Deixar o monitor ligado o tempo todo",
                "Desativar o descanso de tela",
                "Utilizar protetores de tela animados"
            ]
        }
    },
    {
        difficulty: 'easy',
        correct: 1,
        pt: {
            question: "Qual desses é um exemplo de boa prática digital?",
            options: [
                "Clicar em links de e-mails desconhecidos",
                "Atualizar regularmente os aplicativos",
                "Usar redes Wi-Fi públicas sem proteção",
                "Ignorar atualizações do sistema"
            ]
        }
    },
    {
        difficulty: 'easy',
        correct: 2,
        pt: {
            question: "O que pode ajudar a reduzir lixo eletrônico?",
            options: [
                "Trocar de celular sempre que um novo modelo for lançado",
                "Descartar equipamentos no lixo comum",
                "Reutilizar e doar eletrônicos antigos",
                "Guardar aparelhos velhos em casa para sempre"
            ]
        }
    },
    {
        difficulty: 'easy',
        correct: 3,
        pt: {
            question: "Qual dessas ações NÃO é sustentável?",
            options: [
                "Evitar imprimir documentos desnecessários",
                "Reduzir o uso de energia",
                "Compartilhar arquivos digitalmente",
                "Imprimir tudo para arquivar em papel"
            ]
        }
    },
    {
        difficulty: 'easy',
        correct: 0,
        pt: {
            question: "Como manter seus dispositivos digitais mais seguros?",
            options: [
                "Instalando atualizações de segurança",
                "Usando senhas fáceis de lembrar",
                "Compartilhando senhas com amigos",
                "Desativando firewall"
            ]
        }
    },
    {
        difficulty: 'easy',
        correct: 1,
        pt: {
            question: "Qual é uma atitude consciente no uso da internet?",
            options: [
                "Deixar vídeos rodando em segundo plano",
                "Fechar abas e aplicativos não utilizados",
                "Assistir vídeos em alta resolução no 4G",
                "Baixar tudo que aparece nas redes"
            ]
        }
    },
    {
        difficulty: 'easy',
        correct: 2,
        pt: {
            question: "Qual prática ajuda a economizar bateria no celular?",
            options: [
                "Deixar brilho máximo o tempo todo",
                "Usar papel de parede animado",
                "Ativar modo avião quando não precisar de conexão",
                "Deixar o GPS ativado o dia todo"
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

    {
        difficulty: 'medium',
        correct: 0,
        pt: {
            question: "O que é green IT?",
            options: [
                "Uso de tecnologia com menor impacto ambiental",
                "Software para pintar telas de verde",
                "Energia solar para carregar dispositivos",
                "Proibição do uso de computadores antigos"
            ]
        }
    },
    {
        difficulty: 'medium',
        correct: 1,
        pt: {
            question: "Qual ação reduz a emissão de carbono no trabalho remoto?",
            options: [
                "Fazer reuniões em vídeo com fundo animado",
                "Desligar câmera quando não necessário",
                "Manter computador ligado durante a noite",
                "Transferir arquivos grandes por e-mail"
            ]
        }
    },
    {
        difficulty: 'medium',
        correct: 2,
        pt: {
            question: "O que é uma pegada de carbono digital?",
            options: [
                "Marca dos dedos no celular",
                "Consumo de bateria do celular",
                "Impacto ambiental do uso de tecnologia",
                "Poluição causada por impressoras"
            ]
        }
    },
    {
        difficulty: 'medium',
        correct: 3,
        pt: {
            question: "Como podemos prolongar a vida útil dos equipamentos eletrônicos?",
            options: [
                "Deixando ligados 24h por dia",
                "Carregando só até 100% sempre",
                "Utilizando qualquer carregador",
                "Fazendo manutenções e atualizações regulares"
            ]
        }
    },
    {
        difficulty: 'medium',
        correct: 1,
        pt: {
            question: "Qual dessas alternativas é mais ecológica ao consumir conteúdo?",
            options: [
                "Assistir vídeos em 4K mesmo quando não necessário",
                "Ouvir podcasts ou ler textos em vez de vídeos sempre que possível",
                "Rever vídeos várias vezes em streaming",
                "Compartilhar vídeos pesados via e-mail"
            ]
        }
    },
    {
        difficulty: 'medium',
        correct: 0,
        pt: {
            question: "O que é ecodesign digital?",
            options: [
                "Criar interfaces e sites com menor consumo de recursos",
                "Design gráfico com tons de verde",
                "Criar aplicativos com sons da natureza",
                "Desenvolver software para jardinagem"
            ]
        }
    },
    {
        difficulty: 'medium',
        correct: 2,
        pt: {
            question: "Qual das opções é melhor para reduzir o impacto ambiental?",
            options: [
                "Manter vídeos em loop no YouTube",
                "Usar papel para anotações digitais",
                "Usar ferramentas colaborativas online com moderação",
                "Enviar memes em alta resolução"
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
    },

    {
        difficulty: 'hard',
        correct: 2,
        pt: {
            question: "O que significa 'obsolescência programada'?",
            options: [
                "Produtos durarem para sempre",
                "Atualizações constantes do sistema",
                "Projetar produtos para durarem pouco tempo",
                "Planejamento de sustentabilidade"
            ]
        }
    },
    {
        difficulty: 'hard',
        correct: 3,
        pt: {
            question: "Como serviços de streaming podem ser mais sustentáveis?",
            options: [
                "Assistindo em várias abas ao mesmo tempo",
                "Assistindo no modo HDR",
                "Assistindo com brilho máximo",
                "Assistindo em horários de menor demanda"
            ]
        }
    },
    {
        difficulty: 'hard',
        correct: 1,
        pt: {
            question: "Qual dessas alternativas representa um armazenamento sustentável?",
            options: [
                "Guardar tudo na nuvem sem organizar",
                "Apagar arquivos inúteis regularmente",
                "Duplicar arquivos por segurança",
                "Usar HDs externos continuamente conectados"
            ]
        }
    },
    {
        difficulty: 'hard',
        correct: 0,
        pt: {
            question: "Qual ação ajuda a reduzir o uso de energia dos servidores?",
            options: [
                "Evitar enviar anexos grandes sem necessidade",
                "Utilizar mais GIFs e vídeos nas mensagens",
                "Reencaminhar mensagens em massa",
                "Fazer backup completo toda hora"
            ]
        }
    },
    {
        difficulty: 'hard',
        correct: 3,
        pt: {
            question: "Como um desenvolvedor pode criar softwares mais ecológicos?",
            options: [
                "Utilizando bibliotecas grandes e pesadas",
                "Evitando compressão de imagens",
                "Ignorando o consumo de CPU",
                "Escrevendo código eficiente e otimizado"
            ]
        }
    },
    {
        difficulty: 'hard',
        correct: 2,
        pt: {
            question: "O que representa um risco invisível ao meio ambiente digital?",
            options: [
                "Bateria fraca",
                "Aplicativo desatualizado",
                "Dados armazenados desnecessariamente em nuvem",
                "Aparelhos antigos em uso"
            ]
        }
    },
    {
        difficulty: 'hard',
        correct: 1,
        pt: {
            question: "Qual prática contribui para o lixo eletrônico global?",
            options: [
                "Reutilizar equipamentos antigos",
                "Substituir aparelhos funcionais por modismo",
                "Vender dispositivos usados",
                "Reciclar corretamente o celular antigo"
            ]
        }
    },
    
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