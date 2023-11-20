const button = document.querySelector('button')


button.addEventListener('click', async () => {
    const locationEl = document.querySelector('#location')
    const location = locationEl.textContent
    localStorage.setItem('location', location)
    document.location.reload()
})
