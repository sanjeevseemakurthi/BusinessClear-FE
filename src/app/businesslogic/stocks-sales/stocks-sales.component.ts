import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { BusinesslogicService } from '../businesslogic.service';
import { EditStocksDailogComponent } from './edit-stocks-dailog/edit-stocks-dailog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {cloneDeep as loadashclonedeep} from 'lodash';
import {AleartdailogboxComponent} from '../../shared/aleartdailogbox/aleartdailogbox.component';
import { FileuploadComponent } from 'src/app/shared/fileupload/fileupload.component'; 
import { Router } from '@angular/router';
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
  subproperties: any;
  settingobject: any;
  properties: string[];
  constructor(private matdailog:MatDialog,private businesslogicService:BusinesslogicService,
    private Dailog:MatDialog,private router:Router) { }
  settings_data = {};
  displayedColumns = ['id','initialdate','daylatest','amount','qty','leftamount','leftqty','daystocks','daystockamount','daysales','daysalesamount','action' ]
  settingsalldata = [];
  settingsidmapping = {};
  personid = '';

  ngOnInit(): void {
    this.populateallsettingsdata();
    this.populatetabledata();
  }
  ngAfterViewInit() {
   
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
    } , err => {});
  }
  populateallsettingsdata(){
    this.businesslogicService.getSettingsall().subscribe(res => {
      this.settingsalldata = loadashclonedeep(res);
      this.settingsidmapping = {};
      this.settingsalldata.forEach(element => {
        this.settingsidmapping[element.id] = element;
      });
    } , err => {});
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
    return result;
  }
  bulkupload(){
    const dailogref = this.Dailog.open(FileuploadComponent,
      {
        data: {
          url: 'upload',
          templateurl :'download'
        },
        width: '500px'
      }
      );
    dailogref.afterClosed().subscribe(result => {
    })
  }
  pesondetails(){
    this.router.navigate(['businesslogic/person'],{queryParams:{typeofmodule:'Purchase-Sales'}});
  }
}
