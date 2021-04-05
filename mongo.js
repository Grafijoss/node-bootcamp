const mongoose = require('mongoose')

const password = require('./password')

//  podemos llamar la base de datos como queramos en este caso midudv
const connectionString = `mongodb+srv://lilola:${password}@myfirstcluster.kflco.mongodb.net/midudv?retryWrites=true&w=majority`

// Conexion a mongo db

mongoose.connect(connectionString, { // in order to evoid the deprecation warnings
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true // nos facilita a la hora de buscar documentos
})
  .then(() => {
    console.log('Database connected')
  })
  .catch(err => console.log('ERROR', err))
