<script>
    // import { onMount } from 'svelte';
    import "./app.css"
    import axios from "axios";
    let email = "";
    let senha = "";
    let error = null;
    const api_base_url = "http://localhost:3000";
</script>

<main>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <div class="card">
    <div class="container text-center mt-3">
      <div class="d-flex justify-content-center align-items-center">
          <h1 style="font-size: 90px;">Capflix</h1>
      </div>
    </div>
      <div style="width:35%;" class="form-floating mb-5 mt-3 position-flex" id="div_cadastro">
          <h1 style="font-size: 200%; text-align: center;" class="form-floating mb-3 mt-3 position-flex">LOGIN:</h1>
          <div class="mb-4 mt-5">
            <form class="row g-1 needs-validation" id="formulario">
                <div class="form-floating mt-1 mb-3">
                    <input type="text" class="form-control shadow p-3 bg-body rounded " id="email" placeholder="Email" name="email" required  bind:value={email}>
                    <label for="email">Email</label>
                </div>
                <div class="form-floating mt-1 mb-3">
                    <input type="password" class="form-control shadow p-3 bg-body rounded " id="senha" placeholder="Enter password" name="pswd" required  bind:value={senha}>
                    <label for="senha">Senha</label>
                </div>
                  <button id="button_emviar"type="submit" class="btn btn-dark"  style="--bs-btn-padding-y: .70rem; --bs-btn-padding-x: .70rem; --bs-btn-font-size: .90rem; margin-bottom: 30px;">Enviar</button>

            </form>
</main>