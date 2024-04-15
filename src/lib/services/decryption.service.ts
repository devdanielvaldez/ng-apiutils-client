import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class DecryptionService {

  constructor() {
  }

  decryptAndVerifyResponse(payload: any, apiKey: string): any {
    try {
        const decryptedData = CryptoJS.AES.decrypt(payload.data, apiKey).toString(CryptoJS.enc.Utf8);
        const calculatedSignature = CryptoJS.HmacSHA256(decryptedData, apiKey).toString();
        const isValid = payload.signature === calculatedSignature;

        if (!isValid) {
            return { error: "Signature not valid" };
        }

        return JSON.parse(decryptedData);
    } catch (error) {
        console.error('Error decrypting data:', error);
        return { error: "Error decrypting data" };
    }
}
}
