import CountryList from './CountryList.jsx'
import SearchInput from './SearchInput.jsx'

function DisplayCountryInfo({ countries, searchTerm, setSearchTerm }) {
  return (
    <div>
      <form>
        <label htmlFor="search-input">find countries </label>
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CountryList countries={countries} searchTerm={searchTerm}/>
      </form>
    </div>
  )
}

export default DisplayCountryInfo