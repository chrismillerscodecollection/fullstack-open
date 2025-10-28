import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNewPerson = (newName, newNumber) => {
  const add = axios.post(baseUrl, { name: newName, number: newNumber })
  return add.then(response => response.data)
}

const deletePerson = (personId) => {
  const remove = axios.delete(`${baseUrl}/${personId}`)
  return remove.then(response => response.data)
}


const updatePhoneNumber = (personId, name, newNumber) => {
  const update = axios.put(`${baseUrl}/${personId}`, { name: name, number: newNumber, id: personId})
  return update.then(response => response.data)
}

export default {
  getAll,
  addNewPerson,
  deletePerson,
  updatePhoneNumber
}