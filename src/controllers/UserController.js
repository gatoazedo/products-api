const User = require('../models/User')

module.exports = {
  async store (req, res) {
		const {username, email} = req.body

		let user = await User.findOne({username, email})

		if(!user) {
			user = await User.create({username, email})
		}

    return res.json(user)
	}
}