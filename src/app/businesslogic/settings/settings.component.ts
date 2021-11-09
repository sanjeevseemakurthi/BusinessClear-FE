import { Component, OnInit } from '@angular/core';
import {BusinesslogicService} from '../businesslogic.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public businesslogicservice:BusinesslogicService) { }

  ngOnInit(): void {
    this.businesslogicservice.getsettingdata().subscribe(res => {
      console.log(res);
    } , err => { console.log("error")});
  }

}
