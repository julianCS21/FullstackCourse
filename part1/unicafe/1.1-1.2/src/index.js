import React from 'react'
import ReactDOM from 'react-dom'


const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  );
  


}

const Header = (props) =>{
  return (
    <h1>{props.course}</h1>
  );

}

const Content = (props) =>{
  const parts = props.parts

  const component = parts.map((value) =>{
    return (
      <Part  part={value.name} exercises={value.exercises}></Part>
    )

  })


  return component
}

const Total = (props) =>{
  return (
    <p>Number of exercises {props.number}</p>
  );
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
  

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}></Content>
      <Total number={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))