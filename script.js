const tarefa = document.getElementById("tarefa");
const adicionar = document.getElementById("adicionar");
const listaTarefas = document.getElementById("listaTarefas");
const tarefasExistentes = listaTarefas.querySelectorAll("li");

tarefasExistentes.forEach(function(tarefaAtual) {
  const status = document.createElement("span");
  
  const botaoExcluir2 = document.createElement("button");
  botaoExcluir2.textContent = "Excluir";
  tarefaAtual.appendChild(botaoExcluir2);
  botaoExcluir2.addEventListener("click", function() {
    tarefaAtual.remove();
    });
  tarefaAtual.addEventListener("click", function(){
    tarefaAtual.classList.toggle("concluida");
  });
});
adicionar.addEventListener("click", function(event) {
  event.preventDefault();
  const textoTarefa = tarefa.value;
  if(textoTarefa !== "") {
 const novaTarefa = document.createElement("li");
    const status =document.createElement("span");
    status.textContent = "Em andamento";
novaTarefa.textContent = textoTarefa;
    novaTarefa.appendChild(status);
    status.addEventListener("click", function(){
      if(status.textContent === "Em andamento") {
        status.textContent = "Concluída";
      }
      else {
    status.textContent = "Em andamento";
      }
      });
  listaTarefas.appendChild(novaTarefa);
  tarefa.value = "";
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    novaTarefa.appendChild(botaoExcluir);
    botaoExcluir.addEventListener("click", function() {
      novaTarefa.remove();
  });
  }
});
