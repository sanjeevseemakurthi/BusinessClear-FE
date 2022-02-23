import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinesslogicService } from '../../businesslogic.service';

@Component({
  selector: 'app-newpersonaccount',
  templateUrl: './newpersonaccount.component.html',
  styleUrls: ['./newpersonaccount.component.scss']
})
export class NewpersonaccountComponent implements OnInit {
  date: string;
  addpersonurls = 'Accounts/person';
  persondetailsedit = true;
  constructor(private businesslogicService:BusinesslogicService, public router:Router) { }
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
  ngOnInit(): void {
    this.date =formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }
  submitpage(){
    let payload = {
      peopledata: this.persondata,
    }
    this.businesslogicService.addnewperson(payload).subscribe(res => {
      if(res["result"] == "sucess") {
        this.router.navigate(['businesslogic/'+this.addpersonurls],{queryParams:{pid:res["id"]}});
      }
    });
  }
}
