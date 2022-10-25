const express = require('express')
const router = express.Router()
const Restaurantlist = require('../../models/restaurantList')

// Routes that only user can see
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurantlist.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then((restaurant) => res.render('index', { restaurant }))
    .catch((error) => console.log(error))
})

// search restaurant router　through name & category
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const keywordEnter = req.query.keyword
  const recommendName = []
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
        let temp = {}
        if (!temp.hasOwnProperty(item.name)) {
          temp['name'] = item.name
          temp['category'] = item.category
          temp['id'] = item._id
          recommendName.push(temp)
        }
      })

      // check match result
      const matchResult = searchRestaurant.length === 0 ? true : false

      res.render('index', {
        restaurant: searchRestaurant,
        keyword: keywordEnter,
        matchResult,
        recommendName
      })
    })
    .catch((error) => console.log(error))
})

module.exports = router
