import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { BusinesslogicService } from '../businesslogic.service';
import {cloneDeep as loadashclonedeep} from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  intreastfinaldate: any;
  persondata: any;
  stilloading = true;
  dataSource: any;
  filter = '';
  newrecord = {
    deposit : 0,
    withdraw : 0,
    discription:'',
    pid:0,
    date:  formatDate(new Date(), 'yyyy-MM-dd', 'en'),
  }
  newrecorddonotchange = {
    deposit : 0,
    withdraw : 0,
    pid:0,
    date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    discription:'',
  }
  addnewtoggle = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  editindex = -1;
  olddata: any;
  constructor(public activeroute:ActivatedRoute,private businesslogicService:BusinesslogicService, public router:Router,private meassgeservice:MessageService) { }
  pid;
  displayedColumns = ['date', 'deposit', 'withdraw','total','action'];
  // for displaying
  displaydata = {
    date:{
      headreName:"date",
      type:"date"
    },
    deposit:{
      headreName:"deposit",
      type:"number"
    },
    withdraw:{
      headreName:"withdraw",
      type:"number"
    },
    total:{
      headreName:"total",
      type:"number"
    }
  }
  ngOnInit(): void {
    this.activeroute.queryParamMap.subscribe(res=>{
      this.pid = res['params'].pid;
    })
    this.intreastfinaldate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.populatepersondetail();
  }
  populatepersondetail(){
    this.businesslogicService.getpersonaccounts({pid:this.pid}).subscribe( res =>
     {
      this.persondata = loadashclonedeep(res['person'][0]);
      this.stilloading = false
      this.dataSource =  new MatTableDataSource(res['Accounts']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    this.businesslogicService.editaccount(row).subscribe(res=>{
      this.populatepersondetail();
    })
  }
  newtoggle() {
    this.addnewtoggle = !this.addnewtoggle
  }
  submitdata(){
    this.newrecord.pid = this.pid;
    this.businesslogicService.addaccount(this.newrecord).subscribe(res=>{
      this.newrecord = loadashclonedeep(this.newrecorddonotchange)
      this.populatepersondetail();
      this.addnewtoggle = false;
    })
  }
}
