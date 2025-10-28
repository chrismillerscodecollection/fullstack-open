import axios from 'axios'

export function getAllCountries(url) {
  return(
    axios
      .get(`${url}api/all`)
      .then(response => {
        return (response.data)
      })
      .catch(error => console.error(error)));
}

export function getCountryByName(url, name) {
  return (
    axios
      .get(`${url}/name/${name}`)
      .then(response => {
        return (response.data);
      })
      .catch(error => console.error(error)));
}