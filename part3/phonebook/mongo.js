import 'dotenv/config'
import { Person } from './models/Person.js'

export async function showPersons() {
  const result = await Person.find({})
  result.forEach(person => {
    console.log(person)
  })
  
  return result
}

// This helper function is used to check if a person is already in the phonebook
// This is used in some of the API routes in the index.js file
export async function checkPersonInfo(newPerson) {
  const persons = await showPersons()

  if (persons.find(person => person.name === newPerson.name)) {
    let person = person
    return updatePerson(person._id, newPerson.number)
    // return Error('must be unique')
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
  const newPersonDocument =  await newPerson.save()
  
  return newPersonDocument
}

export async function updatePerson(id, number) {
  const persons = await showPersons()
  let person = persons.find(person => person._id === id)
  
  person = {
    _id: id,
    name: person.name,
    number: number
  }

  person.save()
  return `Successfully updated ${person.name} phone number to ${person.number}!`
}

export async function deletePersonById(id) {
  const deletedPersonDocument = await Person.deleteOne({ _id: id })
  
  return deletedPersonDocument
}
