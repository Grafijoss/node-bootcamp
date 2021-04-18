const mongoose = require('mongoose')

const { MONGO_DV_URI, MONGO_DV_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGO_DV_URI_TEST
  : MONGO_DV_URI

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('Database connected')
  })
  .catch(err => console.log('ERROR', err))

process.on('uncaughtException', error => {
  console.log(error)
  mongoose.disconnect()
})
