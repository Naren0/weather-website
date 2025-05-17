
const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6f45571bf46f6a7948bf38443b075693&query=' + latitude + ',' + longitude ;
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined);
        }else if(body.error){
            callback('Unable to find location. Try another search.', undefined);
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.');
        }
    });
}

module.exports = forecast;