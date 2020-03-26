import React from 'react'
import Courses from './components/Course'

const App = (props) => {
    return (
      <div>
        <Courses courses={props.courses}></Courses>
      </div>
    )
  }

export default App