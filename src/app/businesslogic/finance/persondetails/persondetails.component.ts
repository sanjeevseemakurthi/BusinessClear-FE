import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinesslogicService } from '../../businesslogic.service';
import {cloneDeep as loadashclonedeep} from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe, formatDate } from '@angular/common';
import { tree } from 'd3';
import { _ } from 'ag-grid-community';

@Component({
  selector: 'app-persondetails',
  templateUrl: './persondetails.component.html',
  styleUrls: ['./persondetails.component.scss']
})
export class PersondetailsComponent implements OnInit {

  constructor(public activeroute:ActivatedRoute,private businesslogicService:BusinesslogicService, public router:Router) { }
  dataSource: any;
  filter = '';
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
    "deposits":[],
    "giveextra":[]
  }
  financedata = {
    "item": "",
    "amount": 0,
    "sno": 0,
    "qty": 0,
    "date":'',
    "isactive": true,
    "deposits":[],
    "giveextra":[]
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
  editpage() {
    this.persondetailsedit = true;
  }
  populatepersondetail(){
    this.businesslogicService.getpersonfinance({pid:this.pid}).subscribe( res =>
     {
      this.persondata = loadashclonedeep(res['person'][0]);
      this.dataSource =  new MatTableDataSource(res['finance']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     });
  }
  
  submitpage(){
    this.businesslogicService.updatepersondetials(this.persondata).subscribe( res =>
      {
       this.persondata = loadashclonedeep(res['person'][0]);
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
    if(row.giveextra === undefined) {
      row.giveextra = [];
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
      amount:0
    };
    this.financedata.deposits.push(j);
  }
  newgiveextra() {
    let j = {
      date: "",
      amount:0
    };
    this.financedata.giveextra.push(j);
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
  caluclatefinance(){
    this.financecaluclate = !this.financecaluclate;
  }
  caluclateintreastsimple(date,amount) {
    let startdate = new Date(date);
    let finaldate = new Date(this.intreastfinaldate);
    console.log(startdate,finaldate);
    let days = Math.floor((finaldate.getTime() - startdate.getTime()) / 1000 / 60 / 60 / 24);
    console.log(days);
    let result = amount +  Math.floor((amount*(days/365)*this.intreastrate)/100);
    return result;
  }
  caluclateintreastcompound(date,amount) {
    let startdate = new Date(date);
    let finaldate = new Date(this.intreastfinaldate);
    console.log(startdate,finaldate);
    let days = Math.floor((finaldate.getTime() - startdate.getTime()) / 1000 / 60 / 60 / 24 );
    console.log(days);
    
    let result = Math.floor(amount*Math.pow((1+this.intreastrate),(days/365)));
    return result;
  }
  calcluatetotalsimple()
  {_
    let add = 0;
    let minus = 0;
    let mainamount = this.caluclateintreastsimple(this.financedata.date,this.financedata.amount);
    this.financedata.deposits.forEach(element => {
      add = add + this.caluclateintreastsimple(element.date,element.amount); 
    });
    this.financedata.giveextra.forEach(element => {
      minus = minus + this.caluclateintreastsimple(element.date,element.amount); 
    });
    return mainamount + add - minus;
  }
  calcluatetotalcompound(){
    let add = 0;
    let minus = 0;
    let mainamount = this.caluclateintreastcompound(this.financedata.date,this.financedata.amount);
    this.financedata.deposits.forEach(element => {
      add = add + this.caluclateintreastcompound(element.date,element.amount); 
    });
    this.financedata.giveextra.forEach(element => {
      minus = minus + this.caluclateintreastcompound(element.date,element.amount); 
    });
    return mainamount + add - minus;
  }
}
