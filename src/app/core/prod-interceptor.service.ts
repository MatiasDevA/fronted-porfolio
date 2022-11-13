import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, Observable, throwError } from 'rxjs';
import { JwtDTO } from 'src/model/jwttoken';

import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

const AUTHROIZATION = "Authorization";

@Injectable({
  providedIn: 'root'
})
export class ProdInterceptorService implements HttpInterceptor {

  constructor(private tokenService:TokenService, private authService:AuthService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    let intReq = req;
    const token = this.tokenService.getToken();
    if(token != null){
      intReq = req.clone({headers: req.headers.set('Bearer', token)});
    }
    return next.handle(intReq);

  }
  
}
export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true}];


