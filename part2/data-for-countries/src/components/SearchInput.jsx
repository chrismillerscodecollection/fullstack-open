function CountryFilter({ searchTerm, setSearchTerm }) {

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return(
    <p>
      <input
        id="search-input"
        type="text"
        value={searchTerm}
        onChange={handleOnChange}>
      </input>
    </p>
  )
}

export default CountryFilter