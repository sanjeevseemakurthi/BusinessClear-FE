import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  islargescreen = false;
  showFiller = false;
  sidenavtoggle = true;
  imageurl = '';
  menuitems = [
    {
      icon :'fa-home',
      name : 'Home'
    },
    {
      icon :' fa-chart-bar',
      name : 'Analysis'
    },{
      icon :'fa-chart-pie',
      name : 'Stocks/Sales'
    },{
      icon :'fa-money-bill',
      name : 'Lent'
    },
  ]
  constructor( breakpointObserver: BreakpointObserver) {
    breakpointObserver
    .observe([Breakpoints.Large])
    .pipe()
    .subscribe((result) => {
      this.islargescreen = result.matches;
    });
   }

  ngOnInit(): void {
  }
sidenavtogglemethod()
{
  this.sidenavtoggle = ! this.sidenavtoggle;
}
}
