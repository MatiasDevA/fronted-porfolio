import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from 'src/model/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  constructor(private http:HttpClient) { }
  url_base = "https://app-backend-porfolio-vfinal.herokuapp.com"

  getAllEducacion():Observable<Educacion[]>{
    return this.http.get<Educacion[]>(`${this.url_base}/all`);
  }

  saveEducacion(educacion:Educacion):Observable<Educacion>{
    return this.http.post<Educacion>(`${this.url_base}/save`,educacion);
  }

  deleteEducacion(id:string):Observable<any>{
    return this.http.delete(`${this.url_base}/delete/${id}`)
  }

  updateEducacion(id:number | string, educacion:Educacion):Observable<any>{
    return this.http.put(`${this.url_base}/update/${id}`,educacion)
  }

  getEducacionById(id:string):Observable<Educacion>{
    return this.http.get<Educacion>(`${this.url_base}/educacion/${id}`);
  }

}
