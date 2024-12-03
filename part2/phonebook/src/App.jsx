import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameQuerry, setNameQuerry] = useState('')

  const handlePerson = event => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else if(persons.some(person => person.number === newNumber)){
      alert(`${newNumber} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(newPerson))
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

  const personsToShow = persons.filter((person) => {
    const lowerName = person.name.toLowerCase()
    const lowerQuerry = nameQuerry.toLowerCase()

    return lowerName.includes(lowerQuerry)
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with <input value={nameQuerry} onChange={handleNameQuerry}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={handlePerson}>
        <div>
          name: <input value={newName} onChange={handleChangeName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )
}

export default App