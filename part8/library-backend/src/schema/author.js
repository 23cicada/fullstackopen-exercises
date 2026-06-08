const { GraphQLError } = require("graphql")
const Author = require("../models/author")

const typeDefs = /* GraphQL */ `
  extend type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
  }
  extend type Query {
    authorCount: Int!
    allAuthors: [Author!]!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
`

const resolvers = {
  Query: {
    authorCount: async () => await Author.countDocuments(),
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: async ({ id }, _, { loaders }) =>
      loaders.bookCountLoader.load(id),
  },
  Mutation: {
    editAuthor: async (_, { name, setBornTo }, { user }) => {
      if (!user) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        })
      }

      return await Author.findOneAndUpdate(
        { name },
        { born: setBornTo },
        { returnDocument: "after" },
      )
    },
  }
}

module.exports = { typeDefs, resolvers }
