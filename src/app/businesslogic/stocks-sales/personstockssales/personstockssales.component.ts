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
  selector: 'app-personstockssales',
  templateUrl: './personstockssales.component.html',
  styleUrls: ['./personstockssales.component.scss']
})
export class PersonstockssalesComponent implements OnInit {
  rowdata: any;
  seetings_data: any;
  editindex = -1;
  olddata: any;

 
  constructor(public activeroute:ActivatedRoute,private businesslogicService:BusinesslogicService, public router:Router) { }
  dataSource: any;
  filter = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  persondata:any;
  titlforoperations = "";
  stilloading = true;
  showfinance = false;
  editfinance = false;
  financecaluclate = false;
  intreastrate = 12;
  intreastfinaldate;
  persondetailsedit = false;
  pid;
  addtolent = false;
  displayedColumns = ['initialdate', 'amount','qty','property','subproperty','action'];
  ngOnInit(): void {
    this.activeroute.queryParamMap.subscribe(res=>{
      this.pid = res['params'].pid;
    })
    this.intreastfinaldate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.getsettingsalldata();
    this.populatepersondetail();
    
  }
  editpage() {
    this.persondetailsedit = true;
  }
  populatepersondetail(){
    this.showfinance = false;
    this.businesslogicService.getpersonstocks({pid:this.pid}).subscribe( res =>
     {
      this.persondata = loadashclonedeep(res['person'][0]);
      this.dataSource =  new MatTableDataSource(res['stocks']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.stilloading = false;
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
    this.showfinance = false;
    this.editfinance = true;
    this.rowdata = loadashclonedeep(row);
    this.titlforoperations = "Edit stocksfinance";

  }
  addnewfinance(){
    this.showfinance = true;
    this.editfinance = false;
    this.titlforoperations = "Add new Stocks/sales";
  }
  getsettingsalldata() {
    this.businesslogicService.getSettingsall().subscribe(res=>{
      this.seetings_data = loadashclonedeep(res);
    });
  }
  submitdata(){
    console.log(this.rowdata);
   
  }
  gettypeintable(id,type) {
    let data;
    this.seetings_data.forEach(element => {
      if(element.id === id){
        data =  element[type];
      }
    });
    return data;
  }
  editclicked(index,row) {
    this.editindex = index;
    if (this.olddata && this.olddata !== null) {
    let indexofdata = this.dataSource.data.findIndex( elem => elem.id === this.olddata.id);
    this.dataSource.data.splice(indexofdata,1,this.olddata);
    this.dataSource.data = loadashclonedeep(this.dataSource.data);
    }  
    this.olddata = loadashclonedeep(row);
  }
  submitclicke(row) {
    this.editindex = -1;
    delete row.property;
    delete row.subproperty;
    this.businesslogicService.updaterecord(row).subscribe( res =>
      {
        this.populatepersondetail();
        this.showfinance = false;
        this.editfinance = false;
        this.titlforoperations = ""
      });
  }
}