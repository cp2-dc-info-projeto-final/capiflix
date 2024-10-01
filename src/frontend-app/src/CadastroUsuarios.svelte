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
    let paginaatual = "home";
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
  
    // Função para deletar o usuário pelo ID
    const deletarUsuario = async (id) => {
      try {
        let res = await axios.delete(`${api_base_url}/usuarios/${id}`, {
          headers: {
            Accept: "application/json",
          },
        });
        resultado = res.data;
        error = null;
        // recarrega lista de usuários apresentada
        carregarUsuarios();
      } catch (err) {
        error =
          "Erro ao deletar usuário: " +
          (err.response?.data?.message || err.message);
        resultado = null;
      }
    };

  </script>

  <main class=".bg-primário-sutil">

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      <div class="card">
      <div class="container text-center mt-3">
        <div class="d-flex justify-content-center align-items-center">
            <h1 style="font-size: 90px;">Capflix</h1>
        </div>
      </div>
        <div style="width:35%;" class="form-floating mb-5 mt-3 position-flex" id="div_cadastro">
            <h1 style="font-size: 200%; text-align: center;" class="form-floating mb-3 mt-3 position-flex">CADASTRO:</h1>
            <div class="mb-4 mt-5">
              <form class="row g-1 needs-validation" id="formulario" on:submit|preventDefault={cadastrarUsuario}>
                  <div class="form-floating mt-1 mb-3">
                      <input type="text" class=" shadow p-3 bg-body rounded form-control" id="nome" placeholder="Nome" name="nome" required bind:value={nome}>
                      <label for="nome">Nome</label>
                  </div>
                  <div class="form-floating mt-1 mb-3">
                      <input type="text" class="form-control shadow p-3 bg-body rounded " id="email" placeholder="Email" name="email" required  bind:value={email}>
                      <label for="email">Email</label>
                  </div>
                  <div class="form-floating mt-1 mb-3">
                      <input type="password" class="form-control shadow p-3 bg-body rounded " id="senha" placeholder="Enter password" name="pswd" required  bind:value={senha}>
                      <label for="senha">Senha</label>
                  </div>
                  <div class="form-floating mt-1 mb-3">
                    <input type="password" class="form-control shadow p-3 bg-body rounded " id="confirma_senha" placeholder="Enter password" name="pswd" required bind:value={conf_senha}>
                    <label for="confirma_senha">confirmar senha</label>
                </div>
                    <button id="button_emviar"type="submit" class="btn btn-dark"  style="--bs-btn-padding-y: .70rem; --bs-btn-padding-x: .70rem; --bs-btn-font-size: .90rem; margin-bottom: 30px;">Enviar</button>
                    <p id="message"></p>

              </form>
            </div>
            <div class="form">
              <form on:submit|preventDefault={cadastrarUsuario}>
              {#if error}
                <p style="color: red;">{error}</p>
              {/if}
              {#if resultado && resultado.message}
                <p style="color: green;">{resultado.message}</p>
                <a href="./login.html"> Clique aqui</a>
               
               {/if}
              </form>
            </div>
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
                          <button on:click={() => deletarUsuario(linha_usuario.id_usuario)}>Remover</button>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              {/if}
            </div>
        </div>
        
  </main>
