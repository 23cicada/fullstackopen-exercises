const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes =blogs => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = blogs => {
  return _.maxBy(blogs, 'likes')
}

const mostBlogs = blogs => {
  const grouped = _.groupBy(blogs, 'author')

  return _.chain(grouped)
    .map((blogs, author) => ({
      author,
      blogs: blogs.length
    }))
    .maxBy('blogs')
    .value()
}

const mostLikes = blogs => {
  const grouped = _.groupBy(blogs, 'author')

  return _.chain(grouped)
    .map((blogs, author) => ({
      author,
      likes: _.sumBy(blogs, 'likes')
    }))
    .maxBy('likes')
    .value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
