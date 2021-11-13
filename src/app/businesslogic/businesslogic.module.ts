import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinesslogicRoutingModule } from './businesslogic-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { StocksSalesComponent } from './stocks-sales/stocks-sales.component';
import { AddStocksDailogComponent } from './stocks-sales/add-stocks-dailog/add-stocks-dailog.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [SettingsComponent, StocksSalesComponent, AddStocksDailogComponent],
  imports: [
    CommonModule,
    BusinesslogicRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ]
})
export class BusinesslogicModule { }
