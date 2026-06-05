const {
  ApolloServer,
} = require("../library-backend/node_modules/@apollo/server")
const { MongoMemoryReplSet } = require("mongodb-memory-server")
const mongoose = require("../library-backend/node_modules/mongoose")

const typeDefs = require("../library-backend/src/schema")
const resolvers = require("../library-backend/src/resolvers")
const Author = require("../library-backend/src/models/author")
const Book = require("../library-backend/src/models/book")
const User = require("../library-backend/src/models/user")
const Genre = require("../library-backend/src/models/genre")

process.env.JWT_SECRET = "test-secret-key"

const initialAuthors = [
  { name: "Robert Martin", born: 1952 },
  { name: "Martin Fowler", born: 1963 },
  { name: "Fyodor Dostoevsky", born: 1821 },
]

const initialBooks = [
  {
    title: "Clean Code",
    published: 2008,
    authorName: "Robert Martin",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    authorName: "Robert Martin",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    authorName: "Martin Fowler",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    authorName: "Joshua Kerievsky",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    authorName: "Fyodor Dostoevsky",
    genres: ["classic", "crime"],
  },
]

let mongoServer

const setupDatabase = async () => {
  mongoServer = await MongoMemoryReplSet.create({ replSet: { count: 1 } })
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
}

const teardownDatabase = async () => {
  await mongoose.connection.close()
  if (mongoServer) {
    await mongoServer.stop()
  }
}

const seedDatabase = async () => {
  await Author.deleteMany({})
  await Book.deleteMany({})
  await User.deleteMany({})
  await Genre.deleteMany({})

  const authorDocs = {}
  for (const authorData of initialAuthors) {
    const author = new Author(authorData)
    await author.save()
    authorDocs[authorData.name] = author
  }

  const genreDocs = {}
  const uniqueGenres = [
    ...new Set(initialBooks.flatMap((bookData) => bookData.genres)),
  ]
  for (const name of uniqueGenres) {
    const genre = new Genre({ name })
    await genre.save()
    genreDocs[name] = genre
  }

  for (const bookData of initialBooks) {
    let author = authorDocs[bookData.authorName]
    if (!author) {
      author = new Author({ name: bookData.authorName })
      await author.save()
      authorDocs[bookData.authorName] = author
    }

    const book = new Book({
      title: bookData.title,
      published: bookData.published,
      author: author._id,
      genres: bookData.genres.map((name) => genreDocs[name]._id),
    })
    await book.save()
  }
}

const createTestUser = async (
  username = "testuser",
  favoriteGenre = "refactoring",
) => {
  const genre = await Genre.findOneAndUpdate(
    { name: favoriteGenre },
    { $setOnInsert: { name: favoriteGenre } },
    { upsert: true, new: true },
  )
  const user = new User({ username, favoriteGenre: genre._id })
  await user.save()
  return user.populate("favoriteGenre")
}

const createServer = () => {
  return new ApolloServer({ typeDefs, resolvers })
}

module.exports = {
  initialAuthors,
  initialBooks,
  setupDatabase,
  teardownDatabase,
  seedDatabase,
  createTestUser,
  createServer,
  Author,
  Book,
  User,
}
