import axios from "axios";

const backUrl = 'http://localhost:3001/api/persons'


const getAll = () =>{
    const request = axios.get(backUrl)
    return request.then(response => response.data)
}


const addPerson = (person) =>{
    const request = axios.post(backUrl,person)
    return request.then(response => response.data)
}

const deletePerson = (id) =>{
    const request = axios.delete(`${backUrl}/${id}`)
    return request.then(response => response.data)
}

const updatePerson = (id,newObject) =>{
    const request = axios.put(`${backUrl}/${id}`,newObject)
    return request.then(response => response.data)
}

export default {getAll,addPerson,deletePerson,updatePerson}