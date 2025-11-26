import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
}, {
  timestamps: true
})

export const Person = mongoose.model('Person', personSchema)
