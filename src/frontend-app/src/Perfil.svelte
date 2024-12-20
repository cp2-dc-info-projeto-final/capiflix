<script>
  import "./app.css";
  import axios from "axios";

  let novoNome = "";
  let nomeAtual = "";
  let emailAtual = "";
  let novoEmail = "";
  let senhaAtual = "";
  let novaSenha = "";
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

  const logout = async () => {
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/logout`);
      if (response.status === 200) {
        successMessage = "Logout realizado com sucesso!";
        error = null;
        usuarioLogado = null; // Limpar os dados do usuário logado
        console.log(response.data);
        window.location.href = './login.html';
      }
    } catch (err) {
      error = err.response?.data?.message || err.message;
      console.error("Erro ao realizar logout:", error);
    }
  };

  function editarNome() {
    conteudoAtivo = "editarPerfil";
  }

  function editarSenha() {
    conteudoAtivo = "editarSenha";
  }

  function editarEmail() {
    conteudoAtivo = "editarEmail";
  }

  // Carregar dados do usuário logado
  const carregarUsuario = async () => {
    try {
      const res = await axiosInstance.get(API_BASE_URL + "/usuarios/me");
      console.log("Resposta da API:", res);
      if (res?.data?.usuario) {
        usuarioLogado = res.data.usuario;
        console.log("Usuário logado:", usuarioLogado);
        nomeAtual = usuarioLogado.nome;
        emailAtual = usuarioLogado.email;
        senhaAtual = usuarioLogado.senha;
        novoNome = nomeAtual;
        novoEmail = emailAtual;
        novaSenha = senhaAtual;
        error = null;
      } else {
        throw new Error("Nenhum dado encontrado.");
      }
    } catch (err) {
      error = "Erro ao buscar dados: " + (err.response?.data?.message || err.message);
      console.error(err);
      usuarioLogado = null;
    } finally {
      carregando = false;
    }
  };

  // Editar o nome do usuario
  const editarNomeUsuario = async () => {
    if (!usuarioLogado?.idUsuario) {
      alert("Dados do usuário inválidos. Tente novamente.");
      return;
    }

    try {
      const response = await axiosInstance.put(
        `${API_BASE_URL}/usuarios/mudar-nome/${usuarioLogado.idUsuario}`,
        { nome: novoNome }
      );

      successMessage = "Nome alterado com sucesso!";
      error = null;
      alert(successMessage); // Exibe o alert de sucesso
      await carregarUsuario();
    } catch (error) {
      error = error.response?.data?.message || error.message;
      alert(`Erro ao editar nome: ${error}`);
    }
  };

  // Editar a senha do usuario
  const editarSenhaUsuario = async () => {
    if (!usuarioLogado?.idUsuario) {
      alert("Dados do usuário inválidos. Tente novamente.");
      return;
    }

    if (!senhaAtual || !novaSenha) {
      error = "Senha atual e nova senha são obrigatórias!";
      return;
    }

    try {
      const response = await axiosInstance.put(
        `${API_BASE_URL}/usuarios/mudar-senha/${usuarioLogado.idUsuario}`,
        { senhaAtual, novaSenha }
      );

      successMessage = "Senha alterada com sucesso!";
      error = null;
      alert(successMessage); // Exibe o alert de sucesso
      await carregarUsuario();
    } catch (error) {
      error = error.response?.data?.message || error.message;
      alert(`Erro ao editar senha: ${error}`);
    }
  };

  // Editar o email do usuario
  const editarEmailUsuario = async () => {
    if (!usuarioLogado?.idUsuario) {
      alert("Dados do usuário inválidos. Tente novamente.");
      return;
    }

    if (!novoEmail) {
      error = "O novo e-mail é obrigatório!";
      return;
    }

    try {
      const response = await axiosInstance.put(
        `${API_BASE_URL}/usuarios/mudar-email/${usuarioLogado.idUsuario}`,
        { email: novoEmail }
      );

      successMessage = "E-mail alterado com sucesso!";
      error = null;
      alert(successMessage); // Exibe o alert de sucesso
      await carregarUsuario();
    } catch (error) {
      error = error.response?.data?.message || error.message;
      alert(`Erro ao editar e-mail: ${error}`);
    }
  };

  carregarUsuario();
</script>

<main>
  <Menu></Menu>

  <div class="container mt-5">
    <div class="row">
      <!-- Div do Perfil -->
      <div class="col-md-6 mb-4" style="background-color: azure; border-color: aquamarine; border-style: solid; padding: 20px;">
        <img style="width:30%;" src="imagens/capivara_foto_de_perfil.png" alt="foto de perfil" class="img-fluid" />
        {#if usuarioLogado}
          <h2>Bem-vindo: {nomeAtual}</h2>
        {:else}
          <p>Carregando dados do usuário...</p>
        {/if}

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
          <button class="mb-3 mt-4 btn btn-primary" type="button" on:click={editarEmail}>
            Editar Email
          </button>
        </div>
        <div>
          <button class="mb-3 mt-4 btn btn-danger" type="button" on:click={logout}>
            Logout
          </button>
        </div>
      </div>

      <!-- Div do Conteúdo -->
      <div class="col-md-6 mb-4" style="background-color: azure; border-color: aquamarine; border-style: solid; padding: 20px;">
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
                  <input type="text" id="nome" bind:value={novoNome} class="form-control" />
                </div>
                <button type="submit" class="btn btn-success">Salvar</button>
              </form>
            {:else}
              <p>Dados do usuário não encontrados.</p>
            {/if}
          </div>
        {:else if conteudoAtivo === "editarSenha"}
          <div>
            {#if carregando}
              <p>Carregando dados do usuário...</p>
            {:else if usuarioLogado && usuarioLogado.nome}
              <h3>Editar dados do usuário</h3>
              <form on:submit|preventDefault={editarSenhaUsuario}>
                <div class="form-group">
                  <p>
                    <label for={`senhaAtual_${usuarioLogado}`}>Senha Atual</label>
                    <input type="password" id={`senhaAtual_${usuarioLogado}`} bind:value={senhaAtual} class="form-control" />
                  </p>
                  <p>
                    <label for={`novaSenha_${usuarioLogado}`}>Nova Senha</label>
                    <input type="password" id={`novaSenha_${usuarioLogado}`} bind:value={novaSenha} class="form-control" />
                  </p>
                </div>
                <button type="submit" class="btn btn-success">Salvar</button>
              </form>
            {:else}
              <p>Dados do usuário não encontrados.</p>
            {/if}
          </div>
        {:else if conteudoAtivo === "editarEmail"}
          <div>
            {#if carregando}
              <p>Carregando dados do usuário...</p>
            {:else if usuarioLogado && usuarioLogado.email}
              <h3>Editar E-mail</h3>
              <form on:submit|preventDefault={editarEmailUsuario}>
                <div class="form-group">
                  <label for="novoEmail">Novo E-mail</label>
                  <input type="email" id="novoEmail" bind:value={novoEmail} class="form-control" placeholder="Digite o novo e-mail" />
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
  </div>
</main>
