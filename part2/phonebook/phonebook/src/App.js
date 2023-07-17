import React, { useState,useEffect } from 'react'
import Filter from './components/Filter'
import FormPerson from './components/FormPerson'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [filterName,setFilterName] = useState('')

  const addPerson = (event) =>{
    event.preventDefault()
    const newPersons = [...persons]

    const person = {
      name : newName,
      number : newNumber
    }

    const findPerson = newPersons.find((elemento) =>{
      if(elemento.name === person.name){
        return true
      }
      return false
    })

    if(!findPerson){
      newPersons.push(person)
      setPersons(newPersons)
    }
    else{
      alert(`${newName} is already added to phonebook`)
    }
    


  }


  const addName = (event) =>{
    setNewName(event.target.value)
  }

  const addPhone = (event) =>{
    setNewNumber(event.target.value)
  }

  const filter = (event) =>{
    setFilterName(event.target.value)
    if(filterName !== ''){
      const filterPersons = persons.filter((item) =>{
        const element = item.name.toLowerCase()
        const character = filterName.toLowerCase()
        return element.includes(character)
      })
      setPersons(filterPersons)
    }



  }

  useEffect(() =>{
    axios.get('http://localhost:3001/persons')
      .then(response =>{
        setPersons(response.data)
      })
    
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} process={filter}></Filter>
      <FormPerson name={newName} phone={newNumber} process={addPerson} nameProcess={addName} phoneProcess={addPhone}></FormPerson>
      <h2>Numbers</h2>
      <Persons persons={persons}></Persons>
    </div>
  )
}

export default App