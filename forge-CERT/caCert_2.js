const forge = require('node-forge')
const fs = require('fs')
const pki = forge.pki
const rsa = forge.pki.rsa

const keypair = pki.rsa.generateKeyPair(1024)
const publicKey = keypair.publicKey
const privateKey = keypair.privateKey

const cert = pki.createCertificate()
cert.publicKey = publicKey
cert.serialNumber = '01'
cert.validity.notBefore = new Date()
cert.validity.notAfter = new Date()
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1)

const attrs = [
  {
    name: 'commonName',
    value: 'example.org',
  },
  {
    name: 'countryName',
    value: 'KR',
  },
  {
    name: 'stateOrProvinceName',
    value: 'Gyeonggi-do',
  },
  {
    name: 'localityName',
    value: 'Goyang-si',
  },
  {
    name: 'organizationName',
    value: 'Joongbu Univ.',
  },
  {
    name: 'organizationalUnitName',
    value: 'Dept. of Information Security',
  },
]

cert.setSubject(attrs)
cert.setIssuer(attrs)
cert.sign(privateKey)

const certPem = pki.certificateToPem(cert)
const privateKeyPem = pki.privateKeyToPem(privateKey)
const publicKeyPem = pki.publicKeyToPem(publicKey)

fs.writeFileSync('rootCert.pem', certPem + privateKeyPem + publicKeyPem)
