const auth = async (ctx, next) => {
  console.log('See me baby!')
  next()
}

module.exports = auth