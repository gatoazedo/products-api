const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  image: String,
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module. exports = mongoose.model('Product', ProductSchema)