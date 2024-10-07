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
    let paginaatual = "home";
    let usuarios = null;
    let colunas_usuarios = null;
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
        <div style="width:35%;" class="form-floating mb-5 mt-3 position-flex" id="div_cadastro">
            <div class="mb-4 mt-5">
              <div  id="div_de_boasvindas" style="width: 90%;">
                <div style="display:flex; margin-bottom: 2%;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16" style="margin-left:32%">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                  </svg>
              </div>
                <form class="row g-1 needs-validation" id="formulario" on:submit|preventDefault={cadastrarUsuario}>
                    <div class="form-floating mt-1 mb-3">
                        <input type="text" class=" shadow p-3 bg-body rounded form-control" id="nome" placeholder="Nome" name="nome" required bind:value={nome}>
                        <label for="nome">Nome</label>
                    </div>
                    <div class="form-floating mt-1 mb-3">
                        <input type="text" class="form-control shadow p-3 bg-body rounded " id="email" placeholder="Email" name="email" required  bind:value={email}>
                        <label for="email">Email</label>
                    </div>
                    <div class="form-floating mt-1 mb-3">
                        <input type="password" class="form-control shadow p-3 bg-body rounded " id="senha" placeholder="Enter password" name="pswd" required  bind:value={senha}>
                        <label for="senha">Senha</label>
                    </div>
                    <div class="form-floating mt-1 mb-3">
                      <input type="password" class="form-control shadow p-3 bg-body rounded " id="confirma_senha" placeholder="Enter password" name="pswd" required bind:value={conf_senha}>
                      <label for="confirma_senha">confirmar senha</label>
                  </div>
                      <button id="button_emviar"type="submit" class="btn btn-dark"  style="--bs-btn-padding-y: .70rem; --bs-btn-padding-x: .70rem; --bs-btn-font-size: .90rem; margin-bottom: 30px;">Enviar</button>
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
