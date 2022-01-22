import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LogindailogComponent } from 'src/app/shared/logindailog/logindailog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  baseurl;
  menuitems = [
    {
      icon :'fa-home',
      name : 'Home'
    },
    {
      icon :'fa-line-chart',
      name : 'Analysis'
    },
    {
      icon :'fa-shopping-cart',
      name : 'Stocks-Sales'
    },
    {
      icon :'fa-money',
      name : 'Lent'
    },
    {
      icon :'fa-cog',
      name : 'settings'
    }
  ]
  constructor( breakpointObserver: BreakpointObserver,public dailog:MatDialog ,public router:Router) {
    breakpointObserver
    .observe([Breakpoints.Large])
    .pipe()
    .subscribe((result) => {
      this.islargescreen = result.matches;
    });
    this.baseurl = this.router.url;
    console.log(this.baseurl);
   }

  ngOnInit(): void {
  }
sidenavtogglemethod()
{
  this.sidenavtoggle = ! this.sidenavtoggle;
}
loginpopup() {
  const dialogRef = this.dailog.open(LogindailogComponent);
  dialogRef.afterClosed().subscribe(result => {
    });
  }
  changeroute(url) {
    this.router.navigate(['businesslogic/'+url])
  }
}
