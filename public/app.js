const form = document.querySelector('.formulario');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirma_senha = document.getElementById('confirma_senha');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        nome: nome.value,
        email: email.value,
        senha: senha.value,
        confirma_senha: confirma_senha.value
    };

    try{
        const response = await fetch('/registra-usuario', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if(result.status == 'failed'){
            document.getElementById('message').innerHTML = result.message;
        }
        else{
            document.getElementById('message').innerHTML = result.message;
            nome.value = '';
            email.value= '';
            senha.value = '';
            conf_senha.value = '';
        }
    } catch (error){
        console.log('Error: ', error);
    }
});