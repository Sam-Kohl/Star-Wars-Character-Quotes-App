const update = document.querySelector('#update-button')

document.querySelector('#update-button').addEventListener('click',() => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: "Darth Vader",
            quote: 'I find your lack of faith disturbing'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})