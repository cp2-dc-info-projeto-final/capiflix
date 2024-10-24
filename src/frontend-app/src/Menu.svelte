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
    
            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search">
            </form>
    
            <div class="text-end">
              <button type="button" class="btn btn-outline-light me-2">entrar</button>
              <button type="button" class="btn btn-warning">cadastre-se</button>
            </div>
          </div>
        </div>
      </header>
    



</main>