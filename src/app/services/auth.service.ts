import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { CredenciaisDTO } from "../models/CredenciaisDTO";
import { API_CONFIG } from "../config/api_config";
import {storageService} from '../services/storage.service'
import { LocalUser } from "../models/local_user";
import { usuarioLogado } from "../models/usuario_logado";


@Injectable({
    providedIn: 'root'
  })
export class auth{
    jwtHelper:JwtHelperService = new JwtHelperService();
  static GoogleAuthProvider: any;

    constructor(private http:HttpClient,
      public storage:storageService){}


    public auth(obj:CredenciaisDTO):Observable<any>{
      console.log(API_CONFIG.apiUrl)
      console.log(JSON.stringify(obj))

      return this.http.post(
        `${API_CONFIG.apiUrl}/login` ,
         JSON.stringify(obj).toString(),
         {observe:"response",responseType:'text'})
    }

    public authGoogle(user:any):any{
    
      console.log("Param",user)
      console.log(`${API_CONFIG.apiUrl}/wrs/user/google`)
      return this.http.post(`${API_CONFIG.apiUrl}/wrs/user/google`,JSON.stringify(user),{"headers":{"Content-type":"application/Json"}})
    }
    public usuarioLogado():Observable<usuarioLogado>{
        return this.http.get<usuarioLogado>( `${API_CONFIG.apiUrl}/wrs/user/usuario_logado `)
    }

    public refreshToken(){
    return  this.http.post(
        `${API_CONFIG.apiUrl}/wrs/authResource/refresh_token` ,
         {},
         {observe:"response",responseType:'text'})
    }



    successfulLogin(authorizarionValue:string){
      let tok = authorizarionValue.substring(7) 
        let user :LocalUser = {
          token: tok,
          email:this.jwtHelper.decodeToken(tok).sub
        }  
      this.storage.setLocalUser(user)
    }
  
  
    logout(){
      this.storage.setLocalUser(null)
    }
  
}