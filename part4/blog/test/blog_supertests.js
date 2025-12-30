const { test, describe, before, after } = require('node:test')
const assert = require('node:assert')
const request = require('supertest')
const mongoose = require('mongoose')
const { app, connectDB } = require('../app')

before(async () => {
  await connectDB()
})

after(async () => {
  await mongoose.connection.close()
})

// A simple test to verify that we can connect to the blog-test database and access records
// The blog-test database contains 'documents' each representing a seperate blog
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

  test('"_id" is converted to "id"', async () => {
    const response = await request(app)
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.ok(response.body[0].id)
  })
})

// Checking to see if we can add a new blog to the blog-test database
// We don't send an id as the database will generate one automatically
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
      .send({
        title: 'Modern CSS Grid Layouts: A Complete Guide',
        author: 'Emily Chen',
        url: 'https://css-weekly.com/grid-layouts-complete',
      })
      .expect(201)
     
      assert.strictEqual(response.body.likes, 0)
  })
})


// 4.12*: Blog List tests, step 5
// Write tests related to creating new blogs via the /api/blogs endpoint, 
// that verify that if the title or url properties are missing from the request data, 
// the backend responds to the request with the status code 400 Bad Request.

// Make the required changes to the code so that it passes the test.