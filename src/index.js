const colorsURL = 'http://localhost:3000/colors'

const cardContainer = document.querySelector('#card-container')
const form = document.querySelector('form')

fetch(colorsURL)
    .then(response => response.json())
    .then(showColors)

function showColors (colors){
    colors.forEach(createCard) 
}

function createCard(color){
        let colorCard = document.createElement('div')  
        let colorName = document.createElement('h2') 
        let colorVote = document.createElement('p')
        let  voteButton = document.createElement('button')
        let deleteButton = document.createElement('button')

        colorCard.classList = 'color-card'
        colorName.textContent = color.name
        colorVote.textContent = color.votes
        voteButton.id = 'vote-button'
        voteButton.textContent = "Vote for Color"
        deleteButton.id = 'delete-button'
        deleteButton.textContent = "Delete Color"

        colorCard.append(colorName, colorVote, voteButton, deleteButton)
        cardContainer.appendChild(colorCard)

        voteButton.addEventListener('click', ()=> collectVote(color))
        deleteButton.addEventListener('click', () => {
            deleteColor(color)
            colorCard.remove()
            })
    }

form.addEventListener('submit', submitForm)

function submitForm(event){
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const name = formData.get('name')
    const hex = formData.get('hex') 
    const color = { name, hex }
    createCard(color)

    fetch(colorsURL, {
        method: 'POST', 
        headers: { 'Content-type': 'application/json' }, 
        body: JSON.stringify({name, hex})
})
}

function deleteColor(color) {
    fetch(`${colorsURL}/${color.id}`, {method: 'DELETE'})
}
