import DisplayWeather from './DisplayWeather.jsx'

function CountryList({ countries, searchTerm }) {

  let filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase()
        .includes(searchTerm.toLowerCase()))

  if (filteredCountries.length > 10) {
    return (<p>Too many matches, specify another filter.</p>)
  }

  if (filteredCountries.length === 0) {
    return (<p>No countries found that match this filter.</p>)
  }

  if (filteredCountries.length === 1) {
    let country = filteredCountries[0]
    const languages = Object.values(country.languages)

    return (
      <div>
        <h1>{country.name.common}</h1>
        <li>{country.capital}</li>
        <li>Area {country.area}</li>
        <li>Lattitude {country.latlng[0]}</li>
        <li>Longitude {country.latlng[1]}</li>

        <h2>Languages</h2>
        <ul>
          {languages.map((language) => (
            <li key={language}>
              {language}
            </li>
          ))}
        </ul>

        <img src={country.flags.png} alt={country.flags.alt} />
        <DisplayWeather latlng={country.latlng} capitalName={country.capital} />
      </div>
    )
  }

  if (filteredCountries.length > 0 && filteredCountries.length <= 10) {
    return (
      <ul>
        {filteredCountries
          .map((country) => (
            <li key={country.name.common}>
              {country.name.common}
            </li>))}
      </ul>
    )
  }

}

export default CountryList