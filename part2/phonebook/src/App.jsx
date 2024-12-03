import { useState } from 'react'

const Persons = ({persons}) => (
  <div>
    {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
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
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App