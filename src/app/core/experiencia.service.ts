import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from 'src/model/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  constructor(private http:HttpClient) { }
  url_base = "https://app-backend-porfolio-vfinal.herokuapp.com"

  getAllExperiencia():Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(`${this.url_base}/all`);
  }

  saveExperiencia(experiencia:Experiencia):Observable<Experiencia>{
    return this.http.post<Experiencia>(`${this.url_base}/save`,experiencia);
  }

  deleteExperiencia(id:string):Observable<any>{
    return this.http.delete(`${this.url_base}/delete/${id}`)
  }

  updateExperiencia(id:number | string, experiencia:any):Observable<any>{
    return this.http.put(`${this.url_base}/update/${id}`,experiencia)
  }

  getExperienciaById(id:string):Observable<Experiencia>{
    return this.http.get<Experiencia>(`${this.url_base}/experiencia/${id}`);
  }

}
