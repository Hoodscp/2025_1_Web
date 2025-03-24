var forge = require('node-forge')
var inputText = 'The quick brown fox jumps over the lazy dog'
var key = 'supersecretkey'
console.log('Input Text: ' + inputText)
console.log('Key: ' + key)

var hmac = forge.hmac.create()
hmac.start('md5', key)
hmac.update(inputText)
console.log('Hmac(md5): ' + hmac.digest().toHex())

var hmac = forge.hmac.create()
hmac.start('sha1', key)
hmac.update(inputText)
console.log('Hmac(sha1): ' + hmac.digest().toHex())

var hmac = forge.hmac.create()
hmac.start('sha256', key)
hmac.update(inputText)
console.log('Hmac(sha256): ' + hmac.digest().toHex())

var hmac = forge.hmac.create()
hmac.start('sha384', key)
hmac.update(inputText)
console.log('Hmac(sha384): ' + hmac.digest().toHex())

var hmac = forge.hmac.create()
hmac.start('sha512', key)
hmac.update(inputText)
console.log('Hmac(sha512): ' + hmac.digest().toHex())
