import { useState, useEffect } from "react"
import { getWeatherByLocation } from "../services/weather.js"

function DisplayWeather({ latlng, capitalName }) {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    getWeatherByLocation(latlng)
      .then(data => setWeather(data))
  }, [latlng])

  console.log(weather)

  if (weather) {
    return (
      <div>
        <h2>Weather in {capitalName}</h2>
        <li>Temperature {weather.main.temp} farenheit</li>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <li>wind {weather.wind.speed} mph</li>
      </div>
    )
  }

  else {
    return (<p>Fetching the weather data!</p>)
  }
}


export default DisplayWeather