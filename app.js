require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const {geocode, forecast} = require('./src/geocode')
const ejs = require('ejs')
const port = process.env.PORT

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

    geocode(req.query.city, (err, data) => {
        if(err && data == undefined) {
            res.send({
                error: 404,
                message: "Unbale to find city."
            })
        } else {
            forecast(data, (err, data) => {
                if(err){
                    res.send({
                        error: "There is no location with such coordinates."
                    })
                } else {
                    res.send(data)
                }
            })
        }
    })
})

app.listen(port || 3000, (req, res) => {
    console.log("The server is running on port " + port + "...")
})