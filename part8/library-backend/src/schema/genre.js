const Genre = require("../models/genre")

const typeDefs = /* GraphQL */ `
  extend type Query {
    allGenres: [Genre!]!
  }

  type Genre {
    name: String!
    id: ID!
  }
`

const resolvers = {
  Query: {
    allGenres: async () => await Genre.find({}),
  },
}

module.exports = { typeDefs, resolvers }
