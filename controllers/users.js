const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, name, password } = body

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const saveUser = await user.save()

    response.status(201).json(saveUser)
  } catch (error) {
    response.status(400).json(error)
  }
})

module.exports = usersRouter
