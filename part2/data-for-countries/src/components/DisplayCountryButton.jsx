function DisplayCountryButton({ countryName, handleShowCountry }) {
  const  handleOnClick = (e) => {
      e.preventDefault() 
      handleShowCountry(countryName)
  }

  return (<button type="submit" onClick={handleOnClick}>Show</button>)
}


export default DisplayCountryButton