const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { likes, ...rest } = request.body
  const blog = new Blog({
    ...rest, likes: likes || 0,
  })
  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogRouter
