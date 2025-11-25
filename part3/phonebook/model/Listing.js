import Schema from 'mongoose'

const listingSchema = new Schema({
  id: String,
  name: String,
  number: Number
}, {
  timestamps: true
})

const Listing = mongoose.model('Listing', listingSchema)

export { Listing }