import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinesslogicService } from '../businesslogic.service';
import {cloneDeep as loadashclonedeep} from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe, formatDate } from '@angular/common';
import { tree } from 'd3';
import { _ } from 'ag-grid-community';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {

  constructor(public activeroute:ActivatedRoute,private businesslogicService:BusinesslogicService, public router:Router) { }
  dataSource: any;
  filter = '';
  stilloading = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  persondata:any;
  titlforoperations = "";
  financedatanew = {
    "item": "",
    "amount": 0,
    "sno": 0,
    "qty": 0,
    "date":'',
    "isactive": true,
    "deposits":[]
  }
  financedata = {
    "item": "",
    "amount": 0,
    "sno": 0,
    "qty": 0,
    "date":'',
    "isactive": true,
    "deposits":[]
  }
  showfinance = false;
  editfinance = false;
  financecaluclate = false;
  intreastrate = 12;
  intreastfinaldate;
  persondetailsedit = false;
  pid;
  displayedColumns = ['id', 'item', 'date', 'amount'];
  ngOnInit(): void {
    this.activeroute.queryParamMap.subscribe(res=>{
      this.pid = res['params'].pid;
    })
    this.intreastfinaldate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.populatepersondetail();
  }
  populatepersondetail(){
    this.businesslogicService.getpersonfinance({pid:this.pid}).subscribe( res =>
     {
      this.persondata = loadashclonedeep(res['person'][0]);
      this.dataSource =  new MatTableDataSource(res['finance']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.stilloading = false;
     });
  }
  
  applyFilter(event: Event) {
    console.log("hi")
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  rowclicked(row) {
    console.log(row);
    if(row.deposits === undefined){
      row.deposits = [];
    }
    this.showfinance = true;
    this.editfinance = true;
    this.financedata = loadashclonedeep(row);
    this.titlforoperations = "Edit Finance";

  }
  addnewfinance(){
    this.showfinance = true;
    this.editfinance = false;
    this.financedata = loadashclonedeep(this.financedatanew);
    this.titlforoperations = "Add new Finance";
  }
  newdeposit(){
    let j = {
      date: "",
      deposit:0,
      discription:'',
      withdraw:0
    };
    this.financedata.deposits.push(j);
  }
  submitdata(){
    this.financedata['pid'] = this.pid; 
    this.businesslogicService.addfintoexistingpeople(this.financedata).subscribe( res =>
      {
        this.populatepersondetail();
        this.showfinance = false;
        this.editfinance = false;
        this.titlforoperations = ""
      });
  }
}
