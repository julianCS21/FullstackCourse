import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'


const findByUsername =  async (username) =>{
    const response = await axios.get(baseUrl + '/' + username)
    return response.data

}

export default {findByUsername}