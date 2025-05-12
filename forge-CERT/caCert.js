const forge = require('node-forge')
const fs = require('fs')
const pki = forge.pki
const rsa = forge.pki.rsa // 루트인증기관에서 자체서명인증서 생성, 저장 // 1. RSA 키쌍 생성
const keypair = pki.rsa.generateKeyPair(1024)
const publicKey = keypair.publicKey
const privateKey = keypair.privateKey
console.log(pki.publicKeyToPem(publicKey))
console.log(pki.privateKeyToPem(privateKey)) // 2. X.509v3 인증서 객체 생성
const cert = pki.createCertificate() // 3. 각종 필드 정보 입력
cert.publicKey = publicKey
cert.serialNumber = '01' // DB 등에 일련번호 관리 필요
cert.validity.notBefore = new Date() // 발급시간, 현재시간
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1) // 유효기간을 1년으로 설정
// 사용자 정보
const attrs = [
  {
    name: 'commonName', // 사용자명 //shortName: 'CN',
    value: 'example.org',
  },
  {
    name: 'countryName', // 국가 //shortName: 'C',
    value: 'KR',
  },
  {
    name: 'stateOrProvinceName', // 주, 지역 //shortName: 'RT',
    value: 'Gyeonggi-do',
  },
  {
    name: 'localityName', // 도시명 //shortName: 'L',
    value: 'Goyang-si',
  },
  {
    name: 'organizationName', // 기관명 //shortName: 'O',
    value: 'Joongbu Univ.',
  },
  {
    name: 'organizationalUnitName', // 부서명 //shortName: 'OU',
    value: 'Dept. of Information Security',
  },
]
