<script>
  // import { onMount } from 'svelte';
  import axios from "axios";
  let nome = "";
  let email = "";
  let senha = "";
  let conf_senha = "";
  let error = null;
  let resultado = null;
  let usuarios = null;
  let colunas_usuarios = null;
  const api_base_url = "http://localhost:3000";

  const carregarUsuarios = async () => {
    try {
      let res = await axios.get(api_base_url + "/usuarios", {
        responseType: "json",
        headers: {
          Accept: "application/json",
        },
      });
      usuarios = res.data.usuarios;
      colunas_usuarios = Object.keys(usuarios[0]);
      error = null; // Limpa o erro se a requisição for bem-sucedida
    } catch (err) {
      error = "Erro ao buscar dados: " + err.response?.data?.message || err.message;;
      console.error(err);
      usuarios = null; // Limpa o resultado em caso de erro
    }
  };

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
      carregarUsuarios();
    } catch (err) {
      error =
        "Erro ao enviar dados: " + err.response?.data?.message || err.message;
      resultado = null; // Limpa o resultado em caso de erro
    }
    
  };

  carregarUsuarios();
</script>

<main>
  <div class="card">
    <div class="row g-1 needs-validation">
      <h2>Cadastrar Usuário</h2>
      <form on:submit|preventDefault={cadastrarUsuario}>
        <div>
          <label for="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            bind:value={nome}
            placeholder="Digite o nome"
            required
            class="shadow p-3 bg-body rounded form-control"
          />
        </div>
        <div>
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            bind:value={email}
            placeholder="Digite o email"
            required
            class="form-control shadow p-3 bg-body rounded"
          />
        </div>
        <div>
          <label for="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            bind:value={senha}
            placeholder="Digite a senha"
            required
            class="form-control shadow p-3 bg-body rounded"
          />
        </div>
        <div>
          <label for="conf_senha">Confirme a Senha:</label>
          <input
            type="password"
            id="conf_senha"
            bind:value={conf_senha}
            placeholder="Confirme a senha"
            required
            class="form-control shadow p-3 bg-body rounded"
          />
        </div>
        <div>
          <button type="submit"
          class="btn btn-dark"
          style="--bs-btn-padding-y: .70rem; --bs-btn-padding-x: .70rem; --bs-btn-font-size: .90rem; margin-bottom: 30px;"
          >Cadastrar</button>
        </div>
      </form>

</main>