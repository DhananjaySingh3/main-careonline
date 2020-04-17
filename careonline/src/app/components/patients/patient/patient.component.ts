import { Component, OnInit, Inject, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { PatientService } from '../../../services/patient.service';
import { GenderService } from '../../../services/gender.service';
import { DialogService } from '../../../services/dialog.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { StackedModalComponent } from '../../main-modal/stacked-modal/stacked-modal.component';
import { Form, ResponseReceivedForm } from 'src/app/class-modals/form';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface Gender {
  name: string;
}

interface Suffix {
  name: string;
  id: number;
}

interface Relation {
  name: string;
  id: number;
}

interface State {
  name: string;
  id: number;
}

interface City {
  name: string;
  id: number;
}

interface Sex {
  name: string;
  id: number;
}

interface Payment {
  name: string;
  id: number;
}

interface Plans {
  name: string;
  id: number;
}

export interface DialogData {
  heading: string;
  form: Form;
}


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  // events: string[] = [];
  mrnNumber: string;
  isLoadingResults = false;
  postRequestRespObj: ResponseReceivedForm;

  headingReceivedViaDialog = this.data.heading;
  selectedPatientDataReceivedViaDialog = { ...this.data.form };

  constructor(
    public patientFormService: PatientService,
    public genderService: GenderService,
    public toasterService: SnackbarService,
    public dialogService: DialogService,
    public dialog: MatDialog,
    // private elementRef: ElementRef,
    public dialogRef: MatDialogRef<PatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }


  sex: Sex[] = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'Others' }
  ];

  suffixes: Suffix[] = [
    { id: 1, name: 'Mr' },
    { id: 2, name: 'Mrs' },
    { id: 3, name: 'Dr' }
  ];

  relations: Relation[] = [
    { id: 1, name: 'Mother' },
    { id: 2, name: 'Father' },
    { id: 3, name: 'Sibling' },
    { id: 4, name: 'Brother' },
    { id: 5, name: 'Sister' },
    { id: 6, name: 'Self' },
  ];

  states: State[] = [
    { id: 1, name: 'New York' },
    { id: 2, name: 'MO' },
    { id: 3, name: 'Minnesota' }
  ];

  cities: City[] = [
    { id: 1, name: 'New York' },
    { id: 2, name: 'KANSAS CITY' },
    { id: 3, name: 'Young America' },
    { id: 4, name: 'Amboy' }
  ];

  payments: Payment[] = [
    { id: 1, name: 'Cash' },
    { id: 2, name: 'card' },
    { id: 3, name: 'Insurance' },
    { id: 4, name: 'Others' }
  ];

  insurancePlans: Plans[] = [
    { id: 1, name: 'Primary' },
    { id: 2, name: 'Secondary' },
    { id: 3, name: 'Medicare' },
    { id: 4, name: 'Medicaid' },
    { id: 5, name: 'Company Insurance' },
    { id: 6, name: 'Others' }
  ];

  genders: Gender[] = [
    { name: 'Male' },
    { name: 'female' },
    { name: 'others' }
  ];



  // genders: Gender[] = [];
  // getGender() {
  //   this.genders = this.genderService.genderListArray;
  // }

  // addEvent(event: MatDatepickerInputEvent<Date>) {
  //   return this.patientFormService.form.get('dob').patchValue(this.getDateOfBirth(event.value));
  // }

  // getDateOfBirth(dob: any) {
  //   let birthDate;
  //   return birthDate = new Date(dob);
  // }

  getDOB() {
    return this.patientFormService.form.get('dob').value;
  }

  ngOnInit() {
    this.patientFormService.getFormData();
    // this.getDOB();
  }

  // onSubmit(form: NgForm) {
  //   console.log(form.value);
  //   // this.openDialog(form.value);
  // }

  onClear() {
    this.patientFormService.form.reset();
    this.patientFormService.clearFormData();
  }

  // addEvent(event: MatDatepickerInputEvent<Date>) {
  //   this.form.get('age').patchValue(this.getAgeFromDateOfBirth(event.value));
  // }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }


  onSubmit() {
    if (this.patientFormService.form.valid) {
      if (!this.patientFormService.form.get('$key').value) {
        this.patientFormService.insertOrCreatePatient(this.patientFormService.form.value);
      } else {
        // this.toasterService.success(':: Submitted Successfully');
        this.patientFormService.updatePatient(this.patientFormService.form.value);
        this.patientFormService.form.reset();
        this.patientFormService.clearFormData(); // initializeFormGroup() = clearFormData()
        this.toasterService.success(':: Submitted Successfully');
        this.onClose();
      }
    }
  }

  onEligibilityCheck() {
    console.log('Data Received From Patient List: Start');
    console.log(this.selectedPatientDataReceivedViaDialog);
    console.log('Data Received From Patient List: Ends');
    // this.patientFormService.dataForEligibilityCheck(this.patientFormService.form.value);
    setTimeout(() => {
      const config = new MatDialogConfig();
      config.disableClose = true; // does not allow to close popup on clicking ESC or outside popup
      config.autoFocus = false; // does not allow popup to focus on any field or icon
      config.hasBackdrop = true;
      config.width = '40%';
      config.data = { heading: 'Verify Eligibility', form: this.selectedPatientDataReceivedViaDialog };
      const dialogRef = this.dialog.open(StackedModalComponent, config);
      // dialogRef.afterOpened().subscribe(result => {
      //   console.log('Dialog Opend:' + result);
      // });
      dialogRef.afterClosed().subscribe(result => {
        console.log('Stacked Dialog Closed: true / false will come ' + result);
        // this.toasterService.success(':: Submitted Successfully');
        if (result) {
          console.log('Confirm is clicked: ' + result);
        }

      });
    });
  }


  /*
    onConfirmClick() {
      // this.isLoadingResults = true;
      this.patientFormService.postFormData(this.patientFormService.form.value).subscribe((response) => {
        if (response) {
          this.postRequestRespObj = response;
          console.log(this.postRequestRespObj);
        }
        if (response.Ackn) {
          this.toasterService.success(':: Submitted Successfully');
          this.isLoadingResults = false;
        } else {
          this.toasterService.warn(':: Something went wrong, Please try again');
          this.isLoadingResults = false;
        }

      }, (error) => {
        this.toasterService.warn(':: Something went wrong, Please try again');
        this.isLoadingResults = false;
      });
    }
    */

  /*
    onEligibilityCheck() {
      this.dialogService.OpenConfirmDialog(this.patientFormService.form.value)
        .afterClosed().subscribe((response) => {
          console.log(response);
          if (response) {
            this.isLoadingResults = true;
            this.onConfirmClick();
          }
        });
      // this.patientFormService.dataForEligibilityCheck(this.patientFormService.form.value);
    }
    */

  // Closing the popup on form submit
  onClose() {
    this.patientFormService.form.reset();
    this.patientFormService.clearFormValues();
    this.dialogRef.close();
    this.toasterService.success(':: Submitted Successfully');
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }


}
