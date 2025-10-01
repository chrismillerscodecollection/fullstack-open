import { useState } from 'react'
import './App.css';

const Button = (props) => {

  return (
    <button onClick={props.onClick}>{props.type}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  const { good, neutral, bad } = props
  const all = (good + neutral + bad)
  const average = ((good * 1) + (neutral * 0) + (bad * -1)) / (good + bad + neutral)
  const positive = (good / (good + neutral + bad) * 100)

  if (all == 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>    
    )
  } else { 
    return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average.toFixed(1)}/>
          <StatisticLine text="positive" value={positive.toFixed(1) + "%"}/>
        </tbody>
      </table>
    </div>
  )
}
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button type={'good'} onClick={() => setGood(good + 1)} />
      <Button type={'neutral'} onClick={() => setNeutral(neutral + 1)} />
      <Button type={'bad'} onClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
