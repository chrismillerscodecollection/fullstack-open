import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    validate: {
      validator: function (val) {
        return val.length > 2
      },
      message: (props) => `Name must be at least 3 characters long. Got ${props.value.length}.`
    },
    required: true,
  },
  number: {
    type: String,
    validate: [
      {
        validator: function (value) {
          return value.length >= 8
        },
        message: (props) => `Phone number must be at least 8 characters long. Got ${props.value.length}.`
      },
      {
        validator: function (value) {
          return /^\d{2,3}-\d{5,20}$/.test(value)
        },
        message: 'Phone number must contain two-three digits, followed by a hyphen, followed by at least six digits.'
      }
    ],
    required: true,
  }
},
{
  timestamps: true
})


export const Person = mongoose.model('Person', personSchema)
