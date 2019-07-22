let tempoInicial = document.querySelector('.cronometro').textContent;
let campoDigitacao = document.querySelector('.campo-digitacao');

document.addEventListener("DOMContentLoaded", () => {
    atualizaTamFrase();
    iniciaContadores();
    iniciaCronometro();
    validaPalavraDigitada();
    reiniciaJogo();
});

function atualizaTamFrase() {
    let frase = document.querySelector('.frase').textContent;
    let numPalavras = frase.split(" ").length;
    let tamanhoFrase = document.querySelector('.tamanho-frase');
    tamanhoFrase.textContent = numPalavras;
}

function iniciaContadores() {
    campoDigitacao.oninput = () => {
        let conteudo = campoDigitacao.value;

        let contadorPalavras = document.querySelector('.contador-palavras');
        let qtdPalavras = conteudo.split(/\S+/).length - 1;
        contadorPalavras.textContent = qtdPalavras;

        let qtdLetras = conteudo.length;
        document.querySelector('.contador-letras').textContent = qtdLetras;
    };
}

function iniciaCronometro() {
    let cronometro = document.querySelector('.cronometro').textContent;
    campoDigitacao.onfocus = () => {
        let temporRestante = setInterval(() => {
            cronometro--;
            document.querySelector('.cronometro').textContent = cronometro;
            if (cronometro < 1) {
                campoDigitacao.setAttribute("disabled", true);
                clearInterval(temporRestante);
                campoDigitacao.classList.toggle('campo-desativado');
            }
        }, 1000);
    };
}

function validaPalavraDigitada() {

    let frases = document.querySelector('.frase').textContent;
    console.log(frases)
    campoDigitacao.addEventListener("input", function() {
        let digitado = campoDigitacao.value;

        var comparar = frases.substr(0, digitado.length);

        if (digitado == comparar) {
            campoDigitacao.classList.add('borda-verde');
            campoDigitacao.classList.remove('borda-vermelha');
        } else {
            campoDigitacao.classList.add('borda-vermelha');
            campoDigitacao.classList.remove('borda-verde');
        }
    });
}

function mostraPlacar() {
    let tabela = document.querySelector('.placar').querySelectorAll('tbody');
    console.log(tabela);
}


function reiniciaJogo() {
    let botaReiniciar = document.querySelector('.btn-reiniciar');

    botaReiniciar.onclick = () => {
        campoDigitacao.removeAttribute("disabled", false);
        campoDigitacao.value = "";
        document.querySelector('.contador-palavras').textContent = "0";
        document.querySelector('.contador-letras').textContent = "0";
        document.querySelector('.cronometro').textContent = tempoInicial;
        iniciaCronometro();
        campoDigitacao.classList.toggle('campo-desativado');
        campoDigitacao.classList.remove('borda-verde');
        campoDigitacao.classList.remove('borda-vermelha');
    };
}