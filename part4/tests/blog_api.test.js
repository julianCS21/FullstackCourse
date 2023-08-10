const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')


const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 12,
      },
      {
        title: 'Go To Statement Considered Harmful 2',
        author: 'Robert C. Martin',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
  
      }    
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('get  api of blogs', () =>{
  test('there are two blogs', async () =>{
    const response =  await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)

})


})

describe('get api for look uniques ids', () =>{
  test('for each blog, his id is unique', async () =>{

    const response  = await api.get('/api/blogs')
  
    response.body.forEach(element =>{
      expect(element.id).toBeDefined()
  
    })
  
  
  })
  
  
})

describe('create a blog ', ()=>{
  test('there are a new blog', async () =>{
    const newBlog = {
      title: 'Canonical Reduction',
      author: 'Falcao Garcia',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 13
    }

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1bGlhbmNzMjEiLCJpZCI6IjY0ZDNkNzU0ZjBmYWZhZGI1MzMxNTFkYyIsImlhdCI6MTY5MTY4MzE0NH0.3E1Tthqr1PLbTCpzk-x7HarCKEDHCefmM7gSbRvsWuc'
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`) 
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`) 

  
    const authors = response.body.map(r => r.author)
    
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(authors).toContain(
      'Falcao Garcia'
    )
  
  
  
  })
  

})


describe('create a new blog whitout likes',() =>{
  test('there are a new blog with no likes', async () =>{
    const newBlog = {
      title: 'Canonical 2',
      author: 'Teofilo Gutierrez',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
    }

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1bGlhbmNzMjEiLCJpZCI6IjY0ZDNkNzU0ZjBmYWZhZGI1MzMxNTFkYyIsImlhdCI6MTY5MTY4MzE0NH0.3E1Tthqr1PLbTCpzk-x7HarCKEDHCefmM7gSbRvsWuc'

  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`) 
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
  
    const likes = response.body.map(r => r.likes)
    
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(likes).toContain(0)
  
  
  
  })

})

describe('create a new blog whitout title and url', ()=>{
  test('if the blog doesnt have title and url, must be response with missing content and 400', async ()=>{
    const newBlog = {
      author: 'Teofilo Gutierrez',
      likes : 500
    }

    await api
    .delete('/api/blogs/64d17b86ff52f9e746b40773')
    .expect(204)
    .expect('Content-Type', /application\/json/)


    


  })
})



describe('delete a blog', ()=>{
  test('delete a blog', async ()=>{
    await api
    .delete('/api/blogs/64d17b86ff52f9e746b40773')
    .expect(204)

  })
})



describe('update a blog', ()=>{
  test('update a blog', async ()=>{

    const newBlog ={
      title: "Go To Statement Considered Harmful 2",
      author: "Robert C. Martin",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10,
      
    }
    

    await api
    .put('/api/blogs/64d17b86ff52f9e746b40775')
    .send(newBlog)
    .expect(202)
    .expect('Content-Type', /application\/json/)


    


  })
})










afterAll(() => {
  mongoose.connection.close()
})


