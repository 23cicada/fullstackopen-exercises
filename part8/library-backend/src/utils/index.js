const { GraphQLError } = require("graphql")

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

module.exports = { throwError }
