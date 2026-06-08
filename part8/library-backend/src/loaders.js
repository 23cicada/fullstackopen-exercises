const DataLoader = require("dataloader")
const Book = require("./models/book")
const mongoose = require("mongoose")

const bookCountLoader = new DataLoader(async authorIds => {
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
});

module.exports = { bookCountLoader }
