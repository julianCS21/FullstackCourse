import { useState } from "react"
import ErrorMessage from "./errorMessage"



import blogService from '../services/blogs'

const NewBlog = ({blogs,setBlogs,token}) =>{


    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState('')
    const [color, setColor] = useState('white')




    const [noteVisible,setNoteVisible] = useState(false)

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
          const response = await blogService.create({title : title, author : author, url : url},token)
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
    
    
      


    const showNoteForm = {display : noteVisible ? "none" : "" }
    const showCancelOption = {display : noteVisible ? "" : "none"}

    


    return (
        

        <div>
            <ErrorMessage message={message} color={color}></ErrorMessage>
            <div style={showNoteForm}>
                <button id='newBlog' onClick={() => setNoteVisible(true)}>create blog</button>
            </div>
            <div style={showCancelOption}>
                <form onSubmit={(event) =>{createBlogProccess(event)}}>
                    title : <input id='title' type="text" value={title} name="title" onChange={({target}) =>{changeTitle(target)}}></input>
                    <br></br>
                    author : <input id="author" type="text" value={author} name="author" onChange={({target}) =>{changeAuthor(target)}}></input>
                    <br></br>
                    url: <input id='url' type="text" value={url} name="url" onChange={({target}) =>{changeUrl(target)}}></input>
                    <br></br>
                    <button id='BlogSubmit' type="sumbit">Create</button>
                    
                </form>
            </div>
             <div style={showCancelOption}>
                <button onClick={() => setNoteVisible(false)}>cancel</button>
            </div>

        </div>
        
   
    )
    

}




export default NewBlog