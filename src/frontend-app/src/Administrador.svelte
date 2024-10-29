<script>
   
    // import { onMount } from 'svelte';
    import "./app.css"
    import axios from "axios";
    let novoNome = "";
    let senhaAtual = "";
    let novaSenha = "";
    let error = null;
    let resultado = null;
    let usuarios = null;
    let filmes = null;
    let colunas_usuarios = null;
    let colunas_filmes = null;
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

    
    /** FUNÇÃO PARA CARREGAR USUÁRIOS */
    const carregarUsuarios = async () => {
      try {
        let res = await axiosInstance.get(API_BASE_URL + "/usuarios", {
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

    // Função para deletar o usuário pelo ID
    const deletarUsuario = async (id) => {
      try {
        let res = await axiosInstance.delete(`${API_BASE_URL}/usuarios/${id}`, {
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

    // Função para editar nome do usuário pelo ID
    const editarNomeUsuario = async (id, novoNome) => {
  try {
    console.log("Enviando:", { nome: novoNome }); // Log para verificar o que está sendo enviado

    let res = await axiosInstance.put(`${API_BASE_URL}/usuarios/mudar-nome/${id}`, {
      nome: novoNome // Assegure-se de que aqui está o nome correto
    }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  } catch (error) {
    console.error("Erro ao editar nome:", error); // Adicione tratamento de erro se necessário
  }
  carregarUsuarios()
};

    // Função para editar senha do usuário pelo ID
    const mudarSenhaUsuario = async (id, senhaAtual, novaSenha) => {
  try {
    console.log("Enviando:", { senhaAtual, novaSenha }); // Log para verificar o que está sendo enviado

    let res = await axiosInstance.put(`${API_BASE_URL}/usuarios/mudar-senha/${id}`, {
      senhaAtual,
      novaSenha,
    }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log("Resposta do servidor:", res.data); // Log para verificar a resposta
    return res.data; // Retorna a resposta do servidor

  } catch (error) {
    console.error("Erro ao mudar a senha:", error.response ? error.response.data : error.message);
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
  carregarUsuarios()
};

  carregarUsuarios()
</script>
<main>
  <Menu></Menu>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <div class="container text-center mt-3">
        <div class="d-flex justify-content-center align-items-center">
            <h1 style="font-size: 90px;">Capflix</h1>
        </div>
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
                    <div class="dropdown dropend">
                      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Editar</button>
                      <ul class="dropdown-menu">
                        <li>
                          <label for="novoNome">Nome</label>
                          <input type="text" id="novoNome" bind:value={novoNome}>  
                        </li>
                        <li>
                          <button on:click={() => editarNomeUsuario(linha_usuario.id_usuario, novoNome)}>Salvar</button>
                        </li>
                        <li>
                          <hr class="dropdown-divider">
                        </li>
                        <li>
                          <label for="senhaAtual">Senha Atual</label>
                          <input type="password" id="senhaAtual" bind:value={senhaAtual}>  
                        </li>
                        <li>
                          <label for="novaSenha">Nova Senha</label>
                          <input type="password" id="novaSenha" bind:value={novaSenha}>  
                        </li>
                        <li>
                          <button on:click={() => mudarSenhaUsuario(linha_usuario.id_usuario, senhaAtual, novaSenha)}>Salvar Senha</button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        {/if}
      </div>

      <p id="message"></p>
</main>