import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinesslogicRoutingModule } from './businesslogic-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    BusinesslogicRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class BusinesslogicModule { }
