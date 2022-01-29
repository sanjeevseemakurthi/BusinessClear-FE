import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from '../dashbord/sidenav/sidenav.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AuthGuard } from './auth.guard';
import { ExpensesComponent } from './expenses/expenses.component';
import { FinanceComponent } from './finance/finance.component';
import { NewpersonfinanceComponent } from './finance/newpersonfinance/newpersonfinance.component';
import { PersondetailsComponent } from './finance/persondetails/persondetails.component';
import { HomeComponent } from './home/home.component';
import { LentComponent } from './lent/lent.component';
import { NewpersonlentComponent } from './lent/newpersonlent/newpersonlent.component';
import { PersondetailslentComponent } from './lent/persondetailslent/persondetailslent.component';
import { SettingsComponent } from './settings/settings.component';
import { NewwpersonstocksComponent } from './stocks-sales/newwpersonstocks/newwpersonstocks.component';
import { PersonstockssalesComponent } from './stocks-sales/personstockssales/personstockssales.component';
import { StocksSalesComponent } from './stocks-sales/stocks-sales.component';
import { StockspersondetailsComponent } from './stocks-sales/stockspersondetails/stockspersondetails.component';

const routes: Routes = [
  {
    path:'',
    component:SidenavComponent,
    children: [
      { path:'settings', component:SettingsComponent, canActivate : [AuthGuard]},
      { path:'Stocks-Sales',
       children: [
        { path:'' , component:StocksSalesComponent, canActivate : [AuthGuard]},
        { path:'persondetails' , component:StockspersondetailsComponent, canActivate : [AuthGuard]},
        { path:'newperson' , component:NewwpersonstocksComponent, canActivate : [AuthGuard]},
        { path:'person', component:PersonstockssalesComponent, canActivate : [AuthGuard]},
        
      ], 
      canActivate : [AuthGuard]
      },
      { path:'Analysis', component:AnalyticsComponent, canActivate : [AuthGuard]},
      { path:'Home' , component:HomeComponent, canActivate : [AuthGuard]},
      { path:'expenses' , component:ExpensesComponent, canActivate : [AuthGuard]},
      { path:'finance' , 
        children: [
          { path:'' , component:FinanceComponent, canActivate : [AuthGuard]},
          { path:'person' , component:PersondetailsComponent, canActivate : [AuthGuard]},
          { path:'newperson' , component:NewpersonfinanceComponent, canActivate : [AuthGuard]}
        ],
        canActivate : [AuthGuard]},
        { path:'Lent' , 
        children: [
          { path:'' , component:LentComponent, canActivate : [AuthGuard]},
          { path:'person' , component:PersondetailslentComponent, canActivate : [AuthGuard]},
          { path:'newperson' , component:NewpersonlentComponent, canActivate : [AuthGuard]}
        ],
        canActivate : [AuthGuard]},
        
    ],
    canActivate : [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinesslogicRoutingModule { }
