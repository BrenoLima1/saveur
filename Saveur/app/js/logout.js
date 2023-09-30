document.addEventListener('DOMContentLoaded', async (event)=>{
    localStorage.clear();
    sair();
});

// async
 function sair(){
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

          expirarCookie();
          // return await resposta.json();
        })
        .catch((e) => {
          let output = document.querySelector("output");
          output.innerText = "Erro: " + e.message;
        });
}


function expirarCookie() {
          // Define a data de expiração para uma data passada
          let dataExpiracao = new Date('2000-01-01').toUTCString();

          // Define o valor do cookie para uma string vazia
          let cookieString = 'saveur=; expires=' + dataExpiracao + '; path=/';

          // Define o cookie com a data de expiração passada
          document.cookie = cookieString;

}
