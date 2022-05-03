const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/hbsfiles/partials');


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// Beers
app.all('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(value => {
    //console.log('Response is:', value);
    res.render('beers', { beers: value });
  })
  .catch(error => console.log(error));
});

// Random Beer

app.get('/randombeer', (req, res) => {
  punkAPI.getRandom()
  .then(responseFromAPI => {
    //const randomBeer = responseFromAPI[0];
   // console.log('the beer:', randomBeer);

    res.render('randombeer', {randombeer: responseFromAPI});
  })
  })
/*
  app.get('/random-beer', (req, res) => {
    punkAPI.getRandom()
    .then((randomBeerApi) => {
      res.render('random-beer', {randomBeer: randomBeerApi});
    })
  });
 */ 

app.listen(3000, () => console.log('🏃‍ on port 3000'));



