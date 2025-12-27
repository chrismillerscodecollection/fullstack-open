require('dotenv').config()

const PORT = process.env.PORT
const ENV = process.env.NODE_ENV
let MONGODB_URI = ''

console.log(`Current NODE_ENV: ${ENV}...`)

switch (ENV) {
  case 'test':
    console.log('test environment variables set...')
    MONGODB_URI = process.env.TEST_MONGODB_URI
    break;
  case 'development':
    console.log('dev environment variables set for using local db...')
    MONGODB_URI = process.env.TEST_MONGODB_URI
    break;
  case 'development-local-db':
    console.log('"dev-local-db environment variables set for using local db...')
    MONGODB_URI = process.env.TEST_MONGODB_URI
    break;
  default:
    console.log('prod environment variables set...')
    MONGODB_URI = process.env.MONGODB_URI
}

console.log('Resolved MONGODB_URI:', MONGODB_URI)

module.exports = { MONGODB_URI, PORT }