import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinesslogicService } from '../../businesslogic.service';
import {cloneDeep as loadashclonedeep} from 'lodash';

@Component({
  selector: 'app-persondetails',
  templateUrl: './persondetails.component.html',
  styleUrls: ['./persondetails.component.scss']
})
export class PersondetailsComponent implements OnInit {

  constructor(public activeroute:ActivatedRoute,private businesslogicService:BusinesslogicService,) { }

  persondata:any;
  persondetailsedit = false;
  pid;
  ngOnInit(): void {
    this.activeroute.queryParamMap.subscribe(res=>{
      this.pid = res['params'].pid;
    })
    this.populatepersondetail();
  }
  editpage() {
    this.persondetailsedit = true;
  }
  populatepersondetail(){
    this.businesslogicService.getpersonfinance({pid:this.pid}).subscribe( res =>
     {
      this.persondata = loadashclonedeep(res['person'][0]);
     });
  }
  
  submitpage(){
    this.businesslogicService.updatepersondetials(this.persondata).subscribe( res =>
      {
       this.persondata = loadashclonedeep(res['person'][0]);
      });
  }
}
