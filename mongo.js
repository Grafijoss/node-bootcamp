const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DV_URI

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

process.on('uncaughtException', () => {
  mongoose.connection.disconnect()
})
