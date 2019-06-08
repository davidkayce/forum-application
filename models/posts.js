const mongoose = require('mongoose')

// Create a schema of sort that defines different values and their conditons 
const Post = mongoose.model('Task', {
  title: {
    type: String,
    required: true,
    minlength: 7,
    trim: true
  },
  author: { //Setting post-user relationship
    type: mongoose.Schema.Types.ObjectId,
    required: true
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