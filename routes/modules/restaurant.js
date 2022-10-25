const express = require('express')
const router = express.Router()
const Restaurantlist = require('../../models/restaurantList')

// create new restaurant router
router.get('/new', (req, res) => {
  return res.render('new')
})

// create new restaurant router
router.post('/', (req, res) => {
  const userId = req.user._id
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description
  } = req.body
  return Restaurantlist.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
    userId
  })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// show each restaurant details
router.get('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id

  return Restaurantlist.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

// edit restaurant
router.get('/:restaurant_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return Restaurantlist.findOne({ _id, userId })
    .lean()
    .then((restaurant) =>
      res.render('edit', {
        restaurant
      })
    )
    .catch((error) => console.log(error))
})

// update restaurant
router.put('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description
  } = req.body
  return Restaurantlist.findOne({ _id, userId })
    .then((restaurant) => {
      ;(restaurant.name = name),
        (restaurant.name_en = name_en),
        (restaurant.category = category),
        (restaurant.image = image),
        (restaurant.location = location),
        (restaurant.phone = phone),
        (restaurant.google_map = google_map),
        (restaurant.rating = rating),
        (restaurant.description = description)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch((error) => console.log(error))
})

// delete restaurant
router.delete('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return Restaurantlist.findByIdAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
