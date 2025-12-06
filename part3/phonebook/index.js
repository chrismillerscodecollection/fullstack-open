import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { Person } from './models/Person.js'
import { showPersons, checkPersonInfo, createPerson, deletePersonById } from './mongo.js'

const app = express()

app.use(express.json())
app.use(express.static('dist')) // Loads the front-end code

// A token in Morgan represents a discrete data point that gets extracted from a request/response and inserted into the log output. 
// Each token contributes one piece of information to the overall log entry.
morgan.token('request-body', function (request, response) {
  return JSON.stringify(request.body)
})

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


app.get('/api/persons', async (_request, response) => {
  const persons = await showPersons()
  console.log(persons)

  if (persons) {
    response.json(persons)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', async (request, response) => {
  const body = request.body

  const newPerson = {
    'name': body.name,
    'number': body.number
  }

  const e = await checkPersonInfo(newPerson)

  if (e !== null) {
    response.status(400).json({ error: `${e.message}` })
  } else {
    createPerson(newPerson.name, newPerson.number)
    response.json(newPerson)
  }
})


app.get('/api/persons/:id', async (request, response) => {
  const id = request.params.id
  const person = await Person.findById(`${id}`).exec()

  if (person) {
    console.log(person)
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.put('/api/persons/:id', async (request, response) => {
   const id = request.params.id
   const person = await Person.findById(`${id}`).exec()
  
   if (person) {
    console.log(person)
    person.number = request.params.number
  } else {
      response.status(404).end()
    }
    
  const updatedPersonDocument =  await person.save()

  return updatedPersonDocument
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

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
