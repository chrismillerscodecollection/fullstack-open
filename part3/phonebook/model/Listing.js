import mongoose from 'mongoose'

const listingSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
}, {
  timestamps: true
})

export const Listing = mongoose.model('Listing', listingSchema)

