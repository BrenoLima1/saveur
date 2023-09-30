const tbody = document.querySelector("tbody");

async function listarReservas() {
  try {
    const tbody = document.querySelector("tbody");
    const resposta = await fetch(
      "/saveur/api/reservas",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resposta.status == 401) {
      location.href =
        "/saveur/app/html/login.html";
      return;
    }

    if (!resposta.ok) {
      alert("ERRO: " + resposta.status);
      return;
    }

    const dados = await resposta.json();

    // remove todos os elementos filhos da tbody
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }

    for (const f of dados) {
      // cria os elementos tr, td e button
      const tr = document.createElement("tr");
      const tdFuncionarios = document.createElement("td");
      const tdCliente = document.createElement("td");
      const tdMesa = document.createElement("td");
      const tdDia = document.createElement("td");
      const tdHora = document.createElement("td");
      const tdSituacao = document.createElement("td");
      const th = document.createElement("th");
      const button = document.createElement("button");

      // adiciona o texto nos elementos td e button
      tdFuncionarios.innerText = f.funcionarios;
      tdCliente.innerText = f.cliente;
      tdMesa.innerText = f.mesa;
      tdDia.innerText = f.dia.split("-").reverse().join("/");
      tdHora.innerText = f.horario;
      tdSituacao.innerText = f.situacao;
      button.innerText = "CANCELAR RESERVA";

      // adiciona o atributo data aos elementos button
      button.dataset.action = "deletar";
      button.dataset.idReserva = f.idReserva;

      // adiciona o evento de click no botão de cancelar reserva
      button.addEventListener("click", (event) => deletar(event));

      // adiciona os elementos filhos no elemento tr
      tr.appendChild(tdFuncionarios);
      tr.appendChild(tdCliente);
      tr.appendChild(tdMesa);
      tr.appendChild(tdDia);
      tr.appendChild(tdHora);
      tr.appendChild(tdSituacao);
      th.appendChild(button);
      tr.appendChild(th);

      // adiciona o elemento tr na tbody
      tbody.appendChild(tr);
    }
  } catch (e) {
    alert("Falha ao consultar reservas\n" + e.message);
  }
}


// async function listarReservas() {
//   const tbody = document.querySelector("tbody");
//   const resposta = await fetch(
//     "/saveur/api/reservas",
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   )
//     .then(async (resposta) => {
//       if (resposta.status == 401) {
//         location.href =
//           "/saveur/app/html/login.html";
//       }

//       if (!resposta.ok) {
//         alert("ERRO: " + resposta.status);
//         return;
//       }

//       return await resposta.json();
//     })
//     .then(async (reserva) => {
//       // remove todos os elementos filhos da tbody
//       while (tbody.firstChild) {
//         tbody.removeChild(tbody.firstChild);
//       }

//       let dados = await reserva;

//       for (const f of dados) {
//         // cria os elementos tr, td e button
//         const tr = document.createElement("tr");
//         const tdFuncionarios = document.createElement("td");
//         const tdCliente = document.createElement("td");
//         const tdMesa = document.createElement("td");
//         const tdDia = document.createElement("td");
//         const tdHora = document.createElement("td");
//         const tdSituacao = document.createElement("td");
//         const th = document.createElement("th");
//         const button = document.createElement("button");

//         // adiciona o texto nos elementos td e button
//         tdFuncionarios.innerText = f.funcionarios;
//         tdCliente.innerText = f.cliente;
//         tdMesa.innerText = f.mesa;
//         tdDia.innerText = f.dia.split("-").reverse().join("/");
//         tdHora.innerText = f.horario;
//         tdSituacao.innerText = f.situacao;
//         button.innerText = "CANCELAR RESERVA";

//         // adiciona o atributo data aos elementos button
//         button.dataset.action = "deletar";
//         button.dataset.idReserva = f.idReserva;

//         // adiciona o evento de click no botão de cancelar reserva
//         button.addEventListener("click", (event) => deletar(event));

//         // adiciona os elementos filhos no elemento tr
//         tr.appendChild(tdFuncionarios);
//         tr.appendChild(tdCliente);
//         tr.appendChild(tdMesa);
//         tr.appendChild(tdDia);
//         tr.appendChild(tdHora);
//         tr.appendChild(tdSituacao);
//         th.appendChild(button);
//         tr.appendChild(th);

//         // adiciona o elemento tr na tbody
//         tbody.appendChild(tr);
//       }
//     })
//     .catch((e) => {
//       alert("Falha ao consultar reservas\n" + e.message);
//     });
// }

async function deletar(event) {
  const tr = event.target.closest("tr");
  if (confirm(`Deseja cancelar esta reserva?`)) {
    const id = event.target.dataset.idReserva;

    if (!id) {
      return;
    }

    await fetch("/saveur/api/reserva/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then(async (resposta) => {
        if (!resposta.ok) {
          alert("ERRO ao cancelar reserva: " + resposta.status);
          return;
        }

        alert("Reserva cancelada com sucesso!");
        listarReservas()
      })
      .catch((e) => {
        alert("ERRO ao cancelar reserva: " + e.message);
        return;
      });
  }
}

async function validarSessao(){

  await fetch("/saveur/api/sessao", {
    method: "GET",
  })
    .then(async (resposta) => {

      if (resposta.status == 401) {
        // document.querySelector('table').style.display = 'none';
        document.querySelector('body').style.display = 'none';
        // alert("ERRO: " + resposta.status + '\nNão autorizado');
        location.href = "/saveur/app/html/login.html";
        return;
      }else if (!resposta.ok) {
        // document.querySelector('table').style.display = 'none';
        // document.querySelector('body').style.display = 'none';
        alert("ERRO ao listar reservas: " + resposta.status);
        return;
      }
    })
    .catch((e) => {
      alert("ERRO ao cancelar reserva: " + e.message);
      return;
    });
}

document.addEventListener("DOMContentLoaded", (event)=> {
  // document.querySelector('body').style.display = 'none'
  validarSessao();
  // document.querySelector('body').style.display = ''
  listarReservas();
});
