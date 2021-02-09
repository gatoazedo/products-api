const Product = require('../models/Product')
const User = require('../models/User')

module.exports = {
	async index(req, res) {
		const {productName} = req.query

		const products = await Product.find({productName})

		return res.json(products)
	},

  async store(req, res) {
		const {productName, description} = req.body
		const {user_id} = req.headers

		const user = await User.findById(user_id)

		if(!user) return res.status(400).json({error: 'User does not exists'})

		const product = await Product.create({
			user: user_id,
			productName,
			description
		})

		return res.json(product)
	}
}