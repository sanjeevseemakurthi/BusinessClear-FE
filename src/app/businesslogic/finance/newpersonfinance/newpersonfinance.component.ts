import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinesslogicService } from '../../businesslogic.service';

@Component({
  selector: 'app-newpersonfinance',
  templateUrl: './newpersonfinance.component.html',
  styleUrls: ['./newpersonfinance.component.scss']
})
export class NewpersonfinanceComponent implements OnInit {

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
financedata = {
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
      financedata:this.financedata
    }
    this.businesslogicService.addnewpersonfin(payload).subscribe(res => {});
  }

}
