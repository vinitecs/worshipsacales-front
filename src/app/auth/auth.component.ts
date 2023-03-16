import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { auth } from '../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { storageService } from '../services/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers:[auth,storageService]
})
export class AuthComponent implements OnInit {
  
               public fControl:FormGroup;

  constructor( 
               public router:Router,
               public http:HttpClient,
               public login:auth,
               public fBuilder:FormBuilder,
               public storage:storageService
             ){}

          jwtHelper: JwtHelperService = new JwtHelperService();

  ngOnInit() {
    this.fControl = this.fBuilder.group({
      'usuario':[],
      'senha':[],
    })
  }
public user:any;
async GAuth(){
  let googleUser = await GoogleAuth.signIn();

  console.log("minha tela de do google")
  this.login.authGoogle(googleUser).subscribe((result)=>{        
    this.login.successfulLogin(result.headers['Authorization'][0]);
    this.router.navigate(['/home']);
    
  },(error)=>{
    alert(error)
  })
  
}
  
  public logar(){
    this.login.auth(this.fControl.value).subscribe((data)=>{      
      this.login.successfulLogin(data.headers.get('Authorization'));
      this.router.navigate(['/home']);
    },(error)=>{      
      console.log(error)
      alert(error)
    })
  }

  formularioCadastro(){    
      this.login.logout();
      this.router.navigate(['/cadastro'])    
  }


}
