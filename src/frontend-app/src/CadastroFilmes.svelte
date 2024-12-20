<script>
  import "./app.css"
  import axios from "axios";
  let titulo = "";
  let descricao = "";
  let ano = "";
  let generos = [];
  let id_genero = null;
  let imagemFile = null;
  let classificacao = null;
  let resultado = null;
  let error = null;
  import Menu from "./Menu.svelte"
  const API_BASE_URL = "http://localhost:3000";

  const axiosInstance = axios.create({
      withCredentials: true,
      baseURL: API_BASE_URL,
      responseType: "json",
      headers: {
        Accept: "application/json",
      }
  });

  const cadastrarFilme = async () => {
      const formData = new FormData();
      console.log(titulo, descricao, ano, classificacao, id_genero); // Verifique os valores antes de enviar
      formData.append("titulo", titulo);
      formData.append("descricao", descricao);
      formData.append("ano", ano);
      formData.append("classificacao", classificacao);
      formData.append("id_genero", id_genero);
      formData.append("imagem", imagemFile);

      try {
          let res = await axios.post(API_BASE_URL + "/filmes/novo", formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
                  Accept: "application/json",
              },
          });

          resultado = res.data;
          error = null;
      } catch (err) {
          error = "Erro ao enviar dados: " + (err.response?.data?.message || err.message);
          resultado = null;
      }
  };

  /** FUNÇÃO PARA CARREGAR GÊNEROS */
  const carregarGeneros = async () => {
      try {
          let res = await axiosInstance.get(API_BASE_URL + "/generos", {
              responseType: "json",
              headers: {
                  Accept: "application/json",
              },
          });
          console.log('Resposta da API /generos:', res.data);
          generos = res.data.generos;
          error = null; // Limpa o erro se a requisição for bem-sucedida
      } catch (err) {
          error = "Erro ao buscar dados: " + err.response?.data?.message || err.message;
          console.error(err);
          generos = null; // Limpa o resultado em caso de erro
      }
  };

  const handleFileChange = (e) => {
      const target = e.target;
      if (target && target.files) {
          imagemFile = target.files[0];
      }
  };
  carregarGeneros()
</script>

<main class=".bg-primário-sutil">
  <Menu></Menu>

  <div class="card">
      <div class="container text-center mt-1">
          <div class="d-flex justify-content-center align-items-center" style="font-family:American Typewriter, serif;">
              <h1 style="font-size: 140px;">Capflix</h1>
              <img src="imagens/capivara.png" alt="aaa" class="img-fluid" style="max-width: 10%;" id="inverter">
          </div>
      </div>

      <div class="mt-1 container" id="div_de_boasvindas">
          <form class="row g-3 needs-validation mt-1" id="formulario" on:submit|preventDefault={cadastrarFilme}>
              <div class="col-12 col-md-8 col-lg-6 mx-auto">
                  <div class="form-floating mt-4 mb-1">
                      <input class="form-control bg-body rounded" id="titulo" placeholder="Titulo" name="titulo" required bind:value={titulo}>
                      <label for="titulo">Titulo</label>
                  </div>

                  <div class="form-floating mt-2 mb-2">
                      <input class="form-control bg-body rounded" id="descricao" placeholder="Descricao" name="descricao" required bind:value={descricao}>
                      <label for="email">Descrição</label>
                  </div>

                  <div class="form-floating mt-2 mb-2">
                      <input type="date" class="form-control bg-body rounded" id="ano" placeholder="Ano" name="ano" required bind:value={ano}>
                      <label for="ano">Ano</label>
                  </div>

                  <div class="form-floating mt-2 mb-2">
                      <input type="number" class="form-control bg-body rounded" id="classificacao" placeholder="Classificação" name="classificacao" required bind:value={classificacao}>
                      <label for="classificacao">Classificação</label>
                  </div>

                  <div class="form-floating mt-2 mb-2">
                      <select class="form-select form-select-lg mb-5" aria-label="Gênero" name="id_genero" required bind:value={id_genero}>
                          {#each generos as genero}
                              <option value="{genero.id_genero}">{genero.nome}</option>
                          {/each}
                      </select>
                  </div>

                  <div class="form-floating mt-2 mb-2">
                      <input type="file" class="form-control bg-body rounded" id="imagem" name="imagem" accept="image/*" on:change={handleFileChange}>
                      <label for="imagem">Capa</label>
                  </div>

                  <button id="button_enviar" type="submit" class="btn btn-dark mt-2 mb-1 w-100" style="height:50px;">
                      Enviar
                  </button>
              </div>
          </form>
      </div>

      <div class="form">
          {#if error}
              <p style="color: red;">{error}</p>
          {/if}
          {#if resultado && resultado.message}
              <p style="color: green;">{resultado.message}</p>
          {/if}
      </div>
  </div>
</main>
