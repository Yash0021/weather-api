require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const {geocode, forecast} = require('./src/geocode')
const ejs = require('ejs')
const port = process.env.PORT || 3000

const app = express()
const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/public"))

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/about', (req, res) => {
    res.render('about')
})

router.get('/weather', (req, res, next) => {

    if(!req.query.city) {
        return res.send({error: "No city name is provided."})
    }

    geocode(req.query.city, (err, data) => {
        if(err) {
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


app.use(router)

app.listen(port, (req, res) => {
    console.log("The server is running on port " + port + "...")
})