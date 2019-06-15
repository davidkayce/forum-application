const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail  = (email, name) => {
  console.log(email, name)
  sgMail.send({
    to: email,
    from: 'odave97@gmail.com',
    subject: 'Welcome',
    text: `Welcome ${name}`
  })
}

const sendLoginMail  = (email, name) => {
  console.log(email, name)
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