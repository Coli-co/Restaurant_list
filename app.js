const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('This is homepage.')
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