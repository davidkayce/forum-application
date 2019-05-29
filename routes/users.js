const Router = require('koa-router')
const users = new Router() // How to nest routes (users)

users.get('/', async ctx => {
  try {
    // Note that you use await Promise.all() to run async/await requests in parallel
    ctx.body = 'Here are all the users' // Use Object.assign({}, tasks) or JSON.parse to ensure the response is always an object
  } catch (error) {
    ctx.body = 'error: ' + error
  }
})

users.get('/:id', async ctx => {
  try {
    const user = ctx.params.id
    ctx.body = 'Hello you have reached user ' + user
  } catch (error) {
    ctx.body = 'error: ' + error
  }
})

users.post('/', async ctx => {
  if ( !ctx.request.body.name || !ctx.request.body.email ) {   // Task name being part of data to be passed 
    ctx.body = {
      error: 'Bad data' // Check if the request body is ok and return error if it isnt
    }
  } else {
    try {
      const name = ctx.request.body.name
      const email = ctx.request.body.email
      console.log(ctx.request.body)
      ctx.body = 'You have created a user named ' + name + ' with email: ' + email
      // ctx.redirect('/api/users')
    } catch (error) {
      ctx.body = 'error: ' + error
    }
  }
})

users.delete('/:id', async ctx => {
  if (!ctx.request.body.task_name) {   // Task name being part of data to be passed 
    ctx.body = {
      error: 'Bad data' // Check if the request body is ok and return error if it isnt
    }
  } else {
    try {
      ctx.body = 'You have deleted a user'
    } catch (error) {
      ctx.body = 'error: ' + error
    }
  }
})


module.exports = users // Export routes
