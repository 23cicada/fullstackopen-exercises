const { typeDefs: authorTypeDefs } = require("./schema/author")
const { typeDefs: bookTypeDefs } = require("./schema/book")
const { typeDefs: genreTypeDefs } = require("./schema/genre")
const { typeDefs: userTypeDefs } = require("./schema/user")

const typeDefs = /* GraphQL */ `
  type Query {
    _empty: Boolean
  }
  type Mutation {
    _resetDatabase: Boolean
  }
  type Subscription {
    _empty: Boolean
  }
`

module.exports = [
  typeDefs,
  authorTypeDefs,
  bookTypeDefs,
  genreTypeDefs,
  userTypeDefs,
]
