const tarefa = document.getElementById("tarefa");
const campoData = document.getElementById("dataTarefa");
const adicionar = document.getElementById("adicionar");
const listaTarefas = document.getElementById("listaTarefas");
const calendario = document.getElementById("calendario");
const dataAtual = new Date();
const mesAtual = dataAtual.getMonth();
const anoAtual = dataAtual.getFullYear();
const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const detalhesDia = document.getElementById("detalhesDia");
let diaSelecionado = null;
const cabecalhoDias = document.createElement("div");
calendario.appendChild(cabecalhoDias);
for (let dia of diasSemana) {
  const elementoDia = document.createElement("span");
  elementoDia.textContent = dia;
  cabecalhoDias.appendChild(elementoDia);
}
for (let contador  = 0; contador < primeiroDia; contador++) {
  const elementoVazio = document.createElement("span");
  calendario.appendChild(elementoVazio);
}
for (let dia = 1; dia <= diasNoMes; dia++) {
  const elementoDia = document.createElement("span");
  elementoDia.textContent = dia;
  elementoDia.addEventListener("click", function() {
    console.log(dia);
    diaSelecionado = dia;
    const dataSelecionada = new Date(anoAtual, mesAtual, dia);
    const anoSelecionado = dataSelecionada.getFullYear();
    const mesSelecionado = String(dataSelecionada.getMonth() + 1).padStart(2, "0");
    const diaSelecionadoFormatado = String(dataSelecionada.getDate()).padStart(2, "0");
    const dataParaComparar = `${anoSelecionado}-${mesSelecionado}-${diaSelecionadoFormatado}`;
    const tarefasDosDias = listaTarefas.querySelectorAll(`[data-dia="${dataParaComparar}"]`);
    tarefasDosDias.forEach(function(tarefaDoDia) {
      const tarefaDetalhe = document.createElement("li");
      tarefaDetalhe.textContent = tarefaDoDia.textContent;
      detalhesDia.appendChild(tarefaDetalhe);
    });
    const diaFormatado = dataSelecionada.getDate();
    const mesFormatado = String(dataSelecionada.getMonth() + 1).padStart(2, "0");
    const anoFormatado = dataSelecionada.getFullYear();
    const dataFormatada = `${diaFormatado}/${mesFormatado}/${anoFormatado}`;
    detalhesDia.textContent = dataFormatada;
    const tituloTarefas = document.createElement("h3");
    tituloTarefas.textContent = "Tarefas";
    detalhesDia.appendChild(tituloTarefas);
  });
  calendario.appendChild(elementoDia);
}
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
  const dataTarefa = campoData.value;
  if(textoTarefa !== "") {
 const novaTarefa = document.createElement("li");
    novaTarefa.setAttribute("data-dia", dataTarefa);
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
