const { beforeEach, describe, test, after, before } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/user')
const config = require('../utils/config')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await mongoose.connect(config.MONGODB_URI)
    await User.deleteMany({})
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: '%salainen23',
    }
    const response = await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    assert(usersAtEnd.some(u => u.username === response.body.username))
  })

  test('creation fails with proper statuscode and message if username format is invalid', async () => {
    const newUser = {
      name: 'Matti Luukkainen',
      password: 'salainen23',
    }
    const usersAtStart = await helper.usersInDb()
    await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password format is invalid', async () => {
    const newUser = {
      username: '_test456',
      name: 'Matti Luukkainen',
      password: 'abcdefgh',
    }
    const usersAtStart = await helper.usersInDb()
    await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const newUser = {
      username: 'newuser',
      name: 'New User',
      password: 'test123'
    }
    await api.post('/api/users').send(newUser)
    const usersAtStart = await helper.usersInDb()
    await api.post('/api/users').send(newUser).expect(400)
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
