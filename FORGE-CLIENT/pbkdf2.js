//var forge = require('node-forge')
var salt
var numIterations = 1000

// generate a password-based 16-byte key
// note an optional message digest can be passed as the final parameter
salt = forge.random.getBytesSync(128)
var derivedKey = forge.pkcs5.pbkdf2('password', salt, numIterations, 16)
console.log('Derived key - sync: ', forge.util.bytesToHex(derivedKey))

// generate key asynchronously
// note an optional message digest can be passed before the callback
salt = forge.random.getBytesSync(128)
forge.pkcs5.pbkdf2(
  'password',
  salt,
  numIterations,
  32,
  function (err, derivedKey) {
    // do something w/derivedKey
    console.log('Derived key - async: ', forge.util.bytesToHex(derivedKey))
  }
)
