const jwt = require('jsonwebtoken')

// cuando pasa por un middleware express puede guardar informacion en la request

module.exports = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = ''
  let decodedToken = {}

  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  try {
    decodedToken = jwt.verify(token, process.env.SECRET_WORD)
  } catch (err) {
    console.log(err)
  }

  // para la ejecución y responde el error
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const { id: userId } = decodedToken
  request.userId = userId

  next()
}
