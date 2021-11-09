import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthtokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let jwtsession = JSON.parse(sessionStorage.getItem('jwt_businessclear'));
    if (jwtsession) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer' + ' ' + jwtsession,
        },
      });
    }
    return next.handle(request);
  }
}
