
const sendWelcomeEmail  = (email, name) => {
  sgMail.send({
    to: email,
    from: 'odave97@gmail.com',
    subject: 'Welcome',
    text: `Welcome ${name}`
  })
}

const sendLoginMail  = (email, name) => {
  sgMail.send({
    to: email,
    from: 'odave97@gmail.com',
    subject: 'Welcome',
    text: `Hey ${name}, we noticed that you logged in`
  })
}

const sendDeleteMail  = (email, name) => {
  sgMail.send({
    to: email,
    from: 'odave97@gmail.com',
    subject: 'Welcome',
    text: `Goodbye ${name}, we are sorry to see you go`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendLoginMail
}