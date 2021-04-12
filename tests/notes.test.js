const mongoose = require('mongoose')
const { server } = require('../index')
const Note = require('../models/Note')

const { initialNotes, api, getAllContentsFromNotes } = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  for (const note of initialNotes) {
    const newObject = new Note(note)
    await newObject.save()
  }
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(initialNotes.length)
})

test('the first note is about midudev', async () => {
  const response = await api.get('/api/notes')
  expect(response.body[0].content).toBe('Aprendiendo Fullstack JS con midudev')
})

test('any note is about midudev', async () => {
  const { contents } = await getAllContentsFromNotes()
  expect(contents).toContain('Aprendiendo Fullstack JS con midudev')
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'Proximamnte async/await',
    important: true,
    date: new Date()
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(initialNotes.length + 1)
  const { contents } = await getAllContentsFromNotes()
  expect(contents).toContain('Proximamnte async/await')
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

test('a note can be delete', async () => {
  const { response } = await getAllContentsFromNotes()
  const { body: notes } = response
  const noteToDelete = notes[0]
  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const { response: responseAfterDeleteNote, contents } = await getAllContentsFromNotes()
  expect(responseAfterDeleteNote.body).toHaveLength(initialNotes.length - 1)
  expect(contents).not.toContain(noteToDelete.content)
})

test('a note that does not exist can not be deleted', async () => {
  await api
    .delete('/api/notes/12345')
    .expect(400)

  const { response } = await getAllContentsFromNotes()
  expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
