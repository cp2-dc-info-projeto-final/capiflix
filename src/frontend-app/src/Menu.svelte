<script>
    // import { onMount } from 'svelte';
    import "./app.css"
    import axios from "axios";
    const api_base_url = "http://localhost:3000"


</script>

<main>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

      <header class="p-3 text-bg-dark">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg>
            </a>
    
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="/index.html" class="nav-link px-2 text-secondary">Home</a></li>
              <li><a href="/filmes.html" class="nav-link px-2 text-white">Filmes</a></li>
              <li><a href="/generos.html" class="nav-link px-2 text-white">Gêneros</a></li>
              <li><a href="/trailers.html" class="nav-link px-2 text-white">Trailers</a></li>
              <li><a href="/conta.html" class="nav-link px-2 text-white">Conta</a></li>
              <li><a href="/administrador.html" class="nav-link px-2 text-white">ad emi</a></li>
            </ul>
            <form class="d-flex" style="padding-right:30px;">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <!-- Botão de pesquisa com hover laranja -->
                <button style="border-color: blanchedalmond; color: blanchedalmond;" class="btn btn-hover-laranja" type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                  </svg>
                </button>
            </form>
            <div class="text-end" style="padding-left:2px;">
              <a href="./login.html" type="button" class="btn btn-outline-light me-2">entrar</a>
              <a href="./cadastroUsuarios.html" type="button" class="btn btn-outline-light me-2">cadastra</a>
            </div>
          </div>
        </div>
      </header>
    



</main>