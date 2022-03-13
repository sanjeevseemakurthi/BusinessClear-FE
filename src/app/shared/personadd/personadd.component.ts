import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-personadd',
  templateUrl: './personadd.component.html',
  styleUrls: ['./personadd.component.scss']
})
export class PersonaddComponent implements OnInit {
  typeofmodule: any;

  constructor(public activeroute:ActivatedRoute,private sharedservice:SharedService, public router:Router,private meassgeservice:MessageService,
    public dialogRef: MatDialogRef<PersonaddComponent>,
    @Inject(MAT_DIALOG_DATA) public datamat,
    ) { }
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
      this.activeroute.queryParamMap.subscribe(res=>{
      this.typeofmodule = res['params'].typeofmodule;
    })
  }
  changeroute(data) {
    if(data && !this.datamat) {
      this.router.navigate(['businesslogic/'+this.typeofmodule+'/persondetails'],{queryParams:{pid:data}})
    }
  }
}
