import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from '../dashbord/sidenav/sidenav.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path:'settings',
    component:SidenavComponent,
    children: [
      { path:'', component:SettingsComponent, outlet:'logic' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinesslogicRoutingModule { }
