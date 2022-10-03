const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
// require express-handlebars
const exphbs = require('express-handlebars')
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

const mongoose = require('mongoose')
const Restaurantlist = require('./models/restaurantList') // load Restaurantlist model
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => {
  console.log('Mongodb error!')
})

db.once('open', () => {
  console.log('Mongodb connected!')
})

// setting static files
app.use(express.static('public'))
// every request through body-parser process
app.use(bodyParser.urlencoded({ extended: true }))
// show all restaurant router
app.get('/', (req, res) => {
  Restaurantlist.find()
    .lean()
    .then((restaurant) => res.render('index', { restaurant }))
    .catch((error) => console.log(error))
})
// create restaurant router
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
// create restaurant router
app.post('/restaurant', (req, res) => {
  const name = req.body.name
  return Restaurantlist.create({ name })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// show each restaurant details
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurantlist.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

// search restaurant router　through name & category
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  // if search bar is empty, return homepage
  if (!keyword) {
    return res.render('index', { restaurant: restaurantList.results })
  }

  const search_restaurant = restaurantList.results.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.includes(keyword)
    )
  })
  res.render('index', { restaurant: search_restaurant, keyword: keyword })
})

// Listening on port 3000
app.listen(port, () => {
  console.log(`Express is running on http://localhost/${port}`)
})
