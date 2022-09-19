const express = require('express')
const app = express()
const port = 3000
// require express-handlebars
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
  res.render('index')
})



app.get('/restaurant', (req, res) => {
  res.send('This is restaurant list homepage.')
})


app.get('/restaurant/list',(req, res) => {
  res.send('This is good restaurant.')
})


app.get('/restaurant/list/:detail', (req, res) => {
  res.send(`<h1>${req.params.detail} is a good restaurant!</h1>`)
})


// Listening on port 3000
app.listen(port, () => {
  console.log(`Express is running on http://localhost/${port}`)
})