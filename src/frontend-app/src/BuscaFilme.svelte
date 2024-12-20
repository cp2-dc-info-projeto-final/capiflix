<script>
    import { onMount } from 'svelte';
    import Menu from "./Menu.svelte"
    const API_BASE_URL = "http://localhost:3000";

    let titulo = '';
    let filmes = [];
    let message = '';
  
    onMount(() => {
      // Pega o título da URL
      const urlParams = new URLSearchParams(window.location.search);
      titulo = urlParams.get('titulo');
  
      if (titulo) {
        buscarFilmes(); // Chama a função de busca quando a página é carregada
      }
    });
  
    // Função para buscar filmes
    async function buscarFilmes() {
      if (!titulo.trim()) {
        message = 'Por favor, insira um título de filme.';
        filmes = [];
        return;
      }
  
      try {
        const res = await fetch(API_BASE_URL + `/filmes/busca?titulo=${encodeURIComponent(titulo)}`);
        const data = await res.json();
        if (res.ok) {
          filmes = data.filmes;
          message = '';
        } else {
          filmes = [];
          message = data.message;
        }
      } catch (error) {
        filmes = [];
        message = 'Erro ao conectar com a API.';
      }
    }
  </script>
  
  <main>
    <Menu></Menu>
  
    <div class="container">
      {#if message}
        <p>{message}</p>
      {:else if filmes.length > 0}
        <ul>
          {#each filmes as filme}
            <div>
              <img src={ API_BASE_URL + filme.imagem_url} alt="Imagem do filme" style="width: 100px; height: 150px;" />              
              <p>{filme.titulo}</p>
            </div>
          {/each}
        </ul>
      {:else}
        <p>Nenhum filme encontrado.</p>
      {/if}
    </div>
  </main>
  