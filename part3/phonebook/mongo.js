import 'dotenv/config'
import mongoose from 'mongoose'
import { Person } from './models/Person.js'

export async function connectDB(url) {
  try {
    console.log('Connecting to MongoDB...')
    const connection = await mongoose.connect(url, { family: 4 })
    return connection
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  } finally {
    console.log('Connected to MongoDB...')
  }
}

export async function showPersons() {
  try {
    const result = await Person.find({})

    result.forEach(person => {
      console.log(person)
    })
    return result
  } catch (err) {
    console.error(err)
  }
}

export async function createPerson(personName, personNumber) {
  const newPerson = new Person({
    name: personName,
    number: personNumber,
  })
  return await newPerson.save()
}

export async function deletePersonById(id) {
  try {
    const deletedPersonDocument = await Person.deleteOne({ _id: id })

    if (deletedPersonDocument.acknowledged) {
      console.log(`Successfully deleted ${deletedPersonDocument.deletedCount} person document`)
      return (deletedPersonDocument)
    }

  } catch (err) {
    console.error(err)
  }
}
