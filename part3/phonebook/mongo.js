import 'dotenv/config'
import { Person } from './models/Person.js'

export async function showPersons() {
  const result = await Person.find({})
  result.forEach(person => {
    console.log(person)
  })
  
  return result
}

export async function createPerson(personName, personNumber) {
  const newPerson = new Person({
    name: personName,
    number: personNumber,
  })
  const newPersonDocument =  await newPerson.save()
  
  return newPersonDocument
}

export async function deletePersonById(id) {
  const deletedPersonDocument = await Person.deleteOne({ _id: id })
  
  return (deletedPersonDocument)
}
