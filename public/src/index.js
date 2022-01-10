const formData = document.querySelector('form')


formData.addEventListener('submit', (event) => {
    const city = document.getElementById('city-name').value

    document.getElementById('city').textContent = "Loading..."
    document.getElementById('temperature').textContent = ''
    document.getElementById('description').textContent = ''

    fetch('/weather?city=' + city).then(response => {

        response.json().then((data) => {
            if(data.cod == 400 || data.cod == 404){
                throw new Error("Provide valid location.")
            } else {
                if (data.error){
                    document.getElementById("city").textContent = "PLease provide valid location to find weather information."
                } else {
                    document.getElementById('city').textContent = "Cityname: " + data.city
                    document.getElementById('temperature').textContent = "Temperature: " + data.temperature
                    document.getElementById('description').textContent = "Weather Desciption: " + data.description 
                }
            }
        }).catch(err => {
            document.getElementById('city').textContent = "Error finding city"
        })
    })
    event.preventDefault()
})
