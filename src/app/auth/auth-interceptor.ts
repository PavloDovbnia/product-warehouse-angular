import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {TokenStorageService} from './token-storage.service';
import {Emitters} from "../emitters/emitters";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.token.getToken();
    const tokenType = this.token.getTokenType();
    if (token != null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, tokenType + ' ' + token)});
    }

    return next.handle(authReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            case 401:
              Emitters.authEmitter.emit(false);
              break;
            case 403:
              console.log(error);
              break;
          }
          return throwError(error);
        })
      );
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
