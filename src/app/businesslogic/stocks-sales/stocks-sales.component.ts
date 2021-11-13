import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { BusinesslogicService } from '../businesslogic.service';
import { AddStocksDailogComponent } from './add-stocks-dailog/add-stocks-dailog.component';
@Component({
  selector: 'app-stocks-sales',
  templateUrl: './stocks-sales.component.html',
  styleUrls: ['./stocks-sales.component.scss']
})
export class StocksSalesComponent implements OnInit {

  constructor(private matdailog:MatDialog,private businesslogicService:BusinesslogicService) { }

  ngOnInit(): void {
  }

  stocksdisplay() {
    let dialogRef = this.matdailog.open(AddStocksDailogComponent);
    dialogRef.afterClosed().subscribe(result => {
     if(result !== "") {
      this.businesslogicService.addstocks(result).subscribe(res=> {
        console.log("sucess");
      });
     }
    });
  }
}
