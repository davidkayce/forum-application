// First npm install mongoose

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dvaidkayce:nwokeobioma@koaapp-0bdt0.azure.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
