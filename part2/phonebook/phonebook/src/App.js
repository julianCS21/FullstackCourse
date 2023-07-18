import React, { useState,useEffect } from 'react'
import Filter from './components/Filter'
import FormPerson from './components/FormPerson'
import Persons from './components/Persons'
import personService from './services/phones'

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
      if(elemento.name.toLowerCase() === person.name.toLowerCase()){
        return true
      }
      return false
    })

    if(!findPerson){
      personService
        .addPerson(person)
        .then(returnedPerson =>{
          newPersons.push(returnedPerson)
          setPersons(newPersons)

        })
      
    }
    else{
      let isConfirm = window.confirm(person.name + ' is already added to phonebook, replace the old number with a new one')
      if(isConfirm){
        const filteredNotes = persons.filter((elem) => elem.name.toLowerCase().includes(person.name.toLowerCase()));
        const index = filteredNotes.map((elem) => elem.id);
        personService
          .updatePerson(index,person)
          .then(returnedPerson =>{
            setPersons(persons.map(element => element.name.toLowerCase() === person.name.toLowerCase() ? returnedPerson : element))
          })

      }
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

  useEffect(()=>{
    personService
      .getAll()
      .then(response =>{
        setPersons(response)
      })
      .catch(error =>{
        console.log("fail")
      })

  },[])

  const deletePerson = (id,name) =>{
    console.log(id)
    let confirm = window.confirm("delete " + name + " ?")
    if(confirm){
      personService
        .deletePerson(id)
        .then(response =>{
          const newPersonsInList = persons.filter((item) => item.id !== id)
          setPersons(newPersonsInList)
          alert(name + " has been deleted")
        })
        .catch(error =>{
          alert(name + " hasnt been deleted")

        })
      }
    }


  




  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} process={filter}></Filter>
      <FormPerson name={newName} phone={newNumber} process={addPerson} nameProcess={addName} phoneProcess={addPhone}></FormPerson>
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson}></Persons>
     
    </div>
  )
}


export default App