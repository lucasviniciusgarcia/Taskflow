const tarefa = document.getElementById("tarefa");
const adicionar = document.getElementById("adicionar");
const listaTarefas = document.getElementById("listaTarefas");
const tarefasExistentes = listaTarefas.querySelectorAll("li");
function alternarStatus(status)  {
if(status.textContent === "Em andamento") {
  status.textContent = "Concluída";
}
  else {
    status.textContent = "Em andamento";
  }
  
}
function criarStatus() {
const status = document.createElement("span");
  status.textContent = "Em andamento";
  return status;
}
function criarBotaoExcluir() {
const botaoExcluir = document.createElement("button");
  botaoExcluir.textContent = "Excluir";
  return botaoExcluir;
}
function adicionarBotaoExcluir(tarefa) {
  const botaoExcluir = criarBotaoExcluir();
  tarefa.appendChild(botaoExcluir);
  botaoExcluir.addEventListener("click", function() {
    tarefa.remove();
  });
}
tarefasExistentes.forEach(function(tarefaAtual) {
  const status = criarStatus();
  tarefaAtual.appendChild(status);
  status.addEventListener("click", function () {
    alternarStatus(status);
  });
adicionarBotaoExcluir(tarefaAtual);
});
adicionar.addEventListener("click", function(event) {
  event.preventDefault();
  const textoTarefa = tarefa.value;
  if(textoTarefa !== "") {
 const novaTarefa = document.createElement("li");
    const status = criarStatus();
novaTarefa.textContent = textoTarefa;
    novaTarefa.appendChild(status);
    status.addEventListener("click", function(){
      alternarStatus(status);
      });
  listaTarefas.appendChild(novaTarefa);
  tarefa.value = "";
  adicionarBotaoExcluir(novaTarefa);
  }
});
