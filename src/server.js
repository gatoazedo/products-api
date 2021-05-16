const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cors())

mongoose.connect(
  'mongodb+srv://guilherme:k20.c20xe-ap@products-api.znpil.mongodb.net/products-api?retryWrites=true&w=majority',
	{useNewUrlParser: true, useUnifiedTopology: true}
)

require('./controllers/AuthController')(app)
require('./controllers/ProductController')(app)

app.listen(3333)