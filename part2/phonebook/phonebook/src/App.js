import React, { useState,useEffect } from 'react'
import Filter from './components/Filter'
import FormPerson from './components/FormPerson'
import Persons from './components/Persons'
import personService from './services/phones'


const Message = ({message,color}) =>{

  const styleMessage = {
    color: color, 
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'

  }
  if(message === null){
    return null
  }
  return(
    <div style={styleMessage}>
      <h1>{message}</h1>
    </div>
  )

}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [filterName,setFilterName] = useState('')
  const [message,setMessage] = useState(null)
  const [color,setColor] = useState('white')

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
          setMessage('Added ' + person.name)
          setColor('green')
          setTimeout(() => {
            setMessage(null)
            setColor('white')
            
          }, 5000);


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
            setMessage('Updated ' + person.name)
            setColor('green')
            setTimeout(() => {
              setMessage(null)
              setColor('white')
              
            }, 5000);

          })
          .catch(error =>{
            setMessage('Information of ' + person.name + ' has already been removed from server')
            setColor('red')
            setTimeout(() => {
              setMessage(null)
              setColor('white')
              
            }, 5000);
            

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
      <Message message={message} color={color}></Message>
      <Filter value={filterName} process={filter}></Filter>
      <FormPerson name={newName} phone={newNumber} process={addPerson} nameProcess={addName} phoneProcess={addPhone}></FormPerson>
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson}></Persons>
     
    </div>
  )
}


export default App