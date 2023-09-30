document.getElementById("entrar").addEventListener("click", async (event) => {
  event.preventDefault();
  entrar();
});

async function entrar(event) {
  let formData = new FormData(document.querySelector("form"));

  if (
    !document.getElementById("senha").value &&
    !document.getElementById("login").value
  ) {
    document.querySelector("output").innerText = "Insira login e senha.";
    return;
  }

  if (!document.getElementById("login").value) {
    document.querySelector("output").innerText = "Insira seu login.";
    return;
  }

  if (!document.getElementById("senha").value) {
    document.querySelector("output").innerText = "Insira sua senha.";
    return;
  }

  fetch("/saveur/api/login", {
    method: "POST",
    body: formData,
  })
    .then(async (resposta) => {
      if (resposta.status == 401) {
        document.querySelector("output").innerText = "Não autorizado.";
      }
      if (!resposta.ok) {
        document.querySelector("output").innerText =
          "Falha ao realizar login. " + resposta.status;
        return;
      }
      return await resposta.json();
    })
    .then(async (resposta)=>{
      if(resposta){
        localStorage.setItem('id', resposta.id);
        localStorage.setItem('nome', resposta.nome);
        location.href = "index.html";
      }else{
        document.querySelector("output").innerText =
          "Falha ao realizar login. ";
      }
    })
    .catch((e) => {
        document.querySelector("form").reset();
      let output = document.querySelector("output");
      output.innerText = "Erro: " + e.message;
    });
}
