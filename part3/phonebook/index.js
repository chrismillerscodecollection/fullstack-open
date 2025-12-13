import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { Person } from './models/Person.js'
import { showPersons, checkPersonInfo, createPerson, deletePersonById, calculateNumberOfEntries, updatePhoneNumber } from './mongo.js'

const app = express()

// A token in Morgan represents a discrete data point that gets extracted from a request/response and inserted into the log output.
// Each token contributes one piece of information to the overall log entry.
morgan.token('request-body', function (request) {
  return JSON.stringify(request.body)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(express.json())
app.use(express.static('dist')) // Loads the front-end code
app.use('/{*all}', morgan(':method :url :status :response-time ms :request-body'))


// Connect to MongoDB using mongoose
const url = process.env.MONGO_DB_URI

try {
  console.log('Connecting to MongoDB...')
  // 'family: 4' specifies the IP protocol, in this case, IPv4
  await mongoose.connect(url, { family: 4 })
} catch (err) {
  console.error(err.message)
  process.exit(1)
} finally {
  console.log('Connected to MongoDB...')
}

app.get('/info', async (_request, response) => {
  const numOfPeople = await calculateNumberOfEntries()
  if (numOfPeople) {
    response.send(`<p>There are ${numOfPeople} people in the phonebook</p>`)
  } else {
    response.status(404).end()
  }
})


app.get('/api/persons', async (_request, response) => {
  const persons = await showPersons()
  console.log(persons)

  if (persons) {
    response.json(persons)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', async (request, response, next) => {
  const body = request.body

  const newPerson = {
    'name': body.name,
    'number': body.number
  }

  const e = await checkPersonInfo(newPerson)

  if (e !== null) {
    response.status(400).json({ error: `${e.message}` })
  } else {
    try {
      const savedPerson = await createPerson(newPerson.name, newPerson.number)

      console.log(`Added a new person: ${savedPerson}`)
      response.json(savedPerson)
    } catch (error) {
      next(error)
    }
  }
})


app.get('/api/persons/:id', async (request, response) => {
  const id = request.params.id
  const person = await Person.findById(`${id}`)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.put('/api/persons/:id', async (request, response) => {
  const id = request.params.id
  const { name, number } = request.body

  const updatedPerson = await updatePhoneNumber(id, name, number)

  if (updatedPerson) {
    response.json(updatedPerson)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', async (request, response) => {
  const id = request.params.id
  const deletedPersonDocument = await deletePersonById({ _id: id })

  if (deletedPersonDocument) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
