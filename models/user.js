const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// Create a schema of sort that defines different values and their conditons 
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) { // Here we check if it is an email and throw an error if it is not
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) { // You can have various checks, here we are validating if the password contains "password"
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 16) {
        throw new Error('You are not old enough to use this app')
      }
    }
  }
})

// Setting up authentication
// First npm install bcryptjs ( this makes use of hashing algorithms to protect the passwords before they are saved to the DB)
// Key functions are bcrypt.hash({plain password},{number of rounds}) and bcrypt.compare({plain password}, {stored password})

// We set up a middleware for each user before being save
userSchema.pre('save', async function (next) { // we did not use an arrow function hereause we want to access the "this" property
  const user = this
  if (user.isModified('password')) { // this checks if the user password property is being changed 
    user.password = await bcrypt.hash(user.password, 10)
  }
  
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User