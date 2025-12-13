import { Delete } from './Delete'

export const List = ({ persons, filter, handleDeletePerson }) => {
  return (
    <div>
      {filter}
      {
        persons
          .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map((person) => (
            <p key={person._id} id={person._id}>
              {person.name} : {person.number} <Delete personId={person._id} handleDeletePerson={handleDeletePerson} />
            </p>
          ))
      }
    </div>
  )
}