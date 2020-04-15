import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  constructor(public snackbarToaster: MatSnackBar) { }

  success(toasterMessage) {
    // this.config['panelClass'] = ['notification', 'success'];
    this.config.panelClass = ['notification', 'success'];
    // 2nd parameter is action but we need not to do any action
    this.snackbarToaster.open(toasterMessage, '', this.config);
  }


}
