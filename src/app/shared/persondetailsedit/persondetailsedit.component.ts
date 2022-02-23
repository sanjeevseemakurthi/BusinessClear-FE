import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { SharedService } from '../shared.service';
import {cloneDeep as loadashclonedeep} from 'lodash';

@Component({
  selector: 'app-persondetailsedit',
  templateUrl: './persondetailsedit.component.html',
  styleUrls: ['./persondetailsedit.component.scss']
})
export class PersondetailseditComponent implements OnInit {
  persondata: any;
  persondetailsedit = false;
  constructor(public activeroute:ActivatedRoute,private sharedservice:SharedService, public router:Router,private meassgeservice:MessageService) { }
  @Input() persondatainput:any;
  @Input() emitrequire =  false;
  @Output() submitted =  new EventEmitter<any>();
  ngOnInit(): void {
    this.populatedata();
  }
  populatedata() {
    this.persondata = this.persondatainput;
  }
  editpage() {
    this.persondetailsedit = true;
  }
    
  submitpage(){
    this.sharedservice.updatepersondetials(this.persondata).subscribe( res =>
      {
       this.persondata = loadashclonedeep(res);
       this.persondetailsedit = false;
       this.meassgeservice.showMessage("people saved","sucess",1000);
       if(this.emitrequire) {
         this.submitted.emit(res["id"]);
       }
      });
  }
}
