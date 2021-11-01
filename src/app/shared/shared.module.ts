import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoroutefoundComponent } from './noroutefound/noroutefound.component';
import { LogindailogComponent } from './logindailog/logindailog.component';



@NgModule({
  declarations: [NoroutefoundComponent, LogindailogComponent],
  imports: [
    CommonModule
  ],
  exports:[
    NoroutefoundComponent
  ]
})
export class SharedModule { }
