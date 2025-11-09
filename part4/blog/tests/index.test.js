const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const helper = require('../tests/test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('list helper', () => {
  test('when list has only one blog, equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(helper.initialBlogs), 36)
  })

  test('favorite blog', () => {
    assert.strictEqual(listHelper.favoriteBlog(helper.initialBlogs).title, 'Canonical string reduction')
  })

  test('most blogs', () => {
    const { author, blogs } = listHelper.mostBlogs(helper.initialBlogs)
    assert.deepStrictEqual({ author, blogs }, {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

  test('most likes', () => {
    const { author, likes } = listHelper.mostLikes(helper.initialBlogs)
    assert.deepStrictEqual({ author, likes }, {
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})
