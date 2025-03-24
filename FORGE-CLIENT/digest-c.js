
var inputText = 'The quick brown fox jumps over the lazy dog'
document.write('Input Text: ' + inputText + '<br>')

var md = forge.md.md5.create()
md.update(inputText)
document.write('MD5: ' + md.digest().toHex() + '<br>')

var md = forge.md.sha1.create()
md.update(inputText)
document.write('SHA1: ' + md.digest().toHex() + '<br>')

var md = forge.md.sha256.create()
md.update(inputText)
document.write('SHA256: ' + md.digest().toHex() + '<br>')

var md = forge.md.sha384.create()
md.update(inputText)
document.write('SHA384: ' + md.digest().toHex() + '<br>')

var md = forge.md.sha512.create()
md.update(inputText)
document.write('SHA512: ' + md.digest().toHex() + '<br>')

var md = forge.md.sha512.sha256.create()
md.update(inputText)
document.write('SHA512.SHA256: ' + md.digest().toHex() + '<br>')
