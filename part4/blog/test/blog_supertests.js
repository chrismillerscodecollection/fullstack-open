const { test, describe, before, after } = require('node:test')
const assert = require('node:assert')
const request = require('supertest')
const mongoose = require('mongoose')
const { app, connectDB } = require('../app')

before(async () => {
  const connection = await connectDB()
  return connection
})

after(async () => {
  await mongoose.connection.close()
})

describe('get requests to mongoDB', () => {
  test('get /api/blogs returns 200 + first blog', async () => {
    const response = await request(app)
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blog = {
      title: 'Building Scalable Microservices with Node.js',
      author: 'Sarah Mitchell',
      url: 'https://devblog.tech/microservices-nodejs',
      likes: 42,
      id: '6951c854bc953a5ef435215a'
    }

    assert.deepStrictEqual(response.body[0], blog)
  })
})

describe('post requests to mongoDB', () => {
  test('post /api/blogs returns 201 + adds new blog post', async () => {
    const response = await request(app)
      .post('/api/blogs')
      .send({
        title: 'Understanding React Hooks in Depth',
        author: 'James Anderson',
        url: 'https://frontend-masters.io/react-hooks-guide',
        likes: 128,
      })
      .expect(201)

    assert.ok(response.body.id)
  })

  test('handles missing property - "likes"', async () => {
    const response = await request(app)
      .post('/api/blogs')
      /send({
        title: ''
      })
  })


})