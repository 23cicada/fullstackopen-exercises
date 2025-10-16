const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://cicada_db:${password}@cluster0.fuyr9k8.mongodb.net/phonebookApp?
retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)
// The idea behind Mongoose is that the data stored in the database is given a schema
// at the level of the application that defines the shape of the documents stored in any given collection.

// Schema definition
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// model definition
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const [name, number] = process.argv.slice(3)

  const person = new Person({
    name,
    number,
  })

  person.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    console.log(result.map(({ name, number }) => `${name} ${number}`).join('\n'))
    mongoose.connection.close()
  })
}


