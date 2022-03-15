import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {cloneDeep as loadashclonedeep} from 'lodash';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  @Input() options;
  @Output() selected  =   new EventEmitter<any>();
  selectedoption = 'none';
  selectedrow = [];
  copydata = []
  popupshow;
  constructor() { }

  ngOnInit() {
    this.copydata = loadashclonedeep(this.options);
  }
  ngOnChanges(changes):void{
    this.copydata = loadashclonedeep(this.options)
  }
  optionselected(data?){
    if(data){
      this.selectedrow = data;
    } else {
      this.selectedrow = ['none'];
    }
    this.selected.emit(data);
  }
  openpopup(data) {
    this.popupshow = true;
  }
  hide(data) {
    setTimeout(() => {
      if(this.selectedrow['name']){
        this.selectedoption = this.selectedrow['name'];
      } else {
        this.selectedoption = 'none';
      }
      this.popupshow = false;
    }, 300);
  }
  filterdata(test?){
    this.options = [];
    this.copydata.forEach(element => {
      if((element.name).toLowerCase().includes(this.selectedoption.toLowerCase())){
        this.options.push(element);
      }
    });
    this.options = loadashclonedeep(this.options);
  }
}
