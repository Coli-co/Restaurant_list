const express = require('express')
const app = express()
const port = 3000
// require express-handlebars
const exphbs = require('express-handlebars')
// import json data
const restaurantList = require('./restaurantList.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results})
})



app.get('/restaurants', (req, res) => {
  res.send('This is restaurant list homepage.')
  // res.render('index')
})


app.get('/restaurant/list',(req, res) => {
  res.send('This is good restaurant.')
})


app.get('/restaurants/list/:detail', (req, res) => {
  res.send(`<h1>${req.params.detail} is a good restaurant!</h1>`)
})


// Listening on port 3000
app.listen(port, () => {
  console.log(`Express is running on http://localhost/${port}`)
})