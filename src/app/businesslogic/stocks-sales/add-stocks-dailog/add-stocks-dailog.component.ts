import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add-stocks-dailog',
  templateUrl: './add-stocks-dailog.component.html',
  styleUrls: ['./add-stocks-dailog.component.scss']
})
export class AddStocksDailogComponent implements OnInit {
  list = ["samn","afhsgfh","samn","afhsgfh","samn","afhsgfh"]
  properties =[];
  subproperties = [];
  constructor(@Inject(MAT_DIALOG_DATA) private dailogdata,dialogRef: MatDialogRef<AddStocksDailogComponent>)
   {
    dialogRef.disableClose = true;
    this.properties = Object.keys(this.dailogdata);
    this.assignsubproperties(this.properties[0])
    }

  ngOnInit(): void {
  }
  assignsubproperties(data){
    this.subproperties = this.dailogdata[data];
  }
}
