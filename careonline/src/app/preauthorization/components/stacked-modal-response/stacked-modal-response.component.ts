import { Component, OnInit, Inject, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../../preauthorization/models/preauth-dialog-data.model';
import { PreAuthFormService } from '../../../preauthorization/services/pre-auth-form.service';
import { PreAuthService } from '../../../preauthorization/services/pre-auth.service';
import { SnackbarToasterService } from '../../../preauthorization/services/snackbar-toaster.service';
import { PreAuthReadResponse } from '../../../preauthorization/models/read-pre-auth.model';
import { PreAuthFormModelResponse } from '../../../preauthorization/models/pre-auth-form.model';

@Component({
  selector: 'app-stacked-modal-response',
  templateUrl: './stacked-modal-response.component.html',
  styleUrls: ['./stacked-modal-response.component.css']
})
export class StackedModalResponseComponent implements OnInit {

  headingReceived = this.data.heading;
  messageContentReceived = this.data.messageContent;
  formDataReceived = this.data.selectedPatientData;
  actionType = this.data.actionType;

  isLoadingResults = false;
  responseDatReceived;

  constructor(
    public preAuthFormService: PreAuthFormService,
    public snackbarToasterService: SnackbarToasterService,
    public dialogRef: MatDialogRef<StackedModalResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public preAuthService: PreAuthService,
  ) { }

  ngOnInit() {

  }

  closePopup(isTrue) {
    if (isTrue) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
    // this.preAuthService.filter('Refresh Initiated');
  }

  onConfirmClick() {

    setTimeout(() => {
      console.log('Data received from pre-auth response component start');
      console.log(this.formDataReceived);
      console.log('Data received from pre-auth response component end');
      const formDataSent = { ...this.formDataReceived };
      console.log('Data received from pre-auth response component copied in a variable start');
      console.log(formDataSent);
      console.log('Data received from pre-auth response component copied in a variable end');
      this.isLoadingResults = true;
      if (this.actionType === 'saveRequest') {
        this.preAuthService.saveManualResponsePatientData(formDataSent).subscribe((response) => {
          if (response) {
            console.log('Response Data received for manual save');
            console.log(response);
            this.responseDatReceived = { ...response };
            // this.eligibilityCheckService.dataFromEligibilityCheck = { ...response };
            console.log(this.responseDatReceived);
            console.log('Data received as Preautorization manual save response , stored start');
            console.log(this.responseDatReceived);
            console.log('Data received as Preautorization manual save response stored end');
          }
          if (response.ackn) {
            // this.patientFormService.getEligibilityData();
            this.snackbarToasterService.success(':: Successfully Saved');
            this.isLoadingResults = false;
            this.closePopup(true);
          }
        }, (error) => {
          this.snackbarToasterService.warn(':: Sent request failed!');
          this.closePopup(true);
        });
      } else if (this.actionType === 'onXicon' || this.actionType === 'onCloseBtn') {
        this.closePopup(true);
      }

    });

  }


}
