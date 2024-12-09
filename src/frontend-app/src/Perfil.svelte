<script>
    import "./app.css"
    import axios from "axios";
    let nome = "";
    let email = "";
    let senha = "";
    const API_BASE_URL = "http://localhost:3000";

</script>

<main>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>

   <div class="card">
    <div class="container text-center mt-1">
        <div class="d-flex justify-content-center align-items-center" style="font-family:American Typewriter, serif;">
              <h1 style="font-size: 100px;">Capflix</h1>
              <img src="imagens/capivara.png" alt="" style="width: 10%;" id="inverter">
          </div>
        </div>
        <div>
            <div class="input-group mb-3">
                <form style="width: 20%">
                    <div>
                        <img src="imagens/.png" alt="" style="width: 70%;">
                    </div>
                    <div class="dropdown">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">Muda Senha</button>
                        <form class="dropdown-menu p-4">
                          <div class="mb-3">
                            <label for="senha" class="form-label">Senha</label>
                            <input type="password" class="form-control" id="senha" placeholder="senha">
                          </div>       
                        </form>
                      </div>
              </div>
        </div>
            
</main>