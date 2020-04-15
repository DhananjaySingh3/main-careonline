import { Component, OnInit, Inject, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { PatientService } from '../../../services/patient.service';
import { GenderService } from '../../../services/gender.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface DialogData {
  form: FormGroup;
  // mainHeading: string;
}

interface Gender {
  name: string;
  id: number;
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


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  matcher = new MyErrorStateMatcher();

  constructor(
    public patientFormService: PatientService,
    public genderService: GenderService,
    public toasterService: SnackbarService,
    // public dialog: MatDialog,
    // private elementRef: ElementRef,
    public dialogRef: MatDialogRef<PatientComponent>,
  //  @Inject(MAT_DIALOG_DATA) public data: DialogData,
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
    { id: 6, name: 'Others' },
  ];

  states: State[] = [
    { id: 1, name: 'New York' },
    { id: 2, name: 'Washington DC' },
    { id: 3, name: 'Jamaica' }
  ];

  cities: City[] = [
    { id: 1, name: 'New York' },
    { id: 2, name: 'Washington DC' },
    { id: 3, name: 'Jamaica' }
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

  // genders: Gender[] = [
  //   { id: 1, name: 'Male' },
  //   { id: 2, name: 'Female' },
  //   { id: 3, name: 'Others' }
  // ];
  genders: Gender[] = [];
  getGender() {
    this.genders = this.genderService.genderListArray;
  }

  ngOnInit() {
    this.patientFormService.getPatient();
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
      // this.toasterService.success(':: Submitted Successfully');
      this.patientFormService.insertOrCreatePatient(this.patientFormService.form.value);
      this.patientFormService.form.reset();
      this.patientFormService.clearFormData(); // initializeFormGroup() = clearFormData()
      this.toasterService.success(':: Submitted Successfully');
      this.onClose();
    }
  }


  // Closing the popup on form submit
  onClose() {
    this.patientFormService.form.reset();
    this.patientFormService.clearFormValues();
    this.dialogRef.close();
    this.toasterService.success(':: Submitted Successfully');
  }

}
