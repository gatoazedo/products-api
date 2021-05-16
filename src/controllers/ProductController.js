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

router.put('/update', async (req, res) => {
  try{
    const {productName, productDescription, productPrice, discount} = req.body
    const {_id} = req.query

    if(discount === true) {
      let newValue = productPrice * 0.75
      
      console.log(newValue)

      const product = await Product.findByIdAndUpdate(_id, {productName, productDescription, productPrice: newValue})

      if(!product)
        return res.status(404).send({error: 'Product does not exists'})

      return res.json({product})
    }

    const product = await Product.findByIdAndUpdate(_id, {productName, productDescription, productPrice})

    return res.json({product})

  } catch(err) {
    return res.status(400).send({error: 'Update failed'})
  }
})

module.exports = app => app.use('/products', router)