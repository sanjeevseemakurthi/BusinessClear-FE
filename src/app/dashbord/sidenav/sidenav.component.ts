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
      name : 'Accounts'
    },
    {
      icon :'fa-money',
      name : 'finance'
    },
    {
      icon :'fa-cog',
      name : 'settings'
    },
    {
      icon :'fa-map-o',
      name : 'expenses'
    }
  ]
  indirectlinks = ['finance','Accounts','Lent']
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
    if(this.indirectlinks.includes(url)) {
      this.router.navigate(['businesslogic/person'],{queryParams:{typeofmodule:url}});
    } else {
      this.router.navigate(['businesslogic/'+url])

    }
  }
}
