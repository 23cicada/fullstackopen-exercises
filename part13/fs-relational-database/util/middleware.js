
const { ValidationError } = require('sequelize')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const errorHandle = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    response.status(400).send({ errors: error.errors.map(({ message }) => message) })
  }
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  errorHandle,
  tokenExtractor
}
