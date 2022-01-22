import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BasicindexComponent } from './basicindex/basicindex.component';

@NgModule({
  declarations: [SidenavComponent, BasicindexComponent],
  imports: [
    CommonModule,
    DashbordRoutingModule,
    MatSidenavModule
  ],
  exports:[
    SidenavComponent
  ]
})
export class DashbordModule { }
