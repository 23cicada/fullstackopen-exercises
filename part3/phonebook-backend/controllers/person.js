const personRouter = require('express').Router()
const Person = require('../models/person')

personRouter.get('/info', async (req, res) => {
  const persons = await Person.find({})
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

personRouter.get('/', (req, res) => {
  Person.find({}).then(persons => res.json(persons))
})

personRouter.get('/:id', async (req, res, next) => {
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

personRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    await Person.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

personRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params
  const { number } = req.body
  try {
    const person = await Person.findByIdAndUpdate(id, { number }, { new: true, runValidators: true })
    return res.json(person.toJSON())
  } catch (error) {
    next(error)
  }
})

personRouter.post('/', async (req, res, next) => {
  const { name, number } = req.body
  try {
    const person = new Person({ name, number })
    const saved = await person.save()
    res.json(saved.toJSON())
  } catch (error) {
    next(error)
  }
})

module.exports = personRouter
