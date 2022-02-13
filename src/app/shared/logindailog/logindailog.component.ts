import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-logindailog',
  templateUrl: './logindailog.component.html',
  styleUrls: ['./logindailog.component.scss']
})
export class LogindailogComponent implements OnInit {

  constructor(public sharedservice:SharedService,public router:Router,private messageservice:MessageService) { }
  login = "demo";
  password = "demo";
  ngOnInit(): void {
  }
  auth() {
    this.sharedservice.login(this.login,this.password).subscribe( res => {
      if(res && res['jwtToken']) { 
        this.messageservice.showMessage("Login sucessfully","sucess",1000);
        sessionStorage.setItem('jwt_businessclear',JSON.stringify(res['jwtToken']));
        this.router.navigate(['businesslogic/Home']);
      }
    },
    err=>{})
  }
}
