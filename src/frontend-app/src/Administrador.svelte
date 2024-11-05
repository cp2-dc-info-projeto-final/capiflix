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

    const deletarUsuario = async (id) => {
  try {
    // Corrigido: interpolação da URL para passar o id corretamente
    let res = await axiosInstance.delete(`${API_BASE_URL}/usuarios/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });

    // Exibir a resposta do backend no console para diagnóstico
    console.log('Resposta do backend:', res.data);
    
    // Atualiza o resultado com a resposta da API
    resultado = res.data;
    error = null;
    
    // Recarrega a lista de usuários
    carregarUsuarios();
  } catch (err) {
    // Captura erros e exibe no console
    error =
      "Erro ao deletar usuário: " +
      (err.response?.data?.message || err.message);
    
    resultado = null;
    
    // Exibe o erro no console para diagnóstico
    console.error('Erro:', error);
  }
};


    // Função para editar nome do usuário pelo ID
    const editarNomeUsuario = async (id, novoNome) => {
  try {
    console.log("Enviando:", { nome: novoNome });
    await axiosInstance.put(`${API_BASE_URL}/usuarios/mudar-nome/${id}`, {
      nome: novoNome
    });
    novoNome = ""; // Limpa o campo após a edição
    await carregarUsuarios(); // Aguarda a recarga após editar
  } catch (error) {
    console.error("Erro ao editar nome:", error);
  }
};

    // Função para editar senha do usuário pelo ID
    const mudarSenhaUsuario = async (id_usuario, senhaAtual, novaSenha) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/usuarios/mudar-senha/${id_usuario}`, {
      senhaAtual: senhaAtual,
      novaSenha: novaSenha
    });
    console.log('Senha alterada com sucesso:', res.data);
  } catch (err) {
    console.error('Erro ao mudar a senha:', err.response?.data || err.message);
  }
};


// Função para promover a admin o usuário pelo ID
const promoverAdmin = async (id) => {
      try {
        let res = await axiosInstance.put(`${API_BASE_URL}/usuarios/promover-admin/${id}`, {
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

  /** FUNÇÃO PARA CARREGAR FILMES */
 /*  
  const carregarFilmes = async () => {
      try {
        let res = await axiosInstance.get(API_BASE_URL + "/filmes", {
          responseType: "json",
          headers: {
            Accept: "application/json",
          },
        });
        filmes = res.data.filmes;
        colunas_filmes = Object.keys(filmes[0]);
        error = null; // Limpa o erro se a requisição for bem-sucedida
      } catch (err) {
        error = "Erro ao buscar dados: " + err.response?.data?.message || err.message;;
        console.error(err);
        filmes = null; // Limpa o resultado em caso de erro
      }
    };
    */

  carregarUsuarios()
</script>
<main>
  <Menu></Menu>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
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
                        <li><hr class="dropdown-divider"></li>
                        <li>
                          <label for={`senhaAtual_${linha_usuario.id_usuario}`}>Senha Atual</label>
                          <input type="password" id={`senhaAtual_${linha_usuario.id_usuario}`} bind:value={senhaAtual}>  
                        </li>
                        <li>
                          <label for={`novaSenha_${linha_usuario.id_usuario}`}>Nova Senha</label>
                          <input type="password" id={`novaSenha_${linha_usuario.id_usuario}`} bind:value={novaSenha}>  
                        </li>
                        <li>
                          <button on:click={() => mudarSenhaUsuario(linha_usuario.id_usuario, senhaAtual, novaSenha)} class="dropdown-item">Salvar Senha</button>
                        </li>
                        <li>
                          <button on:click={() => promoverAdmin(linha_usuario.id_usuario)} class="dropdown-item">Promover</button>
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