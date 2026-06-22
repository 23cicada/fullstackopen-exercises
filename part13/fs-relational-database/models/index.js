const Blog = require('./blog')
const User = require('./user')

// One-To-Many relationships
// https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many-relationships
User.hasMany(Blog)
Blog.belongsTo(User)

Blog.sync({ alter: true })
User.sync({ alter: true })

module.exports = {
  Blog,
  User
}
