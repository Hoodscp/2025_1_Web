const forge = require('node-forge')
var pki = forge.pki
var rsa = forge.pki.rsa // generate an RSA key pair synchronously
// *NOT RECOMMENDED*: Can be significantly slower than async and may block
// JavaScript execution. Will use native Node.js 10.12.0+ API if possible.
var keypair = rsa.generateKeyPair({ bits: 512, e: 0x10001 })
var privateKey = keypair.privateKey
var publicKey = keypair.publicKey
console.log('Public Key: \n' + pki.publicKeyToPem(publicKey))
console.log('Private Key: \n' + pki.privateKeyToPem(privateKey))
console.log('n=pq: ' + publicKey.n)
console.log('p: ' + privateKey.p)
console.log('q: ' + privateKey.q)
console.log('e: ' + publicKey.e)
console.log('d: ' + privateKey.d)
