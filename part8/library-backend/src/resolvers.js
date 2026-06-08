const { GraphQLError } = require("graphql")
const Genre = require("./models/genre")
const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")
const { merge } = require('lodash');
const { resolvers: authorResolvers } = require("./schema/author")
const { resolvers: bookResolvers } = require("./schema/book")
const { resolvers: genreResolvers } = require("./schema/genre")
const { resolvers: userResolvers } = require("./schema/user")

const resolvers = merge(
  {
    Mutation: {
       _resetDatabase: async () => {
        if (process.env.NODE_ENV !== "test") {
          throw new GraphQLError("_resetDatabase is only available in test mode")
        }
        await Author.deleteMany({})
        await Book.deleteMany({})
        await User.deleteMany({})
        await Genre.deleteMany({})
        return true
      },
    },
  },
  authorResolvers,
  bookResolvers,
  genreResolvers,
  userResolvers,
)

module.exports = resolvers
