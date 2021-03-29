const express = require('express')
const app = express()

// añadimos el modulo body parser de express
// de esta forma ya esta disponible el body en el request
// se parse a json
app.use(express.json())

let notes = [
  {
    userId: 1,
    id: 1,
    title: ' Cambie el titulo :D',
    body:
      'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  },
  {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body:
      'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
  },
  {
    userId: 1,
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body:
      'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
  }
]

// response tiene diferentes metodos para regresar la información
app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/notes', (request, response) => {
  response.json(notes)
})

// es la forma dicamica de recuperar un segmento del PATH
app.get('/notes/:id', (request, response) => {
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

app.delete('/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)
  response.status(204).end()
})

app.post('/notes/', (request, response) => {
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

// el puerto que tiene que escuchar por defecto
// http por defecto siempre entra al puerto 80
// https por defecto entra al puerto 443 SSL
const PORT = 3001

// como se inicia el servidor en express es asincrono
// se pasa un callback que se dispara cuando el servidor termina de levantarse
app.listen(PORT, () => {
  console.log(`Server is running now on port ${PORT}`)
})
