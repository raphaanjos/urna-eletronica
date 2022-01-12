/**
 * o método querySelector() retorna apenas o primeiro elemento que corresponde aos seletores especificados. 
 * Para retornar todas as correspondências, use o método querySelectorAll() .
 */

// variáveis de controle de interface
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let area_candidatos = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

// controle de ambiente
let etapaAtual = 0;
let num_digitados = '';

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += ' <div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    area_candidatos.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === num_digitados) {
            return true;
        } else {
            return false;
        }
    });
    console.log('candidato: ', candidato);
}

// captura informações das teclas
function clicou(n) {
    // atribui o seletor pisca ao elemento que exibe o número na tela
    let elemNumero = document.querySelector('.numero.pisca');

    if (elemNumero !== null) {
        elemNumero.innerHTML = n; // insere o número digitado pelo usuário
        num_digitados = `${num_digitados}${n}`; // concatena os valores digitados
        // element.classeList 
        // A propriedade classList retorna o(s) nome(s) de classe de um elemento, 
        // como um objeto DOMTokenList.
        elemNumero.classList.remove('pisca'); // remove o seletor pisca do campo que exibe o número digitado

        if (elemNumero.nextElementSibling !== null) {
            // retorna o próximo elemento irmão
            console.log(elemNumero.nextElementSibling);
            elemNumero.nextElementSibling.classList.add('pisca');
        } else {
            console.log(elemNumero.nextElementSibling);
            atualizaInterface();
        }

    }
}

function branco() {
    alert('Clicou em branco');
}

function corrige() {
    alert('Clicou em corrige');
}

function confirma() {
    alert('clicou em confirma');
}

comecarEtapa();