const forge = require('node-forge')
const rsa = forge.pki.rsa

const keypair = rsa.generateKeyPair({ bits: 2048 })

const kdf1 = new forge.kem.kdf1(forge.md.sha1.create())
const kem = forge.kem.rsa.create(kdf1)
const result = kem.encrypt(keypair.publicKey, 16)

const plaintext = 'dkssugktdpy wjsms dlwlgnsdlfkrh gkqslek'
const iv = forge.random.getBytesSync(16)
const cipher = forge.cipher.createCipher('AES-GCM', result.key)
cipher.start({ iv: iv })
cipher.update(forge.util.createBuffer(plaintext))
cipher.finish()
const encrypted = cipher.output.getBytes()
const tag = cipher.mode.tag.getBytes()

console.log('Plaintext: ' + plaintext)
console.log('Key: ' + forge.util.bytesToHex(result.key))
console.log()
console.log('Ciphertext: ' + forge.util.bytesToHex(encrypted))
console.log('IV: ' + forge.util.bytesToHex(iv))
console.log('Tag: ' + forge.util.bytesToHex(tag))
console.log('Encapsulation: ' + forge.util.bytesToHex(result.encapsulation))
console.log('<Ciphertext, IV, Tag, Encapsulation>')
console.log() // 4. 키 복구
var kdf1_ = new forge.kem.kdf1(forge.md.sha1.create())
var kem_ = forge.kem.rsa.create(kdf1_)
var key_ = kem_.decrypt(keypair.privateKey, result.encapsulation, 16)
console.log('Key_: ' + forge.util.bytesToHex(key_))
var decipher = forge.cipher.createDecipher('AES-GCM', key_)
decipher.start({ iv: iv, tag: tag })
decipher.update(forge.util.createBuffer(encrypted))
var pass = decipher.finish()
if (pass) {
  console.log('Deciphered: ' + decipher.output.getBytes())
}
