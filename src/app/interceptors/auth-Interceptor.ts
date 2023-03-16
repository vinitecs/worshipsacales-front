import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { storageService } from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(public localStorage:storageService){}


    intercept(req:HttpRequest<any>, next :HttpHandler):Observable<HttpEvent<any>>{
            let LocalUser = this.localStorage.getLocaluser();
         console.log("my localuser",LocalUser)
            if(LocalUser){               
               const authReq= req.clone({headers:req.headers.set("Authorization","Bearer " + LocalUser.token )})               
               return next.handle(authReq)
            }else{
               return next.handle(req)
            }

    }
}

export const AuthInterceptorProvider ={
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true

}