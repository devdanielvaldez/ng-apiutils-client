# ng-apiutils-client

ng-apiutils-client is a library for Angular that provides encryption and decryption functionality for HTTP requests and responses. It allows you to encrypt outgoing request data and decrypt incoming response data, providing an additional layer of security for communications between the client and the server.

## How to install it

To install the library, simply run the following command in your Angular project:

```bash
npm install --save ng-apiutils-client
```

## Use

### Setting

First, you need to configure the library in your Angular application. For this you must import the interceptors that will be in charge of capturing the requests sent and the responses received.

```typescript
import { EncryptionInterceptor, DecryptionInterceptor } from 'apiutils-client';
```

Add the corresponding providers:

```typescript
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EncryptionInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DecryptionInterceptor,
      multi: true
    },
    { provide: 'apiKey', useValue: 'TU_API_KEY' } // Reemplaza 'TU_API_KEY' con tu API key
  ]
```

You will obtain the value of the provide apiKey in your Rest API by installing the `apiutils.js` library and executing the `npx generate-key` command.

This is an example of what your app.module.ts would look like

```typescript
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EncryptionInterceptor, DecryptionInterceptor } from 'apiutils-client';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EncryptionInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DecryptionInterceptor,
      multi: true
    },
    { provide: 'apiKey', useValue: 'TU_API_KEY' } // Replace 'YOUR_API_KEY' with your API key
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Encryption and Decryption

Once the library is configured, your HTTP requests will automatically be encrypted and decrypted by the library.

```typescript
import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private apiService: ApiService) {}

  sendData() {
    const data = { message: 'Hello, server!' };
    this.apiService.postData(data).subscribe(response => {
      console.log('Response from server:', response); 
      /**
      {
    * "signature": "b63043c89b59b77efb3ad0770413d533a4a1737cacbbdce7afd636072d475f84",
    * "data": "U2FsdGVkX1/dcCezAEYM6AEpzQLo0RW2a67PrQm733MV5DdCH59l7HrV1xK2H4RAgDuFB84H8ZQLdIH6ngWMAhTeeyPkM8kFv* +X36fIPPiO56jhZZPYozUUzPaCsC2ySbcJy046UREeVt+pNqqwLzEIxUBmBPQP2SSXQLOnM/DfVya2NfxmDPpmPfQ4tuksw"
    }*/
    });
  }

}
```

### Handle Errors

The library automatically handles errors that may occur during the encryption and decryption process. If there are any errors, an `HttpErrorResponse` will be raised which can be caught and handled in your code.

## License

This project is licensed under the [MIT License](LICENSE).
