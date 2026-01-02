const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('users')
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes} = request.body
  const user = await User.findOne({})
  
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

module.exports = blogRouter