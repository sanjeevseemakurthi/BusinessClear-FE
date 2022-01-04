import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() filterlist = [];
  @Input() Buttonstyles = '';
  @Input() headerstyles = '';
  @Input() titleheader = '';
  @Output() selecteddata : EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  elementclicked(data,index) {
    this.filterlist[index].isSelected = ! this.filterlist[index].isSelected
    this.selecteddata.emit({data: this.filterlist, latestindex:index});
  }

}
