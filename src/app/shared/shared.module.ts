import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoroutefoundComponent } from './noroutefound/noroutefound.component';
import { LogindailogComponent } from './logindailog/logindailog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AleartdailogboxComponent } from './aleartdailogbox/aleartdailogbox.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { FilterComponent } from './filter/filter.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { PiechartComponent } from './charts/piechart/piechart.component';
import { PersondetailsComponent } from './persondetails/persondetails.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule  } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { StockssalesharedaddComponent } from './stockssalesharedadd/stockssalesharedadd.component';
import { PersondetailseditComponent } from './persondetailsedit/persondetailsedit.component';
import { PersonaddComponent } from './personadd/personadd.component';
import { SelectionComponent } from './selection/selection.component';
@NgModule({
  declarations: [NoroutefoundComponent, LogindailogComponent, AleartdailogboxComponent, LineChartComponent, FilterComponent, FileuploadComponent, PiechartComponent, PersondetailsComponent, StockssalesharedaddComponent, PersondetailseditComponent, PersonaddComponent, SelectionComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule
  ],
  exports:[
    PiechartComponent,
    LineChartComponent,
    NoroutefoundComponent,
    LogindailogComponent,
    MatDialogModule,
    AleartdailogboxComponent,
    FilterComponent,
    FileuploadComponent,
    PersondetailsComponent,
    StockssalesharedaddComponent,
    PersondetailseditComponent,
    PersonaddComponent
  ]
})
export class SharedModule { }
