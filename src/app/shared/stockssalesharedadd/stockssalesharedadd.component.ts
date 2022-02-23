import { formatDate } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {cloneDeep as loadashclonedeep} from 'lodash';
import { MessageService } from 'src/app/message.service';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-stockssalesharedadd',
  templateUrl: './stockssalesharedadd.component.html',
  styleUrls: ['./stockssalesharedadd.component.scss']
})
export class StockssalesharedaddComponent implements OnInit {

  @Input() pid = '';
  @Input() spaceneed = true;
  @Input() lentadd = false;
  @Output() newItemEvent = new EventEmitter<any>();
  subproperties: any;
  settingobject: any;
  leftamount = 0 ;
  lentcheck = false;
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
  subproperty: any;
  constructor(private sharedservices:SharedService,private messageservice:MessageService) { }

  ngOnInit(): void {
    this.addstockdata.initialdate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.addstockdatanotchange.initialdate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
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
    this.subproperties.forEach(element => {
      if(String(element.id) === data)
      this.subproperty = element.name;
    });
  }
  submit(){


    this.sharedservices.addstocks(this.addstockdata).subscribe(res=> {
      if(this.lentcheck) {
        let payload = {
          "item": this.subproperty,
          "amount":this.leftamount ,
          "qty": this.addstockdata.qty,
          "date":this.addstockdata.initialdate,
          "fromperson":this.addstockdata.stockflag,
          "sid":res["id"],
          "pid":this.pid,
          "isactive": true,
          "deposits":[],
          "giveextra":[]
        };
        this.messageservice.showMessage("Stocks added sucessfully","sucess",1000);
        this.sharedservices.addlenttoexistingpeople(payload).subscribe(re=>{
          this.messageservice.showMessage("Lent added sucessfully","sucess",1000);
          console.log("added to lent");
        });
      }
          this.subproperty = '';
          this.leftamount = 0;
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