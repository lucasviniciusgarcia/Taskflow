const tarefa = document.getElementById("tarefa");
const campoData = document.getElementById("dataTarefa");
const adicionar = document.getElementById("adicionar");
const listaTarefas = document.getElementById("listaTarefas");
const calendario = document.getElementById("calendario");
const dataAtual = new Date();
const tarefasSalvas = localStorage.getItem("tarefas");
console.log(tarefasSalvas);
let mesAtual = dataAtual.getMonth();
let anoAtual = dataAtual.getFullYear();
let diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
let primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const detalhesDia = document.getElementById("detalhesDia");
const mesAno = document.getElementById("mesAno")
const nomesMeses =  [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
  ];
let diaSelecionado = null;
const proximoMes = document.getElementById("proximoMes");
const mesAnterior = document.getElementById("mesAnterior");
mesAnterior.addEventListener("click", function() {
  mesAtual = mesAtual - 1;
  if (mesAtual === -1) {
    mesAtual = 11;
    anoAtual = anoAtual - 1;
  }
  diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
  primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
  renderizarCalendario();
});
proximoMes.addEventListener("click", function() {
mesAtual = mesAtual + 1;
  if (mesAtual === 12) {
    mesAtual = 0;
    anoAtual = anoAtual + 1;
  }
  diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
  primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
  renderizarCalendario();
});
function renderizarCalendario() {
  mesAno.textContent = `${nomesMeses[mesAtual]} ${anoAtual}`
  ;
  calendario.innerHTML = "";
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
    const diaFormatado = dataSelecionada.getDate();
    const mesFormatado = String(dataSelecionada.getMonth() + 1).padStart(2, "0");
    const anoFormatado = dataSelecionada.getFullYear();
    const dataFormatada = `${diaFormatado}/${mesFormatado}/${anoFormatado}`;
    detalhesDia.textContent = dataFormatada;
    const dataParaComparar = `${anoSelecionado}-${mesSelecionado}-${diaSelecionadoFormatado}`;
    const tarefasDosDias = listaTarefas.querySelectorAll(`[data-dia="${dataParaComparar}"]`);
    const tituloTarefas = document.createElement("h3");
    tituloTarefas.textContent = "Tarefas";
    detalhesDia.appendChild(tituloTarefas);
     if (tarefasDosDias.length === 0) {
    const semTarefas = document.createElement("p");
      semTarefas.textContent = "Sem tarefas";
      detalhesDia.appendChild(semTarefas);
    }
    tarefasDosDias.forEach(function(tarefaDoDia) {
      const tarefaDetalhe = document.createElement("li");
      tarefaDetalhe.textContent = tarefaDoDia.textContent;
      detalhesDia.appendChild(tarefaDetalhe);
    });  
  });
  calendario.appendChild(elementoDia);
}
}
renderizarCalendario();
const tarefasExistentes = listaTarefas.querySelectorAll("li");
function alternarStatus(status)  {
  const tarefasSalvas = localStorage.getItem("tarefas");
  let tarefas = JSON.parse(tarefasSalvas);
  const tarefa = status.parentElement;
  const idTarefa = tarefa.getAttribute("data-id");
  const indice = tarefas.findIndex(function(tarefaSalva) {
    return tarefaSalva.id === Number(idTarefa);
  });
if(status.textContent === "Em andamento") {
  status.textContent = "Concluída";
  tarefas[indice].status = "Concluída";
} else {
    status.textContent = "Em andamento";
  tarefas[indice].status = "Em andamento";
  }
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
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
    const tarefasSalvas = localStorage.getItem("tarefas");
    let tarefas = JSON.parse(tarefasSalvas);
    const indice = tarefas.findIndex(function(tarefaSalva) {
return tarefaSalva.texto === tarefa.textContent;   
    });
     tarefas.splice(indice, 1);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
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
  if(textoTarefa !== "" && dataTarefa !== "") {
    let tarefas = [];
    if (tarefasSalvas) {
      tarefas = JSON.parse(tarefasSalvas);
    }
 const novaTarefa = document.createElement("li");
    const novaTarefaDados = {
      id: Date.now(),
texto: textoTarefa,
data: dataTarefa,
status: "Em andamento"
    };
    tarefas.push(novaTarefaDados);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    const tarefaTexto = JSON.stringify(novaTarefaDados);
    novaTarefa.setAttribute("data-dia", dataTarefa);
    novaTarefa.setAttribute("data-id", novaTarefaDados.id);
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
 function carregarTarefas() {
   const tarefasSalvas = localStorage.getItem("tarefas");
   let tarefas = [];
   if (tarefasSalvas) {
   tarefas = JSON.parse(tarefasSalvas);
     tarefas.forEach(function(tarefa) {
const novaTarefa = document.createElement("li");
       novaTarefa.textContent = tarefa.texto;
       novaTarefa.setAttribute("data-id", tarefa.id);
       novaTarefa.setAttribute("data-dia", tarefa.data);
       if (!tarefa.status) {
         tarefa.status = "Em andamento";
       }
       const status = criarStatus();
       status.textContent = tarefa.status;
       novaTarefa.appendChild(status);
       status.addEventListener("click", function() {
         alternarStatus(status);
       });
       listaTarefas.appendChild(novaTarefa);
       adicionarBotaoExcluir(novaTarefa);
     });
   }
    }
carregarTarefas();
