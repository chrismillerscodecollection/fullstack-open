const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('users')
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes} = request.body
  const user = request.user
  
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

blogsRouter.delete('/:id', userExtractor, async(request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id) // locate the blog by its id
  
  if (!blog) {
    return response.status(400).json({ error: 'blog not found'})
  }
  if (blog.users.toString() === user._id.toString()) { // convert both user ids to string to compare
    await blog.deleteOne() // delete blog
    response.status(204).end() // send successful response
  } else {
    return response.status(403).json({ error: 'logged in user is not blog author'})
  }
 
})

module.exports = blogsRouter