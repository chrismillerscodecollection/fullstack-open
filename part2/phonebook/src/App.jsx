import { useState, useEffect } from 'react'
import { Notification } from './components/Notification.jsx'
import { Filter } from './components/Filter.jsx'
import { Form } from './components/Form.jsx'
import { List } from './components/List.jsx'
import personsService from './services/persons.js'
import './App.css'

const App = () => {

  const [persons, setPersons] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({ message: null, type: null });

  useEffect(() => {
    (async () => {
      try {
        const response = await personsService.getAll();
        setPersons(response);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    })();
  }, []);


  const handleAddNewPerson = async (name, number) => {
    try {
      const newPerson = await personsService.addNewPerson(name, number);
      setPersons([...persons, newPerson]);
      setName("");
      setNumber("");
      setNotification({ message: `Added ${name} to the phonebook!`, type: 'success' });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeletePerson = async (personId) => {
    await personsService.deletePerson(personId);
    setPersons(persons.filter((person) => person._id !== personId));
  }

  const handleUpdatePhoneNumber = async (personId, number) => {
    // Tries to find a person in the persons array where the ids are a match
    //console.log("persons array: ", persons)
    const person = persons.find(n => n._id === personId);

    // personsService handles the http requests to the backend server
    // The code for personService is in services/persons.js
    try {
      await personsService.updatePhoneNumber(personId, person.name, number);
      setPersons(persons.map(currentPerson => currentPerson._id === personId ? person : currentPerson));
      setName("");
      setNumber("");

    } catch (error) {
      console.error(error);

      setNotification({ message: `${person.name} no longer exists in the phonebook`, type: 'failure' });
      setTimeout(async () => {
        setNotification({ message: null, type: null });
        const initialPersons = await personsService.getAll();
        setPersons(initialPersons);
      }, 5000);

    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Notification message={notification.message} type={notification.type} />
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