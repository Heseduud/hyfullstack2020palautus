import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([
    /*{ name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' } */
  ]) 

  const [ newName, setNewName ] = useState('test')
  const [ newNumber, setNewNumber ] = useState('123123')
  const [ filterName, setFilterName ] = useState('')
  const [ showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect hook')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('axios promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const personsToShow = showAll 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())) 

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.find( ({name}) => name === newName)) {
      window.alert(`${newName} is already added to phonebook `)
    }
    else if (persons.find( ({number}) => number === newNumber)){
      window.alert(`${newNumber} is already added to phonebook `)
    } 
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    if (filterName !== '' && showAll === true) {setShowAll(!showAll)}
    if (filterName === '' && showAll === false) {setShowAll(!showAll)}
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilter={handleFilter}/>
      <h2>Add new person</h2>
      <PersonForm addPerson={addPerson} newName={newName}
       handleNameChange={handleNameChange} newNumber={newNumber} 
       handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App