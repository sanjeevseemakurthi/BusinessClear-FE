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
      name : 'Home',
      navigateto : '../Home'
    },
    {
      icon :' fa-home',
      name : 'Analysis',
      navigateto : '../dashbord'
    },
    {
      icon :'fa-home',
      name : 'Stocks/Sales',
      navigateto : '../stocksandsales'
    },
    {
      icon :'fa-home',
      name : 'Lent',
      navigateto : '../Lent'
    },
    {
      icon :'fa-home',
      name : 'settings',
      navigateto : '../settings'
    }
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
