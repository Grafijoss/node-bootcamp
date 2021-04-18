const notesRouter = require('express').Router() // creamos una constante con el Router de express
const Note = require('../models/Note')
const User = require('../models/User') // requierimos el modelo Note
const userStractor = require('../middleware/userStractor')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(notes)
})

// es la forma dicamica de recuperar un segmento del PATH
notesRouter.get('/:id', (request, response, next) => {
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

notesRouter.put('/:id', userStractor, (request, response, next) => {
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

notesRouter.delete('/:id', userStractor, async (request, response, next) => {
  const { id } = request.params

  try {
    await Note.findByIdAndDelete(id)
    response.status(204).end()
  } catch (err) {
    next(err)
  }
  // busca el middleware con el error como primer parametro
})

// podemos enviar tantos middlewares como queramos
// antes del callback pasamos el middlware
notesRouter.post('/', userStractor, async (request, response, next) => {
  const {
    content,
    important = false
  } = request.body

  // resuperamos el userId desde el request que lo agrego el middleware userStractor
  const { userId } = request

  const user = await User.findById(userId)

  if (!content) {
    return response.status(400).json({
      error: 'note content is missing'
    })
  }

  const note = new Note({
    content: content,
    date: new Date(),
    important: important,
    user: user._id
  })

  try {
    const saveNote = await note.save()

    user.notes = user.notes.concat(saveNote._id)
    await user.save()

    response.json(saveNote)
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter
