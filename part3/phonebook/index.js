
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const Listing = require('./model/Listing.js')

app.use(express.json())
// app.use(express.static('dist'))

morgan.token('request-body', function (request, response) {
  return JSON.stringify(request.body)
})

app.post('/{*all}', morgan(':method :url :status :response-time ms :request-body'))

try {
  mongoose.connect(process.env.MONGO_DB_URI)
  console.log("Successfully Connected to MongoDB")
} catch (error) {
  console.log("Failed to connect to MongoDB due to ", error)
}

// function generateId() {
//   return String(Math.floor(Math.random() * 1000000000) + 1)
// }

// function checkPersonInfo(newPerson) {
//    if (persons.find(person => person.name === newPerson.name)) {
//     const e =  Error('must be unique')
//     return e
//   }

//   if (newPerson.name === '' || newPerson.number === '') {
//     const e =  Error('missing name or number')
//     return e
//   }

//   return null
// }  
 

// app.get('/info', (_request, response) => {
//   const multilineResponse = `
//   <div>
//     <p>Phonebook has info for ${persons.length} people</p> 
//     <p>${new Date(Date.now()).toString()}</p>
//   <div>`
//   response.type('text/html; charset=utf-8')
//   response.send(multilineResponse)
// })


app.get('/api/persons', async (_request, response) => {
  const peopleFound = await Listing.find({})
  console.log(peopleFound)
  
  if (peopleFound) {
    response.json(peopleFound)
  } else {
    response.status(404).end()
  }
})


app.get('/api/persons/:id', async (request, response) => {
  const id = request.params.id
  const person = await Listing.findById(`${id}`).exec()

  if (person) {
    console.log(person)
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// app.post('/api/persons', (request, response) => {
//   const body = request.body
  
//   const newPerson = {
//     'id': generateId().toString(),
//     'name': body.name,
//     'number': body.number
//   }

//   e = checkPersonInfo(newPerson)

//   if (e !== null) {
//     response.status(400).json({error: `${e.message}`})
//   } else {
//     persons.concat(newPerson)
//     response.json(newPerson)
//   }
// })

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const filteredPersons = persons.filter(person => person.id !== id)

  if (filteredPersons) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})


// app.get('/api/info', (_request, response) => {
//   const jsonResponse = {
//     numberOfPeople: calcNumOfPersons(),
//     dateAndTime: new Date(Date.now()).toString()     
//   }
//   response.json(jsonResponse)
// })


const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
