import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publicacion } from 'src/model/publicacion';
import { PublicapiService } from './publicapi.service';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService extends PublicapiService {
  getUrl(): string {
    return "/publicacion/all";
  }

  

  constructor(http:HttpClient) {
    super(http)
   }

   public getPublicacion():Observable<Publicacion[]>{
    return this.http.get<Publicacion[]>("https://app-backend-porfolio-vfinal.herokuapp.com/publicacion/all");
   }
   public getPublicacion1():Observable<Publicacion>{
    return this.http.get<Publicacion>("https://app-backend-porfolio-vfinal.herokuapp.com/publicacion/all");
   }

   public getPublicacionbyId(id:number):Observable<Publicacion>{
    return this.http.get<Publicacion>("https://app-backend-porfolio-vfinal.herokuapp.com/publicacion/"+ id);
   }

   public savePublication(publication:Publicacion):Observable<Publicacion>{
    return this.http.post<Publicacion>("https://app-backend-porfolio-vfinal.herokuapp.com/publicacion/save",publication)
   }

   public deletePublication(index:number):Observable<Publicacion>{
    return this.http.delete<Publicacion>("https://app-backend-porfolio-vfinal.herokuapp.com/publicacion/delete" + "/" + index);
   }
}
