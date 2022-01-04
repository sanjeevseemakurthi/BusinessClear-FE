import { Component, OnInit } from '@angular/core';
import { BusinesslogicService } from '../businesslogic.service';
import {cloneDeep as loadashclonedeep} from 'lodash';
import { ColDef } from 'ag-grid-community';

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
  constructor(private businesslogicService:BusinesslogicService) { }
  gridOptions = {
  
  }
  columnDefs : ColDef[];
  rowData;
  ngOnInit(): void {
    this.getstockdataforanalysis();
  }
  getstockdataforanalysis() {
    this.businesslogicService.getstocks({}).subscribe(res =>{
      this.analyticsresult = loadashclonedeep(res);
      this.columnDefs  = this.createcolumnDefs();
      this.rowData = this.createrowdata();
    });
  }
  createrowdata(){
    const rownodes = [];
    this.analyticsresult.forEach(node => {
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
    console.log(rownodes);
   return rownodes;
  }
  createcolumnDefs() {
    const nodes = [];
    if(this.analyticsresult) {
      // colum definitons
      this.analyticsresult[0].forEach((element, index) => {
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
            field: '',
            headerName:'',
            minWidth: 100,
            maxWidth: 100,
            cellStyle: {color: 'green','font-size':' 12px'},
            headerClass : ['Childclass'],
        }]  
        }
        const key = Object.keys(element)[0];
        if(['property','subproperty'].includes(key)) {
          settingsobj.children[0].field = key;
          settingsobj.children[0].headerName = key;
          nodes.push(settingsobj);
        } else {
          colobj.children[0].field = key  +' - stocks';
          colobj.children[1].field = key +' - sales';
          colobj.field = key;
          colobj.headerTooltip = key;
          colobj.headerName = colobj.headerName + (index - 2);
          nodes.push(colobj);
          this.columnnames.push(key);
        }
      });
      console.log(nodes);
    return nodes
    }
  }
}
