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
    import Menu from "./Menu.svelte"
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
      <Menu></Menu>
      <div class="card">
      <div class="container text-center mt-1">
        <div class="d-flex justify-content-center align-items-center" style="font-family:American Typewriter, serif;">
            <h1 style="font-size: 140px;">Capflix</h1>
            <img src="imagens/capivara.png" alt="" style="width: 10%;" id="inverter">
        </div>
      </div>
        <div class="mt-4 container" id="div_de_boasvindas" style="width:30%;">
                <form class="row g-3 needs-validation mt-1" id="formulario"  on:submit|preventDefault={cadastrarUsuario}>
                    <div class="form-floating mt-4 mb-1" style="width: 100%;">
                        <input class=" form-control bg-body rounded" id="nome" placeholder="Nome" name="nome" required bind:value={nome}>
                        <label for="nome">Nome</label>
                    </div>
                    <div class="form-floating mt-2 mb-2" style="width: 100%;" >
                        <input class="form-control bg-body rounded " id="email" placeholder="Email" name="email" required  bind:value={email}>
                        <label for="email">Email</label>
                    </div>
                    <div class="form-floating mt-2 mb-2" style="width: 100%;">
                        <input type="password" class="form-control  bg-body rounded" id="senha" placeholder="Enter password" name="pswd" required  bind:value={senha}>
                        <label for="senha">Senha</label>
                    </div>
                    <div class="form-floating mt-2 mb-5" style="width: 100%;">
                      <input type="password" class="form-control  bg-body rounded" id="confirma_senha" placeholder="Enter password" name="pswd" required bind:value={conf_senha}>
                      <label for="confirma_senha">Confirmar senha</label>
                    </div>
                      <button id="button_enviar" type="submit" class="btn btn-dark mt-2 mb-1"  style="--bs-btn-padding-y: .10rem; --bs-btn-padding-x: .70rem; --bs-btn-font-size: .90rem; margin-bottom:50px; width:100%; height:50px;">Enviar</button>
                  </form>
                    <p id="message"></p>
                    <a href="./administrador.html">clique aqui</a><br>
                    <a href="./menu.html">clique para ver o menu</a><br>
                    <a href="./login.html">clique aqui para ver o login</a>
                    <a href="./cadastroFilmes.html">filmes</a><br>
              </div>
            <div class="form">
              <form on:submit|preventDefault={cadastrarUsuario}>
                {#if resultado && resultado.status === "success"} { 
                    window.location.href = "./index.html"}
                {/if}
              </form>
            </div>
            
        
  </main>
