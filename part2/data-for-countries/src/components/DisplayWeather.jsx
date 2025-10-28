import { useState, useEffect } from "react"
import { getWeatherByLocation } from "../services/weather.js"

function DisplayWeather({ latlng, capitalName }) {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    getWeatherByLocation(latlng)
      .then(data => setWeather(data))
  }, [latlng])

  if (weather !== null) {
    return (
      <div>
        <h2>Weather in {capitalName}</h2>
        <li>Temperature {weather.current.temp}</li>
        <img src={weather.current.weather.icon} />
        <li>wind {weather.current.wind_speed}</li>
      </div>
    )
  }

  else {
    return (<p>Fetching the weather data!</p>)
  }
}


export default DisplayWeather