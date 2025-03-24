const bcrypt = require('bcrypt')
const saltRounds = 10
const myPassword = '
'
const myPassword1 = 'hkjshkjdhfksdj1'
let dbHash // 1. 사용자 등록
bcrypt.hash(myPassword, saltRounds, function (err, hash) {
  // Store hash in your password DB.
  console.log('PasswordHash: ' + hash)
  dbHash = hash // 2. 사용자 로그인
  bcrypt.compare(myPassword, dbHash, function (err, result) {
    // result == true
    console.log('Correct password: ' + result)
  })
  bcrypt.compare(myPassword1, dbHash, function (err, result) {
    // result == false
    console.log('Incorrect password: ' + result)
  })
})
