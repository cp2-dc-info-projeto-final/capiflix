<script>
  import axios from "axios";
  let email = "";
  let senha = "";
  let error = null;
  let resultado = null;
  import Menu from "./Menu.svelte";
  const API_BASE_URL = "http://localhost:3000";

  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL,
    responseType: "json",
    headers: {
      Accept: "application/json",
    }
  });

  const loginUsuario = async () => {
    try {
      let res = await axiosInstance.post("/login", {
        email,
        senha,
      });

      resultado = res.data;

      if (resultado && resultado.status === "success") {
        alert("Login bem-sucedido! Você será redirecionado para a página inicial.");
        window.location.href = "/index.html";
      }

      error = null;
    } catch (err) {
      error = err.response?.data?.message || err.message;
      resultado = null;
      alert("Senha ou e-mail errado");
    }
  };
</script>

<main class="bg-primário-sutil">
  <Menu></Menu>

  <div class="container text-center mt-5">
    <div class="d-flex justify-content-center align-items-center" style="font-family: American Typewriter, serif;">
      <h1 style="font-size: 7rem; color: #333;">
        Login</h1>
      <img src="imagens/capivara.png" style="width: 10%;" id="inverter">
    </div>
  </div>



  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-10"> <!-- Responsivo, ocupa 10/12 da tela em telas pequenas e 6/12 em telas médias -->
        <div class="card p-4">
          <form on:submit|preventDefault={loginUsuario} class="needs-validation">
            <div class="form-floating mb-3">
              <input class="form-control bg-body rounded" id="email" placeholder="Email" name="email" required bind:value={email}>
              <label for="email">Email</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" class="form-control bg-body rounded" id="senha" placeholder="Senha" name="senha" required bind:value={senha}>
              <label for="senha">Senha</label>
            </div>

            <button id="button_enviar" type="submit" class="btn btn-dark w-100" style="height: 50px;">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="form mt-4">
    <form on:submit|preventDefault={error}>
      {#if error}
        <p style="color: red;">{error}</p>
      {/if}
      {#if resultado && resultado.message}
        <p style="color: green;">{resultado.message}</p>
      {/if}
    </form>
  </div>
</main>

<style>
  @media (max-width: 576px) {
    h1 {
      font-size: 2rem;
    }
    .card {
      padding: 2rem;
    }
  }

  @media (min-width: 577px) and (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    .card {
      padding: 3rem;
    }
  }
</style>
