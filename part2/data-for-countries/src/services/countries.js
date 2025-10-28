import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

export function getAllCountries() {

  return(
    axios
      .get(`${baseUrl}api/all`)
      .then(response => {
        return (response.data)
      })
      .catch(error => console.error(error)));
}

export function getCountryByName(name) {
  return (
    axios
      .get(`${baseUrl}/name/${name}`)
      .then(response => {
        return (response.data);
      })
      .catch(error => console.error(error)));
}