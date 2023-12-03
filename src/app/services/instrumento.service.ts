import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { API_CONFIG, HEADER } from '../config/api_config';
import { Instrumento } from '../dialog-modal/instrumento-class';
@Injectable({
  providedIn: 'root'
})
export class InstrumentoService {

  constructor(public http:HttpClient) { }


  public listarInstrumentos():Observable<any>{
    return this.http.get(`${API_CONFIG.apiUrl}/wrs/instrumentos/listar`)
  }

  public vincularInstrumentosAoMinisterio(instrumento:Instrumento){
      let header = {headers: {"application-content": "application/json"}}
      return this.http.post(`${API_CONFIG.apiUrl}/wrs/instrumentos/vincularInstrumento/`,instrumento,header)
  }

  public listarInstrumentosAoMinisterio(minId:number){    
    return this.http.get(`${API_CONFIG.apiUrl}/wrs/instrumentos/listarInstrumentosDoMinisterio?ministerioId=${minId}`)
  }
  public desvincularInstrumentosAoMinisterio(instrumentoId:Instrumento){    
    let header = {headers: {"application-content": "application/json"}}
    return this.http.post(`${API_CONFIG.apiUrl}/wrs/instrumentos/desvincularInstrumentosDoMinisterio`,instrumentoId,header)
  }
}
