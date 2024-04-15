import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() {
  }

  signAndEncryptResponse(data: any, apiKey: string): any {
    try {
      const dataToString = JSON.stringify(data);
      const signature = CryptoJS.HmacSHA256(dataToString, apiKey).toString();
      const encryptedData = CryptoJS.AES.encrypt(dataToString, apiKey).toString();
      return { signature, data: encryptedData };
    } catch(error) {
      console.error('Error encrypting data:', error);
      return { error: "Error encrypting data" };
    }
  }
}
