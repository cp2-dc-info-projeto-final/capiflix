<script>
  import "./app.css";
  import axios from "axios";

  let novoNome = "";
  let novoEmail = "";
  let nomeAtual = "";
  let emailAtual = "";
  let error = null;
  let successMessage = null;
  let usuarioLogado = null;
  let carregando = true; // Definindo a variável carregando
  let conteudoAtivo = "perfil"; // Variável para controle do conteúdo ativo

  import Menu from "./Menu.svelte";

  const API_BASE_URL = "http://localhost:3000";

  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL,
    responseType: "json",
    headers: {
      Accept: "application/json",
    },
  });



  function editarNome() {
    conteudoAtivo = "editarPerfil";
  }

  function editarSenha() {
    conteudoAtivo = "editarPerfil";
  }


  // Carregar dados do usuário logado
  const carregarUsuario = async () => {
    try {
      const res = await axiosInstance.get(API_BASE_URL + "/usuarios/me");
      if (res?.data?.usuario) {
        usuarioLogado = res.data.usuario;
        nomeAtual = usuarioLogado.nome;
        emailAtual = usuarioLogado.email;
        novoNome = nomeAtual;
        novoEmail = emailAtual;
        error = null;
      } else {
        throw new Error("Nenhum dado encontrado.");
      }
    } catch (err) {
      error = "Erro ao buscar dados: " + (err.response?.data?.message || err.message);
      console.error(err);
      usuarioLogado = null;
    } finally {
      carregando = false; // Finaliza o carregamento, seja com sucesso ou erro
    }
  };

  // Editar o nome do usuario 
  
  const editarNomeUsuario = async () => {
  console.log(usuarioLogado);

  if (!usuarioLogado?.idUsuario) {
    alert("Dados do usuário inválidos. Tente novamente.");
    return;
  }

  try {
    const response = await axiosInstance.put(
      `${API_BASE_URL}/usuarios/mudar-nome/${usuarioLogado.idUsuario}`,
      { nome: novoNome } // Ajustando a chave enviada no body para "nome"
    );

    successMessage = "Nome alterado com sucesso!";
    error = null;
    console.log(response.data);
    await carregarUsuario();
  } catch (error) {
    error = error.response?.data?.message || error.message;
    console.error("Erro ao editar nome:", error);
    alert(`Erro ao editar nome: ${error}`);
  }
};


  // Carregar usuário na inicialização do componente
  carregarUsuario();
</script>

<main>
  <Menu></Menu>

  <div  class="mt-5 "style="background-color: azure; width: 25%; height: 500px; border-color: aquamarine; border-style: solid;">

    <img style="width:30%;" src="imagens/capivara_foto_de_perfil.png" alt="foto de perfil" class="img-fluid"/>
    <h2>Bem-vindo: {nomeAtual}</h2>

    <div>
      <button class="mb-3 mt-4 btn btn-primary" type="button" on:click={editarNome}>
        Editar Nome
      </button>
    </div>
    <div>
      <button class="mb-3 mt-4 btn btn-primary" type="button" on:click={editarSenha}>
        Editar Senha
      </button>
    </div>
    <div>
      <button class="mb-3 mt-4 btn btn-primary" type="button" on:click={editarNome}>
        Editar Email
      </button>
    </div>

    <!-- Exibição do conteúdo -->
    <div class="mt-4" id="div_de_perfil_2" style="background-color: azure; width: 50%; height: 500px; border-color: aquamarine; border-style: solid;">
      {#if conteudoAtivo === "perfil"}
        <h3>Aqui estão seus filmes curtidos...</h3>
        <ul>
          <li>Filme 1</li>
          <li>Filme 2</li>
          <li>Filme 3</li>
        </ul>

        {#if successMessage}
          <div class="alert alert-success mt-3">{successMessage}</div>
        {/if}

        {#if error}
          <div class="alert alert-danger mt-3">{error}</div>
        {/if}
      {/if}

      {#if conteudoAtivo === "editarPerfil"}
        <div>
          {#if carregando}
            <p>Carregando dados do usuário...</p>
          {:else if usuarioLogado && usuarioLogado.nome}
            <h3>Editar dados do usuário</h3>
            <form on:submit|preventDefault={editarNomeUsuario}>
              <div class="form-group">
                <label for="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  bind:value={novoNome}
                  class="form-control"
                />
              </div>
              <button type="submit" class="btn btn-success">Salvar</button>
            </form>
          {:else}
            <p>Dados do usuário não encontrados.</p>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</main>
