const mongoose = require('mongoose')

// Create a schema of sort that defines different values and their conditons 
const Post = mongoose.model('Post', {
  title: {
    type: String,
    required: true,
    minlength: 7,
    trim: true
  },
  author: { 
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }, 
  likes: {
    type: Number
  }
})

module.exports = Post