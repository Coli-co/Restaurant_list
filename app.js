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


// show all restaurant router
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results})

})



app.get('/restaurants', (req, res) => {
  res.send('This is restaurant list homepage.')

})


app.get('/restaurant/list',(req, res) => {
  res.send('This is good restaurant list.')
})

// show each restaurant router
app.get('/restaurantlist/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', {each_restaurant: restaurant})
})

// search restaurant router
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const search_restaurant = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', {restaurant: search_restaurant, keyword: keyword})
})



// Listening on port 3000
app.listen(port, () => {
  console.log(`Express is running on http://localhost/${port}`)
})