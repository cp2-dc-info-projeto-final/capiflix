<script>
  import "./app.css"
  import axios from "axios";
  const API_BASE_URL = "http://localhost:3000";

  let nome = "Kaylane Costa da Silva";
  let email = "kaylane@exemplo.com";
  let senha = "********";

  let conteudoAtivo = "perfil"; // variável para controlar o conteúdo exibido

  // Funções para mudar o conteúdo
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
</script>

<main>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>

  <div class="card">
    <div class="container text-center mt-1">
      <div class="d-flex justify-content-center align-items-center" style="font-family: American Typewriter, serif;">
        <h1 style="font-size: 100px;">Capflix</h1>
        <img src="imagens/capivara.png" alt="imagem de uma capivara comendo pipoca" style="width: 10%;" id="inverter">
      </div>
    </div>

    <div class="mt-5" style="background-color: azure; width: 90%; height: 500px; border-color: aquamarine; border-radius: 20px; border-style: solid;">
      <img src="imagens/foto_de_perfil.png" alt="foto de perfil" class="img-fluid" />
      <h2>{nome}</h2>

      <!-- Botões para navegar entre os conteúdos -->
      <div>
        <button class="mb-3 mt-4 btn btn-primary" type="button" on:click={mostrarFilmesCurtidos}>Filmes Curtidos</button>
      </div>
      <div>
        <button class="mb-3 btn btn-secondary" type="button" on:click={editarNome}>Editar nome</button>
      </div>
      <div>
        <button class="mb-3 btn btn-warning" type="button" on:click={editarSenha}>Editar senha</button>
      </div>
      <div>
        <button class="mb-3 btn btn-info" type="button" on:click={editarEmail}>Editar e-mail</button>
      </div>

      <!-- Exibição do conteúdo dentro de uma única div -->
      <div class="mt-4" id="div_de_perfil" style="background-color: burlywood; width: 60%; height: 450px; margin: 0 auto;">
        {#if conteudoAtivo === 'perfil'}
          <h1 style="text-align: center;">Bem-vindo ao seu perfil, {nome}!</h1>
        {:else if conteudoAtivo === 'filmesCurtidos'}
          <h3>Aqui estão seus filmes curtidos...</h3>
          <!-- Exemplo de lista de filmes (pode ser dinâmico) -->
          <ul>
            <li>Filme 1</li>
            <li>Filme 2</li>
            <li>Filme 3</li>
          </ul>
        {:else if conteudoAtivo === 'editarNome'}
          <label for="nome">Novo nome:</label>
          <input type="text" id="nome" value={nome} on:input={(e) => nome = e.target.value} />
        {:else if conteudoAtivo === 'editarEmail'}
          <label for="email">Novo e-mail:</label>
          <input type="email" id="email" value={email} on:input={(e) => email = e.target.value} />
        {:else if conteudoAtivo === 'editarSenha'}
          <label for="senha">Nova senha:</label>
          <input type="password" id="senha" value={senha} on:input={(e) => senha = e.target.value} />
        {/if}
      </div>
    </div>
  </div>
</main>
