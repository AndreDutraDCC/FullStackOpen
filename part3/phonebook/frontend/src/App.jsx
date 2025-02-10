import { useState, useEffect } from 'react'

import Notification from './components/Notification'

import personService from './services/persons'

const Person = ({person, handleDelete}) => (
  <p>
    {person.name} {person.number} <button onClick={handleDelete}>delete</button>
  </p>
)

const Persons = ({persons, handleDelete}) => (
  <div>
    {persons.map(person => <Person key={person.id} person={person} handleDelete={() => handleDelete(person.id)}/>)}
  </div>
)

const SearchFilter = ({querry, handleQuerry}) => (
  <div>
    filter shown with <input value={querry} onChange={handleQuerry}/>
  </div>
)

const PersonForm = ({name, handleName, number, handleNumber, handleSubmit}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={name} onChange={handleName}/>
    </div>
    <div>
      number: <input value={number} onChange={handleNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameQuerry, setNameQuerry] = useState('')
  const [notification, setNotification] = useState(null)

  const notify = (message, color='green') => {
    setNotification({message, color})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handlePerson = event => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if(persons.some(person => person.name === newName)){
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const personToUpdate = persons.find(p => p.name === newName)
        personService
          .update(personToUpdate.id, {...personToUpdate, number:newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(p => p.name === newName? returnedPerson : p))
            notify(`Updated ${newName}'s number`)
          })
          .catch(error => {
            notify(`Information of ${newName} has already been removed from server`, 'red')
          })
      }
    }
    else if(persons.some(person => person.number === newNumber)){
      notify(`Number ${newNumber} is already added to phonebook`, 'red')
    }
    else{
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          notify(`Added ${newPerson.name}`)
        })
    }
    
    setNewName('')
    setNewNumber('')
  }

  const handleChangeName = event => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = event => {
    setNewNumber(event.target.value)
  }

  const handleNameQuerry = event => {
    setNameQuerry(event.target.value)
  }

  const handleDelete = personId => {
    const personToDelete = persons.find(p => p.id === personId)
    if(!personToDelete){
      notify(`Person of id ${personId} doesn't exist locally`, 'red')
      //personToDelete = {name:`ID:${personId}`}
    }
    
    if(confirm(`Delete ${personToDelete.name}?`)){
      personService
        .delete(personId)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== personId))
        })
        .catch(error => {
          notify(`Person of id ${personId} doesn't exist in the database`, 'red')
        })
    }
  }

  const personsToShow = persons.filter((person) => {
    const lowerName = person.name.toLowerCase()
    const lowerQuerry = nameQuerry.toLowerCase()

    return lowerName.includes(lowerQuerry)
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <SearchFilter querry={nameQuerry} handleQuerry={handleNameQuerry}/>
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        handleName={handleChangeName}
        number={newNumber}
        handleNumber={handleChangeNumber}
        handleSubmit={handlePerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App