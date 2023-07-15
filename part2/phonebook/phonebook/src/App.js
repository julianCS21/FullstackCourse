import React, { useState } from 'react'
import Filter from './components/Filter'
import FormPerson from './components/FormPerson'
import Persons from './components/Persons'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
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