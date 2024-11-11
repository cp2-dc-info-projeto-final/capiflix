<script>
    // import { onMount } from 'svelte';
    import "./app.css"
    import axios from "axios";
    let nome = "";
    let id_genero = "";
    let resultado = null;
    let error = null;
    import Menu from "./Menu.svelte"
    const api_base_url = "http://localhost:3000";
  
    const cadastrarGenero = async () => {
      try {
        let res = await axios.post(
          api_base_url + "/genero/novo",
          {
            nome,
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
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  
      <div class="card">
      <div class="container text-center mt-1">
        <div class="d-flex justify-content-center align-items-center" style="font-family:American Typewriter, serif;">
            <h1 style="font-size: 140px;">Capflix</h1>
            <img src="imagens/capivara.png" alt="aaa" style="width: 10%;" id="inverter">
        </div>
      </div>
        <div class="mt-1 container" id="div_de_boasvindas" style="width:30%;">
                <form class="row g-3 needs-validation mt-1" id="formulario"  on:submit|preventDefault={cadastrarGenero}>
                    <div class="form-floating mt-4 mb-1" style="width: 100%;">
                        <input class=" form-control bg-body rounded" id="nome" placeholder="nome" name="nome" required bind:value={nome}>
                        <label for="nome">nome</label>
                    </div>
                      <button id="button_enviar" type="submit" class="btn btn-dark mt-2 mb-1"  style="--bs-btn-padding-y: .10rem; --bs-btn-padding-x: .70rem; --bs-btn-font-size: .90rem; margin-bottom:50px; width:100%; height:50px;">Enviar</button>
                  </form>
                    <p id="message"></p>
                    <a href="./administrador.html">clique aqui</a><br>
                    <a href="./menu.html">clique para ver o menu</a><br>
                    <a href="./login.html">clique aqui para ver o login</a>
              </div>
            </div>
            <div class="form">           
              {#if error}
                <p style="color: red;">{error}</p>
              {/if}
              {#if resultado && resultado.message}
                <p style="color: green;">{resultado.message}</p>
               {/if}      
            </div>
                
  </main>
