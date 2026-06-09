const DataLoader = require("dataloader")
const Book = require("./models/book")
const mongoose = require("mongoose")

const createBookCountLoader = () =>
  new DataLoader(async (authorIds) => {
    const objectIds = authorIds.map((id) => new mongoose.Types.ObjectId(id))
    const result = await Book.aggregate([
      {
        $match: {
          author: {
            $in: objectIds,
          },
        },
      },
      {
        $group: {
          _id: "$author",
          count: { $sum: 1 },
        },
      },
    ])

    const countMap = result.reduce((acc, { _id, count }) => {
      acc[_id.toString()] = count
      return acc
    }, {})

    return authorIds.map((id) => countMap[id] ?? 0)
  })

// DataLoader instances are per-request,
// so if you use a DataLoader in your data source,
// ensure you create a new instance of that class with every request
const createLoaders = () => ({
  bookCountLoader: createBookCountLoader(),
})

module.exports = createLoaders
