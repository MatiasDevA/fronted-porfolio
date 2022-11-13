import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comentario } from 'src/model/comentario';
import { PublicapiService } from './publicapi.service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService extends PublicapiService{
  getUrl(): string {
    return environment.comment;
  }

  constructor(http:HttpClient) {
    super(http);
  }
  

  postComments(comments:Comentario):Observable<Comentario>{
    return this.http.post<Comentario>("https://app-backend-porfolio-vfinal.herokuapp.com/comentario/save", comments);
  }

  public getComentario():Observable<Comentario[]>{
    return this.http.get<Comentario[]>("https://app-backend-porfolio-vfinal.herokuapp.com/comentario/all");
   }

   public getComentariosByPublication(id:number):Observable<Comentario[]>{
    return this.http.get<Comentario[]>("https://app-backend-porfolio-vfinal.herokuapp.com/comentario/comentario/" + id);
   }

   
  
}
