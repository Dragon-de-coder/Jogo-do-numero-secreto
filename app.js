let listaDeNumerosSorteados = []; // Armazena os números que já foram sorteados
let numeroLimite = 50; // Define o limite máximo para o número secreto
let numeroSecreto = gerarNumeroAleatorio(); // Gera o número secreto aleatório
let tentativas = 1; // Inicializa o contador de tentativas

// Função que exibe texto na tela e faz o computador falar
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag); // Seleciona o elemento HTML pelo seletor
    campo.innerHTML = texto; // Atualiza o conteúdo do elemento

    // Tenta usar a Responsive Voice
    try {
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2}); // Faz o texto ser falado
    } catch (error) {
        // Se falhar, usa a Web Speech API
        if ('speechSynthesis' in window) {
            let utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = 'pt-BR';
            utterance.rate = 1.2;
            window.speechSynthesis.speak(utterance);
        } else {
            console.log("Web Speech API não suportada neste navegador.");
        }
    }
}

// Função que exibe a mensagem inicial do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto'); // Exibe o título do jogo
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 50'); // Exibe a instrução para o jogador
}

exibirMensagemInicial(); // Chama a função para exibir a mensagem inicial

// Função que verifica o chute do usuário
function verificarChute() {
    let chute = document.querySelector('input').value; // Obtém o valor do chute do usuário
    // Verifica se o chute está correto
    if(chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!'); // Exibe mensagem de acerto
        let palavraTentativa =  tentativas > 1 ? 'tentativas' : 'tentativa'; // Define a forma correta da palavra
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; // Mensagem com o número de tentativas
        exibirTextoNaTela('p', mensagemTentativas); // Exibe a mensagem de tentativas
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar
    } else {
        // Verifica se o chute é maior ou menor que o número secreto
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor'); // Dica para o jogador
        } else {
            exibirTextoNaTela('p','O número secreto é maior'); // Dica para o jogador
        }
        tentativas++; // Incrementa o contador de tentativas
        limparCampo(); // Limpa o campo de entrada
    }
}

// Função que gera um número aleatório que ainda não foi sorteado
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Gera um número aleatório entre 1 e numeroLimite
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // Obtém a quantidade de números já sorteados
  
    // Se todos os números já foram sorteados, reinicia a lista
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    // Verifica se o número já foi sorteado
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); // Chama a função novamente se o número já foi sorteado
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o número à lista de sorteados
        return numeroEscolhido; // Retorna o número sorteado
    }
}

// Função que limpa o campo de entrada do usuário
function limparCampo() {
    let chute = document.querySelector('input'); // Seleciona o campo de entrada
    chute.value = ''; // Limpa o valor do campo
}

// Função que reinicia o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto
    limparCampo(); // Limpa o campo de entrada
    tentativas = 1; // Reinicia o contador de tentativas
    exibirMensagemInicial(); // Exibe a mensagem inicial novamente
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão de reiniciar
}