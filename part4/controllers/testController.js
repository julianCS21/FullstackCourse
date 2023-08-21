const routerTest = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

routerTest.post('/reset', async (request, response) => {
  await Blog.deleteMany({})

  response.status(204).end()
})

module.exports = routerTest