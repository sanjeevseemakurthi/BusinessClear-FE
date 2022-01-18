import { Component, OnInit } from '@angular/core';
import {BusinesslogicService} from '../businesslogic.service';
import {cloneDeep as loadashclonedeep} from 'lodash';
import { forkJoin } from 'rxjs';
import { element } from 'protractor';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings_data = {};
  actualstored_data ={}
  displaydata:any;
  newnumber = 0;
  deletednodes = [];
  subcriptionlist:any;
  constructor(public businesslogicservice:BusinesslogicService) { }

  ngOnInit(): void {
    this.populatedata();
  }
  addsubproperty(propert){
    this.settings_data[propert].push({'name':'',id:''})
  }
  deletesubproperty(propert,index) {
    if(this.settings_data[propert][index].id !== '') {
      let datatodelete = {
        property : propert,
        subproperty : this.settings_data[propert][index].name,
        id:this.settings_data[propert][index].id
      }
    this.deletednodes.push(datatodelete);
    }
    this.settings_data[propert].splice(index,1);
  }
  addproperty() {
    this.newnumber = this.newnumber + 1
    const datatest = 'newproperty'+'||' + this.newnumber;
    this.displaydata.push({"name":datatest,"value":''})
    this.settings_data[datatest] = [{'name':'',id:''}]
  }
  deletepropert(property,index) {
    this.displaydata.splice(index,1)
    let data = this.settings_data[property.name]; 
    data.forEach((subproperty,indexofdata) => {
      if(this.settings_data[property.name][indexofdata].id !== '') {
        let datatodelete = {
          property : property.name,
          subproperty : this.settings_data[property.name][indexofdata].name,
          id:this.settings_data[property.name][indexofdata].id
        }
      this.deletednodes.push(datatodelete);
      }
    });
    delete this.settings_data[property.name];
  }
  /*
  @author Sanjeev
  method will divide data for update and new nodes
  */
  submitdata() {
    const newNodes = [];
    const updatenodes = [];
    this.displaydata.forEach(property => {
      this.settings_data[property.name].forEach(subpropert => { 
        const data = {
          property : property.value,
          subproperty: subpropert.name,
          id : subpropert.id
        }
        if(data.id === '') {
          newNodes.push(data)
        } else {
          let flag = true;
          if(this.actualstored_data[data.property]){
            let res = this.actualstored_data[data.property].findIndex(element =>{
              if(element.name === data.subproperty && element.id === data.id) {
                return true
              }
            })
            if(res !== -1){
              flag = false;
            }
          } 
          if(flag) {
            updatenodes.push(data);
          }
        }
      });
    });
    let payloads =[];
   if(newNodes.length !== 0) {
    payloads.push( this.businesslogicservice.addsettings(newNodes));
   }
   if(updatenodes.length !== 0) {
    payloads.push( this.businesslogicservice.updatesettings(updatenodes));
   }
   if(this.deletednodes.length !==0){
    payloads.push( this.businesslogicservice.deletesettings(this.deletednodes));
   }
   forkJoin(payloads).subscribe(res => {
     this.deletednodes = [];
    this.populatedata();
   })
  }
  populatedata() {
    this.businesslogicservice.getsettingdata().subscribe(res => {
      this.settings_data = loadashclonedeep(res);
      this.actualstored_data = loadashclonedeep(res)
      this.displaydata = Object.keys(this.settings_data).map(data=>{
        return {"name":data,"value":data}
      });
    } , err => { });
  }
  reset() {
    this.populatedata();
  }
}
