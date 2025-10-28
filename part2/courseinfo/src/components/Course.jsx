// Header component, receives the course name as a prop
// course is the course name being passed from the Course component
const Header = ({ course }) => {
  //returns an h1 that contains the name of the course
  return (<h1>{course}</h1>)
}

// Part component, takes one part of the parts array and the exercise count as props
const Part = ({ part, exercise }) => {
  // returns a paragraph with the part and exercise props
  return (<p>{part} {exercise}</p>)
}

// Content component, receives the parts array as a prop
const Content = ({ parts }) => {
  // returns a Part component for each of the parts in the array
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part.name} exercise={part.exercises} />
      ))}
    </div>
  )
}

// Total component, receive the parts array as a prop
// This component calculates the total of exercises for each course
const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0)
  return (
    <p className="heading-style">total of {total} exercises</p>
  )

}

// Course component, displays the Header, Content, and Total components
// Takes course and parts as props
const Course = ({ course, parts }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default Course