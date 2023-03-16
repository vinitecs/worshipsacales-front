import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api_config';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ministerios } from '../class/paths/constantes';


@Injectable({
  providedIn: 'root'
})
export class MinisteriosService {
 
 
 
  public getPathUrl() {
    return ministerios.create
  }
  
  //TODO lembrar da classe de implementação de serviço
  constructor(public https:HttpClient) { 
    //super(https);
  }
  
  public listMinsiteriosUser(usrId:number):Observable<any>{
    return this.https.get(`${API_CONFIG.apiUrl}/wrs/ministerio?userId=`+usrId)
  }

  

}
