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
    let novoTitulo = null;
    let novaClassificacao = null;
    let novoAno = null; 
    let novaDescricao = null;
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
  const carregarFilmes = async () => {
  try {
    let res = await axiosInstance.get(API_BASE_URL + "/filmes", {
      responseType: "json",
      headers: {
        Accept: "application/json",
      },
    });

    console.log('Resposta da API:', res.data);  // Verifique o conteúdo da resposta

    // Verifica se 'filmes' existe na resposta da API
  if (Array.isArray(res.data.filmes) && res.data.filmes.length > 0) {
    filmes = res.data.filmes;  // Aqui, corrigimos 'usuarios' para 'filmes'
    colunas_filmes = Object.keys(filmes[0]); // Pega as chaves do primeiro objeto (colunas)
    error = null;  // Limpa o erro se a requisição for bem-sucedida
  } else {
    filmes = [];
    colunas_filmes = [];
    error = "Nenhum filme encontrado.";
  }


  } catch (err) {
    error = "Erro ao buscar dados: " + (err.response?.data?.message || err.message);
    console.error(err);
    filmes = null;  // Limpa o resultado em caso de erro
    colunas_filmes = [];
  }
};

// FUNÇÃO DELETAR FILME
const deletarFilme = async (id) => {
  try {
    // Corrigido: interpolação da URL para passar o id corretamente
    let res = await axiosInstance.delete(`${API_BASE_URL}/filmes/${id}`, {
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
    carregarFilmes();
  } catch (err) {
    // Captura erros e exibe no console
    error =
      "Erro ao deletar filme: " +
      (err.response?.data?.message || err.message);
    
    resultado = null;
    
    // Exibe o erro no console para diagnóstico
    console.error('Erro:', error);
  }
};

// Função para editar titulo do filme pelo ID
const editarTituloFilme = async (id, novoTitulo) => {
  try {
    console.log("Enviando:", { titulo: novoTitulo });
    await axiosInstance.put(`${API_BASE_URL}/filmes/mudar-titulo/:id_filme${id}`, {
      titulo: novoTitulo
    });
    novoTitulo = ""; // Limpa o campo após a edição
    await carregarFilmes(); // Aguarda a recarga após editar
  } catch (error) {
    console.error("Erro ao editar Titulo:", error);
  }
};

// Função para editar descrição do filme pelo ID
const editarDescricaoFilme = async (id, novaDescricao) => {
  try {
    console.log("Enviando:", { descricao: novaDescricao });
    await axiosInstance.put(`${API_BASE_URL}/filmes/mudar-descricao/:id_filme${id}`, {
      descricao: novaDescricao
    });
    novaDescricao = ""; // Limpa o campo após a edição
    await carregarFilmes(); // Aguarda a recarga após editar
  } catch (error) {
    console.error("Erro ao editar descriçaõ:", error);
  }
};

// Função para editar ano do filme pelo ID
const editarAnoFilme = async (id, ano) => {
  try {
    console.log("Enviando:", { ano: novoAno });
    await axiosInstance.put(`${API_BASE_URL}/filmes/mudar-ano/:id_filme${id}`, {
      ano: novoAno
    });
    novoAno = ""; // Limpa o campo após a edição
    await carregarFilmes(); // Aguarda a recarga após editar
  } catch (error) {
    console.error("Erro ao editar ano:", error);
  }
};

// Função para classificação ano do filme pelo ID
const editarClassificacaoFilme = async (id, classificacao) => {
  try {
    console.log("Enviando:", { classificacao: novaClassificacao });
    await axiosInstance.put(`${API_BASE_URL}/filmes/mudar-classificacao/:id_filme${id}`, {
      classificacao: novaClassificacao
    });
    novaClassificacao = ""; // Limpa o campo após a edição
    await carregarFilmes(); // Aguarda a recarga após editar
  } catch (error) {
    console.error("Erro ao editar classificação:", error);
  }
};

  carregarFilmes()  
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
                    <button on:click={() => deletarUsuario(linha_usuario.id_usuario)} class="btn btn-danger">Remover</button>
                    
                    <div class="dropdown dropend">
                      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        editar
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
      

      <div class="card">
        {#if filmes}
          <table>
            <thead>
              <tr>
                {#each colunas_filmes as titulo_coluna}
                  <th>{titulo_coluna}</th>
                {/each}
                <th></th>
              </tr><tr />
            </thead>
            <tbody>
              {#each Object.values(filmes) as linha_filme}
                <tr>
                  {#each colunas_filmes as atributo}
                    <td>{linha_filme[atributo]}</td>
                  {/each}
                  <td>
                    <button on:click={() => deletarFilme(linha_filme.id_filme)} class="btn btn-danger">Remover</button>
                    
                    <div class="dropdown dropend">
                      <button class="btn btn-secondary dropdown-toggle" type="button" id={`dropdownMenuButton_${linha_filme.id_filme}`} data-bs-toggle="dropdown" aria-expanded="false">
                        Editar
                      </button>
                      <ul class="dropdown-menu" aria-labelledby={`dropdownMenuButton_${linha_filme.id_filme}`}>
                        <li>
                          <label for={`novoTitulo_${linha_filme.id_filme}`}>Titulo</label>
                          <input type="text" id={`novoTitulo${linha_filme.id_filme}`} bind:value={novoTitulo}>  
                        </li>
                        <li>
                          <button on:click={() => editarTituloFilme(linha_filme.id_filme, novoTitulo)} class="dropdown-item">Salvar</button>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                          <label for={`novaClassificacao${linha_filme.id_filme}`}>classificação</label>
                          <input type="text" id={`novaClassificacao${linha_filme.id_filme}`} bind:value={novaClassificacao}>  
                        </li>
                        <li>
                          <button on:click={() => editarClassificacaoFilme(linha_filme.id_filme, novaClassificacao)} class="dropdown-item">Salvar</button>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                          <label for={`novoAno${linha_filme.id_filme}`}>Ano</label>
                          <input type="text" id={`novoAno${linha_filme.id_filme}`} bind:value={novoAno}>  
                        </li>
                        <li>
                          <button on:click={() => editarAnoFilme(linha_filme.id_filme, novoAno)} class="dropdown-item">Salvar</button>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                          <label for={`novaDescricao${linha_filme.id_filme}`}>Ano</label>
                          <input type="text" id={`novaDescricao${linha_filme.id_filme}`} bind:value={novaDescricao}>  
                        </li>
                        <li>
                          <button on:click={() => editarDescricaoFilme(linha_filme.id_filme, novaDescricao)} class="dropdown-item">Salvar</button>
                        </li>
                        <li><hr class="dropdown-divider"></li>
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