// Import mongoose (used for connecting to MongoDB)
const mongoose = require('mongoose')

// Create a variable called userSchema that creates a new mongoose.Schema object
// The object has the following fields, username, name, passwordHash, notes (array of objects)

// Update the 'toJSON' method using .set('toJSON') on the new mongoose.Schema object (userSchema)
// 'toJSON'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the paswordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User