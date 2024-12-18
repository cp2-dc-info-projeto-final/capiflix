<script>
    // import { onMount } from 'svelte';
    import "./app.css"
    import axios from "axios";
    let titulo = "";
    let descricao = "";
    let ano = "";
    let generos = "";
    let id_genero = "";
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
    error =
      "Erro ao enviar dados: " + (err.response?.data?.message || err.message);
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
        generos = res.data.generos;
        error = null; // Limpa o erro se a requisição for bem-sucedida
      } catch (err) {
        error = "Erro ao buscar dados: " + err.response?.data?.message || err.message;;
        console.error(err);
        generos = null; // Limpa o resultado em caso de erro
      }
    };

    carregarGeneros()
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
                <form class="row g-3 needs-validation mt-1" id="formulario"  on:submit|preventDefault={cadastrarFilme}>
                    <div class="form-floating mt-4 mb-1" style="width: 100%;">
                        <input class=" form-control bg-body rounded" id="titulo" placeholder="Titulo" name="titulo" required bind:value={titulo}>
                        <label for="titulo">Titulo</label>
                    </div>
                    <div class="form-floating mt-2 mb-2" style="width: 100%;" >
                        <input class="form-control bg-body rounded " id="descricao" placeholder="Descricao" name="descricao" required  bind:value={descricao}>
                        <label for="email">Descrição</label>
                    </div>
                    <div class="form-floating mt-2 mb-2" style="width: 100%;">
                        <input type="date" class="form-control  bg-body rounded" id="ano" placeholder="Ano" name="ano" required  bind:value={ano}>
                        <label for="ano">Ano</label>
                    </div>
                    <div class="form-floating mt-2 mb-2" style="width: 100%;">
                      <input type="number" class="form-control  bg-body rounded" id="classificacao" placeholder="classificação" name="classificacao" required bind:value={classificacao}>
                      <label for="classificacao">classificação</label>
                    </div>
                      <select class="form-select form-select-lg mb-5 " aria-label="Large select example" name="id_genero" required bind:value={id_genero}>
                        {#each generos as genero}
                        <option value="{genero.id_genero}">{genero.nome}</option>
                        {/each}
                      </select>
                      <div class="form-floating mt-2 mb-2" style="width: 100%;">
                        <input type="file" class="form-control bg-body rounded" id="imagem" name="imagem" accept="image/*" on:change={e => imagemFile = e.target.files[0]}>
                        <label for="imagem">capa</label>
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
