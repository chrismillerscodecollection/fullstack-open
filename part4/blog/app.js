const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const app = express()

const connectDB = async () => {
  try {
    logger.info('connecting to', config.MONGODB_URI)
    const conn = await mongoose.connect(config.MONGODB_URI)
    logger.info(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`)
    process.exit(1)
  }
}

app.use(express.json())
app.use(middleware.requestLogger)
// app.use(middleware.missingPropHandler)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = { app, connectDB }