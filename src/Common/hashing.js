import CryptoJS from 'crypto-js';

export default {
    sha256enc : (str) => {
        const sha256 = require('sha256');
        
        return sha256(str);
    },
    cryptoEnc : (str) => {
       return CryptoJS.AES.encrypt(str, '970509920223').toString();
    },
    cryptoDec : (str) => {
        const bytes = CryptoJS.AES.decrypt(str, '970509920223');
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}