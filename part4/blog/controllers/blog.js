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
