const express = require('express')
const multer = require('multer')

const authMiddleware = require('../middlewares/auth')
const multerConfig = require('../config/multer')

const Product = require('../models/Product')
const User = require('../models/User')

const router = express.Router()

router.use(authMiddleware)

router.get('/list', async (req, res) => {
  const {productName} = req.query

  const products = await Product.find({productName})
  
  if(products == '')
    return res.status(404).send({error: 'Product not found'})

  return res.send({products})
})

router.post('/store', multer(multerConfig).single('file'), async (req, res) => {
  try{
    const {file} = req.file
    const {productName, productDescription, productPrice} = req.body
    const {user_id} = req.headers

    const user = await User.findById(user_id)

    if(!user)
      return res.status(401).send({error: 'User does not exists'})
    
    const product = await Product.create({
      user: user_id,
      image: file,
      productName,
      productDescription,
      productPrice
    })
    
    return res.send({product})
  } catch(err) {
    return res.status(400).send({error: 'Creation failed'})
  }
})

router.put('/update', async (req, res) => {
  try{
    const {productName, productDescription, productPrice, discount} = req.body
    const {_id} = req.query

    const product = await Product.findById({_id})

    if(!product) 
      return res.status(404).send({error: 'Product does not exists'})

    if(discount === true) {
      let newValue = productPrice * 0.85
      
      console.log(newValue)

      const productUpdated = await Product.updateOne({
        productName, 
        productDescription, 
        productPrice: newValue
      })

      return res.json({productUpdated})
    }

    const productUpdated = await Product.updateOne({
      productName, 
      productDescription, 
      productPrice
    })

    return res.json({productUpdated})

  } catch(err) {
    return res.status(400).send({error: 'Update failed'})
  }
})

module.exports = app => app.use('/products', router)