require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

morgan.token('body', (request, response) => {
  const body = request.body
  
  return Object.keys(body).length !== 0
  ? JSON.stringify(body)
  : " "
})

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })  
})

app.get('/api/info', (request, response) => {
  console.log(request.headers)
  Person.countDocuments({}).then(count => {
    response.send(`<p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>`)
  })
  
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(result => {
      response.status(404).end()
    })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
  const body = request.body

  if(!body.name){
    response.status(400).json({
      error: 'name attribute is missing'
    })
  } else if(!body.number){
    response.status(400).json({
      error: 'number attribute is missing'
    })
  } /*else if (persons.some(person => person.name === body.name)) {
    response.status(400).json({
      error: 'name must be unique'
    })
  }*/

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(returnedPerson => {
    response.json(returnedPerson)
  })
  
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})