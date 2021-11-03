import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinesslogicRoutingModule } from './businesslogic-routing.module';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    BusinesslogicRoutingModule
  ]
})
export class BusinesslogicModule { }
