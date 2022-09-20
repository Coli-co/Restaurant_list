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

// click each restaurant and show details
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', {each_restaurant: restaurant})
})

// search restaurant router　through name & category
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  // if search bar is empty, return homepage
  if (!keyword) {
    return res.render('index',{ restaurant: restaurantList.results})
  }

  const search_restaurant = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  })
  res.render('index', {restaurant: search_restaurant, keyword: keyword})
})



// Listening on port 3000
app.listen(port, () => {
  console.log(`Express is running on http://localhost/${port}`)
})