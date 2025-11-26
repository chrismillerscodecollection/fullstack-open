import 'dotenv/config'
import mongoose from 'mongoose'
import { Listing } from './model/listing.js'

export async function connectDB(url) {
  try {
    console.log('Connecting to MongoDB...')
    const connection = await mongoose.connect(url, { family: 4 })
    return connection
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  } finally {
    console.log('Connected to MongoDB...')
  }
}

export async function showListings() {
  try {
    const result = await Listing.find({})

    result.forEach(listing => {
      console.log(listing)
    })
  } catch (err) {
    console.error(err)
  } finally {
    mongoose.connection.close()
  }
}

export async function createListing(listingName, listingNumber) {
  const newListing = new Listing({
    name: listingName,
    number: listingNumber
  })
  return await newListing.save()
}
