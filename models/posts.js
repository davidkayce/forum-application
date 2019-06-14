const mongoose = require('mongoose')

// Create a schema of sort that defines different values and their conditons 
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 7,
    trim: true
  },
  content: {
    type: String,
    required: true,
  }, 
  likes: {
    type: Number
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post