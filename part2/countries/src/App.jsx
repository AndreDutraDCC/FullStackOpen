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

const CountryData = ({countries}) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (countries.length == 1) {
    return <SingleCountryData country={countries[0]}/>
  }
  else {
    return countries.map(country => <p key={country.name.common}>{country.name.common}</p>)
  }
}

const App = () => {
  const [querry, setQuerry] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])

  useEffect(()=> {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const onQuerryChange = event => {
    const newQuerry = event.target.value
    setQuerry(newQuerry)
    setCountries(allCountries
      .filter(country => {
        if (!newQuerry){return false}
        const countryLC =  country.name.common.toLowerCase()
        const querryLC = newQuerry.toLowerCase()
        return countryLC.includes(querryLC)})
    )
  }
  
  return (
    <div>
        find countries<input value={querry} onChange={onQuerryChange}/>
      <CountryData countries={countries}/>
    </div>
  )
}

export default App