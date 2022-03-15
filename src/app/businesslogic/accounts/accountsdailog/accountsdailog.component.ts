import { Component, OnInit } from '@angular/core';
import {cloneDeep as loadashclonedeep} from 'lodash';
import { BusinesslogicService } from '../../businesslogic.service';
@Component({
  selector: 'app-accountsdailog',
  templateUrl: './accountsdailog.component.html',
  styleUrls: ['./accountsdailog.component.scss']
})
export class AccountsdailogComponent implements OnInit {

  selectedpid = 'none';
  constructor(private businesslogicService:BusinesslogicService) { }
  persondata = []
  ngOnInit(): void {
    
    this.populatepersondata();
  }
  populatepersondata(){
    this.businesslogicService.getperson().subscribe(res=> {
      this.persondata = loadashclonedeep(res["persons"]);
      console.log(this.persondata);
    })
  }
  optionselected(data){
    if(data === 'none') {
      this.selectedpid = 'none'
    } else {
      this.selectedpid = data.id;
    }
  }
}
