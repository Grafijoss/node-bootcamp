// los mudulos se lalman una sola vez por que se cachean
// cuando se llama el modulo se  inicializa la funcion
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

const Note = require('./models/Note')

// usamos el middleware de cors para que todoas las peticiones
// permitan compartir recursos con diferentes origenes
app.use(cors())

// añadimos el modulo body parser de express
// de esta forma ya esta disponible el body en el request
// se parse a json
app.use(express.json())

let notes = []

// response tiene diferentes metodos para regresar la información
app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  // response.json(notes.map(note => {
  //   const { _id, __v, ...restOfNote } = note
  //   return {
  //     ...restOfNote,
  //     id: _id
  //   }
  // }))
  Note.find({})
    .then(notes => {
      response.json(notes)
    })
})

// es la forma dicamica de recuperar un segmento del PATH
app.get('/api/notes/:id', (request, response) => {
  // params es parte del objeto request
  // los segmentos del PATH siempre van a ser un string-
  const id = Number(request.params.id)
  const note = notes.find((note) => note.id === id)

  if (note) {
    response.send(note)
  } else {
    response.send(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes/', (request, response) => {
  const noteBody = request.body

  if (!noteBody) {
    return response.status(400).json({
      error: 'note content is missing'
    })
  }

  const ids = notes.map((note) => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    userId: maxId + 1,
    id: maxId + 1,
    ...noteBody
  }

  notes = [...notes, newNote]

  response.json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Nor found'
  })
})

// el puerto que tiene que escuchar por defecto
// http por defecto siempre entra al puerto 80
// https por defecto entra al puerto 443 SSL
const PORT = process.env.PORT || 3001

// como se inicia el servidor en express es asincrono
// se pasa un callback que se dispara cuando el servidor termina de levantarse
app.listen(PORT, () => {
  console.log(`Server is running now on port ${PORT}`)
})
