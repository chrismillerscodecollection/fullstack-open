import { Delete } from './Delete'

export const List = ({ persons, filter, handleDeletePerson }) => {
  return (
     <div>
        {filter}
        {persons
          .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map((person) => (
            <p key={person.id}>
              {person.name} : {person.number} <Delete personId={person.id} handleDeletePerson={handleDeletePerson}/>
            </p>
          ))}
      </div>
  )
}