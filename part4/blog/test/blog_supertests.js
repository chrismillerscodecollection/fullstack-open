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

test('GET /api/blog returns 200', async () => {
  const response = await request(app).get('/api/blogs')
  assert.strictEqual(response.status, 200)
})
