import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ActionSheetController, CheckboxChangeEventDetail, ModalController } from '@ionic/angular';
import { InstrumentoService } from '../services/instrumento.service';
import { Instrumento } from './instrumento-class';


@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss'],
  providers: [InstrumentoService]
})
@Injectable({
  providedIn:'root'
})
export class DialogModalComponent implements OnInit {


  @Input() minId:number;
  listaObj:any[];
  instrumentosPorministerio:Promise<any>;
  listaDeInstrumentos :Array<Instrumento> =[];  
  listMinisterio:Array<Instrumento> = new Array();
  descadastrar:Array<Instrumento> = new Array();
  listainstrumentosJacadastrados:Array<Instrumento> = new Array();

  constructor(private modalCtrl:ModalController,
              public instrumento:InstrumentoService) {}

async ngOnInit():Promise<any> {       
  await this.listarInstrumentosComponent();
}

public listarInstrumentosComponent(){
  
  if(this.minId){
    this.instrumentosPorministerio = this.instrumento
        .listarInstrumentosAoMinisterio(this.minId)
        .toPromise()
        .then((data:Instrumento[])=>{          
          this.listarInstrumentos(data);    
        });
    
  }else {
    this.listarInstrumentos();    
  }
}

cancel(){
   return this.modalCtrl.dismiss(null,'cancel');
}

confirmar(){    
  let instrumento = {
    cadastrar:this.listMinisterio,
    descadastrar:this.descadastrar
  }
  return this.modalCtrl.dismiss(instrumento, 'confirmar');
}
 
listarInstrumentos(listaDeInstrumentosExistentes?:Instrumento[]){
  
   return  this.instrumento.listarInstrumentos().subscribe((response:Instrumento[])=>{      
      
      this.listaDeInstrumentos = response;
       
      this.listaDeInstrumentos.forEach((data:Instrumento,index)=>{    

        if(listaDeInstrumentosExistentes.some((dado)=> dado.id == data.id)){          
            data.checked = true;
            this.listMinisterio.push(data);
          }else{
            data.checked = false;
          }

      });      
    },
    (err)=>{
      console.log(err);
    });    
  };

   selecionarInstrumentos(obj:any){ 
    let index :number  = this.listMinisterio.findIndex((data)=>data.id  === obj.id);    

    obj.checked  = !obj.checked        
    
    if(!obj.checked){   

       this.listMinisterio.splice(index ,1);
       obj.minId = this.minId
       this.desvincularInstrumento(obj);
      }else{         

        this.vincularInstrumento(obj)
       this.listMinisterio.push(obj);        
      }  
      
  };

  public desvincularInstrumento(instrumento:Instrumento){

    this.instrumento.desvincularInstrumentosAoMinisterio(instrumento).subscribe((response)=>{
      console.log("descadastrado com sucesso")
    },(err)=>{
        console.log("problema ao descadastrar")
    })
  }

  public vincularInstrumento(instrumento:Instrumento){
    instrumento.minId = this.minId;
    console.log(instrumento)
    this.instrumento.vincularInstrumentosAoMinisterio(instrumento).subscribe((response)=>{
      console.log("cadastrado com sucesso")
    },(err)=>{
      console.log(err)
    });
  }
  
}
