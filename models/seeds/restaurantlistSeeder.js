const mongoose = require('mongoose')
const Restaurantlist = require('../restaurantList')
// import json data
const restaurantList = require('../../restaurantList.json')

const db = require('../../config/mongoose')

db.once('open', () => {
  Restaurantlist.create(restaurantList.results)
    .then(() => {
      console.log('restaurant list seeder created successfully')
      db.close()
    })
    .catch((error) => console.log(error))
})
