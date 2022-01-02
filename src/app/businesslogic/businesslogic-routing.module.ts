import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from '../dashbord/sidenav/sidenav.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { SettingsComponent } from './settings/settings.component';
import { StocksSalesComponent } from './stocks-sales/stocks-sales.component';

const routes: Routes = [
  {
    path:'',
    component:SidenavComponent,
  },
  {
    path:'settings',
    component:SidenavComponent,
    children: [
      { path:'', component:SettingsComponent, outlet:'logic' }
    ]
  },
  {
    path:'stocks-sales',
    component:SidenavComponent,
    children: [
      { path:'', component:StocksSalesComponent, outlet:'logic' }
    ]
  },
  {
    path:'anayltics',
    component:SidenavComponent,
    children: [
      { path:'', component:AnalyticsComponent, outlet:'logic' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinesslogicRoutingModule { }
