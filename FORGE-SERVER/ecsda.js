const forge = require('node-forge')
var ed25519 = forge.pki.ed25519 // generate a random ED25519 keypair
var keypair = ed25519.generateKeyPair()
var privateKey = keypair.privateKey
var publicKey = keypair.publicKey // sign a UTF-8 message
var signature1 = ed25519.sign({
  message: 'test',
  encoding: 'utf8',
  privateKey: privateKey,
}) // sign a message passed as a buffer
var signature2 = ed25519.sign({
  message: Buffer.from('test', 'utf8'),
  privateKey: privateKey,
}) // sign a message digest (shorter "message" == better performance)
var md = forge.md.sha256.create()
md.update('test', 'utf8')
var signature3 = ed25519.sign({
  md: md,
  privateKey: privateKey,
})
// verify a signature on a UTF-8 message
var verified1 = ed25519.verify({
  message: 'test',
  encoding: 'utf8',
  signature: signature1,
  publicKey: publicKey,
}) // sign a message passed as a buffer
var verified2 = ed25519.verify({
  message: Buffer.from('test', 'utf8'),
  signature: signature2,
  publicKey: publicKey,
}) // verify a signature on a message digest
var md = forge.md.sha256.create()
md.update('test', 'utf8')
var verified3 = ed25519.verify({
  md: md,
  signature: signature3,
  publicKey: publicKey,
})
console.log('Signature1: ' + forge.util.bytesToHex(signature1))
console.log('Verified1: ' + verified1)
console.log('Signature2: ' + forge.util.bytesToHex(signature2))
console.log('Verified2: ' + verified2)
console.log('Signature3: ' + forge.util.bytesToHex(signature3))
console.log('Verified3: ' + verified3)
