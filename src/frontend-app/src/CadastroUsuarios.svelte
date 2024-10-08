<script>
    // import { onMount } from 'svelte';
    import "./app.css"
    import axios from "axios";
    let nome = "";
    let email = "";
    let senha = "";
    let conf_senha = "";
    let error = null;
    let resultado = null;
    const api_base_url = "http://localhost:3000";
  
    const cadastrarUsuario = async () => {
      try {
        let res = await axios.post(
          api_base_url + "/usuarios/novo",
          {
            nome,
            email,
            senha,
            conf_senha,
          },
          {
            headers: {
              Accept: "application/json",
            },
          },
        );
        resultado = res.data;
        error = null; // Limpa o erro se a requisição for bem-sucedida
        // recarrega lista de usuários apresentada
      } catch (err) {
        error =
          "Erro ao enviar dados: " + err.response?.data?.message || err.message;
        resultado = null; // Limpa o resultado em caso de erro
      }
      
    };
  </script>

  <main class=".bg-primário-sutil">

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      <div class="card">
      <div class="container text-center mt-3">
        <div class="d-flex justify-content-center align-items-center">
            <h1 style="font-size: 90px;">Capflix</h1>
        </div>
      </div>
        <div class="mt-5 container" id="div_de_boasvindas" style="background-color:Bisque; border-color:blue; border-radius: 28px; width:40%">
          <div style="background-color:aquamarine;">
            <h1>Bem-vindo</h1>
          </div>
                <form class="row g-1 needs-validation mt-1" id="formulario" on:submit|preventDefault={cadastrarUsuario}>
                    <div class="form-floating mt-5 mb-3" style="width: 80%; left:10%;">
                        <input class=" shadow p-3 bg-body rounded form-control" id="nome" placeholder="Nome" name="nome" required bind:value={nome}>
                        <label for="nome">Nome</label>
                    </div>
                    <div class="form-floating mt-1 mb-3" style="width: 80%; left:10%;" >
                        <input type="text" class="form-control shadow p-3 bg-body rounded " id="email" placeholder="Email" name="email" required  bind:value={email}>
                        <label for="email">Email</label>
                    </div>
                    <div class="form-floating mt-1 mb-3" style="width: 80%; left:10%;">
                        <input type="password" class="form-control shadow p-3 bg-body rounded " id="senha" placeholder="Enter password" name="pswd" required  bind:value={senha}>
                        <label for="senha">Senha</label>
                    </div>
                    <div class="form-floating mt-1 mb-3" style="width: 80%; left:10%;">
                      <input type="password" class="form-control shadow p-3 bg-body rounded " id="confirma_senha" placeholder="Enter password" name="pswd" required bind:value={conf_senha}>
                      <label for="confirma_senha">confirmar senha</label>
                    </div>
                      <button id="button_enviar" type="submit" class="btn btn-dark mt-3"  style="--bs-btn-padding-y: .70rem; --bs-btn-padding-x: .70rem; --bs-btn-font-size: .90rem; margin-bottom:60px; width:80%; margin-left:10%;">Enviar</button>
                      <p id="message"></p>
                      <a href="./administrador.html">clique aqui</a>
                      <a href="./menu.html">clique para ver o menu</a>
                  </form>
              </div>
            </div>
            <div class="form">
              <form on:submit|preventDefault={cadastrarUsuario}>
              {#if error}
                <p style="color: red;">{error}</p>
              {/if}
              {#if resultado && resultado.message}
                <p style="color: green;">{resultado.message}</p>
               {/if}
              </form>
            </div>
            
        
  </main>
