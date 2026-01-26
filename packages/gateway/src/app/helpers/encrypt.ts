//Inside imports of your TS file include
import * as CryptoJS from "crypto-js";

// Declare this key and iv values in declaration
const key = CryptoJS.enc.Utf8.parse("7061737323313233");
const iv = CryptoJS.enc.Utf8.parse("7061737323313233");

// Methods for the encrypt and decrypt Using AES
export const encryptUsingAES256 = (password: string) => {
  var encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(JSON.stringify(password)),
    key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return encrypted.toString();
};

export const decryptUsingAES256 = (decString) => {
  var decrypted = CryptoJS.AES.decrypt(decString, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};