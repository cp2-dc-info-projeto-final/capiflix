<script>
      // import { onMount } from 'svelte';
    import "./app.css"
    import Menu from "./Menu.svelte"
    import MovieCarrossel from "./MovieCarrossel.svelte";
    import MovieCarousel from './MovieCarrossel.svelte';


</script>
<main>
    <Menu></Menu>
    <h1 style="text-align: center; color:darkorange; font-size:90px;">Catálogo de Filmes</h1>
    <MovieCarrossel></MovieCarrossel>

    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown button
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
</main>