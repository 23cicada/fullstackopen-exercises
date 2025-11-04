const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const helper = require('../tests/test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(helper.initialBlogs), 36)
  })
})

describe('favorite blog', () => {
  test('favorite blog', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(helper.initialBlogs), {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    })
  })
})

describe('most blogs', () => {
  test('most blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(helper.initialBlogs), {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('most likes', () => {
    assert.deepStrictEqual(listHelper.mostLikes(helper.initialBlogs), {
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})
