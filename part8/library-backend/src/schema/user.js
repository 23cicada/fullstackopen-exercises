const { GraphQLError } = require("graphql")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Genre = require("../models/genre")
const User = require("../models/user")
const { throwError } = require("../utils")

const typeDefs = /* GraphQL */ `
  extend type Query {
    me: User
  }
  extend type Mutation {
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
  type User {
    username: String!
    favoriteGenre: Genre!
    id: ID!
  }
  type Token {
    value: String!
  }
`

const resolvers = {
  Query: {
    me: (_, __, { user }) => user,
  },
  User: {
    favoriteGenre: async ({ favoriteGenre }) => favoriteGenre,
  },
  Mutation: {
    createUser: async (_, args) => {
      const { username, favoriteGenre } = args
      const session = await mongoose.startSession()
      try {
        const genreId = await Genre.findOneAndUpdate(
          { name: favoriteGenre },
          { $setOnInsert: { name: favoriteGenre } },
          {
            upsert: true,
            returnDocument: "after",
            session,
            runValidators: true,
          },
        ).select("_id")
        const user = new User({ username, favoriteGenre: genreId })
        await user.save({ session })
        return user.populate("favoriteGenre")
      } catch (error) {
        throwError(error, args)
      }
    },
    login: async (_, args) => {
      const { username, password } = args
      const user = await User.findOne({ username })
      if (!user || password !== "admin") {
        throw new GraphQLError("Invalid credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

module.exports = { typeDefs, resolvers }
