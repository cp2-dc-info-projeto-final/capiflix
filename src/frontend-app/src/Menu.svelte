<script>
    import "./app.css";
    
    let titulo = '';
    let mensagem = '';
  
    // Função de busca de filmes
    async function buscarFilmes() {
      if (!titulo.trim()) {
        mensagem = 'Por favor, insira um título de filme.';
        return;
      }
      window.location.href = `/filmes?titulo=${encodeURIComponent(titulo)}`;
    }
  </script>
  
  <main>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
  
    <header class="p-3 text-bg-dark">
      <div>
        <div>
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="/index.html" class="nav-link px-1 text-secondary">Home</a></li>
              <li><a href="/filmes.html" class="nav-link px-1 text-white">Filmes</a></li>
              <li><a href="/generos.html" class="nav-link px-1 text-white">Gêneros</a></li>
              <li><a href="/trailers.html" class="nav-link px-1 text-white">Trailers</a></li>
              <li><a href="/perfil.html" class="nav-link px-1 text-white">Conta</a></li>
              <li><a href="/administrador.html" class="nav-link px-1 text-white">Admin</a></li>
            </ul>
            <form on:submit|preventDefault={buscarFilmes} class="d-flex" style="padding-right:30px;">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                bind:value={titulo}
                aria-label="Search"
              />
              <button class="btn btn-outline-light" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
              </button>
            </form>

          </div>
        </div>
      </div>
    </header>
  </main>
  