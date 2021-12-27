import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinesslogicRoutingModule } from './businesslogic-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { StocksSalesComponent } from './stocks-sales/stocks-sales.component';
import { AddStocksDailogComponent } from './stocks-sales/add-stocks-dailog/add-stocks-dailog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule  } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EditStocksDailogComponent } from './stocks-sales/edit-stocks-dailog/edit-stocks-dailog.component';
@NgModule({
  declarations: [SettingsComponent, StocksSalesComponent, AddStocksDailogComponent, EditStocksDailogComponent],
  imports: [
    CommonModule,
    BusinesslogicRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule 
  ]
})
export class BusinesslogicModule { }
