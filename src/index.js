const colorsURL = 'http://localhost:3000/colors'
const cardContainer = document.querySelector('#card-container')
const colorVote = document.createElement('p')
const form = document.querySelector('form')

let votes = 0

fetch(colorsURL)
    .then(response => response.json())
    .then(showColors)

function showColors (colors){
    colors.forEach(createCard) 
}

function createCard(color){
        const colorCard = document.createElement('div')  
        let colorName = document.createElement('h2') 
        const colorVote = document.createElement('p')
        let  voteButton = document.createElement('button')
        let deleteButton = document.createElement('button')

        colorCard.classList = 'color-card'
        colorName.textContent = color.name
        colorVote.textContent = 0 
        voteButton.id = 'vote-button'
        voteButton.textContent = "+1 Vote!"
        deleteButton.id = 'delete-button'
        deleteButton.textContent = "Delete Color"

        colorCard.style.backgroundColor = color.hex
        colorCard.append(colorName, colorVote, voteButton, deleteButton)
        cardContainer.appendChild(colorCard)

        voteButton.addEventListener('click', () => {
            color.votes++
            colorVote.textContent = `${color.votes} Votes`
            colorVoteFetch(color)
        })

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
        body: JSON.stringify({name, hex, votes})
})
}

function deleteColor(color) {
    fetch(`${colorsURL}/${color.id}`, {method: 'DELETE'})
}

function colorVoteFetch(color){
    console.log(color)
    const votes = color.votes
    fetch(`${colorsURL}/${color.id}`,{
        method: 'PATCH', 
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({votes})
        
    })
}