const mongoose = require('mongoose')
const Restaurantlist = require('../restaurantList')
// import json data
const restaurantList = require('../../restaurantList.json')
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

  Restaurantlist.create(restaurantList.results)
    .then(() => {
      console.log('restaurant list seeder created successfully')
      db.close()
    })
    .catch((error) => console.log(error))
})
