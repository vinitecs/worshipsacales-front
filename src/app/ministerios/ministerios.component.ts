import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {faBars, faLayerGroup} from '@fortawesome/free-solid-svg-icons'
import { Observable } from 'rxjs';
import { MinisteriosService } from '../services/ministerios.service';
import {map} from 'rxjs/operators'
import { AlertController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-ministerios',
  templateUrl: './ministerios.component.html',
  styleUrls: ['./ministerios.component.scss'],
})
export class MinisteriosComponent implements OnInit {

  faBars = faBars;

  constructor(
      private mini:MinisteriosService,
      public actvated:ActivatedRoute,
      private alertController:AlertController
      
      
    ) { }

  public miniaterio:any;
  
  
  ngOnInit() {
    this.listarMinisterio()
    console.log("dados da minha rota",this.actvated.snapshot.queryParamMap.get("page"))
  }

  async listarMinisterio(){
    await this.mini.listMinsiteriosUser(7).subscribe((data:any)=>{
      console.log("apenas um teste",this.actvated.snapshot.queryParamMap)
      this.miniaterio = data;    
    },(err=>{
      console.log(err)
    }))
  }

async  inserirNovoMinisterio(){

  const alert = await this.alertController.create({
    header: "Insira dados sobre ministerio",
    buttons: ['Criar'],
    inputs: [
      {
        placeholder: 'Nome Ministério',
        attributes: {
          maxlength: 8,
        },
      },
    
    ]
  })
  await alert.present();
}

}
