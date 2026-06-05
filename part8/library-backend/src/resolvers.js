const { GraphQLError } = require("graphql")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Genre = require("./models/genre")
const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
]

const throwError = (error, args) => {
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue ?? { title })[0]
    throw new GraphQLError(`Duplicate value for ${field}`, {
      extensions: { code: "BAD_USER_INPUT", invalidArgs: error.keyValue },
    })
  }
  if (error.name === "ValidationError") {
    throw new GraphQLError(error.message, {
      extensions: { code: "BAD_USER_INPUT", invalidArgs: args },
    })
  }
  throw error
}
const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
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
    },
    allAuthors: async () => await Author.find({}),
    me: (_, __, { user }) => user,
  },
  User: {
    favoriteGenre: async ({ favoriteGenre }) => favoriteGenre,
  },
  Book: {
    genres: async ({ genres }) => genres,
  },
  Author: {
    bookCount: async ({ id }) =>
      await Book.find({ author: id }).countDocuments(),
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
            { upsert: true, new: true, session, runValidators: true },
          ).select("_id")

          const book = new Book({
            ...args,
            author: authorId,
            genres: genreIds,
          })
          await book.save({ session })
          return book.populate([{ path: "author" }, { path: "genres" }])
        })
      } catch (error) {
        throwError(error, args)
      } finally {
        await session.endSession()
      }
    },
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
        { new: true },
      )
    },
    createUser: async (_, args) => {
      const { username, favoriteGenre } = args
      const session = await mongoose.startSession()
      try {
        const genreId = await Genre.findOneAndUpdate(
          { name: favoriteGenre },
          { $setOnInsert: { name: favoriteGenre } },
          { upsert: true, new: true, session, runValidators: true },
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
}

module.exports = resolvers
