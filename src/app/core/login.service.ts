import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDTO } from 'src/model/jwttoken';
import { LoginUsuario } from 'src/model/loginUsuario';
import { PublicapiService } from './publicapi.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends PublicapiService{
  getUrl(): string {
    return environment.login;
  }

  constructor(http:HttpClient) {
    super(http)
   }

   url:string = environment.baseUrl;

   public loginUser(loginUsuario:LoginUsuario):Observable<JwtDTO>{
      return this.http.post<JwtDTO>(this.url + "/login", loginUsuario);
   }
}
