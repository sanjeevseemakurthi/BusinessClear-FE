import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { BusinesslogicService } from '../businesslogic.service';
import { AddStocksDailogComponent } from './add-stocks-dailog/add-stocks-dailog.component';
import { EditStocksDailogComponent } from './edit-stocks-dailog/edit-stocks-dailog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {cloneDeep as loadashclonedeep} from 'lodash';
import {AleartdailogboxComponent} from '../../shared/aleartdailogbox/aleartdailogbox.component';
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
  constructor(private matdailog:MatDialog,private businesslogicService:BusinesslogicService,
    private Dailog:MatDialog) { }
  settings_data = {};
  displayedColumns = ['id','initialdate','daylatest','amount','qty','leftamount','leftqty','daystocks','daystockamount','daysales','daysalesamount','action' ]
  settingsalldata = [];
  settingsidmapping = {};
  ngOnInit(): void {
    this.populatesettingsdata();
    this.populateallsettingsdata();
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
      Object.keys(res).forEach(element => {
        res[element]['property'] = this.settingsidmapping[res[element].settingsid].property;
        res[element]['subproperty'] = this.settingsidmapping[res[element].settingsid].subproperty;
      });
      const sorteddata = this.sortbydate(loadashclonedeep(res));
      this.dataSource =  new MatTableDataSource(sorteddata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } , err => { console.log("error")});
  }
  populateallsettingsdata(){
    this.businesslogicService.getSettingsall().subscribe(res => {
      this.settingsalldata = loadashclonedeep(res);
      this.settingsidmapping = {};
      this.settingsalldata.forEach(element => {
        this.settingsidmapping[element.id] = element;
      });
      console.log(this.settingsidmapping);
    } , err => { console.log("error")});
  }
  addstock() {
    let dialogRef = this.matdailog.open(AddStocksDailogComponent, {data:this.settings_data});
    dialogRef.afterClosed().subscribe(result => {
     if(result !== "") {
       result['stockflag'] = true;
      this.businesslogicService.addstocks(result).subscribe(res=> {
        this.populatetabledata();
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
        this.populatetabledata();
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
  edittransaction(row) {
    let dialogRef = this.matdailog.open(EditStocksDailogComponent, {data:loadashclonedeep(row)});
    dialogRef.afterClosed().subscribe(result => {
     if(result !== "") {
      this.businesslogicService.updaterecord(result).subscribe(res=>{
        this.populatetabledata();
      })
     }
    });
  }
  deletetransaction(row) {
    const dailogref = this.Dailog.open(AleartdailogboxComponent,
      {
        data: {
          title: 'Delete',
          message:'Are you Sure you are Deleating the record',
          twoevents: true
        },
        width: '500px'
      }
      );
    dailogref.afterClosed().subscribe(result => {
      if(result) {
        this.businesslogicService.deleterecord({id: row.id}).subscribe(res=>{
          this.populatetabledata();
        })
      }
   
    })
  }
  sortbydate(data) {
    let result = data.sort((a,b) => {
      const strtDt = new Date(a.initialdate);
      const endDt = new Date(b.initialdate);
      if(strtDt >= endDt) {
        return 1;
      }  else {
        return -1;
      }
    })
    console.log(result);
    return result;
  }
}
