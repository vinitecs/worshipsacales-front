import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CadastroUserComponent } from './cadastro-user/cadastro-user.component';
import { EscalasComponent } from './escalas/escalas.component';
import { HomePage } from './home/home.page';
import { MinisteriosComponent } from './ministerios/ministerios.component';
import { TemplateMsgComponent } from './template-msg/template-msg.component';

const routes: Routes = [
                          {
                            path: '',
                            redirectTo: 'auth',
                            pathMatch: 'full'
                            
                          },
                          {
                            path: 'home',
                            loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
                          },
                          {
                            path:'auth',
                            component: AuthComponent
                          },
                          {
                            path:'ministerios',
                            component: MinisteriosComponent
                          },
                          {
                            path:"escalas",
                            component:EscalasComponent
                          },
                          {
                            path:"cadastro",
                            component:CadastroUserComponent
                          },
                          {
                            path:"msg",
                            component:TemplateMsgComponent

                          }

                        ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
