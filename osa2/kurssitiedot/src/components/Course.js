import React from 'react'

const Courses = ({courses}) => {
    return (
      <ul style={{padding:0}}>
        {courses.map((course) => 
        <Course key={course.id} course={course}/>)}
      </ul>
    )
  }

const Course = ({course}) => {
    const parts = course.parts
    return(
      <div>
        <Header course={course.name}></Header>
        <Content parts={parts}></Content>
        <Total parts={parts}></Total>
      </div>
    )
  }
  
  const Header = (props) => {
      return (      
        <h1>{props.course}</h1>        
      )
  }
  
  const Total = ({parts}) => {
      let initialValue = 0
      let total = parts.reduce((i, currentValue) =>
       i + currentValue.exercises, initialValue)
      return (
          <p>Number of exercises {total}</p>
      )
  }
  
  const Content = ({parts}) => {
      return (
          <ul style={{padding:0}}>
            {parts.map((part) => 
            <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
          </ul>
      )
  }
  
  const Part = (props) => {
      return (
          <p> {props.name} {props.exercises}</p>
      )
  }

export default Courses