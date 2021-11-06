import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-logindailog',
  templateUrl: './logindailog.component.html',
  styleUrls: ['./logindailog.component.scss']
})
export class LogindailogComponent implements OnInit {

  constructor(public sharedservice:SharedService) { }
  login = "sanju";
  password = "sanju";
  ngOnInit(): void {
  }
  auth() {
    this.sharedservice.login(this.login,this.password).subscribe( res => {
      if(res && res['jwtToken']) { 
        sessionStorage.setItem('jwt_businessclear',JSON.stringify(res['jwtToken']));
      }
    },
    err=>{console.log("error")})
  }
}
