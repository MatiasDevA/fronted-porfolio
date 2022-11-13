import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class PublicapiService {

  constructor(public http:HttpClient) { }

  abstract getUrl():string;
  protected hostUrl:string = environment.baseUrl;

  public get<T>(endpoint:string):Observable<T>{
    return this.http.get<T>(this.hostUrl + this.getUrl());
  }

  public post<T>(body:any):Observable<T>{
    return this.http.post<T>(this.hostUrl + this.getUrl(), body);
  }

  public put<T>(body:any, id:number):Observable<T>{
    return this.http.put<T>(this.hostUrl + this.getUrl() + String(id), body)
  }

  public delete<T>(id:any):Observable<T>{
    return this.http.delete<T>(this.hostUrl + id);
  }

}
