import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/PersonService'


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
  const [ notifMsg, setNotifMsg ] = useState(null)

  useEffect(() => {
    console.log('effect hook')
    personService
      .getPersons()
      .then(initNotes => { setPersons(initNotes) })
  }
  , [])

  // Handles showAll when filterName changes --> solve "one-step-behind" filter problem
  useEffect(() => {
    console.log('useEffect for filterName')
    if (filterName !== '' && showAll === true) {setShowAll(!showAll)}
    if (filterName === '' && showAll === false) {setShowAll(!showAll)}
  }, [filterName, showAll])

  const personsToShow = showAll 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())) 

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const lastId = Math.max.apply(null, persons.id)
    const newId = lastId + 1

    const personObject = {
      name: newName,
      number: newNumber,
      id: newId
    }

    if (persons.find( ({name}) => name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const indexOfExisting = persons.findIndex(person => person.name === newName)
        const idOfExisting = persons[indexOfExisting].id
        console.log('idOfExisting: ', idOfExisting)

        const oldNameNewNumber = {
          name: personObject.name,
          number: personObject.number,
          id: idOfExisting
        }

        personService
          .putNumber(idOfExisting, oldNameNewNumber)
          .then(() => {
            const tempPers = persons
            tempPers.splice(indexOfExisting, 1, oldNameNewNumber)
            setPersons(tempPers)
            setNewName('')
            setNewNumber('')
            setNotifMsg(`Modified ${oldNameNewNumber.name}'s number to: ${oldNameNewNumber.number}`)
            setTimeout(() => {
              setNotifMsg(null)
            }, 2000)
          })  
      }
    }
    else if (persons.find( ({number}) => number === newNumber)){
      window.alert(`${newNumber} is already added to phonebook`)
    }
    else {
      personService
        .createPerson(personObject)
        .then(returnedObject => { 
          setPersons(persons.concat(returnedObject))
          setNewName('')
          setNewNumber('')
          setNotifMsg(`Added ${returnedObject.name}`)
          setTimeout(() => {
            setNotifMsg(null)
          }, 2000)
        })
        .catch( error => {
          setNotifMsg(`Error: ${error.response.data.error}`)
          setTimeout(() => {
            setNotifMsg(null)
          }, 2000)
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .deletePerson(id)
      .then( () => {
        const newPersons = persons.filter(person => person.id !== id)
        setPersons(newPersons)
        setNotifMsg(`Succesfully deleted ${name}`)
        setTimeout(() => {
          setNotifMsg(null)
        }, 2000)
      })
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
    setFilterName(event.target.value) 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={notifMsg}/>
      <Filter filterName={filterName} handleFilter={handleFilter}/>
      <h2>Add new person</h2>
      <PersonForm addPerson={addPerson} newName={newName}
       handleNameChange={handleNameChange} newNumber={newNumber} 
       handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App