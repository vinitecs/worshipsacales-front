import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { HomePageModule } from './home/home.module';
import { storageService } from './services/storage.service';
import { JwtModule } from "@auth0/angular-jwt";
import {  AuthInterceptorProvider } from './interceptors/auth-Interceptor';
import { ErrorInterceptorProvider } from './interceptors/error-interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MinisteriosComponent } from './ministerios/ministerios.component';
import { EscalasComponent } from './escalas/escalas.component';
import { ProximasEscalasComponent } from './proximas-escalas/proximas-escalas.component';
import { EscalasService } from './services/escalas.service';
import { CadastroUserComponent } from './cadastro-user/cadastro-user.component';


export function tokenGetter() {
  return localStorage.getItem("localuser");
}
@NgModule({
  declarations: [AppComponent,
                AuthComponent,
                MinisteriosComponent,
                EscalasComponent,
                ProximasEscalasComponent,
                CadastroUserComponent ,
              ],
  imports: [
            FontAwesomeModule,
            BrowserModule,
            IonicModule.forRoot(), 
            AppRoutingModule,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule ,
            HomePageModule,
            
      
           
            JwtModule.forRoot({
              config:{
                tokenGetter:()=>{return tokenGetter()} ,
                allowedDomains: ["http://localhost:8080"],
              //  disallowedRoutes: ["http://example.com/examplebadroute/"],
              }
              
            })
          ],
  providers: [{ provide: RouteReuseStrategy, 
                useClass: IonicRouteStrategy },
                storageService,
                EscalasService,                
                AuthInterceptorProvider,
                ErrorInterceptorProvider                
              ],
  bootstrap: [AppComponent],
})
export class AppModule {}
