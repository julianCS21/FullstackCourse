import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Login from './loginForm'
import NewBlog from './NewBlog'
import ErrorMessage from './errorMessage'


const Blog = () => {


  const [blogs,setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [showInfo,setShowInfo] = useState({}) 
  const [showWhenVisible, setshowwhenVisible] = useState({})
  const [showWhenHide, setshowwhenHide] = useState({})
  const [message,setMessage] = useState('')
  const [color,setColor] = useState('')



  
  


  useEffect(async () => {
    const newBlogs = await blogService.getAll()
    newBlogs.sort((a,b) => b.likes - a.likes)
    setBlogs(newBlogs)   
  }, [])


  const changeUser = (newUser) =>{
    setUser(newUser)
    
  }

  const changeBlogs = (newBlogs) =>{
    setBlogs(newBlogs)
  }


  const logOut = () =>{
    setUser(null)
    localStorage.removeItem('LoggedUser');

  }

  const deleteBlog = async (blog) =>{
    try{
      const confirm = window.confirm('remove blog ' + blog.title + ' by ' + blog.author)
      if(confirm){
        await blogService.deleteBlog(blog.id,user.token)
        const newBlogs = blogs.filter(blogi =>
          blogi.id !== blog.id 
        )
        setBlogs(newBlogs)
        setMessage('this blog has been eliminated')
        setColor('green')
        setTimeout(() =>{
          setMessage('')
          setColor('white')
        },5000)
      }
    }catch{
      setMessage('Error, this blog hasnt been eliminated')
        setColor('red')
        setTimeout(() =>{
          setMessage('')
          setColor('white')
        },5000)

    }

  }

  const updateBlog =  async (index,id) =>{
    const newPost = {
      title : blogs[index].title,
      author : blogs[index].author,
      url : blogs[index].url,
      likes : blogs[index].likes + 1
    }
    const updateBlog = await blogService.update(newPost,id)
    const newBlogs = [...blogs];
    console.log(updateBlog)
    newBlogs[index].likes = newPost.likes
    setBlogs(newBlogs);
  }

  useEffect(() =>{
    const loggedUser = window.localStorage.getItem('LoggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      
    }


  },[])


  const changeVisible = (index) =>{

    //change val boolean of showinfo
    const newShowInfo = {...showInfo}
    newShowInfo[index] = !newShowInfo[index]
    setShowInfo(newShowInfo)

    //change styles
    const newShowWhenVisible = {...showWhenVisible}
    newShowWhenVisible[index] = {display : newShowInfo[index] ? 'none' : ''}
    setshowwhenVisible(newShowWhenVisible)

    const newShowWhenHide = {...showWhenHide}
    newShowWhenHide[index] = {display : newShowInfo[index] ? '' : 'none'}
    setshowwhenHide(newShowWhenHide)

  }





  if(user === null){
    return (
      <div>
        <Login changeUser={changeUser} changeBlogs={changeBlogs}></Login>
      </div>
    )
  }


  

  return (
    <div>
      <h1>{user.username}</h1> <button id='logOut' onClick={() => logOut()}> logOut</button>
      <br />
      <h1>Blogs</h1>
      <br />
      <ErrorMessage message={message} color={color}></ErrorMessage>
      <br />
      {blogs.map((blog, index) => (
        <div className='blog' key={index}>
          <h1>{blog.title}</h1>
          <h1>{blog.author}</h1>
          <div style={showInfo[index] === undefined ? { display: '' } : showWhenVisible[index]}>
            <button id='view' onClick={() => changeVisible(index)}>view</button>
          </div>
          <div className='blogContent' style={showInfo[index] === undefined ? { display: 'none' } : showWhenHide[index]}>
            <h1>{blog.url}</h1>
            <button onClick={() => changeVisible(index)}>hide</button>
            <br />
            {blog.likes} <button id='like' onClick={() => updateBlog(index, blog.id)}>like</button>
            <br />
            <button id='delete' onClick={() => deleteBlog(blogs[index])}>delete</button>
          </div>
        </div>
      ))}
      <NewBlog blogs={blogs} setBlogs={changeBlogs} token={user.token}></NewBlog>
    </div>
  );

}

  


export default Blog