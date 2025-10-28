import axios from 'axios'

export function getWeatherByLocation(latlng) {
  const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

  return (
    axios
      .get(`${baseUrl}?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}`)
      .then(response => {
        return (response.data);
      })
      .catch(error => console.error(error)));
}
