const blogRouter = require('express').Router()

const Blog = require('../models/blog')

const jwt = require('jsonwebtoken')

const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')





blogRouter.get('/',  async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.status(200).json(blogs)
    
})



  
blogRouter.post('/',userExtractor,  async (request, response) => {

    const body = request.body
    const user = request.user
    const blog = new Blog({
      title : body.title,
      author : body.author,
      url : body.url,
      likes : body.likes || 0,
      user : user._id
    })

    if(blog.title === undefined && blog.url === undefined){
      response.status(400).json({error : 'missing content'})
    }
    else{
      const newBlog = await blog.save()
      user.blogs = user.blogs.concat(newBlog._id)
      await user.save()
      response.status(201).json(newBlog)

    }
  
    
  })

  blogRouter.delete('/:id',userExtractor, async (req, res) => {
    try {
        const user = req.user
        const blogEliminate = await Blog.findById(req.params.id);
        if (blogEliminate.user.toString() === user._id.toString()) {
            try {
                await Blog.findOneAndDelete({ _id: req.params.id }); 
                return res.status(204).json({ message: 'this blog has been eliminated' });
            } catch (error) {
                return res.status(404).json({ message: 'this resource doesnt exist' });
            }
        } else {
            return res.status(401).json({ message: 'you dont have permission for this action' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
});

const updateOptions = { runValidators: true };

blogRouter.put('/:id', async (req,res) =>{
  try{
    await Blog.findOneAndUpdate({_id:(req.params.id)},req.body,{ new: true, ...updateOptions })
    res.status(202).json(req.body)

  }catch{
    res.status(404).json({message :'this resouerce doesnt exist'})

  }
})


module.exports = {
    blogRouter
}



