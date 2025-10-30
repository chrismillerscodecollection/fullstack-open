const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))

function calcNumOfPersons(filePath) {
  const jsonFile = require(filePath)
  return jsonFile.length
}

app.get('/', (request, response) => {
  response.send('Welcome to the root directory!')
})

app.get('/persons', (request, response) => {
  response.send(require('./persons.json'))
})

app.get('/info', (request, response) => {
  const jsonResponse = {
    numberOfPeople: calcNumOfPersons('./persons.json'),
    dateAndTime: new Date(Date.now()).toString()     
  }
  
  response.json(jsonResponse)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})