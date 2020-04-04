import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DataField from './components/DataField'
 
const App = () => {

  const [ countries, setCountries] = useState([])
  const [ searchName, setSearchName ] = useState('')
  const [ shownData, setShownData ] = useState([])


  // Effect hook, get all countries from REST api
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  },[])

  const handleNameChange = (event) => {
    const newName = event.target.value

    // Filter data to match input field
    setShownData(countries.filter(country => country.name.toLowerCase().includes(newName.toLowerCase())))

    // Update field for rendering current input
    setSearchName(newName)
  }
  
  // Handle onClick in DataField to show single country
  const handleButtonClick = (country) => {
    setShownData([country])
  }

  return (
    <div>
      find countries : <input value={searchName} onChange={handleNameChange}/>
      <ul style={{listStyleType:"none"}}>
        <DataField shownData={shownData} handleClick={handleButtonClick}/>
      </ul>
    </div>
  )
}

export default App
