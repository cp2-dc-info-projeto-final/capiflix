<script>
  import { onMount } from 'svelte';
  import axios from 'axios';

  const API_BASE_URL = "http://localhost:3000"; // URL da sua API
  let filme = null;

  // Obtendo o id da URL
  let id = window.location.search.split('=').pop();  // Pega o id da URL
  console.log('id recebido é:', id);

  // Função para buscar os dados do filme
  onMount(async () => {
    if (id) {
      try {
        const response = await axios.get(`${API_BASE_URL}/filme/${id}`);
        filme = response.data.filme; // Atribui os dados do filme
      } catch (error) {
        console.error("Erro ao buscar filme:", error);
      }
    } else {
      console.error("ID do filme não fornecido.");
    }
  });
</script>

<style>
  img {
    max-width: 100%;
    height: auto;
  }
  .filme-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    font-family: Arial, sans-serif;
  }
  h1 {
    font-size: 2rem;
    color: darkorange;
  }
</style>

{#if filme}
  <div class="filme-container">
    <h1>{filme.titulo}</h1>
    <img src={`${API_BASE_URL}${filme.imagem}`} alt={filme.titulo} />
    <p>{filme.descricao}</p>
    <p><strong>Ano:</strong> {filme.ano}</p>
    <p><strong>Gênero:</strong> {filme.genero}</p>
    <p><strong>Classificação:</strong> {filme.classificacao}</p>
  </div>
{:else}
  <p>Carregando...</p>
{/if}
