if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
// import json data
const restaurantList = require('../../public/restaurantList.json').results

// load Schema
const Restaurantlist = require('../restaurantList')
const User = require('../user')

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantIndex: [0, 1, 2]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantIndex: [3, 4, 5]
  }
]

db.once('open', () => {
  return Promise.all(
    SEED_USER.map((user) => {
      const { name, email, password, restaurantIndex } = user
      return User.create({
        name,
        email,
        // generate a salt and hash on separate function calls
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      }).then((user) => {
        const restaurants = restaurantIndex.map((index) => {
          const restaurant = restaurantList[index]
          restaurant.userId = user._id
          return restaurant
        })
        return Restaurantlist.create(restaurants)
      })
    })
  )
    .then(() => {
      console.log('restaurant list seeder created successfully')
      process.exit()
    })
    .catch((error) => console.log(error))
})
