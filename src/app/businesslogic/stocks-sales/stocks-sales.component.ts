import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddStocksDailogComponent } from './add-stocks-dailog/add-stocks-dailog.component';
@Component({
  selector: 'app-stocks-sales',
  templateUrl: './stocks-sales.component.html',
  styleUrls: ['./stocks-sales.component.scss']
})
export class StocksSalesComponent implements OnInit {

  constructor(private matdailog:MatDialog) { }

  ngOnInit(): void {
  }

  stocksdisplay() {
    let dialogRef = this.matdailog.open(AddStocksDailogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
