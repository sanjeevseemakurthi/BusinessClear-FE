import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinesslogicService } from '../../businesslogic.service';
import {cloneDeep as loadashclonedeep} from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tree } from 'd3';

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
  intreast = 12;
  persondetailsedit = false;
  pid;
  displayedColumns = ['id', 'item', 'date', 'amount'];
  ngOnInit(): void {
    this.activeroute.queryParamMap.subscribe(res=>{
      this.pid = res['params'].pid;
    })
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
  submitdata(){
    this.financedata['pid'] = this.pid; 
    this.businesslogicService.addfintoexistingpeople(this.financedata).subscribe( res =>
      {
        this.populatepersondetail();
        this.showfinance = false;
        this.titlforoperations = ""
      });
  }
  caluclatefinance(){
    this.financecaluclate = !this.financecaluclate;
  }
  caluclateintreast(amount,date) {
    console.log(amount,date);
    return "sanju";
  }
}
