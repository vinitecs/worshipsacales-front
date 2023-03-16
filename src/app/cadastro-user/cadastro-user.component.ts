import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { CadastroUserService } from '../services/cadastro-user.service';
import { UsuarioDTO } from '../models/UsuarioDTO';
import { auth } from '../services/auth.service';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.component.html',
  styleUrls: ['./cadastro-user.component.scss'],
  providers:[CadastroUserService]
})
export class CadastroUserComponent implements OnInit {

  constructor( public fBuilder:FormBuilder,
               public cad:CadastroUserService,
              public route:Router,public login:auth) { }

  public fControl:FormGroup;
  confirmarSenha:string;

  ngOnInit() {
    this.fControl = this.fBuilder.group({
      'nome':['',Validators.required],
      'sobrenome':['',Validators.required],
      'email':['',Validators.email],
      'senha':['',Validators.required],
      'dataNascimento':['',Validators.required],
      'telefone':['',Validators.required],
      'perfil':[1,Validators.required]

    })
  }


  cadastrarUsuario(){
    let form:Usuario = this.fControl.value;
    
    if(form.senha != this.confirmarSenha){
        alert("senha esta diferente diferente ")
      return;
    }

    if(!form.perfil){
      form.perfil = 1;
    }


      if(this.fControl.valid){
        this.cad.insertUser(form).subscribe((result:any)=>{
            console.log(result)
            this.fControl.reset();
            this.confirmarSenha = null;           
            this.route.navigate(['msg'])

            UsuarioDTO.usuario =  form.email
            UsuarioDTO.senha = form.senha
            UsuarioDTO.email = form.email
            this.login.logout();

        },(err)=>{
          console.log("error",err)
        })

      } else{
        alert("formulario incorreto")
      }

 
  }



}
