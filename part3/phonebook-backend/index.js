const express = require('express');
const morgan = require('morgan')
const Person = require('./models/person')
require('dotenv').config()

const PORT = process.env.PORT || 3000

const app = express();
morgan.token('body', req => JSON.stringify(req.body))

app.use(express.json())
// Whenever Express gets an HTTP GET request it will first check
// if the dist directory contains a file corresponding to the request's address.
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findById(id).then(person => res.json(person))
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findByIdAndDelete(id).then(() => res.status(204).end())
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({ error: 'name and number are required' })
  } else if (persons.find(person => person.name === name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }
  const created= { name, number }
  const person = new Person(created)
  person.save().then(saved => res.json(saved))
})

app.get('/info', (req, res) => {
  const persons = Person.find({})
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
