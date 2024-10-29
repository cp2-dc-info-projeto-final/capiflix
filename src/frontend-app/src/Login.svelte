<script>
    // import { onMount } from 'svelte';
    import axios from "axios";
    let email = "";
    let senha = "";
    let error = null;
    let resultado = null;
    import Menu from "./Menu.svelte"

    const API_BASE_URL = "http://localhost:3000";

    // habilita envio das credenciais via cookies em toda requisição axios
    // também configura a base URL padrão para todos os requests usando essa instância
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
        let res = await axiosInstance.post("/login",
          {
            email,
            senha
          }
        );

        resultado = res.data;

        // Redirecionar para uma página protegida após login bem-sucedido
        if (resultado && resultado.status === "success") { 
            window.location.href = "/index.html";  
        }
        error = null; // Limpa o erro se a requisição for bem-sucedida
      } catch (err) {
        error = err.response?.data?.message || err.message;
        resultado = null; // Limpa o resultado em caso de erro
      }
      
    };

</script>

<main class=".bg-primário-sutil">
    <Menu></Menu>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

    <div class="card">
    <div class="container text-center mt-1">
      <div class="d-flex justify-content-center align-items-center" style="font-family:American Typewriter, serif;">
          <h1 style="font-size: 140px;">Capflix</h1>
          <img src="imagens/capivara.png"  style="width: 10%;" id="inverter">
      </div>
    </div>
      <div class="mt-1 container" id="div_de_boasvindas" style="width:30%;">
              <form on:submit|preventDefault={loginUsuario} class="row g-3 needs-validation mt-1" id="formulario">
                  <div class="form-floating mt-2 mb-2" style="width: 100%;" >
                      <input class="form-control bg-body rounded " id="email" placeholder="Email" name="email" required  bind:value={email}>
                      <label for="email">Email</label>

                  </div>
                  <div class="form-floating mt-2 mb-2" style="width: 100%;">
                      <input type="password" class="form-control  bg-body rounded" id="senha" placeholder="Enter password" name="pswd" required  bind:value={senha}>
                      <label for="senha">Senha</label>
                  </div>
                    <button id="button_enviar" type="submit" class="btn btn-dark mt-2 mb-1"  style="--bs-btn-padding-y: .10rem; --bs-btn-padding-x: .70rem; --bs-btn-font-size: .90rem; margin-bottom:50px; width:100%; height:50px;">Enviar</button>
                  
                  </form>
                  <p id="message"></p>
                  <a href="./administrador.html">clique aqui</a><br>
                  <a href="./menu.html">clique para ver o menu</a>
                  <a href="./login.html"></a>
            </div>
          </div>
</main>