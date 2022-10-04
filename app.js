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
// load Restaurantlist model
const Restaurantlist = require('./models/restaurantList')
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

// homepage:show all restaurant router
app.get('/', (req, res) => {
  Restaurantlist.find()
    .lean()
    .then((restaurant) => res.render('index', { restaurant }))
    .catch((error) => console.log(error))
})
// create new restaurant router
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
// create new restaurant router
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

// edit restaurant
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  Restaurantlist.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

// update restaurant
app.post('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurantlist.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error))
})

// delete restaurant
app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  Restaurantlist.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// search restaurant router　through name & category
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const keywordEnter = req.query.keyword

  // if search bar is empty, return homepage
  if (!keyword) {
    return res.redirect('/')
  }
  Restaurantlist.find()
    .lean()
    .then((restaurant) => {
      const searchRestaurant = restaurant.filter(
        (data) =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render('index', {
        restaurant: searchRestaurant,
        keyword: keywordEnter
      })
    })
    .catch((error) => console.log(error))
})

// Listening on port 3000
app.listen(port, () => {
  console.log(`Express is running on http://localhost/${port}`)
})
