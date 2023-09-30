document.addEventListener("DOMContentLoaded", (event)=> {
  validarSessao();
});


document.getElementById("reservar").addEventListener("click", async (event) => {
  event.preventDefault();
  reserva();
});

async function reserva(event) {
  const id = localStorage.getItem("id");
  const idFuncionario = document.getElementById("id");

  idFuncionario.value = id;

  let formData = new FormData(document.querySelector("form"));
  for (const input of document.querySelectorAll("input")) {
    if (!input.value) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }
  }

  let data = new Date(document.querySelector('input[type=date]').value);
  if(confirmarReserva(obterDiaDaSemana(data)))

  fetch("/saveur/api/reservas", {
    method: "POST",
    body: formData,
  })
    .then(async (resposta) => {
      if (!resposta.ok) {
        const output = document.querySelector("output");
        output.innerText = "Erro: Reserva já existente para outro cliente.";
        alert("Reserva já existente .");
      } else {
        alert("Reserva cadastrada com sucesso!");
        document.querySelector("form").reset();
      }
    })
    .catch((e) => {
      const output = document.querySelector("output");
      output.innerText = "Erro: " + e.message;
    });
}


function obterDiaDaSemana(data){
  let diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  let diaDasemana = diasDaSemana[data.getUTCDay()];

  return diaDasemana;
}

function confirmarReserva(diaDasemana){
  const mesa = document.getElementById('mesa').value;
  const horario = document.getElementById('horario').value;
  const diaDaSemanaAtual = obterDiaDaSemana(new Date());
  const inputValue = document.getElementById('dia').value;
  const inputDate = new Date(inputValue);
  const dataAtual = new Date();
  const horarioAtual = dataAtual.getHours() + ':' + dataAtual.getMinutes();



  const ano = dataAtual.getFullYear();
  let mes = dataAtual.getMonth() + 1;
  let dia = dataAtual.getDate();

  if (mes < 10) {
    mes = '0' + mes;
  }

  if (dia < 10) {
    dia = '0' + dia;
  }

  const dataFormatada = ano + '-' + mes + '-' + dia;

  if(horarioAtual > horario && inputValue == dataFormatada){
    alert('Horário inválido');
    return false;
  }

  dataAtual.setDate(dataAtual.getDate() - 2);

  if(diaDaSemanaAtual == 'Segunda-feira' || diaDaSemanaAtual == 'Terça-feira' || diaDaSemanaAtual == 'Quarta-feira'){
    alert('A marcação de reservas somente pode ocorrer de quinta-feira a domingo');
    return false;
  }

  if(inputDate.getTime() < dataAtual.getTime()){
    alert("Data inválida.");
    return false;
  }

  return (diaDasemana !== 'Sábado' || diaDasemana !== 'Domingo') && mesa > 7
  ? alert('As mesas de número maior que 7 não podem ser utilizadas entre segunda-feira e sexta-feira.')
  : (diaDasemana == 'Segunda-feira' || diaDasemana == 'Terça-feira' || diaDasemana == 'Quarta-feira')
  ? horario < '11:00' || horario > '13:00'
  ? alert('Entre segunda e quarta-feira, o hoário de funcionamento é somente entre 11:00 e 15:00')
  : true
  : horario < '11:00' || horario > '20:00'
  ? alert('Entre quinta-feira e domingo, o hoário de funcionamento é somente entre 11:00 e 22:00')
  : true;
}

async function validarSessao(){

  await fetch("/saveur/api/sessao", {
    method: "GET",
  })
    .then(async (resposta) => {

      if (resposta.status == 401) {
        document.querySelector('body').style.display = 'none';
        location.href = "/saveur/app/html/login.html";
      }else if (!resposta.ok) {
        document.querySelector('body').style.display = 'none';
        alert("ERRO : " + resposta.status + '\nNão autorizado');
        return;
      }
    })
    .catch((e) => {
      document.querySelector('body').style.display = 'none';
      alert("ERRO : " + e.message);
      location.href = "/saveur/app/html/login.html";
      return;
    });
}
