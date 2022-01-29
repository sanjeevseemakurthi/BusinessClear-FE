import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinesslogicService } from '../../businesslogic.service';
import {cloneDeep as loadashclonedeep} from 'lodash';

@Component({
  selector: 'app-newwpersonstocks',
  templateUrl: './newwpersonstocks.component.html',
  styleUrls: ['./newwpersonstocks.component.scss']
})
export class NewwpersonstocksComponent implements OnInit {

  personid = '';
  persondata = {
    "country": "",
    "pincode": 0,
    "fatherorhusbandname": " ",
    "address2": "",
    "address1": "",
    "accno": 0,
    "name": "",
    "village": "",
    "phoneno": ""
}
showstockdetails = false;
persondetailsedit = true;
  constructor(private businesslogicService:BusinesslogicService, public router:Router) { }

  ngOnInit(): void {
  }
  submitpage(){
    this.businesslogicService.addnewpersion(this.persondata).subscribe(res => {
      this.personid = res['id'];
      this.persondata = loadashclonedeep(res);
      this.showstockdetails = true;
    });
  }
}
