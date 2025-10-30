import axios from "axios"

export const pageInfo = () => {
  axios.get('/info')
    .then(response => {
      document.getElementById('person-count').textContent = 
        `Phonebook has info for ${response.data.numberOfPeople} people`,

      document.getElementById('date-and-time').textContent =
        `${response.data.dateAndTime}`
    })
}
