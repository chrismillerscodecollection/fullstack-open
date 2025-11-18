const mongoose = require('mongoose')

// Provide password and collectionName as arguments to continue the process
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://cm_dev:${password}@cluster0.cmikiy1.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const listingSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Listing = mongoose.model('Listing', listingSchema)

if (process.argv.length === 3) {
  Listing.find({}).then(
    result => {
      console.log("phonebook: ")
      result.forEach(listing => {
        console.log(`${listing.name} ${listing.number}`)
      })
  if (mongoose.connection) {
    mongoose.connection.close()
  }
})

} else if (process.argv.length === 4) {
  // Run using "node mongo.js {password} {collectionName}"
  const name = process.argv[3]
  const number = process.argv[4]

  const newListing = new Listing({
    "name": `${name}`,
    "number": `${number}`
  })

  newListing.save().then(_result => {
    console.log('listing saved!')
  })
  if (mongoose.connection) {
    mongoose.connection.close()
  } 
}
