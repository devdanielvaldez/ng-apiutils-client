import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { EncryptionService } from './encryption.service';

@Injectable()
export class EncryptionInterceptor implements HttpInterceptor {

  constructor(private encryptionService: EncryptionService, @Inject('apiKey') private apiKey: string) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      const body = req.body;
      const encryptedBody = this.encryptionService.signAndEncryptResponse(body, this.apiKey);
      const encryptedReq = req.clone({ body: { data: encryptedBody } });
      return next.handle(encryptedReq);
    } catch (error) {
      console.error('Error in encryption interceptor:', error);
      return throwError(new HttpErrorResponse({
        error: 'Error in encryption interceptor',
        status: 500
      }));
    }
  }
}
