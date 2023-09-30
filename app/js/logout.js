document.addEventListener('DOMContentLoaded', async (event)=>{
    localStorage.clear();
    sair();
});

async function sair(){
    fetch("/saveur/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then(async (resposta) => {
          if (!resposta.ok) {
            document.querySelector("output").innerText =
              "Sessão não finalizada. " + resposta.status;
            return;
          }
          return await resposta.json();
        })
        .catch((e) => {
          let output = document.querySelector("output");
          output.innerText = "Erro: " + e.message;
        });
}
