// palindromo le da la vuelta a una palabra

const palindrome = (string) => {
  if (typeof string === 'undefined') return
  return string
    .split('')
    .reverse()
    .join('')
}

const average = array => {
  if (array.length === 0) return 0
  let suma = 0
  array.forEach(num => { suma += num })
  return suma / array.length
}

// usamos ,psule exports por que etamos en common js
module.exports = {
  palindrome,
  average
}
