const config = require('./utils/config')
require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogController')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const userRouter = require('./controllers/userController')
const loginRouter = require('./controllers/loginController')
const middleware = require('./utils/middleware')


logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.tokenExtractorMiddleware)
console.log(config.NODE_ENV);

if (config.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testController')
  app.use('/api/testing', testingRouter)
}


app.use('/api/blogs', blogRouter.blogRouter)
app.use('/api/users',userRouter.userController)
app.use('/api/login',loginRouter)



app.use(middleware.errorHandler)









module.exports = app