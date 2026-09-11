const tarefa = document.getElementById("tarefa");
const adicionar = document.getElementById("adicionar");
const listaTarefas = document.getElementById("listaTarefas");

adicionar.addEventListener("click", function(event) {
  event.preventDefault();
  const textoTarefa = tarefa.value;
 const novaTarefa = document.createElement("li");
novaTarefa.textContent = textoTarefa;
  listaTarefas.appendChild(novaTarefa);
  tarefa.value = "Teste!";
});
