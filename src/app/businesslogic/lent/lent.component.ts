
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
import { MessageService } from 'src/app/message.service';
@Component({
  selector: 'app-lent',
  templateUrl: './lent.component.html',
  styleUrls: ['./lent.component.scss']
})
export class LentComponent  implements OnInit {

  constructor(public activeroute:ActivatedRoute,private businesslogicService:BusinesslogicService, public router:Router,private meassgeservice:MessageService) { }
  dataSource: any;
  filter = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  persondata:any;
  titlforoperations = "";
  stilloading = true;
  lentdatanew = {
    "item": "",
    "amount": 0,
    "sno": 0,
    "qty": 0,
    "date":'',
    "isactive": true,
    "deposits":[],
    "giveextra":[]
  }
  lentdata = {
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
  populatepersondetail(){
    this.businesslogicService.getpersonlent({pid:this.pid}).subscribe( res =>
     {
      this.persondata = loadashclonedeep(res['person'][0]);
      this.stilloading = false
      this.dataSource =  new MatTableDataSource(res['lent']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
    this.lentdata = loadashclonedeep(row);
    this.titlforoperations = "Edit Lent";

  }
  addnewfinance(){
    this.showfinance = true;
    this.editfinance = false;
    this.lentdata = loadashclonedeep(this.lentdatanew);
    this.titlforoperations = "Add new Lent";
  }
  newdeposit(){
    let j = {
      date: "",
      amount:0
    };
    this.lentdata.deposits.push(j);
  }
  newgiveextra() {
    let j = {
      date: "",
      amount:0
    };
    this.lentdata.giveextra.push(j);
  }
  submitdata(){
    this.lentdata['pid'] = this.pid; 
    this.businesslogicService.addlenttoexistingpeople(this.lentdata).subscribe( res =>
      {
        this.populatepersondetail();
        this.showfinance = false;
        this.editfinance = false;
        this.titlforoperations = ""
      });
  }
}
