const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  let token
  beforeEach(async () => {
    const user = (await helper.initializeUsers())[0]
    await Blog.deleteMany({})
    const blogsToCreate = helper.initialBlogs.map(blog => ({
      ...blog, user: user._id
    }))
    const blogs = await Blog.insertMany(blogsToCreate)
    user.blogs = blogs.map(blog => blog._id)
    await user.save()
    const result = await api.post('/api/login').send({
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password
    })
    token = result.body.token
  })

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  // TODO:
  test('blog posts have id property instead of _id', async () => {
    const blogs = await helper.blogsInDb()
    assert(blogs.every(blog => !!blog.id))
  })

  describe('addition of a new blog', () => {
    test('a new blog is added', async () => {
      const userId = (await helper.usersInDb())[0].id
      const newBlog = {
        title: 'HTML Responsive Images Guide',
        author: 'Chris Coyier',
        url: 'https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/',
        likes: 6,
        userId
      }
      const response = await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
      const addedBlog = blogsAtEnd.find(blog => blog.id === response.body.id)
      assert.strictEqual(addedBlog.title, newBlog.title)
      const userAtEnd = (await helper.usersInDb()).find(user => user.id === userId)
      assert(userAtEnd.blogs.find(blog => blog.id === addedBlog.id))
    })

    test('blog without likes property defaults to 0', async () => {
      const users = await helper.usersInDb()
      const newBlog = {
        title: 'An Interactive Guide to CSS Transitions',
        author: 'Josh Comeau',
        url: 'https://www.joshwcomeau.com/animation/css-transitions/',
        userId: users[0].id
      }
      const response = await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const blogs = await helper.blogsInDb()
      const { likes } = blogs.find(blog => blog.id === response.body.id)
      assert(likes === 0)
    })

    test('fails with status code 400 if data invalid', async () => {
      const users = await helper.usersInDb()
      const newBlog = {
        author: 'cicada',
        likes: 1,
        userId: users[0].id
      }
      await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
      const blogs = await helper.blogsInDb()
      assert.strictEqual(blogs.length, helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogs = await helper.blogsInDb()
      const blogToDelete = blogs[0]
      await api.delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
      const blogsAfterDeletion = await helper.blogsInDb()
      assert(blogsAfterDeletion.every(blog => blog.id !== blogToDelete.id))
      assert.strictEqual(blogsAfterDeletion.length, helper.initialBlogs.length - 1)
    })
  })

  describe('update of a blog', () => {
    test('update the number of likes for a blog post', async () => {
      const blogs = await helper.blogsInDb()
      const blogToUpdate = blogs[0]
      await api.put(`/api/blogs/${blogToUpdate.id}`).send({ likes: 10 })
      const blogsAfterUpdate = await helper.blogsInDb()
      const { likes } = blogsAfterUpdate.find(({ id }) => id === blogToUpdate.id)
      assert.strictEqual(likes, 10)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
