import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CredenciaisDTO } from '../models/CredenciaisDTO';
import { UsuarioDTO } from '../models/UsuarioDTO';
import { auth } from '../services/auth.service';

@Component({
  selector: 'app-template-msg',
  templateUrl: './template-msg.component.html',
  styleUrls: ['./template-msg.component.scss'],
})
export class TemplateMsgComponent implements OnInit {

  constructor(public route:Router,
              public logins:auth,
              public login:auth) { }

  ngOnInit() {}

  public emailForm = UsuarioDTO.email


  logar(){   

    
      let creds:CredenciaisDTO  ={
        usuario:UsuarioDTO.usuario,
        senha:UsuarioDTO.senha
      } 
    
      this.logins.auth(creds).subscribe((dados)=>{
      this.login.successfulLogin(dados.headers.get('Authorization'));
      this.route.navigate(['/home']);
    })


    
  }

}
