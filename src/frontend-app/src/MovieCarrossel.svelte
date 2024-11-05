<script>
    let movies = [
      { title: "Filme 1", image: "/caminho/para/imagem1.jpg" },
      { title: "Filme 2", image: "/caminho/para/imagem2.jpg" },
      { title: "Filme 3", image: "/caminho/para/imagem3.jpg" },
      { title: "Filme 4", image: "/caminho/para/imagem4.jpg" },
      { title: "Filme 5", image: "/caminho/para/imagem5.jpg" },
      { title: "Filme 6", image: "/caminho/para/imagem6.jpg" },
    ];
  
    let currentIndex = 0;
    const visibleMovies = 4
    ; // Mude esse valor para ajustar o número de filmes visíveis
  
    // Função para avançar
    function next() {
      currentIndex = Math.min(currentIndex + 1, movies.length - visibleMovies);
    }
  
    // Função para voltar
    function prev() {
      currentIndex = Math.max(currentIndex - 1, 0);
    }
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
      flex: 0 0 calc(100% / 3); /* Ajuste aqui para o número de filmes visíveis */
      text-align: center;
      box-sizing: border-box;
      padding: 0.5em;
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
      background-color: rgba(0, 0, 0, 0.5);
      border: none;
      color: white;
      font-size: 2em;
      cursor: pointer;
      padding: 0.5em;
    }
  </style>

<main>
  <div class="carousel">
    <!-- Botões de controle -->
    <div class="controls">
      <button on:click={prev}>&lt;</button>
      <button on:click={next}>&gt;</button>
    </div>
  
    <!-- Slides dos filmes -->
    <div
      class="movie-cards"
      style="transform: translateX(calc(-100% / {visibleMovies} * {currentIndex}));"
    >
      {#each movies as movie}
        <div class="movie-card" style="flex: 0 0 calc(100% / {visibleMovies});">
          <img src={movie.image} alt={movie.title} width="100%" />
          <h3>{movie.title}</h3>
        </div>
      {/each}
    </div>
  </div>
</main>