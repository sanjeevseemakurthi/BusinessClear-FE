import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from '../dashbord/sidenav/sidenav.component';
import { PersonaddComponent } from '../shared/personadd/personadd.component';
import { PersondetailsComponent } from '../shared/persondetails/persondetails.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AuthGuard } from './auth.guard';
import { ExpensesComponent } from './expenses/expenses.component';
import { FinanceComponent } from './finance/finance.component';
import { HomeComponent } from './home/home.component';
import { LentComponent } from './lent/lent.component';
import { SettingsComponent } from './settings/settings.component';
import { PersonstockssalesComponent } from './stocks-sales/personstockssales/personstockssales.component';
import { StocksSalesComponent } from './stocks-sales/stocks-sales.component';

const routes: Routes = [
  {
    path:'',
    component:SidenavComponent,
    children: [
      { path:'settings', component:SettingsComponent, canActivate : [AuthGuard]},
      { path:'person', component:PersondetailsComponent, canActivate : [AuthGuard]},
      { path:'newperson', component:PersonaddComponent, canActivate : [AuthGuard]},
      { path:'Purchase-Sales',
       children: [
        { path:'' , component:StocksSalesComponent, canActivate : [AuthGuard]},
        { path:'persondetails' , component:PersonstockssalesComponent, canActivate : [AuthGuard]},
      ], 
      canActivate : [AuthGuard]
      },
      { path:'Analysis', component:AnalyticsComponent, canActivate : [AuthGuard]},
      { path:'Home' , component:HomeComponent, canActivate : [AuthGuard]},
      { path:'expenses' , component:ExpensesComponent, canActivate : [AuthGuard]},
      { path:'finance/persondetails' ,  component:FinanceComponent, canActivate : [AuthGuard]},
      { path:'Lent/persondetails' , component:LentComponent, canActivate : [AuthGuard]},
      { path:'Accounts/persondetails', component:AccountsComponent, canActivate : [AuthGuard]},
    ],
    canActivate : [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinesslogicRoutingModule { }
