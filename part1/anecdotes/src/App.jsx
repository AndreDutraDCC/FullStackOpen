import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const randint = (min, max) => min + Math.floor(Math.random() * (max - min))
   
  const [selected, setSelected] = useState(randint(0, anecdotes.length))
  const [votes, setVotes] = useState([0,0,0,0,0,0,0,0])

  const max_anecdote = votes.indexOf(Math.max(...votes))

  const handleNextAnecdote = () => setSelected(randint(0, anecdotes.length))
  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[max_anecdote]}</p>

    </div>
  )
}

export default App