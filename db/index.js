const mongoose = require('mongoose')

const db = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('🥁 DB connected'))
  .catch((err) => console.error(err))

module.exports = db