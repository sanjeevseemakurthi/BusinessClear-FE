import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinesslogicService } from '../businesslogic.service';
import {cloneDeep as loadashclonedeep} from 'lodash';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  date:any
  data = [];
  id:any;
  newexpensedontchange = {
    "deposit": 0,
    "typeid": 0,
    "type": "",
    "withdraw": 0,
    "discription": ""
  };
  newexpense = {
    "deposit": 0,
    "typeid": 0,
    "type": "",
    "withdraw": 0,
    "discription": ""
  };
  constructor(private businesslogicService:BusinesslogicService, public router:Router) { }

  ngOnInit(): void {
    this.date =formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.populateexpensedata();
  }
  populateexpensedata() {
    this.businesslogicService.getexpense({'date':this.date}).subscribe(res => {
     if(res['expenses'] && res['expenses'][0] && res['expenses'][0].daydata) {
      this.data = res['expenses'][0].daydata;
     } else {
       this.data = [];
     }
     if(res['expenses'] && res['expenses'][0] && res['expenses'][0].id){
       this.id =  res['expenses'][0].id;
     } else {
       this.id = undefined;
     }
      // this.newexpense = loadashclonedeep(this.newexpensedontchange);
     console.log(this.data);

    } , err => {});
  }
  changedata(){
    this.populateexpensedata();
  }
  addexpense(){
    this.data.push(loadashclonedeep(this.newexpense));
  }
  submitdata(){
    const payload = {
      "date": this.date,
      "daydata":	this.data
    }
    if(this.id !== undefined){
      payload['id'] = this.id;
    }
    this.businesslogicService.addexpense(payload).subscribe(res => {
      this.populateexpensedata();
     } , err => {});
  }
}
