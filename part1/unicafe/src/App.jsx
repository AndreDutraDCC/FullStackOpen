import { useState } from 'react'

const Button = ({handleClick, text}) => 
  <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  const percentage = (text === "positive")? "%": ""
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value} {percentage}</td>
      </tr>
    </tbody>
  )
}
const Statistics = ({good, neutral, bad}) => {
  if(good === 0 && neutral === 0 && bad === 0){
    return <p>No feedback given</p>
  }
  
  const all = good + bad + neutral
  const avg = (good - bad)/all
  const pos = 100*good/all

  return (
    <table>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={avg}/>
      <StatisticLine text="positive" value={pos}/>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good"/>
      <Button handleClick={handleNeutral} text="neutral"/>
      <Button handleClick={handleBad} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App