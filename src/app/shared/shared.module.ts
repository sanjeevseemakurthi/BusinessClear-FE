import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoroutefoundComponent } from './noroutefound/noroutefound.component';
import { LogindailogComponent } from './logindailog/logindailog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [NoroutefoundComponent, LogindailogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[
    NoroutefoundComponent,
    LogindailogComponent,
    MatDialogModule
  ]
})
export class SharedModule { }
