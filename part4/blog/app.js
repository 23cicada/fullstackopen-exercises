const express = require('express')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const app = express()

app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
