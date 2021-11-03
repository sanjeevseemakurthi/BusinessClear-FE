import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NoroutefoundComponent} from './shared/noroutefound/noroutefound.component';
const routes: Routes = [
  {
    path:'dashbord',
    loadChildren : "./dashbord/dashbord.module#DashbordModule"
  },
  {
    path:'businesslogic',
    loadChildren : "./businesslogic/businesslogic.module#BusinesslogicModule"
  },
  {
    path:'**',
    component : NoroutefoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
