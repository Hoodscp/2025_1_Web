var forge = require('node-forge')
var plaintext = 'Hello world hello world'
var rsa = forge.pki.rsa // 1. RSA 키생성
var keypair = rsa.generateKeyPair({ bits: 1024, e: 0x10001 }) // e = 65537
var publicKey = keypair.publicKey
var privateKey = keypair.privateKey
console.log('Public key: \n' + forge.pki.publicKeyToPem(publicKey))
console.log('Private key: \n' + forge.pki.publicKeyToPem(privateKey))
console.log()

// 2. RSA 전자서명. 디폴트는 RSASSA PKCS#1 v1.5
console.log('RSASSA PKCS#1 v1.5')
// sign data with a private key and output DigestInfo DER-encoded bytes
// (defaults to RSASSA PKCS#1 v1.5)
var md = forge.md.sha1.create()
md.update(plaintext, 'utf8')
var signature = privateKey.sign(md)
console.log('Signature: ' + forge.util.bytesToHex(signature))
// verify data with a public key
// (defaults to RSASSA PKCS#1 v1.5)
var verified = publicKey.verify(md.digest().bytes(), signature)
console.log('Verification: ' + verified)
console.log()

// 3. RSA 전자서명. RSASSA-PSS 방식
console.log('RSASSA-PSS')
// sign data using RSASSA-PSS where PSS uses a SHA-1 hash, a SHA-1 based
// masking function MGF1, and a 20 byte salt
var md = forge.md.sha1.create()
md.update(plaintext, 'utf8')
var pss = forge.pss.create({
  md: forge.md.sha1.create(),
  mgf: forge.mgf.mgf1.create(forge.md.sha1.create()),
  saltLength: 20, // optionally pass 'prng' with a custom PRNG implementation // optionalls pass 'salt' with a forge.util.ByteBuffer w/custom salt
})
var signature = privateKey.sign(md, pss)
console.log('Signature: ' + forge.util.bytesToHex(signature))
// verify RSASSA-PSS signature
var pss = forge.pss.create({
  md: forge.md.sha1.create(),
  mgf: forge.mgf.mgf1.create(forge.md.sha1.create()),
  saltLength: 20, // optionally pass 'prng' with a custom PRNG implementation
})
var md = forge.md.sha1.create()
md.update(plaintext, 'utf8')
var verified = publicKey.verify(md.digest().getBytes(), signature, pss)
console.log('Verification: ' + verified)
