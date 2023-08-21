import { useState } from 'react'
import loginService from '../services/login'
import ErrorMessage from './errorMessage'
import PropTypes from 'prop-types'

const LoginForm = ({changeUser}) =>{


    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [message,setMessage] = useState('')
    const [color,setColor] = useState('white')
    
  
  
  
    
  
  
    const changeUsername = (target) =>{
      setUsername(target.value)
      
  
    }
  
    const changePassword = (target) =>{
      setPassword(target.value)
    }
  
    
    
  
  
  
  
    const loginProcess =  async (event) =>{
      event.preventDefault()
  
      try{
        const newUser = await loginService.login({username : username, password : password})
        changeUser(newUser)
        setUsername('')
        setPassword('')
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



    
    return (
        <div>
            <h1>Login with your account</h1>
            <ErrorMessage message={message} color={color}></ErrorMessage>
            <form onSubmit={(event) =>{
                loginProcess(event)
            }}>
                Username : <input id='username' type="text" value={username} name="username" onChange={({target}) => changeUsername(target)}  ></input>
                <br></br>
                 Password : <input id='password' type="password" value={password} name="password" onChange={({target}) => changePassword(target)}></input>
                 <br></br>
                <button id='submitLogin' type="submit">login</button>
            </form>
        </div>

    )
}



// eslint-disable-next-line react/no-typos
LoginForm.PropTypes = {
  changeUser : PropTypes.func.isRequired,
  changePassword : PropTypes.func.isRequired
}
export default LoginForm