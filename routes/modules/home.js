const express = require('express')
const router = express.Router()
const Restaurantlist = require('../../models/restaurantList')

// homepage:show all restaurant router
router.get('/', (req, res) => {
  Restaurantlist.find({})
    .lean()
    .then((restaurant) => res.render('index', { restaurant }))
    .catch((error) => console.log(error))
})

// search restaurant router　through name & category
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const keywordEnter = req.query.keyword
  const recommendName = []
  const recommendCategory = []
  // if search bar is empty, return homepage
  if (!keyword) {
    return res.redirect('/')
  }
  Restaurantlist.find({})
    .lean()
    .then((restaurant) => {
      const searchRestaurant = restaurant.filter(
        (data) =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )

      // recommend restaurant & category
      restaurant.forEach((item) => {
        if (!recommendName.includes(item.name)) {
          recommendName.push(item.name)
        }
        if (!recommendCategory.includes(item.category)) {
          recommendCategory.push(item.category)
        }
      })
      // check match result
      const matchResult = searchRestaurant.length === 0 ? true : false

      res.render('index', {
        restaurant: searchRestaurant,
        keyword: keywordEnter,
        matchResult,
        recommendName,
        recommendCategory
      })
    })
    .catch((error) => console.log(error))
})

module.exports = router
