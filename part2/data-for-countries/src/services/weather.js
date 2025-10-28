import axios from 'axios'

export function getWeatherByLocation(lat, lon) {
  const api_key = import.meta.env.OPEN_WEATHER_API_KEY;

  return (
    axios
      .get(`?lat=${lat}&lon=${lon}&appid=${api_key}`)
      .then(response => {
        return (response.data);
      })
      .catch(error => console.error(error)));
}
