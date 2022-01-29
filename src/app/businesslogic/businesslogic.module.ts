import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinesslogicRoutingModule } from './businesslogic-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { StocksSalesComponent } from './stocks-sales/stocks-sales.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule  } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EditStocksDailogComponent } from './stocks-sales/edit-stocks-dailog/edit-stocks-dailog.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { FinanceComponent } from './finance/finance.component';
import { PersondetailsComponent } from './finance/persondetails/persondetails.component';
import { NewpersonfinanceComponent } from './finance/newpersonfinance/newpersonfinance.component';
import { LentComponent } from './lent/lent.component';
import { NewpersonlentComponent } from './lent/newpersonlent/newpersonlent.component';
import { PersondetailslentComponent } from './lent/persondetailslent/persondetailslent.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { StockspersondetailsComponent } from './stocks-sales/stockspersondetails/stockspersondetails.component';


@NgModule({
  declarations: [SettingsComponent, StocksSalesComponent, EditStocksDailogComponent, AnalyticsComponent, HomeComponent, FinanceComponent, PersondetailsComponent, NewpersonfinanceComponent, LentComponent, NewpersonlentComponent, PersondetailslentComponent, ExpensesComponent, StockspersondetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    BusinesslogicRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSlideToggleModule,
    AgGridModule.withComponents([])
  ],
  providers:[AuthGuard]
})
export class BusinesslogicModule { }
