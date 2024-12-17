<script>
  import "./app.css";
  import axios from "axios";

  let novoNome = "";
  let novoEmail = "";
  let nomeAtual = "";
  let emailAtual = "";
  let error = null;
  let usuarioLogado = null;
  const API_BASE_URL = "http://localhost:3000";

  const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_BASE_URL,
  responseType: "json",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem('authToken')}` // Verifique se o token está aqui
  },
});


  let conteudoAtivo = "perfil";

  function editarPerfil() {
    conteudoAtivo = "editarPerfil"; // Alterando para ativar a edição
  }

  const carregarUsuario = async () => {
    try {
      let res = await axiosInstance.get("/usuarios/me");  // Ajuste a URL correta
      if (res.data?.usuario) {
        usuarioLogado = res.data.usuario;
        nomeAtual = usuarioLogado.nome;
        emailAtual = usuarioLogado.email;

        // Inicializando novoNome e novoEmail com os dados carregados
        novoNome = nomeAtual; // Mudança aqui
        novoEmail = emailAtual; // Mudança aqui

        error = null;
      } else {
        throw new Error("Nenhum dado encontrado.");
      }
    } catch (err) {
      error = "Erro ao buscar dados: " + (err.response?.data?.message || err.message);
      console.error(err);
      usuarioLogado = {};
    }
  };

  const atualizarUsuario = async () => {
  try {
    // Adicionando depuração para verificar os dados antes de enviar
    console.log("Enviando atualização de usuário:", { nome: novoNome, email: novoEmail });

    // Enviando requisição para atualizar os dados
    let res = await axiosInstance.put('/usuarios/me', {
      nome: novoNome,
      email: novoEmail,
    });

    // Verifique se a resposta tem o status correto
    if (res.data.status === 'success') {
      usuarioLogado = res.data.usuario;
      alert("Dados atualizados com sucesso!");
    } else {
      throw new Error("Erro ao atualizar usuário.");
    }
  } catch (err) {
    // Exibindo o erro no console para depuração
    console.error("Erro ao atualizar dados:", err.response ? err.response.data : err);
    error = "Erro ao atualizar dados: " + (err.response?.data?.message || err.message);
  }
};

  carregarUsuario();
</script>

<main>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    crossorigin="anonymous"
  />
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    crossorigin="anonymous"
  ></script>

  <div class="card">
    <div class="container text-center mt-1">
      <div class="d-flex justify-content-center align-items-center" style="font-family: American Typewriter, serif;">
        <h1 style="font-size: 100px;">Capflix</h1>
        <img src="imagens/capivara.png" alt="imagem de uma capivara comendo pipoca" style="width: 10%;" id="inverter" />
      </div>
    </div>
  </div>

  <div class="mt-5" style="background-color: azure; width: 25%; height: 700px; border-color: aquamarine; border-style: solid;">
    <img style="width:15%;" src="imagens/capivara_foto_de_perfil.png" alt="foto de perfil" class="img-fluid" />
    <h2>{nomeAtual}</h2>

    <!-- Botões para navegar entre os conteúdos -->
    <div>
      <button class="mb-3 mt-4 btn btn-primary" type="button" on:click={editarPerfil}>Editar Perfil</button>
    </div>

    <!-- Exibição do conteúdo -->
    <div class="mt-4" id="div_de_perfil" style="background-color: azure; width: 50%; height: 700px; border-color: aquamarine; border-style: solid;">
      {#if conteudoAtivo === "perfil"}
        <h3>Aqui estão seus filmes curtidos...</h3>
        <ul>
          <li>Filme 1</li>
          <li>Filme 2</li>
          <li>Filme 3</li>
        </ul>
      {:else if conteudoAtivo === "editarPerfil"}
        <div>
          {#if usuarioLogado && usuarioLogado.nome}
            <h3>Editar dados do usuário</h3>
            <form on:submit|preventDefault={atualizarUsuario}>
              <div class="form-group">
                <label for="nome">Nome</label>
                <input type="text" id="nome" bind:value={novoNome} class="form-control" />
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" bind:value={novoEmail} class="form-control" />
              </div>

              <button type="submit" class="btn btn-primary">Salvar</button>
            </form>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</main>
