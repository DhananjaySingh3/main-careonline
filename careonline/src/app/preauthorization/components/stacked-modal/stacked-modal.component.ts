import { Component, OnInit, Inject, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../../preauthorization/models/preauth-dialog-data.model';
import { PreAuthFormService } from '../../../preauthorization/services/pre-auth-form.service';
import { PreAuthService } from '../../../preauthorization/services/pre-auth.service';
import { SnackbarToasterService } from '../../../preauthorization/services/snackbar-toaster.service';
import { PreAuthReadResponse } from '../../../preauthorization/models/read-pre-auth.model';
import { PreAuthFormModelResponse } from '../../../preauthorization/models/pre-auth-form.model';


@Component({
  selector: 'app-stacked-modal',
  templateUrl: './stacked-modal.component.html',
  styleUrls: ['./stacked-modal.component.css']
})
export class StackedModalComponent implements OnInit {

  headingReceived = this.data.heading;
  messageContentReceived = this.data.messageContent;
  formDataReceived = this.data.selectedPatientData;
  actionType = this.data.actionType;

  isLoadingResults = false;
  responseDatReceived;

  constructor(
    public preAuthFormService: PreAuthFormService,
    public snackbarToasterService: SnackbarToasterService,
    public dialogRef: MatDialogRef<StackedModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public preAuthService: PreAuthService,
  ) { }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick() {

    setTimeout(() => {
      console.log('Data received from pre-auth form component start');
      console.log(this.formDataReceived);
      console.log('Data received from pre-auth form component end');
      const formDataSent = { ...this.formDataReceived };
      console.log('Data received from pre-auth form component copied in a variable start');
      console.log(formDataSent);
      console.log('Data received from pre-auth form component copied in a variable end');
      this.isLoadingResults = true;
      if (this.actionType === 'saveRequest') {
        this.preAuthService.saveAsDraftPatientData(formDataSent).subscribe((response) => {
          if (response) {
            console.log('Response Data received for Eligibility check');
            console.log(response);
            this.responseDatReceived = { ...response };
            // this.eligibilityCheckService.dataFromEligibilityCheck = { ...response };
            console.log(this.responseDatReceived);
            console.log('Data received as Preautorization check response , stored start');
            console.log(this.responseDatReceived);
            console.log('Data received as Preautorization check response stored end');
          }
          if (response.ackn) {
            // this.patientFormService.getEligibilityData();
            this.snackbarToasterService.success(':: Submitted Successfully');
            this.isLoadingResults = false;
            this.onNoClick();
          }
        }, (error) => {
          this.snackbarToasterService.warn(':: Sent request failed!');
          this.onNoClick();
        });
      } else if (this.actionType === 'sendRequest') {
        this.preAuthService.sendRequestPatientData(formDataSent).subscribe((response) => {
          if (response) {
            console.log('Response Data received for Eligibility check');
            console.log(response);
            this.responseDatReceived = { ...response };
            // this.eligibilityCheckService.dataFromEligibilityCheck = { ...response };
            console.log(this.responseDatReceived);
            console.log('Data received as Preautorization check response , stored start');
            console.log(this.responseDatReceived);
            console.log('Data received as Preautorization check response stored end');
          }
          if (response.ackn) {
            // this.patientFormService.getEligibilityData();
            this.snackbarToasterService.success(':: Submitted Successfully');
            this.isLoadingResults = false;
            this.onNoClick();
          }
        }, (error) => {
          this.snackbarToasterService.warn(':: Sent request failed!');
          this.onNoClick();
        });
      }

    });

  }


}
