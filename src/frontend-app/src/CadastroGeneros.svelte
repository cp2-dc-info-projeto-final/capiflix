<script>
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
        api_base_url + "/generos/novo",
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
              <h1 style="font-size: 80px;">Cadastrar Genero</h1>
              <img src="imagens/capivara.png" alt="aaa" class="img-fluid" style="max-width: 10%;" id="inverter">
          </div>
      </div>

      <div class="mt-1 container" id="div_de_boasvindas_2">
          <form class="row g-3 needs-validation mt-1" id="formulario" on:submit|preventDefault={cadastrarGenero}>
              <div class="col-12 col-md-8 col-lg-6 mx-auto">
                  <div class="form-floating mt-4 mb-1">
                      <input class="form-control bg-body rounded" id="nome" placeholder="Nome" name="nome" required bind:value={nome}>
                      <label for="nome">Nome</label>
                  </div>
                  
                  <button id="button_enviar" type="submit" class="btn btn-dark mt-2 mb-1 w-100" style="height:50px;">
                      Enviar
                  </button>
              </div>
          </form>
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
