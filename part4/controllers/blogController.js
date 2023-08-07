const blogRouter = require('express').Router()

const Blog = require('../models/blog')


blogRouter.get('/',  async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
    
})
  
blogRouter.post('/',  async (request, response) => {
    const blog = new Blog(request.body)

    if(blog.likes === undefined){
      blog.likes = 0
    }

    if(blog.title === undefined && blog.url === undefined){
      response.status(400).json({error : 'miising content'})
    }
    else{
      const newBlog = await blog.save()
      response.status(201).json(newBlog)

    }
  
    
  })

blogRouter.delete('/:id', async (req,res) =>{
  try{
    await Blog.findOneAndDelete({id:(req.params.id)})
    res.status(204).json({meesage : 'this person has been eliminated'})

  }catch{
    res.status(400).json({message : 'this resource doesnt exist'})


  }
})

const updateOptions = { runValidators: true };

blogRouter.put('/:id', async (req,res) =>{
  try{
    await Blog.findOneAndUpdate({id:(req.params.id)},req.body,{ new: true, ...updateOptions })
    res.status(202).json()

  }catch{
    res.status(404).json({message :'this resouerce doesnt exist'})

  }
})


module.exports = {
    blogRouter
}



