import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  popupshow;
  constructor() { }

  ngOnInit() {
  }
  optionselected(data?){
    if(data){
      this.selectedrow = data;
      console.log(data,this.selected);
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
}
