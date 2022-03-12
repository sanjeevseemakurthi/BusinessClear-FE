import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedService } from '../shared.service'
import {cloneDeep as loadashclonedeep} from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { PersonaddComponent } from '../personadd/personadd.component';
@Component({
  selector: 'app-persondetailsshared',
  templateUrl: './persondetails.component.html',
  styleUrls: ['./persondetails.component.scss']
})
export class PersondetailsComponent implements OnInit {
  dataSource: any;
  filter = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  persons_data: any;
  typeofmodule: any;
  constructor(private sharedService:SharedService, public router:Router,public activeroute:ActivatedRoute,public dialogref: MatDialog) { }
  displayedColumns = ['accno','name','fatherorhusbandname','village',]
  ngOnInit(): void {
    this.activeroute.queryParamMap.subscribe(res=>{
      this.typeofmodule = res['params'].typeofmodule;
    })
    this.populatepeopledata();
  }
  populatepeopledata() {
    this.sharedService.getperson().subscribe(res => {
      this.dataSource =  new MatTableDataSource(res['persons']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } , err => {});
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
    this.router.navigate(['businesslogic/'+this.typeofmodule+'/persondetails'],{queryParams:{pid:row.id}})
  }
  addnewperson(){
    this.router.navigate(['businesslogic/newperson'],{queryParams:{typeofmodule:this.typeofmodule}});
  }
  openDialog() {
    const adata = this.dialogref.open(PersonaddComponent,{
      width:'500px',
    });
    adata.afterClosed().subscribe(res=>{
      if(res) {
        console.log("data");
      }
    })
  }
}
