export const Form = ({
  persons,
  name,
  setName,
  number,
  setNumber,
  handleAddNewPerson,
  handleUpdatePhoneNumber }) => {

  const handleOnSubmit = (event) => {
    event.preventDefault()

    const checkForMatch = (persons) => {
      const match = persons.find(person => person.name === name)
      const numExists = persons.find(person => person.name === name && person.number)

      if (match && numExists) {
        if (window.confirm("The user already has a phone number. Would you like to update it?")) {
          handleUpdatePhoneNumber(match.id, number)
        }
        return
      }

      if (match) {
        alert(`${name} is already added to the phonebook`)
        return
      }

    handleAddNewPerson(name, number)
  }

  checkForMatch(persons)
}

return (
  <form onSubmit={handleOnSubmit}>
    <div>
      name:
      <input
        id="name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(event) => {
          setName(event.target.value)
        }} />
    </div>
    <div>
      number:
      <input
        id="number"
        type="text"
        autoComplete="tel"
        value={number}
        onChange={(event) => {
          setNumber(event.target.value)
        }} />
    </div>
    <div>
      <button id="submit" type="submit">add</button>
    </div>
  </form>
)
}
