import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-aleartdailogbox',
  templateUrl: './aleartdailogbox.component.html',
  styleUrls: ['./aleartdailogbox.component.scss']
})
export class AleartdailogboxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { 
   
  }

  ngOnInit(): void {
  }

}
