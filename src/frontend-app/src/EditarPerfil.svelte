<script>
   import axios from "axios";
  export let showModal = false;
  export let closeModal = () => {};
  let novoNome = "";
  let senhaAtual = "";
  let novaSenha = "";
  let linha_usuario = "";
  const API_BASE_URL = "http://localhost:3000";

  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL,
    responseType: "json",
    headers: {
          Accept: "application/json",
      }
  });


  // Função para fechar o modal
  const close = () => {
    closeModal();
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
</script>

<div class="modal fade" tabindex="-1" role="dialog" class:show={showModal} style:display={showModal ? 'block' : 'none'} aria-labelledby="editProfileModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title" id="editProfileModalLabel">Perfil</h2>
        <button type="button" class="btn-close" aria-label="Close" on:click={close}></button>
      </div>
      <div class="modal-body">
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
        </ul>
      </div>
      <div class="modal-footer">
        <button style="background-color:blue;" type="button" class="btn btn-secondary" on:click={close}>Fechar</button>
      </div>
    </div>
  </div>
</div>

<style>
  .modal.show {
    display: block !important;
    background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro transparente */
  }

  .modal-dialog {
    max-width: 500px;
    margin: 10% auto; /* Centraliza o modal verticalmente */
  }
</style>
