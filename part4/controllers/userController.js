const userController = require('express').Router()

const bcrypt = require('bcryptjs')

const User = require('../models/user')

const Blog = require('../models/blog')


userController.get('/:username', async (req,res) =>{
    const username = req.params.username
    const user = await User.findOne({username : username}).populate('blogs')
    return res.status(200).json(user)


})


userController.post('/', async (req,res) =>{
    
    const body = req.body



    if(body.password.length < 3 ){
        return res.status(400).json({message : 'password must be more than three characters'})

    }

    
    try{
        const passwordHash = await bcrypt.hash(body.password,10)
        const user = new User({
            username : body.username,
            name : body.name,
            password : passwordHash,
        })
    
        const savedUser =  await user.save()
    
        res.status(201).json(savedUser)
    }catch{
        res.status(400).json({error : 'missing content'})

    }
})

   


userController.get('/', async (req,res) =>{

    const users = await User.find({}).populate('blogs')
    
    res.status(200).json(users)

})

module.exports = {userController}