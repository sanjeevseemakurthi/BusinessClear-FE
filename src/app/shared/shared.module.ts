import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoroutefoundComponent } from './noroutefound/noroutefound.component';



@NgModule({
  declarations: [NoroutefoundComponent],
  imports: [
    CommonModule
  ],
  exports:[
    NoroutefoundComponent
  ]
})
export class SharedModule { }
