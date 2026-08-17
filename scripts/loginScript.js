import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const url = "https://krqiolnlbrdrgrhcjixt.supabase.co"
const anon_key = "sb_publishable_Kgt84e0nO00Uhso8f81c9w_oEQbrjiM"

const supabase = createClient(url, anon_key)

const email = document.getElementById('email')
const senha = document.getElementById('senha')
let dados = {}
const button = document.getElementById('submit-button')
const form = document.getElementById('form-login')
const mensagemFeedback = document.getElementById('mensagem_feedback')

form.addEventListener('submit', async (event) => {

    event.preventDefault()

    const userEmail = email.value
    const password = senha.value

    dados = {
        email: userEmail,
        password: password
    }


    const { data, error } = await supabase.auth.signInWithPassword(dados)

    if (error) {
        exibirFeedback("E-mail ou senha inválidos!", "erro")
    }
    else {
        exibirFeedback("Login Realizado Com Sucesso!", "sucesso")

        setTimeout(() => {
            window.location.href = 'index.html'
        }, 1500)
    }

function exibirFeedback(texto, tipo) {

    mensagemFeedback.textContent = texto
    if (tipo === 'erro') {
        mensagemFeedback.style.background = '#d9534f' // Vermelho
    } else if (tipo === 'sucesso') {
        mensagemFeedback.style.background = '#5cb85c' // Verde
    }

}})