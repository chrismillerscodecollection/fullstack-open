import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import { Listing } from './model/listing.js'
import { connectDB, showListings, createListing } from './mongo.js'

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('request-body', function (request, response) {
  return JSON.stringify(request.body)
})

app.use('/{*all}', morgan(':method :url :status :response-time ms :request-body'))

const url = process.env.MONGO_DB_URI

// Connect to MongoDB using mongoose
try {
  await connectDB(url)
} catch (err) {
  console.error("Failed to connect to MongoDB due to ", err)
}

function checkPersonInfo(newPerson) {
  const persons = showListings()
  
  if (persons.find(person => person.name === newPerson.name)) {
    return Error('must be unique')
  }

  if (newPerson.name === '' || newPerson.number === '') {
    return Error('missing name or number')
  }

  return null
}  
 

app.get('/api/persons', async (_request, response) => {
  const peopleFound = await showListings()
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

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  const newPerson = {
    'name': body.name,
    'number': body.number
  }

  e = checkPersonInfo(newPerson)

  if (e !== null) {
    response.status(400).json({error: `${e.message}`})
  } else {
    createListing(newPerson.name, newPerson.number)
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


const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
