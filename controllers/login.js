const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username })

  const isPasswordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && isPasswordCorrect)) {
    return response.stats(401).json({
      error: 'invalid user or password'
    })
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET_WORD,
    {
      expiresIn: 60 * 60 * 24 * 7
    })

  response.send({
    name: user.name,
    username: user.username,
    token
  })
})

module.exports = loginRouter
