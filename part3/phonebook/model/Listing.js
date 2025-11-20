const mongoose = require('mongoose')

const { Schema, model } = mongoose

const listingSchema = new Schema({
  id: String,
  name: String,
  number: Number
}, {
  timestamps: true
})

module.exports = mongoose.model('Listing', listingSchema)