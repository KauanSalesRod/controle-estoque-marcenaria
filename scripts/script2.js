/* const usuarioLogado = localStorage.getItem("usuarioLogado")

if (!usuarioLogado){
    window.location.replace('login.html')
}
 */
let estoque = [];
let input_name = document.getElementById("item_name");
let input_quantidade = document.getElementById("item_qtd");
let input_desc = document.getElementById("item_desc")
const button = document.getElementById("button_submit")
const area_form = document.getElementById("form_estoque")
const area_lista = document.getElementById("estoque_lista")
let titulo = document.querySelector('h1')
let indiceEdicao = null
const buttonLimparBD = document.getElementById("clearStorage")

carregarBancoDeDados()
renderizarLista()

area_form.addEventListener("submit", (event) => {
    event.preventDefault() /* Evitar atualização automática da página ao enviar os dados do formulário */

    let produto = capturarDadosFormulario(input_name, input_quantidade, input_desc)
    /* Cria uma variável que armazena o valor capturado dos inputs */


    if (indiceEdicao !== null) {
        produto = {
            nome: estoque[indiceEdicao].nome,
            quantidade: estoque[indiceEdicao].quantidade,
            descricao: estoque[indiceEdicao].descricao
        }

        estoque.splice(indiceEdicao, 1)
        estoque.push(produto)
        atualizarBancoDeDados()
        carregarBancoDeDados()
    }

    else {
        salvarEstoque(produto)
        atualizarBancoDeDados()
        carregarBancoDeDados()
    }
    renderizarLista()
    input_desc.value = ''
    input_name.value = ''
    input_quantidade.value = ''
    console.log(localStorage)
    indiceEdicao = null


})



function capturarDadosFormulario() {
    const nome = input_name.value
    const descricao = input_desc.value
    const quantidade = input_quantidade.value

    const produto = {
        nome: nome,
        quantidade: quantidade,
        descricao: descricao
    }


    return produto
};

function salvarEstoque(produto) {
    estoque.push(produto)
};

function atualizarBancoDeDados() {
    localStorage.setItem('estoque_m', JSON.stringify(estoque))
}

function carregarBancoDeDados() {
    let estoque_m = localStorage.getItem('estoque_m')

    return estoque_m ? JSON.parse(estoque_m) : []
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

    removeButton.addEventListener('click', () => botaoExcluir(indice))
    editButton.addEventListener('click', () => botaoEditar(indice))
};

function renderizarLista() {
    const ul = document.getElementById("estoque_lista")

    ul.textContent = ''

    estoque.forEach((item, indice) => {
        criarElemento(item, indice)
    });
};

function botaoExcluir(indice) {
    estoque.splice(indice, 1)
    renderizarLista()
    atualizarBancoDeDados()
}

function botaoEditar(indice) {

    input_name.value = estoque[indice].nome;
    input_quantidade.value = estoque[indice].quantidade;
    input_desc.value = estoque[indice].descricao;

    indiceEdicao = indice;

    button.textContent = 'Salvar alteração';
}


buttonLimparBD.addEventListener('click', function () {
    localStorage.clear()
    carregarBancoDeDados()
    renderizarLista()

})