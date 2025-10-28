import './App.css'
import Course from './components/Course.jsx'

// App is the main component that loads react components
const App = () => {
  // Courses contains the course information, an array of course objects, each containing a parts array
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  // Every React component needs to have a return statement
  return (
    // Returns a div that contains a Course component for each course (parent object) in courses.
    <div>
      {/* Iterates over each course and creates a Course component, passing course properties as props */}
      {courses.map(course => (
        <Course key={course.id} course={course.name} parts={course.parts} exercises={course.exercises} />
      ))}
    </div>
  )
}

export default App
