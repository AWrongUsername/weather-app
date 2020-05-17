const path = require('path');
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


// Setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

// Define path for static files
app.use(express.static(path.join(__dirname, "../public")))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Naim V'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Naim V'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Naim V',
        message: "I'm useful!"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
         return res.send({
            error: 'Location not provided'
        })
    } else {

        geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
            if(error) {
                return res.send({error})
            }
        
            forecast(latitude, longitude, (error, data) => {
        
                if(error) {
                    return res.send({error})
                }
        
                res.send({
                    location,
                    forecast: data.forecast,
                    address: req.query.address
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    } else {
        res.send({
            products: []
        })
    }
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Something went wrong!",
        sub: "Try going to the help page!",
        link: "/help"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Something went wrong!",
        sub: "This page couldn't be found... Try going back home!",
        link: "/"
    })
})

app.listen(3000, () => {
    console.log("Server started!")
})