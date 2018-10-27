const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
// 1st condition is for heroku
const port = process.env.PORT || 3000;
var app = express();

// give path access to html
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('unable to append to server.log.');
    }
  });
  // you must add next or the web would stuck
  next();
});

// app.use((req, res, next) => {
//   res.render('maintaince.hbs');
// });

app.use(express.static(__dirname + '/public'));

// give function access to html
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'rex',
    likes: [
      'Bike',
      'Movie'
    ],
    pageName: 'Rex home',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  });
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'unable to handle request'
  });
})

app.get('/project', (req, res) => {
  res.render('project.hbs', {
    pageTitle: 'Project'
  });
});

app.listen(port, () => {
  console.log(`server is on port ${port}`);
});
