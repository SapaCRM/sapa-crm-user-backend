import * as cryptoJS from 'crypto-js';

export const generateApiKey = (companyName: string, secret: string) => {
  return cryptoJS.AES.encrypt(companyName, secret).toString();
};

export const decryptApiKey = (apiKey: string, secret: string) => {
  return cryptoJS.AES.decrypt(apiKey, secret).toString(cryptoJS.enc.Utf8);
};
