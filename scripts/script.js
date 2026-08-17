import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const url = "https://krqiolnlbrdrgrhcjixt.supabase.co"
const anon_key = "sb_publishable_Kgt84e0nO00Uhso8f81c9w_oEQbrjiM"
const supabase = createClient(url, anon_key)
let email = document.getElementById('user_email')
let estoque = [];
let input_name = document.getElementById("item_name");
let input_quantidade = document.getElementById("item_qtd");
let input_desc = document.getElementById("item_desc")
const button = document.getElementById("button_submit")
const area_form = document.getElementById("form_estoque")
const area_lista = document.getElementById("estoque_lista")
let titulo = document.querySelector('h1')
let idEdicao = null
const buttonLimparBD = document.getElementById("clearStorage")
const buttonLogOut = document.getElementById('btn_logout')
const mensagemFeedback = document.getElementById('mensagem_feedback')

async function inicializar() {
    await verificarUsuario()
    await carregarBancoDeDados()
}

inicializar()
atualizarPerfil('Kauan Sales Rodrigues')
const { data: { user } } = await supabase.auth.getUser()

if (user && user.user_metadata) {
    console.log("Nome do usuário:", user.user_metadata.nome)
}


area_form.addEventListener("submit", async (event) => {
    event.preventDefault() /* Evitar atualização automática da página ao enviar os dados do formulário */

    let produto = capturarDadosFormulario()

    if (idEdicao !== null) {
        const { error } = await supabase
            .from('estoque')
            .update(produto)
            .eq('id', idEdicao)

        if (error) {
            exibirFeedback("Erro ao atualizar produto.", "erro")
        }
        else {
            exibirFeedback("Produto atualizado com sucesso!", "sucesso")
            idEdicao = null
            button.textContent = 'Cadastrar'
        }
    }

    else {
        // --- MODO CRIAÇÃO (INSERT) ---
        const { data: { user } } = await supabase.auth.getUser()
        produto.user_id = user.id

        const { error } = await salvarEstoque(produto)

        if (error) {
            console.error(error)
            exibirFeedback("Erro ao cadastrar produto.", "erro")
        } else {
            exibirFeedback("Produto cadastrado com sucesso!", "sucesso")
        }
        input_name.value = ''
        input_quantidade.value = ''
        input_desc.value = ''
    }
    await carregarBancoDeDados()
});

async function atualizarPerfil(novoNome, novoEmail) {
    const { data, error } = await supabase.auth.updateUser({
        email: novoEmail,
        data: {
            nome: novoNome
        }
    })

    if (error) {
        console.error("Erro ao atualizar perfil:", error)
        exibirFeedback("Erro ao atualizar dados.", "erro")
        return
    }

    exibirFeedback("Dados atualizados com sucesso!", "sucesso")
}

function capturarDadosFormulario() {
    return {
        nome: input_name.value,
        quantidade: Number(input_quantidade.value),
        descricao: input_desc.value
    }
}

async function salvarEstoque(produto) {
    const { data, error } = await supabase.from('estoque').insert([produto])

    return { data, error }
};

function atualizarBancoDeDados() {
    localStorage.setItem('estoque_m', JSON.stringify(estoque))
}

async function carregarBancoDeDados() {
    const { data, error } = await supabase
        .from('estoque')
        .select('*')
    if (error) {
        exibirFeedback("Erro ao carregar estoque.", 'erro')
        return
    }
    estoque = data
    await console.log(estoque)
    await renderizarLista()
};


function criarElemento(item, indice) {
    const novoElemento = document.createElement('li')
    const editButton = document.createElement('button')
    const removeButton = document.createElement('button')

    novoElemento.textContent = `Nome: ${item.nome} - Quantidade: ${item.quantidade} - Descrição : ${item.descricao}`
    editButton.textContent = "Editar"
    removeButton.textContent = "Remover"

    novoElemento.appendChild(editButton)
    novoElemento.appendChild(removeButton)
    area_lista.appendChild(novoElemento)

    removeButton.addEventListener('click', () => botaoExcluir(item.id))
    editButton.addEventListener('click', () => preencherCamposEdicao(item))
};

function renderizarLista() {
    const ul = document.getElementById("estoque_lista")

    ul.textContent = ''

    estoque.forEach((item) => {
        criarElemento(item)
    });
};

async function botaoExcluir(id) {
    const { error } = await supabase
        .from('estoque')
        .delete()
        .eq('id', id)

    if (error) {
        exibirFeedback("Erro ao excluir produto.", "erro")
        return
    }

    exibirFeedback("Produto removido com sucesso!", "sucesso")
    await carregarBancoDeDados()
}


function preencherCamposEdicao(item) {
    input_name.value = item.nome
    input_quantidade.value = item.quantidade
    input_desc.value = item.descricao

    idEdicao = item.id
    button.textContent = 'Salvar alteração'
}


buttonLimparBD.addEventListener('click', function () {
    localStorage.clear()
    carregarBancoDeDados()
    renderizarLista()

})

async function verificarUsuario() {
    const { data, error } = await supabase.auth.getUser()
    if (error || !data.user) {
        window.location.replace('login.html')
    }

    email.textContent = data.user.email;

}

buttonLogOut.addEventListener('click', async () => {
    await supabase.auth.signOut()
    exibirFeedback("Realizando LogOut...", 'sucesso')
    setTimeout(() => {
        window.location.href = 'login.html'
    }, 1500)
})

function exibirFeedback(texto, tipo) {

    mensagemFeedback.textContent = texto
    if (tipo === 'erro') {
        mensagemFeedback.style.background = '#d9534f' 
    } else if (tipo === 'sucesso') {
        mensagemFeedback.style.background = '#5cb85c'

    }

}