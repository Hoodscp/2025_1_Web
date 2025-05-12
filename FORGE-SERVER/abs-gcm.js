var forge = require('node-forge')
var inputText = 'abs-GCM 방식 암호화 및 복호화 실습' // 플레인 텍스트 값
var someBytes = forge.util.encodeUtf8(inputText) // UTF-8 형식으로 값 인코딩

console.log()
console.log('사용 암호화 방식 : AES-GCM')
var keySize = 32 // 16 => AES-128, 24 => AES-192, 32 => AES-256
var blockSize = 16

var key = forge.random.getBytesSync(keySize) // 키값 랜덤으로 받아오기
var iv = forge.random.getBytesSync(blockSize) // iv값 랜덤으로 받아오기

// 0. 초기 값들 출력
console.log('- Key: ' + forge.util.bytesToHex(key))
console.log('- iv: ' + forge.util.bytesToHex(iv))
console.log('- Plaintext: ' + forge.util.decodeUtf8(someBytes))

// 1. 암호화
var cipher = forge.cipher.createCipher('AES-GCM', key) // AES-GCM 방식으로 암호화
cipher.start({
  iv: iv, // should be a 12-byte binary-encoded string or byte buffer
  additionalData: 'binary-encoded string', // optional
  tagLength: 128, // optional, defaults to 128 bits
})
cipher.update(forge.util.createBuffer(someBytes))
cipher.finish()
var encrypted = cipher.output
var tag = cipher.mode.tag
console.log('- 암호화 값 : ' + encrypted.toHex()) // 암호화 값 출력
console.log('- Tag: ' + tag.toHex()) // Tag 값 출력

// 2. 복호화
var decipher = forge.cipher.createDecipher('AES-GCM', key) // 다시 같은 방식으로 복호화
decipher.start({
  iv: iv,
  additionalData: 'binary-encoded string', // optional
  tagLength: 128, // optional, defaults to 128 bits
  tag: tag, // authentication tag from encryption
})
decipher.update(encrypted)
decipher.finish()
console.log('- 복호화 값: ' + decipher.output.toHex()) // 복호화 값 출력
console.log()
