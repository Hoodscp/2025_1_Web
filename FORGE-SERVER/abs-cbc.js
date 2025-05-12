var forge = require('node-forge')
var inputText = 'abs-cbc 방식 암호화 및 복호화 실습' // 플레인 텍스트 값
var someBytes = forge.util.encodeUtf8(inputText) // UTF-8 형식으로 값 인코딩

console.log()
console.log('사용 암호화 방식 : AES-192-CBC')
var keySize = 32 // 16 => AES-128, 24 => AES-192, 32 => AES-256
var blockSize = 16

var key = forge.random.getBytesSync(keySize) // 키값 랜덤으로 받아오기
var iv = forge.random.getBytesSync(blockSize) // iv값 랜덤으로 받아오기

// 0. 초기 값들 출력
console.log('- Key: ' + forge.util.bytesToHex(key))
console.log('- iv: ' + forge.util.bytesToHex(iv))
console.log('- Plaintext: ' + forge.util.decodeUtf8(someBytes))

// 1. 암호화
var cipher = forge.cipher.createCipher('AES-CBC', key) // AES-CBC 방식으로 암호화
cipher.start({ iv: iv })
cipher.update(forge.util.createBuffer(someBytes))
cipher.finish()
var encrypted = cipher.output
console.log('- 암호화 값 : ' + encrypted.toHex()) // 암호화 값 출력

// 2. 복호화화
var decipher = forge.cipher.createDecipher('AES-CBC', key) // 다시 같은 방식으로 복호화
decipher.start({ iv: iv })
decipher.update(encrypted)
decipher.finish()
console.log('- 복호화 값: ' + decipher.output) // 복호화 값 출력
console.log()
