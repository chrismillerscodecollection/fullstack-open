import { useState, useEffect } from 'react'
import DisplayCountryInfo from './components/DisplayCountryInfo.jsx'
import { getAllCountries } from './services/countries.js';
import './App.css';

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => 
    {
      getAllCountries().then(data => setCountries(data))
    }, [])

  return (
    <>
      <DisplayCountryInfo
        countries={countries} searchTerm={searchTerm} setSearchTerm={setSearchTerm}
      />
    </>
  );
}

export default App
