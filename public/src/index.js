const formData = document.querySelector('form')


formData.addEventListener('submit', (event) => {
    const city = document.querySelector('input').value

    document.getElementById('city').textContent = "Loading..."
    document.getElementById('temperature').textContent = ''
    document.getElementById('description').textContent = ''

    fetch('/weather?city=' + city).then(response => {

        response.json().then((data) => {
            if(data.cod == 400 || data.cod == 404){
                console.log("Please provide valid location.")
            } else {
                if (data.error){
                    document.getElementById("city").textContent = "PLease provide valid location to find weather information."
                } else {
                    document.getElementById('city').textContent = "Cityname: " + data.city
                    document.getElementById('temperature').textContent = "Temperature: " + data.temperature
                    document.getElementById('description').textContent = "Weather Desciption: " + data.description 
                }
            }
        })
    })
    event.preventDefault()
})
