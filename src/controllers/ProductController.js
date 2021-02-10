const express = require('express')

const authMiddleware = require('../middlewares/auth')
const Product = require('../models/Product')

const router = express.Router()

router.use(authMiddleware)

router.get('/list', async (req, res) => {
  const {productName} = req.query

  const products = await Product.find({productName})
  
  if(products == '')
    return res.status(404).send({error: 'Product not found'})

  return res.send({products})
})

router.post('/create', async (req, res) => {
  try{
    const product = await Product.create(req.body)

    return res.send({product})
  } catch(err) {
    return res.status(400).send({error: 'Creation failed'})
  }
})

module.exports = app => app.use('/products', router)