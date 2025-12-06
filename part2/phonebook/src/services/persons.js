import axios from 'axios'

const baseUrl = 'api/persons';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const addNewPerson = async (newName, newNumber) => {
  const response = await axios.post(baseUrl, { name: newName, number: newNumber });
  return response.data;
}

const deletePerson = async (personId) => {
  const response = await axios.delete(`${baseUrl}/${personId}`);
  return response.data;
}


const updatePhoneNumber = async (personId, name, newNumber) => {
  const response = await axios.put(`${baseUrl}/${personId}`, { id: personId, name: name, number: newNumber });
  return response.data;
}

export default {
  getAll,
  addNewPerson,
  deletePerson,
  updatePhoneNumber
};