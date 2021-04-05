const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    // delete es mala practica
    // pero en este caso solo estamos mutando el objeto que se va a devolver
    delete returnObject._id
    delete returnObject.__v
  }
})

// creamos el modelo a partir del schema
// recibe como parametro el nombre debe ser un string en singular
// por que va a buscar la colección y le va a añadir la s automaticamente
// como segundo parametro recibe el schema
const Note = model('Note', noteSchema)

module.exports = Note

// create a schema

// con el metodo find podemos buscar retornar información de las colecciones
// Note.find({})
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   })

// creamos una nueva instancia de Note
// le pasamos como argumento un objeto vacio por que ni tiene ninguna regla
// lo queremos todos

/*
const note = new Note({
  content: 'Mongo dv es increible',
  date: new Date(),
  important: true
})

// la instancia tiene un monton de propiedades
// vamos ausar la propiedad o metodo save para guardarla
// save siempre recibe una promesa

note.save()
  .then(res => {
    console.log('Succes', res)
    // es buena practica cerrar la conexion a la base de datos cuando se termina
    // save nos retorna el objeto que guardo
    // el id se guarda automaticamente con un underscore _id
    // _id  no es un srting es uan representación de una instancia
    // por que llamo al toString del object id
    // el object id es un objecto especifico que tiene información
    mongoose.connection.close()
  })
  .catch(err => console.log(err))
*/
