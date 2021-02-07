const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  productName: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module. exports = mongoose.model('Product', ProductSchema)