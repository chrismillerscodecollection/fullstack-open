import 'dotenv/config'
import mongoose from 'mongoose'

console.log("arg length ", process.argv.length)
const connectionString = process.env.MONGO_DB_URI
console.log("Connection string....", connectionString)
console.log("Connect to MongoDB processing starting...")

async function connectDB(url) {
  try {
    const connection = await mongoose.connect(url, { family: 4 })
    return connection
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

await connectDB(connectionString)

console.log("Setting a new schema called 'listingSchema'")
const listingSchema = new mongoose.Schema({
  name: String,
  number: String,
})

console.log("Setting new mongoose.model called 'Listing' that uses 'listingSchema'")
const Listing = mongoose.model('Listing', listingSchema)

async function createListing(listingName, listingNumber) {
  const newListing = new Listing({
    "name": `${listingName}`,
    "number": `${listingNumber}`
  })
  return await newListing.save()
}

if (process.argv.length === 3) {
  try {
    const result = await Listing.find({})
    console.log("Connected to MongoDB...")
    console.log("Found the following listings in the phonebook...")
    result.forEach(listing => {
      console.log(`${listing.name} ${listing.number}`)
    })
  } catch (err) {
    console.error(err)
  } finally {
    mongoose.connection.close()
  }


} else if (process.argv.length === 5) {
  // Run using "node mongo.js {collectionName} {name} {number}"
  const name = process.argv[3]
  const number = process.argv[4]

  try {
    const result = await createListing(name, number)
    console.log('New listing saved...')
    console.log(`id: ${result.id}`)
    console.log(`name: ${result.name}`)
    console.log(`number: ${result.number}`)
  } catch (err) {
    console.error(err)
  } finally {
    mongoose.connection.close()
  }

} else {
  process.exit(1)
}
