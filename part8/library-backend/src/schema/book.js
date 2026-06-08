const { GraphQLError } = require("graphql")
const mongoose = require("mongoose")
const Genre = require("../models/genre")
const Book = require("../models/book")
const Author = require("../models/author")
const { PubSub } = require('graphql-subscriptions')
const { throwError } = require("../utils")

const pubsub = new PubSub()

const typeDefs = /* GraphQL */ `
  extend type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
  }
  extend type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
  }
  extend type Subscription {
    bookAdded: Book!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [Genre!]!
    id: ID!
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    allBooks: async (_, { genre: genreName, author: authorName }) => {
      const filter = {}

      if (genreName) {
        const genre = await Genre.findOne({ name: genreName })
        if (!genre) {
          return []
        }
        filter.genres = genre._id
      }

      if (authorName) {
        const author = await Author.findOne({ name: authorName })
        if (!author) {
          return []
        }
        filter.author = author._id
      }

      return await Book.find(filter).populate([
        { path: "author" },
        { path: "genres" },
      ])
    }
  },
  Book: {
    genres: async ({ genres }) => genres,
  },
  Mutation: {
    addBook: async (_, args, { user }) => {
      const { author: authorName, genres } = args

      if (!user) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        })
      }

      const session = await mongoose.startSession()
      try {
        return await session.withTransaction(async () => {
          await Promise.all(genres.map((name) => Genre.validate({ name })))
          await Genre.bulkWrite(
            genres.map((genre) => ({
              updateOne: {
                filter: { name: genre },
                update: { $setOnInsert: { name: genre } },
                upsert: true,
              },
            })),
            { session },
          )
          const genreIds = await Genre.find({ name: { $in: genres } })
            .select("_id")
            .session(session)

          const authorId = await Author.findOneAndUpdate(
            { name: authorName },
            { $setOnInsert: { name: authorName } },
            {
              upsert: true,
              returnDocument: "after",
              session,
              runValidators: true,
            },
          ).select("_id")

          const book = new Book({
            ...args,
            author: authorId,
            genres: genreIds,
          })
          await book.save({ session })

          const result = await book.populate([{ path: "author" }, { path: "genres" }])
          pubsub.publish("BOOK_ADDED", { bookAdded: result })
          return result
        })
      } catch (error) {
        throwError(error, args)
      } finally {
        await session.endSession()
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED")
    }
  },
}

module.exports = { typeDefs, resolvers }
