import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-stocks-dailog',
  templateUrl: './edit-stocks-dailog.component.html',
  styleUrls: ['./edit-stocks-dailog.component.scss']
})
export class EditStocksDailogComponent implements OnInit {
  displaydata = {
    "id": null,
    "initialdate": null,
    "settingsid": null,
    "name": null,
    "qty": null,
    "amount": null,
    "stockflag": null,
    "phno": null,
    "finaldate": null,
    "amountcleared": null,
    "userid": null,
    "deposits": null,
    "daylatest": null,
    "leftqty": null,
    "leftamount": null,
    "daysales": null,
    "daystocks": null,
    "daysalesamount": null,
    "daystockamount": null,
    "property": null,
    "subproperty": null
};
  constructor(@Inject(MAT_DIALOG_DATA) private dailogdata,dialogRef: MatDialogRef<EditStocksDailogComponent>)
   {
    dialogRef.disableClose = true;
    this.displaydata = this.dailogdata;
    }

  ngOnInit(): void {
  }
}
