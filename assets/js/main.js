const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');// Serve para adicionar um atributo no elemento, neste caso criei um atibuto class e nomeei de apagar.
    botaoApagar.setAttribute('title', 'Apagar esta tarefa.');
    li.appendChild(botaoApagar);
}

inputTarefa.addEventListener('keypress', function (e) {// Para pegar o evento da tecla.
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

btnTarefa.addEventListener('click', function () {// Para pegar o evento de click.
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) {
    const el = e.target
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();// Do meu elemento, o pai dele será removido.
        salvarTarefas();
    }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();// Para tirar a palavra apagar dos meus valores dos inputs. A função trim() retira os espaços das laterais da minha string.
        listaDeTarefas.push(tarefaTexto);
    }
    // Json é um formato de texto usado para salvar dados entre sistemas.

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);// Salvei minhas tarefas em uma "base de dados do navegador".
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);// Converti para objeto em javascript.

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas();