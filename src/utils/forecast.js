const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e948d97e3632ff6078cc28e6976a079b&query='+latitude+','+longitude+'&units=m'

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback("Unable to connect to weather service!", undefined)
        } else if(body.error) {
            callback("Unable to find location!", undefined)
        } else {
            const data = body
            callback(undefined, {
                forecast: body.current.weather_descriptions[0]+". It is currently "+data.current.temperature+" degrees out. It feels like "+data.current.feelslike+" degrees out. There is a "+data.current.precip +"% chance of rain. Wind speed is "+ data.current.wind_speed + " km/h."
            })
        }
    })
}

module.exports = forecast