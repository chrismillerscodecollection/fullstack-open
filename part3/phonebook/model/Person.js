import mongoose from 'mongoose'
const { Schema, model } = mongoose

const personSchema = new Schema({
  id: String,
  name: String,
  number: Number
}, {
  timestamps: true
})

const Person = model('Person', personSchema)
export default Person