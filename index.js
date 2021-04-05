// los mudulos se llaman una sola vez por que se cachean
// cuando se llama el modulo se  inicializa la funcion
// inicializa las variables de entorno process.env.nombrevariable
require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

const Note = require('./models/Note')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

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

app.get('/api/notes', (request, response) => {
  Note.find({})
    .then(notes => {
      response.json(notes)
    })
})

// es la forma dicamica de recuperar un segmento del PATH
app.get('/api/notes/:id', (request, response, next) => {
  // params es parte del objeto request
  // los segmentos del PATH siempre van a ser un string-
  const { id } = request.params

  Note.findById(id)
    .then(note => {
      if (note) {
        response.send(note)
      } else {
        response.send(404).end()
      }
    })
    .catch(err => {
      // saltamos al middleware de error
      next(err)
    })
})

app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteinfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteinfo, { new: true })
  // lo que va a retornar la promesa es el documento sin editar
  // ara retornar el dcomento editado hay que pasar un tercer parametro
    .then(result => response.json(result))
})

app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(next)
    // busca el middleware con el error como primer parametro
})

app.post('/api/notes/', (request, response) => {
  const noteBody = request.body

  if (!noteBody) {
    return response.status(400).json({
      error: 'note content is missing'
    })
  }

  const note = new Note({
    content: noteBody.content,
    date: new Date(),
    important: noteBody.important || false
  })

  note.save()
    .then(saveNote => {
      response.json(saveNote)
    })
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Nor found'
  })
})

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
app.listen(PORT, () => {
  console.log(`Server is running now on port ${PORT}`)
})
