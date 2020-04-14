import { Component, OnInit, Inject, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { StackedModalComponent } from '../main-modal/stacked-modal/stacked-modal.component';
import { FormControl, FormArray, FormGroup, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


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
}

interface Suffix {
  name: string;
}

interface Relation {
  name: string;
}

interface State {
  name: string;
}

interface City {
  name: string;
}

interface Sex {
  name: string;
}

interface Payment {
  name: string;
}

interface Plans {
  name: string;
}


@Component({
  selector: 'app-main-modal',
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.css']
})

export class MainModalComponent implements OnInit {

  mainModalTitle: string;
  // mainHeading: 'Member Eligibility Details';
  tabLoadTimes: Date[] = [];
  options: FormGroup;
  mySchemaFrom: FormGroup;
  userNamePattern = '^[A-Za-z0-9_]{1,15}$';
  ssnPattern = '^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$'; // '^\d{3}-\d{2}-\d{4}$';
  zipCodePattern = '^[0-9]{5}(-[0-9]{4})?$'; // 5 0r 9 digits// '^\d{5}(?:\d{2})?$'; // ^[0-9]{5}(-[0-9]{2})?$ 5 or 7 digits
  policyPattern = '^[0-9_]{5,15}$';


  genders: Gender[] = [
    { name: 'Male' },
    { name: 'Female' },
    { name: 'Others' }
  ];

  sex: Sex[] = [
    { name: 'Male' },
    { name: 'Female' },
    { name: 'Others' }
  ];

  suffixes: Suffix[] = [
    { name: 'Mr' },
    { name: 'Mrs' },
    { name: 'Dr' }
  ];

  relations: Relation[] = [
    { name: 'Mother' },
    { name: 'Father' },
    { name: 'Sibling' },
    { name: 'Brother' },
    { name: 'Sister' },
    { name: 'Others' },
  ];

  states: State[] = [
    { name: 'New York' },
    { name: 'Washington DC' },
    { name: 'Jamaica' }
  ];

  cities: City[] = [
    { name: 'New York' },
    { name: 'Washington DC' },
    { name: 'Jamaica' }
  ];

  payments: Payment[] = [
    { name: 'Cash' },
    { name: 'Card' },
    { name: 'Insurance' },
    { name: 'Others' }
  ];

  insurancePlans: Plans[] = [
    { name: 'Primary' },
    { name: 'Secondary' },
    { name: 'Medicare' },
    { name: 'Medicaid' },
    { name: 'Company Insurance' },
    { name: 'Others' }
  ];

  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  // lnameFormControl = new FormControl('', [Validators.required, Validators.pattern(this.userNamePattern)]);
  // fnameFormControl = new FormControl('', [Validators.required, Validators.pattern(this.userNamePattern)]);
  // mnameFormControl = new FormControl('', [Validators.pattern(this.userNamePattern)]);
  // serializedDate = new FormControl((new Date()).toISOString(), [Validators.required]);
  // genderControl = new FormControl('', [Validators.required]);
  // suffixControl = new FormControl('', [Validators.required]);
  // selectFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  form: FormGroup;
  dateEvents: string[] = [];

  constructor(
    public dialog: MatDialog,
    private elementRef: ElementRef,
    public dialogRef: MatDialogRef<MainModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fb: FormBuilder
  ) { }


  ngOnInit() {
    console.log(this.data);
    this.form = new FormGroup({

      $key: new FormControl(null),
      // emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(this.userNamePattern)]),
      firstName: new FormControl('', [Validators.required, Validators.pattern(this.userNamePattern)]),
      middleName: new FormControl('', [Validators.pattern(this.userNamePattern)]),
      // dob: new FormControl({value: (new Date()).toISOString(), disabled: true}, [Validators.required]),
      dob: new FormControl((new Date().toISOString()), [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      // suffix: new FormControl('', [Validators.required]),
      // age: new FormControl({value: '', disabled: true}),
      // age: new FormControl(''),

      insuranceAndDiagnosis: new FormGroup({
        patientReltoInsured: new FormControl('', [Validators.required]),
        // insuranceInuse: new FormControl('', [Validators.required]),
        insuredlastName: new FormControl('', [Validators.required, Validators.pattern(this.userNamePattern)]),
        insuredfirstName: new FormControl('', [Validators.required, Validators.pattern(this.userNamePattern)]),
        insuredmiddleName: new FormControl('', [Validators.pattern(this.userNamePattern)]),
        insureddob: new FormControl((new Date()).toISOString(), [Validators.required]),
        insuredsex: new FormControl('', [Validators.required]),
        insuredAddress: new FormControl('', [Validators.required]),
        insuredCity: new FormControl('', [Validators.required]),
        insuredState: new FormControl('', [Validators.required]),
        insuredzipcode: new FormControl('', [Validators.required, Validators.pattern(this.zipCodePattern)]),
        ssn: new FormControl('', [Validators.required, Validators.pattern(this.ssnPattern)]),
        modeofPayment: new FormControl('', [Validators.required])
      }),

      insuranceDetails: new FormGroup({
        policyNumber: new FormControl('', [Validators.required, Validators.pattern(this.policyPattern)]),
        group: new FormControl('', [Validators.required, Validators.pattern(this.policyPattern)]),
        insurancePlanName: new FormControl('', [Validators.required]),
        insurancePlanType: new FormControl('', [Validators.required]),
        insuranceAddress: new FormControl('', [Validators.required]),
        insuranceCity: new FormControl('', [Validators.required]),
        insuranceState: new FormControl('', [Validators.required]),
        insurancezipcode: new FormControl('', [Validators.required, Validators.pattern(this.zipCodePattern)])
      }),

    });
    //  this.setDefaultFormValues();
  }

  /* setDefaultFormValues() {
     const formData = {
       $key: 101,
       lastName: 'Singh',
       firstName: 'Dhananjay',
       middleName: '',
       dob: '31/03/2000',
       gender: 'Male',
       suffix: 'Mr',
       age: 0,
 
       insuranceAndDiagnosis: {
         insuredlastName: 'Singh',
         insuredfirstName: 'D',
         insuredmiddleName: '',
         insureddob: '31/3/2000',
         insuredsex: 'Male',
         patientReltoInsured: 'Mother',
         insuranceInuse: 'Medicare',
         insuranceAddress: '#10 , Church Road',
         insuranceCity: 'New York',
         insuranceState: 'Washington DC',
         insurancezipcode: '40005',
         ssn: '123-45-7890',
         modeofPayment: 'Cash'
       },
       insuranceDetails: {
         policyNumber: 12345,
         group: 45678,
         insurancePlanName: 'Plan One 1',
         insurancePlanType: 'Primary',
         insuranceAddress: 'Perry Cross Rd, #10 , Church Road',
         insuranceCity: 'New York',
         insuranceState: 'Jamaica',
         insurancezipcode: '40005-1234'
       }
     };
 
     this.form.setValue(formData);
   } */

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.openDialog(form.value);
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.form.get('age').patchValue(this.getAgeFromDateOfBirth(event.value));
  }

  getAgeFromDateOfBirth(dob: any) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // getErrorMessage() {
  //   return this.form.controls.emailFormControl.hasError('required') ? 'You must enter a value' :
  //     this.form.controls.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  // }


  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialog(formData: any): void {
    console.log(formData);
    // this.service.initializeFormGroup();
    const config = new MatDialogConfig();
    config.disableClose = true; // does not allow to close popup on clicking ESC or outside popup
    config.autoFocus = false; // does not allow popup to focus on any field or icon
    config.hasBackdrop = true;
    config.width = '40%';
    config.id = 'stacked-dialog';
    // config.position.top = '50px';
    // config.position.left = '50px';
    config.data = { form: formData }; // name: 'Djay' name can be accessed in Stackedcomponent

    const dialogRef = this.dialog.open(StackedModalComponent, config
      // {
      // height: '400px',
      // width: '600px',
      // data: {name: this.name, animal: this.animal}
      // }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.form = result;
      console.log(result);
    });
  }


  /*
  onSubmit() {
    if(this.service.form.valid) {
      this.service.insertEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted Successfully');
      this.onClose();
    }
  }
  */

  // Closing the popup on form submit

  /*
  onClose() {
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.dialogRef.close();
     // this.notificationService.success(':: Submitted Successfully')
    }

  */

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

}
