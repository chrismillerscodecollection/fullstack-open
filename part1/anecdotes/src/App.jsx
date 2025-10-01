import { useState } from 'react'
import './App.css'

const VoteButton = ( {handleClick} ) => {
 
  return (
    <button onClick={handleClick}>vote</button>
  )
}

const NextAnecdoteButton = ( {handleClick} ) => {

  return (
    <button onClick={handleClick}>next anecdote</button>
  );
};

const MostPopularAnecdote = ( {votes, anecdotes} ) => {
  const totalVotes = votes.reduce((sum, vote) => sum + vote, 0)
  const highestVote = Math.max(...votes)
  const highestVoteIndex = votes.indexOf(highestVote)
  const topAnecdote = anecdotes[highestVoteIndex]

  if (totalVotes === 0) {
    return (
      <p>No votes cast yet</p>
    )
  } 
  
  else {
    return (
    <div>
      <p>{topAnecdote}</p>
      <p>has {highestVote} votes</p>
      </div>
    )
  }}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 of the code accounts for the first 90 of the development time...The remaining 10 percent of the code account for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is the same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const initialVotes = new Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initialVotes);

  const handleVote = () => {
    setVotes(prevVotes => {
      const newVotes = [...prevVotes]
      newVotes[selected] += 1
      return newVotes
    })
  }

  const generateRandomIndex = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  return(
    <div>
      <p className="heading-style">Anecdote of the day</p>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <p>
        <VoteButton handleClick={handleVote}/>
        <NextAnecdoteButton handleClick={generateRandomIndex}/>
      </p>
      <p className="heading-style">Anecdote with most votes</p>
      <MostPopularAnecdote votes={votes} anecdotes={anecdotes}/>
    </div>
  )
};

export default App;
