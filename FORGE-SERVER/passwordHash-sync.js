const bcrypt = require('bcrypt')
const saltRounds = 10
const myPassword = 'hkjshkjdhfksdj'
const myPassword1 = myPassword + 'y'

const salt = bcrypt.genSaltSync(saltRounds)
const hash = bcrypt.hashSync(myPassword, salt)
console.log('PW HASH :', hash)

const result = bcrypt.compareSync(myPassword, hash)
console.log('RESULT : ', result)

const result1 = bcrypt.compareSync(myPassword1, hash)
console.log('RESULT 1 : ', result1)
