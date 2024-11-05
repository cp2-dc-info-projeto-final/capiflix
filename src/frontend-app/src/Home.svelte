<script>
      // import { onMount } from 'svelte';
    import "./app.css"
    import Menu from "./Menu.svelte"
    import MovieCarrossel from "./MovieCarrossel.svelte";
    import MovieCarousel from './MovieCarrossel.svelte';


</script>
<main>
    <Menu></Menu>
    <h1 style="text-align: center; color:black; font-size:90px;">Catálogo de Filmes</h1>
    <MovieCarrossel></MovieCarrossel>
</main>