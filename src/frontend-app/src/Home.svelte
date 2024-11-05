<script>
      // import { onMount } from 'svelte';
    import "./app.css"
    import Menu from "./Menu.svelte"
    import MovieCarousel from './MovieCarrossel.svelte';


</script>
<main>
    <Menu></Menu>
    <h1 style="text-align: center;">Catálogo de Filmes</h1>
    <form>
        <div id="pesquisa" class="form-group">
          <input style="background: none;" type="email" class="form-control" id="input_pesquisa" aria-describedby="pesquisa" placeholder="Pesquisa">
          <small id="input_pesquisa" class="form-text text-muted">Pesquise um filme</small>
        </div>
    </form>
</main>