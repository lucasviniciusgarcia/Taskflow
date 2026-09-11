const tarefa = document.getElementById("tarefa");
const adicionar = document.getElementById("adicionar");
const listaTarefas = document.getElementById("listaTarefas");

adicionar.addEventListener("click", function(event) {
  event.preventDefault();
  const textoTarefa = tarefa.value;
  if(textoTarefa !== "") {
 const novaTarefa = document.createElement("li");
novaTarefa.textContent = textoTarefa;
  listaTarefas.appendChild(novaTarefa);
  tarefa.value = "";
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    novaTarefa.appendChild(botaoExcluir);
  }
});
