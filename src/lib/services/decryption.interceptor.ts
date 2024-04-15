import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DecryptionService } from './decryption.service';

@Injectable()
export class DecryptionInterceptor implements HttpInterceptor {

  constructor(private decryptionService: DecryptionService, @Inject('apiKey') private apiKey: string) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.body) {
          const decryptedResponse = this.decryptionService.decryptAndVerifyResponse(event.body, this.apiKey);
          if (decryptedResponse.error) {
            throw new HttpErrorResponse({
              error: decryptedResponse.error,
              status: 400
            });
          }
          return new HttpResponse({
            body: decryptedResponse
          });
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
