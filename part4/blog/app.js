const express = require('express')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const commentRouter = require('./controllers/comment')
const path = require('path')

const app = express()

const distPath = path.join(__dirname, '../../part5/bloglist-frontend/dist')

app.use(express.json())
app.use(middleware.tokenExtractor)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath))
}

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/comments', commentRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

if (process.env.NODE_ENV === 'production') {
  app.get('/*splat', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
