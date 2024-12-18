import { useState, useEffect } from 'react'

import axios from 'axios'

const weatherApiKey = ''

const Weather = ({country, weather}) => {
  if (weather === null) return null
  const style = {width: 100, height:'auto'}
  if (country === null) return null
  else{
    console.log(weather.icon)
    return (
      <div>
        <h3>Weather in {country.name.common}</h3>
        <p>temperature {weather.temperature} Celsius</p>
        <img src={weather.icon} alt={weather.alt} style={style}/>
        <p>wind {weather.windSpeed} m/s</p>
      </div>
    )
  }
  
}

const SingleCountryData = ({country}) => {
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
  const [selectedWeather, setSelectedWeather] = useState(null)

  useEffect(()=> {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (selectedCountry === null) {
      setSelectedWeather(null)
    }
    else {
      const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall'
      const exclude = 'hourly,daily,minutely,alerts'
      const [lat, lon] = selectedCountry.latlng
      const appid = weatherApiKey
      const units = 'metric'
      axios
        .get(baseUrl, {params: {lat, lon, exclude, appid, units}})
        .then(response => {
          console.log(response.data)
          const iconCode = response.data.current.weather[0].icon
          const newWeather = {
            temperature: response.data.current.temp,
            windSpeed: response.data.current.wind_speed,
            icon: `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
            alt: response.data.current.weather[0].description
          }
          setSelectedWeather(newWeather)
        })
    }

  }, [selectedCountry])

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
      <Weather country={selectedCountry} weather={selectedWeather}/>
    </div>
  )
}

export default App