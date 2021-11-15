import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { BusinesslogicService } from '../businesslogic.service';
import { AddStocksDailogComponent } from './add-stocks-dailog/add-stocks-dailog.component';
import {cloneDeep as loadashclonedeep} from 'lodash';
@Component({
  selector: 'app-stocks-sales',
  templateUrl: './stocks-sales.component.html',
  styleUrls: ['./stocks-sales.component.scss']
})
export class StocksSalesComponent implements OnInit {

  constructor(private matdailog:MatDialog,private businesslogicService:BusinesslogicService) { }
  settings_data = {};
  ngOnInit(): void {
    this.populatedata()
  }
  populatedata() {
    this.businesslogicService.getsettingdata().subscribe(res => {
      this.settings_data = loadashclonedeep(res);
    } , err => { console.log("error")});
  }
  addstock() {
    let dialogRef = this.matdailog.open(AddStocksDailogComponent, {data:this.settings_data});
    dialogRef.afterClosed().subscribe(result => {
     if(result !== "") {
       result['stockflag'] = true;
      this.businesslogicService.addstocks(result).subscribe(res=> {
        console.log("sucess");
      });
     }
    });
  }
  addsales() {
    let dialogRef = this.matdailog.open(AddStocksDailogComponent,{data:this.settings_data});
    dialogRef.afterClosed().subscribe(result => {
     if(result !== "") {
      result['stockflag'] = false;
      this.businesslogicService.addstocks(result).subscribe(res=> {
        console.log("sucess");
      });
     }
    });
  }
}
