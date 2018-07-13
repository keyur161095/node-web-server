const express = require('express');
const fs =require('fs');

var app = express();
var hbs = require('hbs');


app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYeaar', () =>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIttt', (text) => {
  return text.toUpperCase();
})

app.use((req, res, next) => {
  next();
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url} \n`
  console.log(log);
  fs.appendFile('log.log', log, (error) => {
    if(error) throw error;
  })
})

app.use((req, res, next) => {
  res.render('maintanance.hbs')
})

app.use(express.static(__dirname + '/public'));

  app.get('/about', (req, res) => {
    res.render('about.hbs', {
      pageTitle: 'About Pagee'
    });
  });

  app.get('/', (req, res) => {
    res.render('home.hbs', {
      pageTitle: 'the home pagee',
      welcomeMessage: 'Welcome to home page.'
    })
  })

  app.listen(3000);





















// app.get('/', (req, res) => {
//   // res.send('<h1>Hello Express!</h1>');
//   res.send({
//     name: 'keyur',
//     likes: [
//       'books',
//       'computers',
//       'food'
//     ]
//   })
// });
//
// app.get('/about', (req, res) =>{
//   res.send('about pagefffffffffff');
// });
//
// app.get('/bad', (req, res) => {
//   res.send({
//     Error: 'unable to handle the request'
//   });
// });
