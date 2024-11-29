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
   
  const [selected, setSelected] = useState(-1)

  const default_message = "Press the button below to see an anecdote"
  const anecdote = (selected === -1)? default_message : anecdotes[selected]

  const button_text = (selected === -1)? "anecdote" : "next anecdote"

  const randint = (min, max) => min + Math.floor(Math.random() * (max - min))
  
  const selectRandomAnecdote = () => setSelected(randint(0, anecdotes.length))

  return (
    <div>
      <p>{anecdote}</p>
      <button onClick={selectRandomAnecdote}>{button_text}</button>
    </div>
  )
}

export default App