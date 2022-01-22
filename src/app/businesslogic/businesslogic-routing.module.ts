import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from '../dashbord/sidenav/sidenav.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { StocksSalesComponent } from './stocks-sales/stocks-sales.component';

const routes: Routes = [
  {
    path:'',
    component:SidenavComponent,
    children: [
      { path:'settings', component:SettingsComponent, canActivate : [AuthGuard]},
      { path:'Stocks-Sales', component:StocksSalesComponent, canActivate : [AuthGuard]},
      { path:'Analysis', component:AnalyticsComponent, canActivate : [AuthGuard]},
      { path:'Home' , component:HomeComponent, canActivate : [AuthGuard]}
    ],
    canActivate : [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinesslogicRoutingModule { }
