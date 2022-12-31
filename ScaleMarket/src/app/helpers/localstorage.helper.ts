import { EncryptHelper } from "./encryptJS.helper";

export class LsHelper {
    static addItem(key: string, value: any) {
        let stringValue = EncryptHelper.encrypt(JSON.stringify(value));
        localStorage.setItem(key, stringValue);
    }

    static getItem(key: string): any {
        let encryptStr = EncryptHelper.decrypt(localStorage.getItem(key) || '{}');
        return JSON.parse(encryptStr || '{}');
    }

    static projectSelected(value: any) {
        if(localStorage.getItem('prs') == null) { localStorage.removeItem('prs') }
        let stringValue = EncryptHelper.encrypt(JSON.stringify(value));
        localStorage.setItem('prs', stringValue);
    }

    static removeItem(key: string) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}