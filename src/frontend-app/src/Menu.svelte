<script>
  import "./app.css"
  import axios from "axios";
  const api_base_url = "http://localhost:3000"

</script>

<main>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>

  <header class="p-3 text-bg-dark">
    <div>
      </div>
      <div>
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                  <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                      <use xlink:href="#bootstrap" />
                  </svg>
              </a>

              <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                  <li><a href="/index.html" class="nav-link px-1 text-secondary">Home</a></li>
                  <li><a href="/filmes.html" class="nav-link px-1 text-white">Filmes</a></li>
                  <li><a href="/generos.html" class="nav-link px-1 text-white">Gêneros</a></li>
                  <li><a href="/trailers.html" class="nav-link px-1 text-white">Trailers</a></li>
                  <li><a href="/administrador.html" class="nav-link px-1 text-white">Admin</a></li>
              </ul>
              <form class="d-flex" style="padding-right:30px;">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                  <button class="btn btn-outline-light" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                  </button>
                  
              </form>
              <div class="text-end" style="padding-left:2px;">
                  <a href="./login.html" type="button" class="btn btn-outline-light me-2">Entrar</a>
                  <a href="./cadastroUsuarios.html" type="button" class="btn btn-outline-light me-1">Cadastrar</a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                      <span class="navbar-toggler-icon fs-3">
                        <img src="imagens/foto_de_perfil.png" alt="imagem de uma capivara comendo pipoca" style="width: 100%;" id="inverter" />
                      </span>
                  </button>

                  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                      <div class="offcanvas-header">
                          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                      </div>
                      <div class="offcanvas-body">
                          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                              <li class="nav-item">
                                <a class="nav-link" href="./perfil.html">Editar Perfil</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" href="#">Filmes Curtidos ❤️</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" href="#">Excluir conta</a>
                            </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </header>
</main>
