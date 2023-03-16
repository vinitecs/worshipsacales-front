import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api_config';

@Injectable({
  providedIn: 'root'
})
export class EscalasService {

  constructor(private http:HttpClient) { }

public proximasEscalas (usrId:number):Observable<any>{
  return this.http.get(`${API_CONFIG.apiUrl}/wrs/scales/proximas_escalas?usrId=${usrId}`)
}

public usuarioEscalas (){

}





}
