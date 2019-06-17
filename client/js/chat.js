const socket = io()

const text = document.getElementById('m')
console.log(text.value())
const button = document.querySelector('#b')
const messages = document.querySelector('#messages')

button.addEventListener('click', (e) => {
  if (text === '') return
  socket.emit('post', post)
  text.value = ''
  e.preventDefault()
})