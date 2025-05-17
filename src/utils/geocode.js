const request = require('postman-request');
const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=test&limit=1&language=en';


    
    request({url, json: true}, (error, {body, statusCode}={}) => {
        if(error){
            callback('Unable to connect to location services!', undefined);
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined);

        }else if(statusCode !== 200){
            callback('Error: ' + response.statusCode, undefined);

        }else{
            
            
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
                });
                
            
            
        }
    
});

}


module.exports = geocode;