require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const Person = require('./models/person')

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

app.get('/api/persons/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const person = await Person.findById(id)
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    await Person.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (req, res, next) => {
  const { id } = req.params
  const { number } = req.body
  try {
    const person = await Person.findById(id)
    if (person) {
      person.number = number
      const updated = await person.save()
      return res.json({ name: updated.name, number: updated.number, id: updated._id.toString() })
    } else {
      return res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({ error: 'name and number are required' })
  }
  const created= { name, number }
  const person = new Person(created)
  person.save().then(saved => {
    const { name, number, _id } = saved
    res.json({ name, number, id: _id.toString() })
  })
})

app.get('/info', async (req, res) => {
  const persons = await Person.find({})
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

app.use((error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
