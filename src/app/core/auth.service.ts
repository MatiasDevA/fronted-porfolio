import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NuevoUsuario } from 'src/model/nuevoUsuario';
import { PublicapiService } from './publicapi.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends PublicapiService {
  getUrl(): string {
    return environment.register
  }

  constructor(http:HttpClient) {
    super(http)
   }

   url:string = environment.baseUrl


   public nuevo(nuevoUsuario:NuevoUsuario):Observable<NuevoUsuario>{
      return this.http.post<NuevoUsuario>(this.url + "/nuevo", nuevoUsuario);
   }
}
