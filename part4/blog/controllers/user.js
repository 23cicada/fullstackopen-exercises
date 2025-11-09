const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,20}$/
userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body
  const saltRounds = 10
  if (passwordRegex.test(password) === false) {
    return res.status(400).json({
      error: 'Password must be 8–20 characters long and include at least one letter and one number.'
    })
  }
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  res.json(users)
})
module.exports = userRouter
