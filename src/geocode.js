const { response } = require('express')
const res = require('express/lib/response')
const https = require('https')
const API = process.env.API_KEY

const geocode = (address, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + address + '&appid=' + API

    https.get(url, (response) => {
        response.on('data', (data) => {
            const cityData = JSON.parse(data.toString())

            if(cityData.cod == 404) {
                callback(cityData, undefined)
            } else {
                const coord = {
                    lon: cityData.coord.lon,
                    lat: cityData.coord.lat
                }
                callback(undefined, coord)
            }
        })
    }).on('error', (err) => {
        callback(err, undefined)
    })
}

const forecast = (forecastData, callback) => {
    const {lon, lat} = forecastData

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + "&lon=" + lon + '&appid=' + API
    https.get(url, (response) => {
        response.on('data', (data) => {
            const cityData = JSON.parse(data.toString())

            callback(undefined, {
                city: cityData.name,
                temperature: cityData.main.temp,
                description: cityData.weather[0].description
            })
        }).on('error', (err) => {
            callback(err, undefined)
        })
    })
}

module.exports = {
    "geocode": geocode,
    "forecast": forecast
}