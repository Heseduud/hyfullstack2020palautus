import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  const good = props.values.good
  const neutral = props.values.neutral
  const bad = props.values.bad

  const all = (good + neutral + bad)
  const average = ((good - bad) / all)
  const positive = ((good/all) * 100)

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}></StatisticLine>
          <StatisticLine text="neutral" value={neutral}></StatisticLine>
          <StatisticLine text="bad" value={bad}></StatisticLine>
          <StatisticLine text="all" value={all}></StatisticLine>
          <StatisticLine text="average" value={average}></StatisticLine>
          <StatisticLine text="positive" value={positive + "%"}></StatisticLine>
        </tbody>
      </table>
    </div>
  )
}

const Button = props => <button onClick={props.onClick}>{props.name}</button>

const StatisticLine = (props) => {
  const text = props.text
  const value = props.value

  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  const values = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} name='good'></Button>
      <Button onClick={handleNeutral} name='neutral'></Button>
      <Button onClick={handleBad} name='bad'></Button>
      <h1>statistics</h1>
      <Statistics values={values}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
