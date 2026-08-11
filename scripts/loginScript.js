import { Usuario } from "./usuario";

const usuarioValido = new Usuario("Kauan Sales", "kauan@gmail.com", "Kauan123");
const email = document.getElementById('email')
const senha = document.getElementById('senha')
const button = document.getElementById('submit-button')
const form = document.getElementById('form-login')


form.addEventListener('submit', (event) => {
    event.preventDefault()

    if (usuarioValido.autenticar(email.value, senha.value)) {
        console.log("Acesso liberado! Seja bem-vindo.");
        localStorage.setItem('usuarioLogado', 'true')
        window.location.replace('index.html')
    }

    else {
        console.log("E-mail ou senha incorretos.");
    }
})