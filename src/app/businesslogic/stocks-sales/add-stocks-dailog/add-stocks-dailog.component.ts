import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-stocks-dailog',
  templateUrl: './add-stocks-dailog.component.html',
  styleUrls: ['./add-stocks-dailog.component.scss']
})
export class AddStocksDailogComponent implements OnInit {
  data = "sanju"
  list = ["samn","afhsgfh"]
  constructor(@Inject(MAT_DIALOG_DATA) private dailogdata,dialogRef: MatDialogRef<AddStocksDailogComponent>)
   {
    dialogRef.disableClose = true;
    }

  ngOnInit(): void {
  }
  auth(){}
}
