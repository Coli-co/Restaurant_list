const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')
const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))
// every request through body-parser process
app.use(bodyParser.urlencoded({ extended: true }))
// every request through methodOveride process
app.use(methodOverride('_method'))
app.use(routes)

// Listening on server
app.listen(port, () => {
  console.log(`Express is running on http://localhost/${port}`)
})
