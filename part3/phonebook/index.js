const express = require('express')
const app = express()

app.use(express.json())

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

function generateId() {
  return Math.floor(Math.random() * 1000000000) + 1
}

function checkNewUser(newPerson) {
  if (newPerson.name === '' || newPerson.number === '') {
    new Error('{error: missing name or number}')
  }
  
  if (persons.find(person => person.name === newPerson.name)) {
    new Error('{error: must be unique')
  }
}

app.get('/info', (_request, response) => {
  const multilineResponse = `
  <div>
    <p>Phonebook has info for ${persons.length} people</p> 
    <p>${new Date(Date.now()).toString()}</p>
  <div>`
  response.type('text/html; charset=utf-8')
  response.send(multilineResponse)
})


app.get('/api/persons', (_request, response) => {
  response.json(persons)
})


app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons/:name/:number', (request, response) => {
  const id = generateId()
  const name = request.params.name
  const number = request.params.number
  const newPerson = {
    'id': id,
    'name': name,
    'number': number
  }

  if (checkNewUser(newPerson)) {
    response.status(500).end()
  } else {
    persons.push(newPerson)
    response.json(newPerson)
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const filteredPersons = persons.filter(person => person.id !== id)

  if (filteredPersons) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})


app.get('/api/info', (_request, response) => {
  const jsonResponse = {
    numberOfPeople: calcNumOfPersons(),
    dateAndTime: new Date(Date.now()).toString()     
  }
  response.json(jsonResponse)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
