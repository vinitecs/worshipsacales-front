import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import  {Observable, throwError} from 'rxjs'
import { catchError, retry } from 'rxjs/operators';
@Injectable()
export class errorInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
    .pipe(catchError((error: HttpErrorResponse)=>{
     let errorObj = error.error;
      console.log(errorObj.error)
     if(errorObj.error){
      errorObj = errorObj.error
      console.error(errorObj)
     }

     if(!errorObj.status){
        console.log(errorObj)      
        console.error(errorObj)
        errorObj = JSON.parse(errorObj)
     }


      return throwError(errorObj);
    })

    ) as any
      }
}



export const ErrorInterceptorProvider ={
  provide: HTTP_INTERCEPTORS,
  useClass:errorInterceptor,
  multi:true

}