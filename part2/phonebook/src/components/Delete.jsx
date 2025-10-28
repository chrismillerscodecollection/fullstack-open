export const Delete = ( { personId, handleDeletePerson }) => { 
  const handleOnClick = () => {
    handleDeletePerson(personId)
  }

  return (
    <button type='submit' onClick={handleOnClick}>delete</button>
  )
}