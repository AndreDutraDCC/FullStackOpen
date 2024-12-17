import { useState, useEffect } from 'react'

import axios from 'axios'

const SingleCountryData = ({country}) => {
  //const [lat, lng] = country.latlng
  const langs = Object.values(country.languages)
  const flagStyle = {width: 200, height:'auto'}
  
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <b>languages: </b>
      <ul>
        {langs.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} style={flagStyle}/>
    </div>
  )
}

const CountryData = ({countries, selectedCountry, handleShow}) => {
  if (selectedCountry !== null) {
    return <SingleCountryData country={selectedCountry}/>
  }
  else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else {
    return countries.map(country => (
      <p key={country.name.common}>
        {country.name.common}
        <button onClick={handleShow(country)}>show</button>
      </p>
    ))
  }
}

const App = () => {
  const [querry, setQuerry] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(()=> {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const onQuerryChange = event => {
    const newQuerry = event.target.value
    const newCountries = allCountries.filter(country => {
      if (!newQuerry){return false}
      const countryLC =  country.name.common.toLowerCase()
      const querryLC = newQuerry.toLowerCase()
      return countryLC.includes(querryLC)
    })
    setQuerry(newQuerry)
    setCountries(newCountries)
    setSelectedCountry(newCountries.length == 1 ? newCountries[0] : null)
  }

  const handleShow = country => () => {
    setSelectedCountry(country)
  }
  
  return (
    <div>
        find countries<input value={querry} onChange={onQuerryChange}/>
      <CountryData countries={countries} selectedCountry={selectedCountry} handleShow={handleShow}/>
    </div>
  )
}

export default App