import 'dotenv/config'
import { Person } from './models/Person.js'

export async function showPersons() {
  const result = await Person.find({})
  // result.forEach(person => {
  //   console.log(person)
  // })

  return result
}

// This helper function is used to check if a person is already in the phonebook
// This is used in some of the API routes in the index.js file
export async function checkPersonInfo(newPerson) {
  const persons = await showPersons()
  const person = persons.find(person => person.name === newPerson.name)

  if (person) {
    return updatePhoneNumber(person._id, person.name, newPerson.number)
  }

  if (newPerson.name === '' || newPerson.number === '') {
    return Error('missing name or number')
  }

  return null
}

export async function createPerson(personName, personNumber) {
  const newPerson = new Person({
    name: personName,
    number: personNumber,
  })
  return await newPerson.save()
}

export async function updatePhoneNumber(id, name, newNumber) {
  const person = await Person.findByIdAndUpdate(
    id,
    { name: name,
      number: newNumber
    },
    { new: true, runValidators: true }
  )
  return person
}

export async function deletePersonById(id) {
  const deletedPersonDocument = await Person.deleteOne({ _id: id })
  return deletedPersonDocument
}

export async function calculateNumberOfEntries() {
  const result = await Person.find({})
  return result.length
}