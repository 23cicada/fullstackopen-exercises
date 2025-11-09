const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

const initialUsers = [
  {
    username: 'root',
    name: 'Matti Luukkainen',
    password: 'salainen23',
  },
  {
    username: 'visitor',
    name: 'Chloe Reed',
    password: 'salainen88',
  }
]
const blogsInDb = async () => {
  const notes = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({}).populate('blogs')
  return users.map(user => user.toJSON())
}

const initializeUsers = async () => {
  await User.deleteMany({})
  const usersToCreate = []
  for (const user of initialUsers) {
    usersToCreate.push({
      ...user,
      passwordHash: await bcrypt.hash(user.password, 10)
    })
  }
  return await User.insertMany(usersToCreate)
}
module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  initializeUsers,
  initialUsers
}
