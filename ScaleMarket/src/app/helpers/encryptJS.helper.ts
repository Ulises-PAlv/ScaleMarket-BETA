import * as CryptoJS from 'crypto-js';

export class EncryptHelper {
    static encrypt(str: string): string {
        let keyCrypt = '16#ct-95?th';
        return CryptoJS.AES.encrypt(str.trim(), keyCrypt.trim()).toString();
    }

    static decrypt(str: string): string {
        let keyCrypt = '16#ct-95?th';
        return CryptoJS.AES.decrypt(str.trim(), keyCrypt.trim()).toString(CryptoJS.enc.Utf8);
    }
}