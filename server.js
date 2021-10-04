const http = require('http')
const express = require('express')
const db = require('./model/trips.js')
const hostname = '127.0.0.1';
const port = 3000;
const app = express();


let id = 3;


app.set('view engine', 'ejs')
app.set('views', 'views')

const server = http.createServer(app)

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))






app.get("/", (req, res) => {
  res.render('home', {
    title: "Trip Planner",
  })

})


app.post('/delete/:id', (req, res) => {
  const foundTrip = db.find((trip) => {
    return trip.id === parseInt(req.params.id)
  })
  db.pop(foundTrip)
  console.log(' it is removed!!')
  res.redirect('/')
  
  
})

app.get("/new", (req, res) => {
  res.render('new', {
    title: "Add a Trip",
  })
})

app.post('/new', (req, res) => {
  const newTrip = {
    id: id++,
    title: req.body.trip_title.toLowerCase().replace(' ', '_'),
    departure_date: req.body.departure_date,
    return_date: req.body.return_date
  }
  db.push(newTrip)
  console.log('New trip Received', newTrip)
  res.redirect('/')
})

app.get("/new/:id", (req, res) => {
  // get data from the db.specials
  const foundTrip = db.find((trip) => {
    return trip.id === parseInt(req.params.id)
  })
  // render the template
  res.render("details", {
    title: "Details",
    trip: foundTrip
  })
})







app.get('/*', (req, res) => {
  res.status(404)
  res.send('Not Found')
})
// needed to listen for req and res 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})