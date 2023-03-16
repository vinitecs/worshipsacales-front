import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from '../services/auth.service';
import { faCalendar , faBars,faChevronDown,faLayerGroup,faTableList,faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { usuarioLogado } from '../models/usuario_logado';
import { NavController } from '@ionic/angular';
import { EscalasService } from '../services/escalas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
  providers:[auth,EscalasService]
})
export class HomePage implements OnInit{
 
  faBars = faBars
  faCalendar = faCalendar
  faChevronDown = faChevronDown
  faLayerGroup = faLayerGroup
  faTableList = faTableList
  faChevronRight= faChevronRight
  public proximasEscalas:any;

  constructor(private auth:auth,
              public router:Router,
              public navCrt:NavController,
              public scales:EscalasService) {}
  
  public usuarioLogado:usuarioLogado;

  ionViewWillEnter(){}  
  ionViewDidLeave(){}

  ionViewDidEnter(){    
    this.auth.refreshToken().subscribe((data:any)=>{
      this.auth.successfulLogin(data.headers.get('Authorization'));
      this.router.navigate(['/home']);
    },(err)=>{
      console.log(err)
      this.router.navigate(['/auth']);
    })
  }

public semana:any = {
    0:"DOMINGO",
    1:"SEGUNDA",
    2:"TERÇA",
    3:"QUARTA",
    4:"QUINTA",
    5:"SEXTA",
    6:"SABADO",
}

 async ngOnInit(){
    await this.auth.usuarioLogado().subscribe((data:any)=>{
      this.usuarioLogado = data 
      
    this.scales.proximasEscalas(data.usrId).subscribe((response:any)=>{      
      console.log("my response",response)
      const dados ={}
      response.forEach((data:any)=> {  
        
        if(!dados[data.minId]){
            dados[data.minId] = {}
        }

        const datas = dados[data.minId] 
            datas.MINISTERIO = data.nome
            datas.MIN_ID = data.minId
         
            if(!datas.ESCALAS ){
            datas.ESCALAS = []
          }      
        datas.ESCALAS.push(data)

        datas.ESCALAS.forEach((dado)=>{
          let myData = dado.dataEscala.split("/")
          myData = new Date(myData[2],myData[1]-1,myData[0])
          dado.DIA_SEMANA =this.semana[myData.getDay()]
        })
      });
       this.proximasEscalas = Object.values(dados)            
      })  

  
    },(error)=>{
      console.log("Error",error)
    })  

  
  }
ministerios(){    
  this.router.navigate(['/ministerios',{queryParams:this.usuarioLogado.usrId}]);
}
escalas(){
  this.router.navigate(['/escalas']);
}

 
}
