import CryptoJS from 'crypto-js';


// Decrypts an AES-encrypted base64 string with the given key
export function decryptAES128(base64, key) {
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(base64),
  });
  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// Encrypts a wordArray with the given key
export function encryptAES128(wordArray, key) {
  return CryptoJS.AES.encrypt(wordArray, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
}

// Encrypts a file (WordArray) as Base64 with the given key
export function encryptFileAsBase64(wordArray, key) {
  const cipherParams = CryptoJS.AES.encrypt(wordArray, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return cipherParams.ciphertext.toString(CryptoJS.enc.Base64);
}

// Prepares file for encryption (receives an ArrayBuffer, returns encrypted Base64 string)
export function prepareFileEncrypt(arrayBuffer, key) {
  const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
  const encrypted = encryptFileAsBase64(wordArray, key);
  return encrypted;
}

export function decryptAESBytes(base64, key) {
  // This is for file blobs!
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(base64),
  });
  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  // Convert WordArray to Uint8Array (raw bytes)
  const wordArray = decrypted;
  const byteArray = [];
  for (let i = 0; i < wordArray.sigBytes; i++) {
    byteArray.push((wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff);
  }
  return new Uint8Array(byteArray);
  // Convert decrypted WordArray back to Uint8Array
  const decryptedBytes = new Uint8Array(decrypted.sigBytes);
  for (let i = 0; i < decrypted.sigBytes; i++) {
    decryptedBytes[i] = (decrypted.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  }

  return decryptedBytes;
}

