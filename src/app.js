const path = require('path');
const express = require('express');
const app = express(); 
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const port = process.env.PORT || 3000;
// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Naren G'
  });
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Naren G'
  });
 });

 app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is some helpful text.',
    name: 'Naren G'
  });
 });

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must provide an address'
    });
  }

  geocode(req.query.address, (error, {longitude, latitude, location}={}) => {

    if(error){
       return res.send({
          error,
       })
    } 
    forecast(longitude, latitude, (error, forecastData) => {
        if(error){
          return res.send({
            error,
          })
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      })
    
});
});

app.get('/products', (req, res) => {
  if(!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    });
  }
  res.send({
    products: []
  });

})

app.get ('/help/:anything', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Naren G',
    errorMessage: 'Help article not found'
  });
  });

app.get('/:anything', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Naren G',
    errorMessage: 'Page not found'
  });   
})

app.listen(port, () => {
  console.log('Server is running on port '+port);
});