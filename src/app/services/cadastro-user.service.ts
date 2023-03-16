import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@codetrix-studio/capacitor-google-auth';
import { Usuario } from '../models/Usuario';
import { API_CONFIG } from '../config/api_config';
@Injectable({
  providedIn: 'root'
})
export class CadastroUserService {

  constructor(private http:HttpClient) { }


  public insertUser(obj:Usuario):Observable<any>{
    let header= {headers:{'Content-type':"application/json"}}
    console.log(obj)
    return this.http.post<Usuario>(`${API_CONFIG.apiUrl}/wrs/user/create`,JSON.stringify(obj), header)
    }
}



