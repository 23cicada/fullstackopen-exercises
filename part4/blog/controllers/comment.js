const commentRouter = require('express').Router()
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

commentRouter.get('/:id', async (request, response) => {
  const comments = await Comment.find({ blog: request.params.id })
  response.json(comments)
})

commentRouter.post(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const { id } = request.params
    const { content } = request.body
    const user = request.user
    const existingComment = await Comment.findOne({ blog: id, user: user._id })
    if (existingComment) {
      return response
        .status(409)
        .json({ error: 'you have already commented on this blog' })
    }
    const comment = new Comment({
      content,
      user: user._id,
      blog: id
    })
    let result = await comment.save()
    result = await result.populate('user', { username: 1, name: 1, id: 1 })
    response.status(201).json(result)
  }
)
module.exports = commentRouter
