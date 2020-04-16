import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Form } from '../class-modals/form';

// import { ErrorStateMatcher } from '@angular/material/core';


// /** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  // matcher = new MyErrorStateMatcher();

  constructor(
    // private firebaseService: AngularFireDatabase
  ) { }

  // patient: Form[];
  patientList: Form[] = [];
  // patientList: [AngularFireList<any>];

  form: FormGroup = new FormGroup({
    // $key: new FormControl(null),
    // emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    middleName: new FormControl('', []),
    // dob: new FormControl({value: (new Date()).toISOString(), disabled: true}, [Validators.required]),
    dob: new FormControl((new Date()).toISOString(), [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    suffix: new FormControl(''),
    // age: new FormControl({value: '', disabled: true}),
    // age: new FormControl(''),
    mrnNumber: new FormControl(''),
    insuranceAndDiagnosis: new FormGroup({
      patientReltoInsured: new FormControl('', [Validators.required]),
      // insuranceInuse: new FormControl('', [Validators.required]),
      insuredlastName: new FormControl('', [Validators.required]),
      insuredfirstName: new FormControl('', [Validators.required]),
      insuredmiddleName: new FormControl('', []),
      insureddob: new FormControl((new Date()).toISOString(), [Validators.required]),
      insuredsex: new FormControl('', [Validators.required]),
      insuredAddress: new FormControl('', [Validators.required]),
      insuredCity: new FormControl('', [Validators.required]),
      insuredState: new FormControl('', [Validators.required]),
      insuredzipcode: new FormControl('', [Validators.required]),
      ssn: new FormControl('', [Validators.required]),
      mop: new FormControl('', [Validators.required]),
    }),
    insuranceDetail: new FormGroup({
      policyNumber: new FormControl('', [Validators.required]),
      group_name: new FormControl('', [Validators.required]),
      insurancePlanName: new FormControl('', [Validators.required]),
      insurancePlanType: new FormControl('', [Validators.required]),
      insuranceAddress: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [Validators.required])
    }),
  });

  setDefaultFormValues() {
    const formData = {
      // $key: 101,
      mrnNumber: 1010,
      lastName: 'Singh',
      firstName: 'Dhananjay',
      middleName: '',
      dob: '31/03/2000',
      gender: 'Male',
      insuranceAndDiagnosis: {
        insuredlastName: 'Singh',
        insuredfirstName: 'D',
        insuredmiddleName: '',
        insureddob: '31/3/2000',
        insuredsex: 'Male',
        patientReltoInsured: 'Mother',
        insuredAddress: '#10 , Church Road',
        insuredCity: 'New York',
        insuredState: 'Washington DC',
        insuredzipcode: '40005',
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
  }


  clearFormValues() {
    const formData = {
      //    $key: null,
      mrnNumber: null,
      lastName: '',
      firstName: '',
      middleName: '',
      dob: '',
      gender: '0',
      insuranceAndDiagnosis: {
        insuredlastName: '',
        insuredfirstName: '',
        insuredmiddleName: '',
        insureddob: '',
        insuredsex: '',
        patientReltoInsured: '',
        insuredAddress: '',
        insuredCity: '0',
        insuredState: '0',
        insuredzipcode: '',
        ssn: '',
        modeofPayment: '0'
      },
      insuranceDetails: {
        policyNumber: null,
        group: null,
        insurancePlanName: '',
        insurancePlanType: '0',
        insuranceAddress: '',
        insuranceCity: '0',
        insuranceState: '0',
        insurancezipcode: '0'
      }
    };

    this.form.setValue(formData);
  }

  clearFormData() {
    this.clearFormValues();
  }

  // getPatient() {
  //   this.patientList = this.firebaseService.list('patients');
  //   return this.patientList.snapshotChanges();
  // }

  // For Create / inserting new data in dB
  insertOrCreatePatient(patient) {
    this.patientList.push({
      mrnNumber: patient.mrnNumber,
      lastName: patient.lastName,
      firstName: patient.firstName,
      middleName: patient.middleName,
      dob: patient.dob,
      gender: patient.gender,
      suffix: patient.suffix,
      insuranceAndDiagnosis: {
        insuredlastName: patient.insuredlastName,
        insuredfirstName: patient.insuredfirstName,
        insuredmiddleName: patient.insuredmiddleName,
        insureddob: patient.insureddob,
        insuredsex: patient.insuredsex,
        patientReltoInsured: patient.patientReltoInsured,
        insuredAddress: patient.insuredAddress,
        insuredCity: patient.insuredCity,
        insuredState: patient.insuredState,
        insuredzipcode: patient.insuredzipcode,
        ssn: patient.ssn,
        mop: patient.mop,
      },
      insuranceDetail: {
        policyNumber: patient.policyNumber,
        group_name: patient.group_name,
        insurancePlanName: patient.insurancePlanName,
        insurancePlanType: patient.insurancePlanType,
        insuranceAddress: patient.insuranceAddress,
        city: patient.city,
        state: patient.state,
        zipcode: patient.zipcode
      }
    });
  }

  // For Update / inserting data in dB
  // updatePatient(patient) {
  //   this.patientList.update(patient.$key, {
  //     mrnNumber: patient.mrnNumber,
  //     lastName: patient.lastName,
  //     firstName: patient.firstName,
  //     middleName: patient.middleName,
  //     dob: patient.dob,
  //     gender: patient.gender,
  //     insuranceAndDiagnosis: {
  //       insuredlastName: patient.insuredlastName,
  //       insuredfirstName: patient.insuredfirstName,
  //       insuredmiddleName: patient.insuredmiddleName,
  //       insureddob: patient.insureddob,
  //       insuredsex: patient.insuredsex,
  //       patientReltoInsured: patient.patientReltoInsured,
  //       insuredAddress: patient.insuredAddress,
  //       insuredCity: patient.insuredCity,
  //       insuredState: patient.insuredState,
  //       insuredzipcode: patient.insuredzipcode,
  //       ssn: patient.ssn,
  //       modeofPayment: patient.modeofPayment,
  //     },
  //     insuranceDetails: {
  //       policyNumber: patient.modeofPayment,
  //       group: patient.modeofPayment,
  //       insurancePlanName: patient.modeofPayment,
  //       insurancePlanType: patient.modeofPayment,
  //       insuranceAddress: patient.modeofPayment,
  //       insuranceCity: patient.modeofPayment,
  //       insuranceState: patient.modeofPayment,
  //       insurancezipcode: patient.modeofPayment
  //     }
  //   });
  // }

  // For Delete data in dB
  // deletePatient($key: string) {
  //   this.patientList.remove($key);
  // }

  populatePatientFormData(patient: Form) {
    // let dob = patient.dob.toString().split('T').slice(0);
    const formData: Form = {
      // $key: 101,
      mrnNumber: patient.mrnNumber,
      lastName: patient.lastName,
      firstName: patient.firstName,
      middleName: patient.middleName,
      dob: patient.dob,
      gender: patient.gender,
      suffix: patient.suffix,
      insuranceAndDiagnosis: {
        insuredlastName: patient.insuranceAndDiagnosis.insuredlastName,
        insuredfirstName: patient.insuranceAndDiagnosis.insuredfirstName,
        insuredmiddleName: patient.insuranceAndDiagnosis.insuredmiddleName,
        insureddob: patient.insuranceAndDiagnosis.insureddob,
        insuredsex: patient.insuranceAndDiagnosis.insuredsex,
        patientReltoInsured: patient.insuranceAndDiagnosis.patientReltoInsured,
        insuredAddress: patient.insuranceAndDiagnosis.insuredAddress,
        insuredCity: patient.insuranceAndDiagnosis.insuredCity,
        insuredState: patient.insuranceAndDiagnosis.insuredState,
        insuredzipcode: patient.insuranceAndDiagnosis.insuredzipcode,
        ssn: patient.insuranceAndDiagnosis.ssn,
        mop: patient.insuranceAndDiagnosis.mop
      },
      insuranceDetail: {
        policyNumber: patient.insuranceDetail.policyNumber,
        group_name: patient.insuranceDetail.group_name,
        insurancePlanName: patient.insuranceDetail.insurancePlanName,
        insurancePlanType: patient.insuranceDetail.insurancePlanType,
        insuranceAddress: patient.insuranceDetail.insuranceAddress,
        city: patient.insuranceDetail.city,
        state: patient.insuranceDetail.state,
        zipcode: patient.insuranceDetail.zipcode
      }
    };
    // formData.dob = new Date(patient.dob.toDateString().split('T').slice(0));
    // formData.dob = new Date(formData.dob.toDateString().split('T')[0]);
    this.form.setValue(formData);
    // this.form.controls.modeofPayment = patient.insuranceAndDiagnosis.mop;
  }

}
