<script>
  let movies = [
    { title: "Filme 1", image: "/caminho/para/imagem1.jpg" },
    { title: "Filme 2", image: "/caminho/para/imagem2.jpg" },
    { title: "Filme 3", image: "/caminho/para/imagem3.jpg" },
    { title: "Filme 4", image: "/caminho/para/imagem4.jpg" },
    { title: "Filme 5", image: "/caminho/para/imagem5.jpg" },
    { title: "Filme 6", image: "/caminho/para/imagem6.jpg" },
    { title: "Filme 7", image: "/caminho/para/imagem4.jpg" },
    { title: "Filme 8", image: "/caminho/para/imagem5.jpg" },
    { title: "Filme 9", image: "/caminho/para/imagem6.jpg" },
    { title: "Filme 10", image: "/caminho/para/imagem4.jpg" },
    { title: "Filme 11", image: "/caminho/para/imagem5.jpg" },
    { title: "Filme 12", image: "/caminho/para/imagem6.jpg" },
  ];

  const visibleMovies = 4;  // Número de filmes visíveis
  let currentIndex = 0;

  // Função para avançar
  function next() {
    if (currentIndex < movies.length - visibleMovies) {
      currentIndex++;
    } else {
      currentIndex = 0; // Voltar para o início
    }
  }

  // Função para voltar
  function prev() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = movies.length - visibleMovies; // Ir para o final
    }
  }

  // Adiciona cópias dos primeiros filmes no final para o efeito infinito
  let moviesWithClone = [...movies, ...movies.slice(0, visibleMovies)];
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
    background-color: antiquewhite;
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
      <button id="inverter" on:click={prev}>➤</button>
      <button on:click={next}>➤</button>
    </div>

    <!-- Slides dos filmes -->
    <div
      class="movie-cards"
      style="transform: translateX(calc(-100% / {visibleMovies} * {currentIndex}));"
    >
      {#each moviesWithClone as movie}
        <div class="movie-card">
          <img src={movie.image} alt={movie.title} />
          <h3>{movie.title}</h3>
        </div>
      {/each}
    </div>
  </div>
</main>
