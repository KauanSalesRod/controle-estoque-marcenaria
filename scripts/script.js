let estoque = [];
const name = document.getElementById('item_name')
const qtd = document.getElementById('item_qtd')
const description = document.getElementById('item_descript')
const formulario = document.getElementById('form_estoque')
const ul_area = document.getElementById('estoque_lista')
const button_submit = document.getElementById('button_submit')
let numero_indice = null


formulario.addEventListener('submit', (event) => {

    event.preventDefault()
    let material = {
        name: name.value,
        amount: qtd.value,
        description: description.value
    };

    if (numero_indice !== null) {
        estoque[numero_indice] = material

    }
    else (
        estoque.push(material)
    )
    salvarEstoque()
    numero_indice = null
    console.log(estoque)
    window.alert('O item foi adicionado com sucesso!')
    name.value = ''
    qtd.value = ''
    description.value = ''


    renderizarEstoque()
})

function renderizarEstoque() {

    ul_area.innerHTML = ``

    estoque.forEach((item, indice) => {
        const removeButton = document.createElement('button')
        const novoElemento = document.createElement('li')
        const editButton = document.createElement('button')

        removeButton.textContent = 'Excluir'
        editButton.textContent = 'Editar'
        novoElemento.textContent = `Nome: ${item.name} - Quantidade: ${item.amount} - Descrição: ${item.description}`
        removeButton.addEventListener('click', () => deletarItem(indice))
        editButton.addEventListener('click', () => editarItem(indice))
        ul_area.appendChild(novoElemento)
        novoElemento.appendChild(removeButton)
        novoElemento.appendChild(editButton)
    })
}

function deletarItem(indice) {
    estoque.splice(indice, 1)
    salvarEstoque()
    renderizarEstoque()

}

function editarItem(indice) {
    name.value = estoque[indice].name
    qtd.value = estoque[indice].amount
    description.value = estoque[indice].description
    numero_indice = indice

}

function salvarEstoque() {
    localStorage.setItem('estoque_marcenaria', JSON.stringify(estoque))
}

function carregarEstoque() {

    let estoque_marcenaria = localStorage.getItem('estoque_marcenaria')
    let estoque_m = estoque

    if (estoque_marcenaria != null) {
        estoque_m = JSON.parse(estoque_marcenaria)
        estoque = estoque_m
        console.log('Estoque carregado com sucesso:', estoque)
        renderizarEstoque()
    }
}

carregarEstoque()