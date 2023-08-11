import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll =  async () => {
  const response =  await axios.get(baseUrl)
  return response.data
  
}

const create = async (newBlog,token) =>{
  const config = {headers : {Authorization : `bearer ${token}`}}
  const response = await axios.post(baseUrl,newBlog,config)
  return response.data
}



// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll , create}