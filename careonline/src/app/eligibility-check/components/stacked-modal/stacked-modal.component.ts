import { Component, OnInit, Inject, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PatientFormDataRequest, ResponseReceivedForm } from '../../models/patient-data.model';
import { DialogData } from '../../models/patient-form-dialog-data.model';
import { EligibilityCheckService } from '../../../eligibility-check/services/eligibility-check.service';
import { PatientFormService } from '../../../eligibility-check/services/patient-form.service';
// import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-stacked-modal',
  templateUrl: './stacked-modal.component.html',
  styleUrls: ['./stacked-modal.component.css']
})
export class StackedModalComponent implements OnInit {

  headingReceived = this.data.heading;
  formDataReceived = this.data.selectedPatientData;

  isLoadingResults = false;
  isRateLimitReached = false;
  responseDatReceived: ResponseReceivedForm;

  constructor(
    public patientFormService: PatientFormService,
    // public toasterService: SnackbarService,
    public dialogRef: MatDialogRef<StackedModalComponent>, // for getting the ref of the dialog
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public eligibilityCheckService: EligibilityCheckService,
  ) { }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick() {
    setTimeout(() => {
      console.log('Data received from patientcomponent start');
      console.log(this.formDataReceived);
      console.log('Data received from patientcomponent end');
      const formDataSent = { ...this.formDataReceived };
      console.log('Data received from patientcomponent copied in a variable start');
      console.log(formDataSent);
      console.log('Data received from patientcomponent copied in a variable end');
      this.isLoadingResults = true;
      this.eligibilityCheckService.postPatientData(formDataSent).subscribe((response) => {
        if (response) {
          console.log('Response Data received for Eligibility check');
          console.log(response);
          this.responseDatReceived = { ...response };
          this.eligibilityCheckService.dataFromEligibilityCheck = { ...response };
          console.log(this.responseDatReceived);
          console.log('Data received as Eligibility check response , stored start');
          console.log(this.responseDatReceived);
          console.log('Data received as Eligibility check response stored end');
        }
        if (response.ackn) {
          // this.patientFormService.getEligibilityData();
          // this.toasterService.success(':: Submitted Successfully');
          this.isLoadingResults = false;
          this.onNoClick();
        }
      }, (error) => {
        // this.toasterService.warn(':: Sent request failed!');
        this.onNoClick();
      });
    });
  }


}
