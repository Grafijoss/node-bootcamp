const supertest = require('supertest')
const { app } = require('../index')
const api = supertest(app)

const initialNotes = [
  {
    content: 'Aprendiendo Fullstack JS con midudev',
    important: true,
    date: new Date()
  },
  {
    content: 'Aprendiendo test con Jest',
    important: true,
    date: new Date()
  }
]

const getAllContentsFromNotes = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map(note => note.content), // creamos un nuevo array con los content de cada note
    response
  }
}

module.exports = {
  initialNotes,
  api,
  getAllContentsFromNotes
}
