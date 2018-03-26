const request = require('request')

var getAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address),
            json: true
        }, (error, response, body) => {
            try {
                if (!error && response.statusCode === 200) {
                    console.log(body)
                    request_venue = address,
                        address = body.results[0].formatted_address,
                        location = body.results[0].geometry.location
                    stuff = { 'request_venue': request_venue, 'address': address, 'location': location }
                    resolve(stuff)

                } else {
                    reject('Not Found')
                }
            } catch(err) {
                reject('Location Not found')
            }

        })
    })


}

var getWeather = (longitude, latitude) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://api.darksky.net/forecast/db91c58923628790d6dac49a837a1464/' + longitude + ',' + latitude,
            json: true
        }, (error, response, body) => {
            try{
                thestuff = JSON.stringify(body.currently.summary)
                resolve(thestuff)
            }
            catch(err){
                reject('Weather Not found')
            }
            
        })
    })


}

module.exports = { getAddress, getWeather }