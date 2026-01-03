const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('users')
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes} = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }
  
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    users: user._id
  })
  
  const result = await blog.save() 
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result) 
})

blogRouter.delete('/:id', async(request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }

  const blog = await Blog.findById(request.params.id) // locate the blog by its id
  
  if (blog.users.toString() === user._id.toString()) { // convert both user ids to string to compare
    await blog.deleteOne() // delete blog
    response.status(204).end() // send successful response
  } else {
    return response.status(400).json({ error: 'logged in user is not blog author'})
  }
 
})

module.exports = blogRouter