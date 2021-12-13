import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { BusinesslogicService } from '../businesslogic.service';
import { AddStocksDailogComponent } from './add-stocks-dailog/add-stocks-dailog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {cloneDeep as loadashclonedeep} from 'lodash';
@Component({
  selector: 'app-stocks-sales',
  templateUrl: './stocks-sales.component.html',
  styleUrls: ['./stocks-sales.component.scss']
})
export class StocksSalesComponent implements OnInit {
  dataSource: any;
  filter = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private matdailog:MatDialog,private businesslogicService:BusinesslogicService) { }
  settings_data = {};
  displayedColumns = [
    'daystocks','daysales','name','amount','qty'
  ]
  ngOnInit(): void {
    this.populatesettingsdata();
    this.populatetabledata();
  }
  ngAfterViewInit() {
   
  }
  populatesettingsdata() {
    this.businesslogicService.getsettingdata().subscribe(res => {
      this.settings_data = loadashclonedeep(res);
    } , err => { console.log("error")});
  }
  populatetabledata() {
    this.businesslogicService.getlatesttransactions({}).subscribe(res => {
      this.dataSource =  new MatTableDataSource(loadashclonedeep(res));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
