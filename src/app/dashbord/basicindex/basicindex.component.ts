import { Component, OnInit } from '@angular/core';
import { LogindailogComponent } from 'src/app/shared/logindailog/logindailog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-basicindex',
  templateUrl: './basicindex.component.html',
  styleUrls: ['./basicindex.component.scss']
})
export class BasicindexComponent implements OnInit {

  constructor(public dailog:MatDialog) { }

  ngOnInit(): void {
  }
  loginpopup() {
    const dialogRef = this.dailog.open(LogindailogComponent);
    dialogRef.afterClosed().subscribe(result => {
      });
    }

}
