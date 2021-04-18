// los mudulos se llaman una sola vez por que se cachean
// cuando se llama el modulo se  inicializa la funcion
// inicializa las variables de entorno process.env.nombrevariable
require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login')

// usamos el middleware de cors para que todoas las peticiones
// permitan compartir recursos con diferentes origenes
app.use(cors())

// añadimos el modulo body parser de express
// de esta forma ya esta disponible el body en el request
// se parse a json
app.use(express.json())

// middleware para servir archivos estaticos dentro de una carpeta
// http://localhost:3001/deadpool.jpg
// app.use(express.static('images'))
// se puede aplicar una ruta
app.use('/images', express.static('images'))

// const notes = []

// CONTROLLERS CONTROLADORES

// response tiene diferentes metodos para regresar la información
app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

// app.use((request, response) => {
//   response.status(404).json({
//     error: 'Not found'
//   })
// })

app.use('/api/users', usersRouter)
app.use('/api/notes', notesRouter)
app.use('/api/login', loginRouter)

// el orden de los middlewares es importante
// middleware no ha encontrado nada
app.use(notFound)

// middleware ERROR
app.use(handleErrors)

// el puerto que tiene que escuchar por defecto
// http por defecto siempre entra al puerto 80
// https por defecto entra al puerto 443 SSL
const PORT = process.env.PORT

// como se inicia el servidor en express es asincrono
// se pasa un callback que se dispara cuando el servidor termina de levantarse
const server = app.listen(PORT, () => {
  console.log(`Server is running now on port ${PORT}`)
})

module.exports = {
  app,
  server
}
