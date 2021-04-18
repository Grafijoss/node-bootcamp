const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    date: 1,
    important: 1
  })
  response.json(users)
})

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
    response.status(401).json({
      error: 'invalid user or password'
    })
  }
})

module.exports = usersRouter
