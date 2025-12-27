const request = require('supertest')
const { test } = require('node:test')
const express = require('express')
const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')
const middleware = require('../utils/middleware')
const blogRouter = require('../controllers/blogs')

logger.info(`Connecting to: ${config.MONGODB_URI}`)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI)
    logger.info(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`)
    process.exit(1)
  }
}

const app = express()

app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

test.before(async () => {
  await connectDB()
})

test.after(async () => {
  await mongoose.connection.close()
})

test('returns all blogs', () => {
  return request(app)
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .then(res => {
      console.log(res.body)
    })
})