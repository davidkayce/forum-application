const fs = require('fs')
const Router = require('koa-router')
const notes = new Router() // How to nest routes

const loadNotes = () => {
  try {
    body = fs.readFileSync('notes.json').toString()
    return JSON.parse(body)
  } catch (err) {
    return []
  }
}

const addNotes = (data) => {
  const notes = loadNotes()
  const duplicate = notes.find((note) => note.title === data.title) // Find rather than filter here 
  if (!duplicate) {
    notes.push(data)
    fs.writeFileSync('notes.json', JSON.stringify(notes)) // Overwrites what was there before
    return data
  } else {
    return 'A note with this title already exists'
  }
}

const deleteNote = (title) => {
  const notes = loadNotes()
  const keptNotes = notes.filter((note) => note.title !== title)
  fs.writeFileSync('notes.json', JSON.stringify(keptNotes))
  return notes.length > keptNotes.length? 'You deleted a note with title: ' + title : 'There is no note with ths title'
}

notes.get('/', async ctx => {
  ctx.body = loadNotes()
})

notes.get('/:title', async ctx => {
  if (!ctx.params.title) { 
    ctx.body = {
      error: 'You need to pass in a title' 
    }
  } else {
    try {
      const title = ctx.params.title
      const notes = loadNotes()
      ctx.body = notes.find((note) => note.title === title)
    } catch (error) {
      ctx.body = 'error: ' + error
    }
  }
})

notes.post('/:title', async ctx => {
  if ( !ctx.request.body.content || !ctx.params.title || !ctx.request.body.author) { 
    ctx.body = {
      error: 'You are either not providing a proper author, title or message' 
    }
  } else {
    try {
      const data = {
        author: ctx.request.body.author,
        title: ctx.params.title,
        content: ctx.request.body.content
      }
      console.log(ctx.request.body)
      ctx.body = addNotes(data)
    } catch (error) {
      ctx.body = 'error: ' + error
    }
  }
})

notes.delete('/:title', async ctx => {
  if (!ctx.params.title) { 
    ctx.body = {
      error: 'You need to pass in a title' 
    }
  } else {
    try {
      const title = ctx.params.title
      ctx.body = deleteNote(title)
    } catch (error) {
      ctx.body = 'error: ' + error
    }
  }
})


module.exports = notes 