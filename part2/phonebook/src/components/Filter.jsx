export const Filter = ({ filter, setFilter }) => {
  return (
    <p>filter shown with
      <input 
        id="filter"
        type="text"
        value={filter}
        onChange={(event) => {
          console.log(event.target.value)
          setFilter(event.target.value)}}>
      </input>
    </p>
  )
}
