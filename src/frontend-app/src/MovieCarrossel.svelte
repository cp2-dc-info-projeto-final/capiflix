<script>
  import axios from "axios";
  
  const API_BASE_URL = "http://localhost:3000";
  const filmesPorPagina = 7; // O número de filmes por página
  const visibleMovies = 4;  // Número de filmes visíveis
  let currentIndex = 0;
  let movies = [];  // Array para armazenar os filmes

  // Função para buscar filmes da API
  async function fetchMovies(pagina = 1) {
    try {
      const response = await axios.get(`${API_BASE_URL}/filmes/carrossel`, {
        params: { pagina }
      });
      movies = response.data.filmes;
      updateCarousel();  // Atualiza o carrossel após a busca
    } catch (error) {
      console.error("Erro ao carregar filmes:", error);
    }
  }

  // Função para avançar
  function next() {
    if (currentIndex < movies.length - visibleMovies) {
      currentIndex++;
    } else {
      currentIndex = 0; // Voltar para o início
    }
    updateCarousel();
  }

  // Função para voltar
  function prev() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = movies.length - visibleMovies; // Ir para o final
    }
    updateCarousel();
  }

  // Atualiza o carrossel com a lista de filmes e o índice
  function updateCarousel() {
    // Adiciona cópias dos primeiros filmes no final para o efeito infinito
    let moviesWithClone = [...movies, ...movies.slice(0, visibleMovies)];
    // Re-renderiza a parte do carrossel (isso pode ser feito de forma reativa no framework que você usa)
    // Exemplo no Svelte ou Vue seria algo como uma atualização automática
  }

  // Carrega os filmes da primeira página ao carregar o script
  fetchMovies();

</script>

<style>
   .carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .movie-cards {
    display: flex;
    transition: transform 0.5s ease;
  }

  .movie-card {
    flex: 0 0 calc(100% / 4); /* Ajuste aqui para o número de filmes visíveis */
    text-align: center;
    box-sizing: border-box;
    padding: 0.5em;
    margin-top: 200px;
  }

  .movie-card img {
    width: 100%;
  }

  .controls {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    z-index: 1;
  }

  button {
    background: none;
    border: none;
    color: rgb(0, 0, 0);
    font-size: 3em;
    cursor: pointer;
    padding: 0.5em;
    color: darkorange;
    margin-top: 200px;
  }
</style>
<main>
  <div class="carousel">
    <!-- Botões de controle -->
    <div class="controls">
      <button  id="inverter" on:click={prev}>➤</button>
      <button on:click={next}>➤</button>
    </div>

    <!-- Slides dos filmes -->
    <div
      class="movie-cards"
      style="transform: translateX(calc(-100% / {visibleMovies} * {currentIndex}));"
    >
      {#each movies as movie}
        <div class="movie-card">
          <div class="image-container">            
            <img  src={ API_BASE_URL + movie.imagem_url} alt="Imagem do filme" >
          </div>
             <h3>{movie.titulo}</h3>
        </div>
      {/each}
    </div>
  </div>
</main>
