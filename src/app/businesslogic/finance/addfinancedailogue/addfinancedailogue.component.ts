import { Component, OnInit } from '@angular/core';
import { BusinesslogicService } from '../../businesslogic.service';
import {cloneDeep as loadashclonedeep} from 'lodash';
@Component({
  selector: 'app-addfinancedailogue',
  templateUrl: './addfinancedailogue.component.html',
  styleUrls: ['./addfinancedailogue.component.scss']
})
export class AddfinancedailogueComponent implements OnInit {
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
