const forge = require('node-forge')
var pki = forge.pki
var rsa = forge.pki.rsa

var keypairB = rsa.generateKeyPair({ bits: 2048 })
var privateKeyB = keypairB.privateKey
var publicKeyB = keypairB.publicKey

console.log('Public Key: \n' + pki.publicKeyToPem(publicKeyB))
console.log('Private Key: \n' + pki.privateKeyToPem(privateKeyB))
//수신자의 공개키 publickeyB를 송신자 A에게 전송

// 2. 송신자 A의 암호
const plaintext = 'secretasdfsdafasf'
const encrypted = publicKeyB.encrypt(plaintext)
console.log('암호문:', forge.util.bytesToHex(encrypted))
const decrypted = privateKeyB.decrypt(encrypted)
console.log('복호화 평문 : ', decrypted)

// 1.5
console.log('RSAES-PKCS1-V1_5')
var encrypted2 = publicKeyB.encrypt(plaintext, 'RSAES-PKCS1-V1_5')
console.log('Encrypted: ' + forge.util.bytesToHex(encrypted2))
var decrypted2 = privateKeyB.decrypt(encrypted2, 'RSAES-PKCS1-V1_5')
console.log('Decrypted: ' + decrypted2)

// encrypt data with a public key using RSAES-OAEP
console.log('RSA-OAEP')
var encrypted3 = publicKeyB.encrypt(plaintext, 'RSA-OAEP', {
  md: forge.md.sha512.create(),
  mgf1: {
    md: forge.md.sha1.create(),
  },
})
console.log('Encrypted: ' + forge.util.bytesToHex(encrypted3))
// decrypt data with a private key using RSAES-OAEP
var decrypted3 = privateKeyB.decrypt(encrypted3, 'RSA-OAEP', {
  md: forge.md.sha512.create(),
  mgf1: {
    md: forge.md.sha1.create(),
  },
})
console.log('Decrypted: ' + decrypted3)
console.log()
