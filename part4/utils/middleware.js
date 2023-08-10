const User = require('../models/user')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name ===  'JsonWebTokenError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }


const getTokenFrom = request => {
    const authorization = request.get('Authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
}
  
const tokenExtractorMiddleware = (request, response, next) => {
    const token = getTokenFrom(request)
    request.token = token  
    next() 
}



const getUser =  async id =>{

  const user = await User.findById(id)


  return user

}


const userExtractor = async (request,response,next) =>{
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }


  request.user =   await getUser(decodedToken.id)

  next()
}
  

  


module.exports = {
    errorHandler,tokenExtractorMiddleware,userExtractor
}