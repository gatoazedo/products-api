const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module. exports = mongoose.model('Product', ProductSchema)