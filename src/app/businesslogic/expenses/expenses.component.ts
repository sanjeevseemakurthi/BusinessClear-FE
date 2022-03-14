import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinesslogicService } from '../businesslogic.service';
import {cloneDeep as loadashclonedeep} from 'lodash';
import {MatDialog} from '@angular/material/dialog';
import { StockssalesharedaddComponent } from 'src/app/shared/stockssalesharedadd/stockssalesharedadd.component';
import { AddfinancedailogueComponent } from '../finance/addfinancedailogue/addfinancedailogue.component';

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
  constructor(private businesslogicService:BusinesslogicService, public router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.date =formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.populateexpensedata();
  }
  populateexpensedata() {
    this.businesslogicService.getexpense({'date':this.date}).subscribe(res => {
     if(res['expenses'] && res['expenses'][0] && res['expenses'][0].dailyexpenses) {
      this.data = res['expenses'][0].dailyexpenses;
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
      "dailyexpenses":	this.data
    }
    if(this.id !== undefined){
      payload['id'] = this.id;
    }
    this.businesslogicService.addexpense(payload).subscribe(res => {
      this.populateexpensedata();
     } , err => {});
  }
  addstocks(){
    const dialogRef = this.dialog.open(StockssalesharedaddComponent,{
      width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  addfinance(){
    const dialogRef = this.dialog.open(AddfinancedailogueComponent,{
      minWidth: '600px',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  addeaccounts(){
    
  }
}
