import { useState, useEffect } from 'react'
import { Notification } from './components/Notification.jsx'
import { Filter } from './components/Filter.jsx'
import { Form } from './components/Form.jsx'
import { List } from './components/List.jsx'
import personsService from './services/persons.js'
import './App.css'

const App = () => {

  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null})

  
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleAddNewPerson = (name, number) => {
    personsService.addNewPerson(name, number)
      .then(newPerson => {
        setPersons([...persons, newPerson])
        setName("")
        setNumber("")
        setNotification({message: `Added ${name} to the phonebook!`, type: 'success'})
        setTimeout(() => {
          setNotification({message: null, type: null})
        }, 5000);
      })
  }

  const handleDeletePerson = (personId) => {
    personsService.deletePerson(personId)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== personId))
      })
  }

  const handleUpdatePhoneNumber = (personId, number) => {
    const person = persons.find(n => n.id === personId)
    personsService.updatePhoneNumber(personId, person.name, number)
      .then(updatedPerson => {
        setPersons(persons.map(n => n.id === personId ? updatedPerson : n))
        setName("")
        setNumber("")
      })
      .catch(error => {
        console.log(error)
        setNotification({message: `${person.name} no longer exists in the phonebook`, type: 'failure'})
        setTimeout(() => {
          setNotification({message: null, type: null})
          personsService
           .getAll()
           .then(initialPersons => {
            setPersons(initialPersons)
          })
        }, 5000)
      })
    }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Notification message={notification.message} type={notification.type}/>
      <h2>add a new</h2>
      <Form
        persons={persons}
        setPersons={setPersons}
        name={name}
        setName={setName}
        number={number}
        setNumber={setNumber}
        handleAddNewPerson={handleAddNewPerson}
        handleUpdatePhoneNumber={handleUpdatePhoneNumber}
      />
      <h2>Numbers</h2>
      <List
        persons={persons}
        filter={filter}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App