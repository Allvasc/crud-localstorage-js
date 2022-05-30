const data = {
    nome: "Allison",
    email: "ah.vasconcelos@gmail.com",
    telefone: "85989075373",
    dt_nascimento: "07/01/1989"
}



const getLocalStorage = () => JSON.parse(localStorage.getItem("db-user")) || []

const setLocalStorage = (dbClient) => localStorage.setItem("db-user", JSON.stringify(dbClient))


//create
const createUser = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

//read
const readUser = () => getLocalStorage()

//update

const updateUser = (index, client) => {
   const dbClient = readUser()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

//delete
const deleteUser = (index) => {
    const dbClient = readUser()
    dbClient.splice(index,1)
    setLocalStorage(dbClient)
}

const excluir = document.getElementById("excluir")
//excluir.addEventListener("click", deleteUser) 

//validação 

const isValidFields = () => {
   return document.getElementById("form").reportValidity()
}


//limpar campos
const clearFields = () => {
    const fields =  document.querySelectorAll('.modal-field')
    fields.forEach(fields => fields.value = "")
}

//função salvar

const saveUser = () => {
    if(isValidFields()){
        const newUser = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value,
            dt_nascimento: document.getElementById("dt_nascimento").value
        }
        createUser(newUser)
        clearFields()
        updateTable()
        closeModal()
    }
}

const salvar = document.getElementById("salvar")
salvar.addEventListener("click", saveUser)

const createRow = (user) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${user.nome}</th>
    <td>${user.email}</td>
    <td>${user.telefone}</td>
    <td>${user.dt_nascimento}</td>
    <td>
        <button>editar</button>
        <button id="excluir">excluir</button>
    </td>
    `
    document.querySelector("#tableUser>tbody").appendChild(newRow)
}

const clearTable = () => {
    const rows =  document.querySelectorAll("#tableUser>tbody tr")
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readUser()
    clearTable()
    dbClient.forEach(createRow)
}

updateTable()

//FUNÇÕES DE ABERTURA E FECHAMENTO DO MODAL
const modal = document.getElementById("modal")
const addusuario = document.getElementById("addusuario")
const closebutton = document.getElementById("closebutton")

const openModal = () => {
    modal.classList.remove("close")
}

const closeModal = () => {
    modal.classList.add("close")
    clearFields()
}

closebutton.addEventListener("click", closeModal)
addusuario.addEventListener("click", openModal)