import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {cloneDeep as loadashclonedeep} from 'lodash';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-stockssalesharedadd',
  templateUrl: './stockssalesharedadd.component.html',
  styleUrls: ['./stockssalesharedadd.component.scss']
})
export class StockssalesharedaddComponent implements OnInit {

  @Input() pid = '';
  @Input() spaceneed = true;
  @Output() newItemEvent = new EventEmitter<any>();
  subproperties: any;
  settingobject: any;
  properties: string[];
  addingtitle = '';
  addstockflag = false;
  addstockdatanotchange = {
    'initialdate':'',
    'amount':0,
    'qty':0,
    'settingsid':null,
    'stockflag':null
  }
  addstockdata= {
    'initialdate':'',
    'amount':0,
    'qty':0,
    'settingsid':null,
    'stockflag':null
  }
  settings_data: any;
  constructor(private sharedservices:SharedService) { }

  ngOnInit(): void {
    this.populatesettingsdata()
    this.addstockdata['pid'] = this.pid
  }
  addstock() {
    this.addstockflag = true;
    this.addstockdata.stockflag = true;
    this.addingtitle = "Adding Stocks";
  }
  addsales() {
    this.addstockflag = true;
    this.addstockdata.stockflag = false;
    this.addingtitle = "Adding Sales";
  }
  populatesettingsdata() {
    this.sharedservices.getsettingdata().subscribe(res => {
      this.settings_data = loadashclonedeep(res);
      this.properties = Object.keys(this.settings_data);
      this.assignsubproperties(this.properties[0])
    } , err => {});
  }
  assignsubproperties(data){
    this.subproperties = this.settings_data[data];
    this.addstockdata.settingsid = data;
    this.addstockdata.settingsid = -1;
  }
  subpropertychange(data) {
    this.addstockdata.settingsid = data;
  }
  submit(){
    this.sharedservices.addstocks(this.addstockdata).subscribe(res=> {
          this.addstockdata = loadashclonedeep(this.addstockdatanotchange);
          this.addstockflag =  false;
          this.newItemEvent.next(true);
          this.addingtitle = "";
        });
  }
  changeflag(){
    this.addstockdata = loadashclonedeep(this.addstockdatanotchange);
    this.addstockflag = false;
  }
}
