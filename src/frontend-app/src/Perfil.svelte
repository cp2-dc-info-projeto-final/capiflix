<script>
  import "./app.css";
  import axios from "axios";

  let novoNome = "";
  let senhaAtual = "";
  let novaSenha = "";
  let error = null;
  let usuarios = []; // Inicializado como array vazio
  let colunas_usuarios = [];
  const API_BASE_URL = "http://localhost:3000";

  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL,
    responseType: "json",
    headers: {
      Accept: "application/json",
    },
  });

  let nome = "Kaylane Costa da Silva";
  let email = "kaylane@exemplo.com";
  let senha = "********";

  let conteudoAtivo = "perfil";

  function mostrarFilmesCurtidos() {
    conteudoAtivo = "filmesCurtidos";
  }

  function editarNome() {
    conteudoAtivo = "editarNome";
  }

  function editarEmail() {
    conteudoAtivo = "editarEmail";
  }

  function editarSenha() {
    conteudoAtivo = "editarSenha";
  }

  const carregarUsuario = async () => {
    try {
      let res = await axiosInstance.get("/usuarios/me");
      if (res.data?.usuarios?.length) {
        usuarios = res.data.usuarios;
        colunas_usuarios = Object.keys(usuarios[0]);
        error = null;
      } else {
        throw new Error("Nenhum dado encontrado.");
      }
    } catch (err) {
      error = "Erro ao buscar dados: " + (err.response?.data?.message || err.message);
      console.error(err);
      usuarios = [];
      colunas_usuarios = [];
    }
  };

  const editarNomeUsuario = async (id, novoNome) => {
    try {
      if (!novoNome) throw new Error("O novo nome não pode estar vazio.");
      await axiosInstance.put(`/usuarios/mudar-nome/${id}`, { nome: novoNome });
      novoNome = "";
      await carregarUsuario();
    } catch (error) {
      console.error("Erro ao editar nome:", error);
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

    <div class="mt-5" style="background-color: azure; width: 90%; height: 700px; border-color: aquamarine; border-radius: 20px; border-style: solid;">
      <img style="width:15%;" src="imagens/capivara_foto_de_perfil.png" alt="foto de perfil" class="img-fluid" />
      <h2>{nome}</h2>

      <!-- Botões para navegar entre os conteúdos -->
      <div>
        <button class="mb-3 mt-4 btn btn-primary" type="button" on:click={mostrarFilmesCurtidos}>
          Filmes Curtidos
        </button>
      </div>
      <div>
        <button class="mb-3 btn btn-secondary" type="button" on:click={editarNome}>
          Editar nome
        </button>
      </div>
      <div>
        <button class="mb-3 btn btn-warning" type="button" on:click={editarSenha}>
          Editar senha
        </button>
      </div>
      <div>
        <button class="mb-3 btn btn-info" type="button" on:click={editarEmail}>
          Editar e-mail
        </button>
      </div>

      <!-- Exibição do conteúdo -->
      <div class="mt-4" id="div_de_perfil" style="background-color: burlywood; width: 50%; height: 690px; margin: 0 auto;">
        {#if conteudoAtivo === "perfil"}
          <h1 style="text-align: center;">Bem-vindo ao seu perfil, {nome}!</h1>
        {:else if conteudoAtivo === "filmesCurtidos"}
          <h3>Aqui estão seus filmes curtidos...</h3>
          <ul>
            <li>Filme 1</li>
            <li>Filme 2</li>
            <li>Filme 3</li>
          </ul>
        {:else if conteudoAtivo === "editarNome"}
        <div class="card">
          {#if usuarios}
            <table>
              <thead>
                <tr>
                  {#each colunas_usuarios as nome_coluna}
                    <th>{nome_coluna}</th>
                  {/each}
                  <th></th>
                </tr><tr />
              </thead>
              <tbody>
                {#each Object.values(usuarios) as linha_usuario}
                  <tr>
                    {#each colunas_usuarios as atributo}
                      <td>{linha_usuario[atributo]}</td>
                    {/each}
                    <td>
                      <button on:click={() => deletarUsuario(linha_usuario.id_usuario)} class="btn btn-danger">Remover</button>
  
                      <div class="dropdown dropend">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id={`dropdownMenuButton_${linha_usuario.id_usuario}`} data-bs-toggle="dropdown" aria-expanded="false">
                          Editar
                        </button>
                        
                        <ul class="dropdown-menu" aria-labelledby={`dropdownMenuButton_${linha_usuario.id_usuario}`}>
                          <li>
                            <label for={`novoNome_${linha_usuario.id_usuario}`}>Nome</label>
                            <input type="text" id={`novoNome_${linha_usuario.id_usuario}`} bind:value={novoNome}>  
                          </li>
                          <li>
                            <button on:click={() => editarNomeUsuario(linha_usuario.id_usuario, novoNome)} class="dropdown-item">Salvar</button>
                          </li>
                        </ul>
                        </td>
                    </tr>
          {:else if}
            <p>Nenhum usuário encontrado.</p>
          {/if}
        {:else if conteudoAtivo === "editarEmail"}
          <label for="email">Novo e-mail:</label>
          <input type="email" id="email" bind:value={email} />
        {:else if conteudoAtivo === "editarSenha"}
          <label for="senha">Nova senha:</label>
          <input type="password" id="senha" bind:value={senha} />
        {/if}
      </div>
    </div>
  </div>
</main>
