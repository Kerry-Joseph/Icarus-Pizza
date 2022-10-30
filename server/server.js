require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const { default: mongoose } = require('mongoose')

const app = express()

app.listen(2000, () => console.log('server live on 2000'))

// middleware --
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// database (mongoDB) --
mongoose.connect(process.env.DB_URL)
mongoose.connection
  .on('open', () => console.log('db connected'))
  .on('close', () => console.log('db disconnected'))
  .on('error', () => console.log('db error'))

// routes --
const dealsRoute = require('./controllers/deals')
app.use('/deals', dealsRoute)
const menuRoute = require('./controllers/menu')
app.use('/menu', menuRoute)
const presetsRoute = require('./controllers/presets')
app.use('/presets', presetsRoute)

// test
app.get('/', (req, res) => {
  res.send("works")
})



