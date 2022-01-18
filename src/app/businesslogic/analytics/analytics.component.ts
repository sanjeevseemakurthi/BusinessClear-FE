import { Component, OnInit } from '@angular/core';
import { BusinesslogicService } from '../businesslogic.service';
import {cloneDeep as loadashclonedeep} from 'lodash';
import { ColDef } from 'ag-grid-community';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { forkJoin } from 'rxjs';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  analyticsresult: any;
  coldefcreted:any;
  rowdatacreted:any;
  rowHeight = 50;
  columnnames = [];
  graphdata = [];
  settingsdata = {};
  propertfilter = [];
  subpropertfilter = [];
  afterfiltered = [];
  afterrowdatafiltered = [];
  stockcolumns = [];
  salescolumns = [];
  startdate;
  noofrows = 10;
  seledctedinterval = 1;
  seledctedintervalfromdropdown = "1";
  graphselected = true;
  chartsizes = {
    width : 1100,
    height : 300
  };
  chartsizesreduce = {
    width : 550,
    height : 300
  };
  reduce
  isChecked = "true";
  stocksandsales = [
    {
      name:'Stocks',
      isSelected : true,
      isdisabled : false,
    },
    {
      name:'Sales',
      isSelected : true,
      isdisabled : false,
    }
  ];
  gridapi: any;
  amountdata: any;
  qtydata: any;
  
  constructor(private businesslogicService:BusinesslogicService,  breakpointObserver: BreakpointObserver,) {

    breakpointObserver
    .observe([Breakpoints.Large])
    .pipe()
    .subscribe((result) => {
    
    });
    this.startdate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
   }
  gridOptions = {
  
  }
  columnDefs : ColDef[];
  rowData;
  ngOnInit(): void {
   
    this.getsettingdata();
    // this.testclick();
    this.apicallsfordata();
  }
  apicallsfordata() {
    let apidata = [];
    apidata.push(this.businesslogicService.getstocksbyamount({}));
    apidata.push(this.businesslogicService.getstocksbyqty({}));
    forkJoin(apidata).subscribe(res => {
      this.columnDefs  = this.createcolumnDefs(res[0]);
      this.amountdata  = loadashclonedeep(this.createrowdata(res[0]));
      this.qtydata = loadashclonedeep(this.createrowdata(res[1]));
      this.testclick();
    });
    
  }
  getsettingdata() {
    this.businesslogicService.getsettingdata().subscribe(res =>{
      this.settingsdata = loadashclonedeep(res);
      this.formfilterdata();
    });
  }
  createrowdata(data){
    const rownodes = [];
    data.forEach(node => {
      const subdata = {}
        node.forEach(element => {
          const key = Object.keys(element)[0];
            if(['property','subproperty'].includes(key)){
              subdata[key] = element[key][0];
            } else {
              subdata[key +' - stocks'] = element[key][0][0];
              subdata[key +' - sales'] = element[key][0][1];
            }
          });
          rownodes.push(subdata);
      });
   return rownodes;
  }
  formfilterdata(){
   
    let properties = Object.keys(this.settingsdata);
    properties.forEach(element => {
      this.settingsdata[element].forEach(node => {
        let subpropertynode = {
          name:'',
          isSelected : true,
          isdisabled : false,
          property:element
        }
        subpropertynode.name = node.name;
        this.subpropertfilter.push(subpropertynode);
      });
      let propertynode = {
        name:'',
        isSelected : true,
        isdisabled : false,
      }
      propertynode.name = element;
      this.propertfilter.push(propertynode);
    });
    this.afterfiltered = loadashclonedeep(this.subpropertfilter);
  }
  createcolumnDefs(data) {
    const nodes = [];
    if(data) {
      // colum definitons
      data[0].forEach((element, index) => {
        const colobj = {
          field:'',
          marryChildren : true,
          headerTooltip :'',
          width:140,
          headerName:'CW-',
          headerClass : ['Headerclass'],
          children:[
            {
              field: '',
              headerName:'Stocks',
              minWidth: 70,
              maxWidth: 70,
              cellStyle: {color: 'red',  'font-size':' 15px !important','border-left': '1px solid black'},
              headerClass : ['Childclass'],
            },
            {
              field: '',
              headerName:'Sales',
              minWidth: 70,
              maxWidth: 70,
              cellStyle: {color: 'green','font-size':' 15px !important'},
              headerClass : ['Childclass'],
            },
          ]
        }
        const settingsobj = {
          field:'',
          marryChildren : true,
          headerTooltip :'',
          width:130,
          headerName:'',
          headerClass : ['Headerclass'],
          children:
          [
            {
            pinned: 'left',
            field: 'property',
            headerName:'property',
            minWidth: 100,
            maxWidth: 100,
            cellStyle: {color: 'green','font-size':' 12px'},
            headerClass : ['Childclass'],
          },
          {
          pinned: 'left',
          field: 'subproperty',
          headerName:'subproperty',
          minWidth: 100,
          maxWidth: 100,
          cellStyle: {color: 'green','font-size':' 12px'},
          headerClass : ['Childclass'],
      }]  
        }
      
        const key = Object.keys(element)[0];
        if(['property','subproperty'].includes(key)) {
          if('property' === key) {
            nodes.push(settingsobj);
          }
        } else {
          colobj.children[0].field = key  +' - stocks';
          colobj.children[1].field = key +' - sales';
          colobj.field = key;
          colobj.headerTooltip = key;
          colobj.headerName = colobj.headerName + (index - 2);
          nodes.push(colobj);
          this.columnnames.push(key);
          this.stockcolumns.push(colobj.children[0].field);
          this.salescolumns.push(colobj.children[1].field);
        }
      });
    return nodes
    }
  }
  onGridReady(params) {
    this.gridapi = params;
  }
  stocksandsaleschange(event) {
    this.stocksandsales = loadashclonedeep(event.data);
    let hidecolumns = [];
    let showecolumns = [];
    if(event.data[0].isSelected) {
      showecolumns = loadashclonedeep(this.stockcolumns)
    } else {
      hidecolumns = loadashclonedeep(this.stockcolumns)
    }
    if(event.data[1].isSelected) {
      if(showecolumns.length === 0 ) {
        showecolumns = loadashclonedeep(this.salescolumns)
      } else {
        showecolumns = [...this.stockcolumns,...this.salescolumns]
      }
    } else {
      if(hidecolumns.length === 0 ) {
        hidecolumns = loadashclonedeep(this.salescolumns)
      } else {
        hidecolumns = [...this.stockcolumns,...this.salescolumns]
      }
    }
    this.gridapi.columnApi.setColumnsVisible(showecolumns,true);
    this.gridapi.columnApi.setColumnsVisible(hidecolumns,false);
    this.gridapi.columnApi.autoSizeAllColumns();
  }
  subpropertiesfiltered(event) {
    const propertiesselected = [];
    event.data.forEach(element => {
      if(element.isSelected) {
        propertiesselected.push(element.name);
      }
    });
    this.filteronly(propertiesselected);
  }
  propertiesfiltered(event){
    const latestproperty = event.data[event.latestindex].name;
    if(event.data[event.latestindex].isSelected) {
      const newdata = loadashclonedeep(this.subpropertfilter.filter(node=> {
        if(node.property === latestproperty) {
          return true;
        } else {
          return false;
        }
      }));
      this.afterfiltered.push(...newdata);
    } else {
      this.afterfiltered = this.afterfiltered.filter(node=> {
        if(node.property !== latestproperty) {
          return true;
        } else {
          return false;
        }
      })
    }
    this.subpropertiesfiltered({data:this.afterfiltered});
  }
  filteronly(subproperties){
    this.afterrowdatafiltered = loadashclonedeep(this.rowData.filter(node => {
        if(subproperties.includes(node.subproperty)) {
          return true;
        } else { 
          return false
        }}
      ));
  }
  testclick(){
    if(this.isChecked) {
      this.rowData = loadashclonedeep(this.amountdata);
    } else {
      this.rowData = loadashclonedeep(this.qtydata);
    }
    this.subpropertiesfiltered({data:this.afterfiltered});
    this.stocksandsaleschange({data:this.stocksandsales});
  }
  changegraph(){
    this.graphselected = !this.graphselected;
  }
  dropdownchange(){
    this.seledctedinterval = parseInt(this.seledctedintervalfromdropdown,10)
  }
}
