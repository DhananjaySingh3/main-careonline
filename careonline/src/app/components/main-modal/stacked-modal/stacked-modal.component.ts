import { Component, OnInit, Inject, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatToolbar } from '@angular/material/toolbar';
import { FormGroup } from '@angular/forms';
import { Form, ResponseReceivedForm } from 'src/app/class-modals/form';
import { PatientService } from 'src/app/services/patient.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { EligibilityCheckService } from 'src/app/services/eligibility-check.service';


export interface DialogData {
  heading: string;
  form: Form;
}

@Component({
  selector: 'app-stacked-modal',
  templateUrl: './stacked-modal.component.html',
  styleUrls: ['./stacked-modal.component.css']
})
export class StackedModalComponent implements OnInit {

  // form: FormGroup;
  // formDataSent = this.data.form;

  // instead of this we can directly use  {{data.heading}} in template
  headingReceived = this.data.heading;
  formDataReceived = this.data.form;

  isLoadingResults = false;
  isRateLimitReached = false;


  responseDatReceived: ResponseReceivedForm;

  /*
    formDataSent: any = {
      mrnNumber: this.formDataReceived?.mrnNumber,
      firstName: this.formDataReceived?.firstName,
      lastName: this.formDataReceived?.lastName,
      middleName: this.formDataReceived?.middleName,
      suffix: this.formDataReceived?.suffix,
      gender: this.formDataReceived?.gender,
      dob: this.formDataReceived?.dob
    };
    */

  constructor(
    public patientFormService: PatientService,
    public toasterService: SnackbarService,
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
      this.patientFormService.postFormData(formDataSent).subscribe((response) => {
        if (response) {
          console.log('Response Data received for Eligibility check');
          console.log(response);
          this.responseDatReceived = {...response};
          this.eligibilityCheckService.dataFromEligibilityCheck = {...response};
          console.log(this.responseDatReceived);
          console.log('Data received as Eligibility check response , stored start');
          console.log(this.responseDatReceived);
          console.log('Data received as Eligibility check response stored end');
        }
        if (response.Ackn) {
          this.toasterService.success(':: Submitted Successfully');
          this.isLoadingResults = false;
          this.onNoClick();
        }
      }, (error) => {
        this.toasterService.warn(':: Sent request failed!');
        this.onNoClick();
      });
    });
  }


}
