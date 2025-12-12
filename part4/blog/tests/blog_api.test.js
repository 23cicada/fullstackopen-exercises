const { test, after, beforeEach, describe, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  let token, userId
  before(async () => {
    await mongoose.connect(config.MONGODB_URI)
    await User.deleteMany({})
    let response = await api.post('/api/users').send(helper.initialUser)
    userId = response.body.id

    response = await api.post('/api/login').send(helper.initialUser)
    token = response.body.token
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(
      helper.initialBlogs.map(blog => ({
        ...blog, user: userId
      }))
    )
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blog posts have id property instead of _id', async () => {
    const blogs = await helper.blogsInDb()
    blogs.forEach(blog => assert.ok(blog.id, 'Blog is missing id attribute'))
  })

  describe('addition of a new blog', () => {
    test('a new blog is added', async () => {
      const newBlog = {
        title: 'HTML Responsive Images Guide',
        author: 'Chris Coyier',
        url: 'https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/',
        likes: 6
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
      assert(userAtEnd.blogs.find(blog => blog.id === addedBlog.id) !== undefined)
    })

    test('blog without likes property defaults to 0', async () => {
      const newBlog = {
        title: 'An Interactive Guide to CSS Transitions',
        author: 'Josh Comeau',
        url: 'https://www.joshwcomeau.com/animation/css-transitions/'
      }
      const response = await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const createdBlog = await Blog.findById(response.body.id)
      assert(createdBlog.likes === 0)
    })

    test('a valid blog is not added without a token', async () => {
      const newBlog = {
        title: 'HTML Responsive Images Guide',
        author: 'Chris Coyier',
        url: 'https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/',
        likes: 6
      }
      await api.post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

      const titles = blogsAtEnd.map(blog => blog.title)
      assert(!titles.includes('HTML Responsive Images Guide'))
    })

    test('fails with status code 400 if data invalid', async () => {
      const newBlog = {
        author: 'cicada',
        likes: 1
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
      const editedBlog = {
        title: 'Updated Title',
        author: 'Updated Author',
        url: 'Updated url',
        likes: blogToUpdate.likes + 1
      }

      await api.put(`/api/blogs/${blogToUpdate.id}`)
        .send(editedBlog)
        .expect(200)
      const updatedBlog = await Blog.findById(blogToUpdate.id)

      assert.strictEqual(updatedBlog.title, editedBlog.title)
      assert.strictEqual(updatedBlog.author, editedBlog.author)
      assert.strictEqual(updatedBlog.url, editedBlog.url)
      assert.strictEqual(updatedBlog.likes, editedBlog.likes)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})

