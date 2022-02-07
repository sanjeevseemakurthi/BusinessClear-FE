import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackbar:MatSnackBar) { }
  showMessage(msg: string,msgtye = 'warning',duration) {
    this.snackbar.open(msg,null,{
      duration:duration,
      horizontalPosition:'right',
      verticalPosition:'top',
      panelClass:msgtye
    })
  }
}
