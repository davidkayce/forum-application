const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dvaidkayce:nwokeobioma@koaapp-0bdt0.azure.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.connection.once('open', () => {
    console.log('Database connected')
}).on('error', (error) => {
    console.log('Connection error: ', error)
})
