import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logindailog',
  templateUrl: './logindailog.component.html',
  styleUrls: ['./logindailog.component.scss']
})
export class LogindailogComponent implements OnInit {

  constructor() { }
  login = "sanju";
  password = "sanju";
  ngOnInit(): void {
  }
  auth() {
    
  }
}
