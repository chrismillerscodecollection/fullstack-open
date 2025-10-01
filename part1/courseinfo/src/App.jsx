const Header = (props) => {
  return (<h1>{props.course.name}</h1>)
}

const Total = (props) => {
  const sum = props.exercises.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  return (<p>Number of exercises: {sum}</p>)
}

const Part = (props) => {
  return (<p>{props.part} {props.exercise}</p>)
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  const parts = [course.parts[0], course.parts[1], course.parts[2]]
  const exercises = [course.parts[0].exercises, course.parts[1].exercises, course.parts[2].exercises]

  return (
     <div>
       <Header course={course} />
       <Content parts={parts} />
       <Total exercises={exercises} />
    </div>
  )
}

export default App
