import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    DashbordRoutingModule,
    MatSidenavModule
  ]
})
export class DashbordModule { }
