/**
 * o método querySelector() retorna apenas o primeiro elemento que corresponde aos seletores especificados. 
 * Para retornar todas as correspondências, use o método querySelectorAll() .
 */

// variáveis de controle de interface
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let area_candidatos_img = document.querySelector('.d-1-right');
let numeros_do_candidato = document.querySelector('.d-1-3');

// controle de ambiente
let etapaAtual = 0;
let num_digitados = '';
let voto_branco = false;
let voto_confirmado = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let boxNumeroHtml = ''; // número a exibir na tela
    num_digitados = '';
    voto_branco = false;

    for (let i = 0; i < etapa.numeros; i++) { // exibe a quantidade de espaços para prefeito ou vereador
        if (i === 0) {
            boxNumeroHtml += '<div class="numero pisca"></div>';
        } else {
            boxNumeroHtml += ' <div class="numero"></div>';
        }
    }


    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo; // vereador / prefeito
    descricao.innerHTML = '';
    aviso.style.display = 'none'; // informação no rodapé
    area_candidatos_img.innerHTML = ''; // local das imagens dos candidatos
    // caixas que correspondem ao total de números dos candidatos a serem exibidas na tela.
    numeros_do_candidato.innerHTML = boxNumeroHtml; // elementos html
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual]; // retorna a etapa atual: vereador, prefeito.
    // realiza a pesquisa pelos números digitados com os números dos candidatos
    let candidato = etapa.candidatos.filter((item) => {
        // número do candidato é igual ao número digitado?
        if (item.numero === num_digitados) {
            return true;
        } else {
            return false;
        }
    });

    // se foi encontrado o candidato
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;

        if (candidato.vice !== undefined) {
            descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}<br>Vice: ${candidato.vice}`;
        }

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="img/${candidato.fotos[i].url}" alt="Prefeito" >${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d-1-image"><img src="img/${candidato.fotos[i].url}" alt="Prefeito" >${candidato.fotos[i].legenda}</div>`;
            }
        }

        area_candidatos_img.innerHTML = fotosHtml;
    } else {
        // caso não seja encontrado
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-nulo-branco pisca">VOTO NULO</div>';
    }

}

// captura informações das teclas
function clicou(n) {
    // atribui o seletor pisca ao elemento que exibe o número na tela
    let elemNumero = document.querySelector('.numero.pisca');

    // verifica se há boxs piscando
    if (elemNumero !== null) {
        elemNumero.innerHTML = n; // insere o número digitado pelo usuário
        num_digitados = `${num_digitados}${n}`; // concatena os valores digitados
        // element.classeList 
        // A propriedade classList retorna o(s) nome(s) de classe de um elemento, 
        // como um objeto DOMTokenList.
        elemNumero.classList.remove('pisca'); // remove o seletor pisca do campo que exibe o número digitado

        // se não houver próximo elemento então será null
        // se houver mais caixa indicando um número requerido do candidato
        if (elemNumero.nextElementSibling !== null) {
            // retorna o próximo elemento irmão
            elemNumero.nextElementSibling.classList.add('pisca');
        } else {
            // caso contrário atualiza a interface
            // exibindo as informações para prefeito
            atualizaInterface();
        }

    }
}

function branco() {
    // se o eleitor não digitou números
    voto_branco = true;
    area_candidatos_img.innerHTML = '';
    num_digitados = '';
    numeros_do_candidato.innerHTML = '';
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class="aviso-nulo-branco pisca">VOTO EM BRANCO</div>';
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    // para voto em branco
    if (voto_branco === true) {
        voto_confirmado = true;

        votos.push({
            etapa: etapa.titulo,
            voto: 'Branco'
        });

    } else if (num_digitados.length === etapa.numeros) {
        voto_confirmado = true;

        let confirmado = false;
        for (let j = 0; j < etapa.candidatos.length; j++) {

            // verifica se o número do candidato existe
            if (num_digitados === etapa.candidatos[j].numero) {

                if (etapa.numeros === 2) {
                    votos.push({
                        etapa: etapa.titulo,
                        candidato: etapa.candidatos[j].nome,
                        numero: etapa.candidatos[j].numero,
                        vice: etapa.candidatos[j].vice
                    })
                } else {
                    votos.push({
                        etapa: etapa.titulo,
                        candidato: etapa.candidatos[j].nome,
                        numero: etapa.candidatos[j].numero,
                    })
                }

                confirmado = true;
            }

        }

        // se o for voto nulo
        if (confirmado !== true) {
            votos.push({
                etapa: etapa.titulo,
                numero: num_digitados,
                voto: 'Nulo'
            })
        }
    }

    // se confirmar o voto
    if (voto_confirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso-fim pisca">FIM</div>';
        }
    }

    console.log(votos);
}

comecarEtapa();