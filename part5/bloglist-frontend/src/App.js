import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/loginForm'
import ErrorMessage from './components/errorMessage'
import userService from './services/user'
import NewBlog from './components/NewBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [color, setColor] = useState('white')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')



  const [user,setUser] = useState(null)


  const changeUsername = (target) =>{
    setUsername(target.value)
    

  }

  const changePassword = (target) =>{
    setPassword(target.value)
  }


  const changeTitle = (target) =>{
    setTitle(target.value)
  }
  

  const changeAuthor = (target) =>{
    setAuthor(target.value)
  }


  const changeUrl = (target) =>{
    setUrl(target.value)
  }


  const createBlogProccess = async (event) =>{
    event.preventDefault()

    try{
      const response = await blogService.create({title : title, author : author, url : url},user.token)
      const newBlogs = [...blogs]
      newBlogs.push(response)
      setBlogs(newBlogs)
      setMessage('Blog created')
      setColor('green')
      setTimeout(() =>{
        setMessage('')
        setColor('white')
      },5000)
    }
    catch{
      setMessage(' Blog hasnt created, verify content of blog')
      setColor('red')
      setTimeout(() =>{
        setMessage('')
        setColor('white')
      },5000)
    }

  }
  

  const loginProcess =  async (event) =>{
    event.preventDefault()

    try{
      const newUser = await loginService.login({username : username, password : password})
      setUser(newUser)
      setUsername('')
      setPassword('')
      const userBlogs = await userService.findByUsername(newUser.username)
      setBlogs(userBlogs.blogs)
      setMessage('Welcome ' + newUser.username)
      window.localStorage.setItem(
        'LoggedUser' , JSON.stringify(newUser)
      )
      setColor('green')
      setTimeout(() =>{
        setMessage('')
        setColor('white')
      },5000)
    }catch(exception){
      setMessage('Username or Password incorrect')
      setColor('red')
      setTimeout(() =>{
        setMessage('')
        setColor('white')
      },5000)
    }
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  useEffect(() =>{
    const userInSession = window.localStorage.getItem('LoggedUser')
    if(userInSession){
      const user = JSON.parse(userInSession)
      setUser(user)
    }

  },[])

  if(user === null){
      return (
        <div>
          <ErrorMessage message={message} color={color}></ErrorMessage>
          <Login username={username} password={password} changeUsername={changeUsername} changePassword={changePassword} loginProcess={loginProcess}    ></Login>
        </div>
      )
    }

  return (
    
    <div>
      <ErrorMessage message={message} color={color}></ErrorMessage>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
      
      }
      <NewBlog title={title} author={author} url={url} changeTitle={changeTitle} changeAuthor={changeAuthor} changeUrl={changeUrl} createBlogProccess={createBlogProccess}  > </NewBlog>

    </div>
  )
}
    
  

export default App