import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoroutefoundComponent } from './noroutefound/noroutefound.component';
import { LogindailogComponent } from './logindailog/logindailog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AleartdailogboxComponent } from './aleartdailogbox/aleartdailogbox.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
@NgModule({
  declarations: [NoroutefoundComponent, LogindailogComponent, AleartdailogboxComponent, LineChartComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[
    LineChartComponent,
    NoroutefoundComponent,
    LogindailogComponent,
    MatDialogModule,
    AleartdailogboxComponent
    
  ]
})
export class SharedModule { }
