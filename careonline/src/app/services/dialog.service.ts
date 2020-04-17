import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StackedModalComponent } from '../components/main-modal/stacked-modal/stacked-modal.component';
import { SnackbarService } from '../services/snackbar.service';

export interface DialogData {
  formDataReceived: any;
  // mainHeading: string;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public matDialog: MatDialog,
    public matDialogConfig: MatDialogConfig,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<StackedModalComponent>,
  ) { }

  OpenConfirmDialog(patientData: any) {
    const config = new MatDialogConfig();

    config.disableClose = true; // does not allow to close popup on clicking ESC or outside popup
    config.autoFocus = false; // does not allow popup to focus on any field or icon
    config.hasBackdrop = true;
    config.width = '40%';
    // config.position = {top: '10px'};
    config.data = {
      selectedPatientData: patientData,
      heading: 'Verify Eligibility'
    };

    this.dialogRef = this.matDialog.open(StackedModalComponent, config);
    // Return will give us true or false in parent component i.e PatientComponent
    // based on close or confirm selected in dialog component i.e StackedComponent
    return this.dialogRef;
  }
}
