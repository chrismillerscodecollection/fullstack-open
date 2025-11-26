import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import { Person } from './models/Person.js'
import { connectDB, showPersons, createPerson, deletePersonById } from './mongo.js'

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('request-body', function (request, response) {
  return JSON.stringify(request.body)
})

app.use('/{*all}', morgan(':method :url :status :response-time ms :request-body'))

const url = process.env.MONGO_DB_URI

// Connect to MongoDB using mongoose
await connectDB(url)

async function checkPersonInfo(newPerson) {
  const persons = await showPersons()

  if (persons.find(person => person.name === newPerson.name)) {
    return Error('must be unique')
  }

  if (newPerson.name === '' || newPerson.number === '') {
    return Error('missing name or number')
  }

  return null
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
