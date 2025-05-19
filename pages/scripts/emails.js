let emailIndex = 0;

const emailQueue = [
    // E-mails falsos (phishing)
    {
        id: 1,
        title: "Promoção exclusiva da Amazon!",
        from: "oferta@amazon-oficial.com",
        body: "Aproveite nossa super promoção! Ganhe 50% de desconto na sua próxima compra. Não perca essa oportunidade imperdível.",
        bodyFull: "Olá! Somos da equipe de ofertas da Amazon e preparamos algo especial para você. Nesta promoção exclusiva, além dos 50% de desconto, você receberá um voucher adicional de frete grátis para usar em toda a sua próxima compra. Mas atenção: a oferta é válida somente nas próximas 24 horas. Acesse agora mesmo o link abaixo, confira nossas categorias em destaque e garanta já os melhores produtos pelo menor preço. Boas compras e obrigado por escolher a Amazon!",
        isSafe: false
    },
    {
        id: 2,
        title: "Alerta do banco urgente",
        from: "suporte@bancoalerta.com",
        body: "Detectamos atividade suspeita na sua conta, atualize seus dados bancários agora mesmo para evitar bloqueio.",
        bodyFull: "Prezado cliente, nossa equipe de segurança identificou acessos incomuns que podem comprometer o saldo e as transações da sua conta. Para sua proteção, solicitamos que confirme imediatamente suas informações através do link seguro abaixo. Caso não regularize dentro das próximas 2 horas, sua conta será temporariamente suspensa até que possamos garantir sua segurança. Em caso de dúvida, entre em contato pelo nosso telefone de suporte 24h. Agradecemos sua colaboração e lamentamos qualquer inconveniente.",
        isSafe: false
    },
    {
        id: 3,
        title: "Ganhe um iPhone agora!",
        from: "promo@apple-vencedores.com",
        body: "Você foi selecionado! Clique e responda 3 perguntas e ganhe um iPhone novinho. Não fique de fora dessa!",
        bodyFull: "Parabéns! Após um sorteio exclusivo, seu e-mail foi escolhido para participar da nossa campanha 'iPhone dos Sonhos'. Basta responder rapidamente três perguntas simples sobre seus hábitos de consumo de tecnologia para confirmar sua participação. Em seguida, você receberá um código único para resgatar seu novo iPhone 13 Pro Max gratuitamente. Mas atenção: as vagas são limitadas e a promoção termina à meia-noite de hoje. Aproveite antes que acabe!",
        isSafe: false
    },
    {
        id: 4,
        title: "Receita Federal - reembolso",
        from: "reembolso@rf-gov.com.br",
        body: "Você tem valores a receber. Clique no link e cadastre sua conta para receber o reembolso da Receita.",
        bodyFull: "Caro contribuinte, após análise de sua declaração de imposto de renda, constatamos que você tem direito a um crédito de imposto no valor de R$ 1.254,00. Para agilizar seu reembolso, informe os dados da sua conta bancária e CPF no formulário seguro disponível no link. A Receita Federal reforça: o procedimento é indispensável para depósito automático. Não perca o prazo; faça o cadastro até o final do mês e receba o valor em até 5 dias úteis.",
        isSafe: false
    },
    {
        id: 5,
        title: "Seu CPF está irregular",
        from: "cpf@serpro-suporte.com",
        body: "Identificamos uma irregularidade no seu CPF. Acesse o link para regularização imediata.",
        bodyFull: "Olá, cidadão. Detectamos que há pendências cadastrais no seu CPF junto ao SERPRO, o que pode impedir certas operações bancárias e financeiras. Para regularizar em poucos minutos, acesse o portal oficial através do link abaixo e siga o passo a passo de identificação. Ao concluir, você receberá a certidão negativa atualizada diretamente no seu e‑mail. Atente-se: caso não regularize em até 48 horas, seu CPF poderá ser suspenso para novas operações.",
        isSafe: false
    },
    {
        id: 6,
        title: "WhatsApp Gold liberado",
        from: "exclusive@whatsgold.com",
        body: "Versão gold do WhatsApp liberada só hoje! Instale agora e veja as novidades incríveis.",
        bodyFull: "Olá! Seja um dos primeiros a testar o WhatsApp Gold, nossa versão premium com recursos exclusivos: chamadas em grupo com até 50 participantes, temas personalizados e criptografia de ponta ainda mais reforçada. O download está disponível apenas hoje e o acesso é restrito a convites limitados. Clique no link, instale o APK e aproveite funcionalidades que não estarão nas versões convencionais. Garanta já seu acesso antes que o convite expire!",
        isSafe: false
    },
    {
        id: 7,
        title: "Netflix cancelou seu acesso",
        from: "netflix@cancelamento.com",
        body: "Sua conta foi cancelada. Atualize o pagamento imediatamente para não perder acesso aos conteúdos.",
        bodyFull: "Prezado assinante, identificamos uma falha no processamento do seu último pagamento, o que resultou no bloqueio temporário da sua conta Netflix. Para reativar e continuar assistindo suas séries e filmes favoritos sem interrupções, atualize os dados do cartão cadastrado através do link seguro abaixo. Caso não regularize em 24 horas, sua assinatura será encerrada e seu histórico de recomendações, perdido. Aguardamos sua atualização para mais maratonas!",
        isSafe: false
    },
    {
        id: 8,
        title: "Sua senha vazou na internet",
        from: "seguranca@protecao.com",
        body: "Urgente! sua senha está circulando na internete. Clique aqui para mudar antes que seja tarde demais.",
        bodyFull: "Olá, notamos que seu e‑mail e senha foram publicados em um fórum público de vazamentos de dados, o que pode colocar suas contas em risco. Para minimizar danos, altere imediatamente suas senhas principais e ative a autenticação em duas etapas nos serviços mais críticos. Você pode começar o procedimento clicando no link abaixo, que o guiará por um processo seguro de redefinição. Proteja-se antes que invasores usem essas informações.",
        isSafe: false
    },

    // E-mails reais (seguros)
    {
        id: 9,
        title: "Confirmação de pagamento da Amazon",
        from: "no-reply@amazon.com.br",
        body: "Seu pagamento foi confirmado com sucesso. Seu pedido será enviado em breve. Acompanhe seu pedido pelo app.",
        bodyFull: "Olá! Seu pagamento referente ao pedido #123-4567890-1234567 foi aprovado com sucesso. Em até 24 horas, o status do seu pedido mudará para 'Em preparação para envio'. Você pode acompanhar cada etapa pelo aplicativo Amazon, além de receber notificações automáticas sobre o rastreamento. Agradecemos a preferência e estamos à disposição para qualquer dúvida.",
        isSafe: true
    },
    {
        id: 10,
        title: "Atualização de segurança disponível",
        from: "atendimento@softwareseguro.com",
        body: "Uma nova atualização de segurança está disponível para o seu dispositivo. Recomendamos instalá-la o quanto antes.",
        bodyFull: "Caro usuário, lançamos hoje a versão 4.8.2 do nosso software, incluindo correções críticas contra vulnerabilidades de acesso não autorizado e melhorias de desempenho. Para manter seu ambiente protegido, abra o aplicativo, vá em 'Configurações > Atualizações' e clique em 'Instalar agora'. O procedimento leva menos de dois minutos e não requer reinicialização. Manter-se atualizado é fundamental para sua segurança digital.",
        isSafe: true
    },
    {
        id: 11,
        title: "Comprovante de transferência bancária",
        from: "noreply@banco.com.br",
        body: "Olá! Seu comprovante de transferência está disponível em anexo. Qualquer dúvida, entre em contato com nosso suporte.",
        bodyFull: "Olá, conforme solicitado, anexamos o comprovante da transferência de R$ 2.450,00 realizada em 10 de maio de 2025 para a conta destination@example.com.Confira os detalhes de data, hora e identificador da transação. Se houver qualquer divergência, entre imediatamente em contato com nosso atendimento pelo telefone 0800-123-4567. Obrigado por usar nossos serviços.",
        isSafe: true
    },
    {
        id: 12,
        title: "Mudança de política de privacidade",
        from: "privacidade@empresa.com.br",
        body: "Atualizamos nossa política de privacidade. Leia as mudanças e saiba como protegemos seus dados.",
        bodyFull: "Prezado usuário, para fortalecer nossa transparência, revisamos nossa política de privacidade para detalhar como coletamos, usamos e armazenamos suas informações pessoais. Entre as principais alterações, destacamos o novo direito de portabilidade de dados e esclarecimentos sobre cookies de terceiros. Acesse o link abaixo para ler o documento completo e entre em contato em privacidade@empresa.com.br caso tenha dúvidas ou queira exercer seus direitos.",
        isSafe: true
    },
    {
        id: 13,
        title: "Nota fiscal disponível",
        from: "fiscal@comprasonline.com",
        body: "Sua nota fiscal está disponível para download. Acesse seu histórico de pedidos para visualizar.",
        bodyFull: "Olá! Sua nota fiscal eletrônica Nº 2025.12345.6789 já está disponível no nosso portal. Para baixá-la, entre em 'Meus Pedidos' e clique em 'Emitir Nota Fiscal'. Caso tenha dificuldades no processo ou precise de segunda via em PDF, acesse o link de suporte ou responda este e‑mail. Estamos à disposição para garantir sua comodidade.",
        isSafe: true
    },
    {
        id: 14,
        title: "Novo dispositivo conectado",
        from: "seguranca@provedor.com",
        body: "Um novo dispositivo acessou sua conta recentemente. Se não foi você, altere sua senha imediatamente.",
        bodyFull: "Olá! Registramos acesso à sua conta em um dispositivo nunca antes utilizado em 14 de maio de 2025 às 15:32 (UTC−03:00). Caso reconheça essa atividade, não é necessário fazer nada. Se não, acesse agora nossas configurações de segurança e altere sua senha. Você também pode ativar a verificação em dois passos para maior proteção. Em caso de dúvida, fale com nosso suporte 24h.",
        isSafe: true
    },
    {
        id: 15,
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

function countEmails() {
    let emails = document.querySelectorAll(".email-item");
    return emails.length;
}

function generateEmail(title, snippet, isSafe = true, from = 'unknown@domain.com', bodyFull, emailType) {
    const time = new Date().toLocaleTimeString();
    const emailItem = document.createElement("div");
    emailItem.setAttribute("data-id-email", countEmails())
    emailItem.setAttribute("data-bloqueado", false)
    emailItem.className = "email-item";
    emailItem.innerHTML = `
        <div class="info">
            <div class="title">
                ${title}
            </div>
            <div class="snippet">
                ${snippet}
            </div>
        </div>

        <div class="bottom-row">
            <div class="actions">
                <button class="green-btn" data-email-type="${emailType}" data-id-email="${countEmails()}" click="$event.stopPropagation();">🔓</button>
                <button class="red-btn" data-email-type="${emailType}" data-id-email="${countEmails()}" click="$event.stopPropagation();">🔒</button>
                <div class="time">
                    ${time}
                </div>
            </div>
        </div>`;

    const [yesBtn, noBtn] = emailItem.querySelectorAll('button');
    window._tentativa = 1;

    const disableButtons = (button) => {
        yesBtn.disabled = true;
        noBtn.disabled = true;
    };

    // Flag para impedir o clique no e-mail quando o cadeado for ativado

    yesBtn.addEventListener('click', () => {
        if (yesBtn.disabled) {
            return;
        }

        yesBtn.disabled = true;
        noBtn.disabled = true;

        emailItem.setAttribute("data-bloqueado", "true")
        emailItem.style.pointerEvents = 'none'; // Evita clique no container

        let idEmail = parseInt(noBtn.getAttribute("data-id-email"), 10);
        let emailType = parseInt(noBtn.getAttribute("data-email-type"), 10);
        let email = emailQueue.find(x => x.id == emailType)

        reportPhishing(email, idEmail, emailType);
    });

    noBtn.addEventListener('click', (button) => {
        if (noBtn.disabled) {
            return;
        }

        yesBtn.disabled = true;
        noBtn.disabled = true;

        emailItem.setAttribute("data-bloqueado", "true")
        emailItem.style.pointerEvents = 'none';

        handleResposta(isSafe); // invertido aqui
    });

    emailItem.addEventListener("click", () => {
        if (emailItem.getAttribute("data-bloqueado") == "true") {
            return;
        }

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
        </div>`;

    // Adiciona o conteúdo à página???
    document.querySelector(".main-content").appendChild(detail);

    // Função para voltar à lista de e-mails
    document.getElementById("voltarBtn").addEventListener("click", () => {
        detail.remove();
        document.querySelector(".email-list").style.display = "block";
        document.querySelector(".footer").style.display = "flex";
    });

}

let phishingEmail = null;
let phishingEmailType = null;

function reportPhishing(email, idEmail, emailType) {
    phishingEmail = idEmail;
    phishingEmailType = emailType;

    const modalReport = document.createElement("div");

    modalReport.className = "modal";
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
        modalReport.remove();

        let email = emailQueue.find(x => x.id == phishingEmailType)
        if (email.isSafe) {
            handleResposta(false); // invertido aqui
        } else {
            alert("Phishing reportado com sucesso!");
            handleResposta(true)
            modalReport.remove();
            // nextEmail();  // Vai para o próximo e-mail após o reporte.
        }
    });

    document.getElementById("cancelReport").addEventListener("click", () => {
        modalReport.remove();  // Fecha a modal sem fazer nada.
        let botoes = document.querySelectorAll("button");

        botoes.forEach((botao) => {
            if (parseInt(botao.getAttribute("data-id-email"), 0) == idEmail) {
                botao.disabled = false;
            }
        })

        let divEmail = document.querySelectorAll("div");

        divEmail.forEach((div) => {
            if (parseInt(div.getAttribute("data-id-email"), 0) == idEmail) {
                div.setAttribute("data-bloqueado", "false")
                div.style.pointerEvents = 'all';
            }
        })
    });
}

function nextEmail() {
    if (emailIndex >= emailQueue.length) {
        showEndModal();
        return;
    }

    const emailData = emailQueue[emailIndex];

    generateEmail(emailData.title, emailData.body, emailData.isSafe, emailData.from, emailData.bodyFull, emailData.id);

    emailIndex++;
}

nextEmail();