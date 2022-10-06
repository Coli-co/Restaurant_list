const express = require('express')
const router = express.Router()
const Restaurantlist = require('../../models/restaurantList')

// create new restaurant router
router.get('/new', (req, res) => {
  return res.render('new')
})

// create new restaurant router
router.post('/', (req, res) => {
  const name = req.body.name
  return Restaurantlist.create({ name })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// show each restaurant details
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id

  Restaurantlist.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

// edit restaurant
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  Restaurantlist.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

// update restaurant
router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurantlist.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error))
})

// delete restaurant
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurantlist.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
