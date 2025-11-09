const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { userId, likes, ...rest } = request.body
  const user = await User.findById(userId)
  if (!user) {
    return response.status(400).json({
      error: 'userId missing or not valid'
    })
  }
  const blog = new Blog({
    ...rest,
    likes: likes || 0,
    user: user._id
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const { id } = request.params
  const blog = await Blog.findByIdAndUpdate(id, { likes: likes ?? 0 }, { new: true })
  response.json(blog)
})

module.exports = blogRouter
