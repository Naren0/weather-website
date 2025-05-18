const request = require('postman-request');
const geocode = (address, callback) => {
    const url = 'https://api.tomtom.com/search/2/geocode/' + encodeURIComponent(address) +'.json?key=u5qtIfGQAUt21Y4ILngzHkEG1lVZsEC2&limit=1';


    
    request({url, json: true}, (error, {body, statusCode}={}) => {
        if(error){
            callback('Unable to connect to location services!', undefined);
        }else if(body.results.length === 0){
            callback('Unable to find location. Try another search.', undefined);

        }else if(statusCode !== 200){
            callback('Error: ' + response.statusCode, undefined);

        }else{
            
            
            callback(undefined, {
                latitude: body.results[0].position.lat,
                longitude: body.results[0].position.lng,
                location: body.results[0].address.freeformAddress
                });
                
            
            
        }
    
});

}


module.exports = geocode;