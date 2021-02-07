const express = require('express')

const routes = express.Router()

const UserController = require('./controllers/UserController')
const ProductController = require('./controllers/ProductController')

routes.post('/user', UserController.store)

routes.get('/products', ProductController.index)
routes.post('/products', ProductController.store)

module.exports = routes