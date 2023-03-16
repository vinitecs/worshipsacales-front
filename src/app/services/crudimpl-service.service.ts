import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { EventEmitter } from 'stream';
import { ServiceEntity } from '../class/services/serviceEntity';

@Injectable({
  providedIn: 'root'
})
export class CRUDimplServiceService<E> implements ServiceEntity<any>{
   
  
    constructor(public http:HttpClient) {
      
    }
  protected urlPathConfig(): string {
    throw new Error('Method not implemented.');
  }
  protected getPathUrl() {
    throw new Error('Method not implemented.');
  }


    public create(obj:any) :Observable<any>{
      return this.http.post<E>(`${'this.urlPathConfig()'}'/create`,obj);
    }
    public alterar(obj:any) :Observable<any>{
        return this.http.post(`${'this.getByURL()'}`,obj)
      }
    public excluir(id:number) :Observable<any>{
      return this.http.put(`${'this.getByURL()'}`,id )
    }
    public  listar():Observable<any>{
      return this.http.get(`${'this.getByURL()'}`)
    }







}
