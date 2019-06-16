const request = require('supertest')
const app = require('../app')
const User = require('../models/user')

const userOne = {
  name: 'Mike',
  email: 'mike@example.com',
  password: '56what!!'
}

beforeEach(async () => {
  await User.deleteMany()
  await new User(userOne).save()
})

test('Should signup a new user', async () => {
  await request(app).post('/auth/signup').send({
    name: 'Andrew',
    email: 'andrew@example.com',
    password: 'MyPass777!'
  }).expect(201)
})

test('Should login existing user', async () => {
  await request(app).post('/auth/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)
})

test('Should not login nonexistent user', async () => {
  await request(app).post('/auth/login').send({
    email: userOne.email,
    password: 'thisisnotmypass'
  }).expect(400)
})