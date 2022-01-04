require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const {geocode, forecast} = require('./src/geocode')
const ejs = require('ejs')
const port = process.env.PORT
const https = require('https')
const { response } = require('express')
const API = process.env.API_KEY

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/weather', (req, res, next) => {

    if(!req.query.city) {
        return res.send({error: "No city name is provided."})
    }

    // geocode(req.query.city, (err, data) => {
    //     if(err) {
    //         res.send({
    //             error: 404,
    //             message: "Unbale to find city."
    //         })
    //     } else {
    //         forecast(data, (err, data) => {
    //             if(err){
    //                 res.send({
    //                     error: "There is no location with such coordinates."
    //                 })
    //             } else {
    //                 res.send(data)
    //             }
    //         })
    //     }
    // })
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + req.query.city + '&appid=' + API

    https.get(url, (response) => {
        response.on('data', (data) => {
            const weatherData = JSON.parse(data.toString())

            if(weatherData.cod == 404) {
                res.send({error: "There is not such location."})
            } else {
                res.send({
                    error: undefined,
                    city: weatherData.name,
                    temperature: weatherData.main.temp,
                    description: weatherData.weather[0].description
                })
            }
        })
    })
})

app.listen(port || 3000, (req, res) => {
    console.log("The server is running on port " + port + "...")
})