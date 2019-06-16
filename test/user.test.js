const request = require('supertest')
const app = require('../app')

test('underage user should not be able to signup', async () => {
  await request(app).post('/auth/signup').send({
    username: 'Daniel',
    password: 'Passwordly',
    email: 'daniel@gmail.com',
    age: 12
  }).expect(400)
})

test('Should sign up a new user', async () => {
  await request(app).post('/auth/signup').send({
    username: 'Daniella',
    password: 'Passwordly',
    email: 'daniella@gmail.com',
    age: 12
  }).expect(201)
})