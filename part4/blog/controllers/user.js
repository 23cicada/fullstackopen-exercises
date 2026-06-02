const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const middleware = require('../utils/middleware')

const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/
userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body
  const saltRounds = 10
  if (passwordRegex.test(password) === false) {
    return res.status(400).json({
      error:
        'Password must be at least 8 characters long and include a letter, a number, and a special character.'
    })
  }
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash
  })
  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

userRouter.get('/', middleware.userExtractor, async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    id: 1
  })
  res.json(users)
})

userRouter.get('/:id', middleware.userExtractor, async (req, res) => {
  const user = await User.findById(req.params.id).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    id: 1
  })
  res.json(user)
})

module.exports = userRouter
