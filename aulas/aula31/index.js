const tarefas = document.querySelector('.tarefas');
const tarefaInput = document.querySelector('.inputTarefa');
const button = document.querySelector('.btnAddTarefa');
let contador = 0;

tarefaInput.addEventListener('keypress', function (e) {
  if (e.keyCode === 13){
    if (!tarefaInput.value) return;
    criaTarefa(tarefaInput.value);
  }
});

function apagarTarefa(li) {
  li.innerText += ' ';
  const apagar = document.createElement('button');
  apagar.innerText = '✖';
  apagar.setAttribute('class', 'btnApagar');
  apagar.setAttribute('title', 'Apagar essa tarefa');
  li.appendChild(apagar);
}

function limpaInput() {
  tarefaInput.value = '';
  tarefaInput.focus();
}

button.addEventListener('click', function () {
  if (!tarefaInput.value) return;
  const tarefa = tarefaInput.value;
  criaTarefa(tarefa);
});


function criaTarefa(tarefa) {
  const li = document.createElement('li');
  tarefas.appendChild(li);
  contador ++;
  li.innerHTML += `${contador}${tarefa}`;
  apagarTarefa(li);
  li.classList.add('flexLista');
  limpaInput();
  salvaTarefas();
}

document.addEventListener('click', function (e) {
  const click = e.target;
  if (click.classList.contains('btnApagar')){
    click.parentElement.remove();
    contador--;
    salvaTarefas();  
  }
});

function salvaTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaTarefas = [];

  for (let tarefa of liTarefas){
    let tarefaText = tarefa.innerText;
    tarefaText = tarefaText.replace('', '').trim();
    tarefaText = tarefaText.replace('✖', '').trim();
    listaTarefas.push(tarefaText);
  }

  const tarefasJSON = JSON.stringify(listaTarefas); //stringify igual string
  localStorage.setItem('tarefas', tarefasJSON);
}

function addTarefas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaTarefas = JSON.parse(tarefas); //parse igual objeto

  for(let lista of listaTarefas){
    criaTarefa(lista);
  }
}

addTarefas();
