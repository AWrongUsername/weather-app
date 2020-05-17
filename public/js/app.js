console.log("Client side javascript file is loaded!")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mOne = document.querySelector('#mOne')
const mTwo = document.querySelector('#mTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    mOne.textContent = 'Loading!'
    mTwo.textContent = ""

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                mOne.textContent = data.error
            } else {
                mOne.textContent = data.location
                mTwo.textContent = data.forecast
            }
        })
    })
})