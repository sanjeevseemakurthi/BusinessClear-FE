import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinesslogicService } from '../../businesslogic.service';

@Component({
  selector: 'app-newpersonlent',
  templateUrl: './newpersonlent.component.html',
  styleUrls: ['./newpersonlent.component.scss']
})
export class NewpersonlentComponent implements OnInit {

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
lentdata = {
  "item": "",
  "amount": 0,
  "sno": 0,
  "qty": 0,
  "date":'',
  "isactive": true,
}
persondetailsedit = true;
  constructor(private businesslogicService:BusinesslogicService, public router:Router) { }

  ngOnInit(): void {
  }
  submitpage(){
    let payload = {
      peopledata: this.persondata,
      lentedata:this.lentdata
    }
    this.businesslogicService.addnewpersonlent(payload).subscribe(res => {});
  }

}
