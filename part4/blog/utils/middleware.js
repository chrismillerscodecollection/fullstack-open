const logger = require('./logger')

const requestLogger = (request, response, next) => {
  console.log('requestLogger middleware hit')
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

// const missingPropHandler = (request, response, next) => {
//   const blog = request.body
//   console.log('missingPropHandler hit')
//   console.log(blog)
//   next()
// }

const unknownEndpoint = (request, response) => {
  console.log('unknownEndpoint middleware hit')
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log('errorHandler middleware hit')
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}