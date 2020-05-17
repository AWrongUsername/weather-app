const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXdyb25ndXNlcm5hbWUiLCJhIjoiY2s5YWdhZGZtMDlmZDNnbnk5d3VlYXVmciJ9.mZWmdhc7JWlj0Z74wj5WcA&limit=1'

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.message) {
            callback('Invalid link!', undefined)
        } else if(body.features.length < 1) {
            callback('Didnt get any results!', undefined)
        } else {
            const result = body.features[0]
            const lat = body.features[0].center[1]
            const lon = body.features[0].center[0]
            const loc = body.features[0].place_name

            callback(undefined, {
                latitude: lat,
                longitute: lon,
                location: loc
            })
        }
    })
}

module.exports = geocode