import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, FormArray } from '@angular/forms';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Form } from '../class-modals/form';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';


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
  dataReceivedForEligibilityCheck;
  insuranceDetail: FormArray;

  constructor(
    // private firebaseService: AngularFireDatabase
    public httpClient: HttpClient,
    public datePipe: DatePipe
  ) { }

  formData: Form;
  patientList: Form[] = [];
  // patientList: [AngularFireList<any>];

  form: FormGroup = new FormGroup({
    // $key: new FormControl(null),
    // emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    lastName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    firstName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    middleName: new FormControl({ value: '', disabled: true }, []),
    // dob: new FormControl({value: (new Date()).toISOString(), disabled: true}, [Validators.required]),
    // dob: new FormControl((new Date()).toISOString(), [Validators.required]),
    dob: new FormControl({ value: '', disabled: true }, [Validators.required]),
    gender: new FormControl({ value: '', disabled: true }, [Validators.required]),
    suffix: new FormControl({ value: '', disabled: true }),
    // age: new FormControl({value: '', disabled: true}),
    // age: new FormControl(''),
    mrnNumber: new FormControl({ value: '', disabled: true }),

    insuranceDetailByPolicy: new FormGroup({
      policyId: new FormControl({ value: '', disabled: true }, [Validators.required]),

      primaryInsuranceDetail: new FormGroup({
        ssn: new FormControl({ value: '', disabled: true }),
        mop: new FormControl({ value: '', disabled: true }),
        patientRelationInsured: new FormControl({ value: '', disabled: true }),
        insuredlastName: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insuredfirstName: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insuredmiddleName: new FormControl({ value: '', disabled: true }, []),
        insureddob: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insuredsex: new FormControl({ value: '', disabled: true }, [Validators.required]),
        eligibility: new FormControl({ value: '', disabled: true }),
        eligibilityCheckSelected: new FormControl({ value: '', disabled: false }),
        id: new FormControl({ value: '', disabled: true }),
        statusVerifiedDate: new FormControl({ value: '', disabled: true }),
        policyNumber: new FormControl({ value: '', disabled: true }, [Validators.required]),
        group_name: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insurancePlanName: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insurancePlanType: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insuranceAddress: new FormControl({ value: '', disabled: true }, [Validators.required]),
        city: new FormControl({ value: '', disabled: true }, [Validators.required]),
        state: new FormControl({ value: '', disabled: true }, [Validators.required]),
        zipcode: new FormControl({ value: '', disabled: true }, [Validators.required]),
        endDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
        startDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
        mrnNumber: new FormControl({ value: '', disabled: true }),
      }),

      secondaryInsuranceDetail: new FormGroup({
        ssn: new FormControl({ value: '', disabled: true }),
        mop: new FormControl({ value: '', disabled: true }),
        patientRelationInsured: new FormControl({ value: '', disabled: true }),
        insuredlastName: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insuredfirstName: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insuredmiddleName: new FormControl({ value: '', disabled: true }, []),
        insureddob: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insuredsex: new FormControl({ value: '', disabled: true }, [Validators.required]),
        eligibility: new FormControl({ value: '', disabled: true }),
        eligibilityCheckSelected: new FormControl({ value: '', disabled: false }),
        id: new FormControl({ value: '', disabled: true }),
        statusVerifiedDate: new FormControl({ value: '', disabled: true }),
        policyNumber: new FormControl({ value: '', disabled: true }, [Validators.required]),
        group_name: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insurancePlanName: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insurancePlanType: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insuranceAddress: new FormControl({ value: '', disabled: true }, [Validators.required]),
        city: new FormControl({ value: '', disabled: true }, [Validators.required]),
        state: new FormControl({ value: '', disabled: true }, [Validators.required]),
        zipcode: new FormControl({ value: '', disabled: true }, [Validators.required]),
        endDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
        startDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
        mrnNumber: new FormControl({ value: '', disabled: true }),
      }),

      tertiaryInsuranceDetail: new FormGroup({
        ssn: new FormControl({ value: '', disabled: true }),
        mop: new FormControl({ value: '', disabled: true }),
        patientRelationInsured: new FormControl({ value: '', disabled: true }),
        insuredlastName: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insuredfirstName: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insuredmiddleName: new FormControl({ value: '', disabled: true }, []),
        insureddob: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insuredsex: new FormControl({ value: '', disabled: true }, [Validators.required]),
        eligibility: new FormControl({ value: '', disabled: true }),
        eligibilityCheckSelected: new FormControl({ value: '', disabled: false }),
        id: new FormControl({ value: '', disabled: true }),
        statusVerifiedDate: new FormControl({ value: '', disabled: true }),
        policyNumber: new FormControl({ value: '', disabled: true }, [Validators.required]),
        group_name: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insurancePlanName: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insurancePlanType: new FormControl({ value: '', disabled: true }, [Validators.required]),
        insuranceAddress: new FormControl({ value: '', disabled: true }, [Validators.required]),
        city: new FormControl({ value: '', disabled: true }, [Validators.required]),
        state: new FormControl({ value: '', disabled: true }, [Validators.required]),
        zipcode: new FormControl({ value: '', disabled: true }, [Validators.required]),
        endDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
        startDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
        mrnNumber: new FormControl({ value: '', disabled: true }),
      }),

    }),

  });


  /*
  primaryTabData: any;
  insuranceDetailFormBuild(insuranceDetail?: any) {

    for (let i = 0; i <= insuranceDetail.length; i++) {
      this.

      insuranceDetail[0] ? this.primaryTabData = insuranceDetail[0] : this.primaryTabData = null;
      insuranceDetail[1] ? this.primaryTabData = insuranceDetail[1] : this.primaryTabData = null;
      insuranceDetail[2] ? this.primaryTabData = insuranceDetail[2] : this.primaryTabData = null;
      // insuranceDetails[i]
    }
    return new FormGroup({
      policyNumber: new FormControl({ value: '', disabled: true }, [Validators.required]),
      group_name: new FormControl({ value: '', disabled: true }, [Validators.required]),
      insurancePlanName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      insurancePlanType: new FormControl({ value: '', disabled: true }, [Validators.required]),
      insuranceAddress: new FormControl({ value: '', disabled: true }, [Validators.required]),
      city: new FormControl({ value: '', disabled: true }, [Validators.required]),
      state: new FormControl({ value: '', disabled: true }, [Validators.required]),
      zipcode: new FormControl({ value: '', disabled: true }, [Validators.required])
    });
  }
*/

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
        patientRelationInsured: 'Mother',
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
        patientRelationInsured: '',
        insuredAddress: '',
        insuredCity: '0',
        insuredState: '0',
        insuredzipcode: '' || null,
        ssn: '',
        modeofPayment: '0'
      },
      insuranceDetails: {
        policyNumber: '' || null,
        group: '' || null,
        insurancePlanName: '',
        insurancePlanType: '0',
        insuranceAddress: '',
        insuranceCity: '0',
        insuranceState: '0',
        insurancezipcode: '' || null
      }
    };

    this.form.setValue(formData);
  }

  clearFormData() {
    this.clearFormValues();
  }

  getFormFieldsData(row: Form) {
    this.formData = row;
    this.formData = { ...row };
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
      dob: patient.dob === '' ? '' : this.datePipe.transform(patient.dob, 'dd-MM-yyyy'),
      gender: patient.gender,
      suffix: patient.suffix,
      insuranceDetailByPolicy: {
        policyId: patient.insuranceDetailByPolicy.policyId,
        primaryInsuranceDetail: {
          ssn: patient.insuranceDetailByPolicy.primaryInsuranceDetail.ssn,
          mop: patient.insuranceDetailByPolicy.primaryInsuranceDetail.mop,
          patientRelationInsured: patient.insuranceDetailByPolicy.primaryInsuranceDetail.patientRelationInsured,
          id: patient.insuranceDetailByPolicy.primaryInsuranceDetail.id,
          insuredlastName: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredlastName,
          insuredfirstName: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredfirstName,
          insuredmiddleName: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredmiddleName,
          // tslint:disable-next-line: max-line-length
          insureddob: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insureddob === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.insureddob, 'dd-MM-yyyy'),
          insuredsex: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredsex,
          eligibility: patient.insuranceDetailByPolicy.primaryInsuranceDetail.eligibility,
          eligibilityCheckSelected: patient.insuranceDetailByPolicy.primaryInsuranceDetail.eligibilityCheckSelected,
          policyNumber: patient.insuranceDetailByPolicy.primaryInsuranceDetail.policyNumber,
          statusVerifiedDate: patient.insuranceDetailByPolicy.primaryInsuranceDetail.statusVerifiedDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.statusVerifiedDate, 'dd-MM-yyyy'),
          group_name: patient.insuranceDetailByPolicy.primaryInsuranceDetail.group_name,
          insurancePlanName: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insurancePlanName,
          insurancePlanType: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insurancePlanType,
          insuranceAddress: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuranceAddress,
          city: patient.insuranceDetailByPolicy.primaryInsuranceDetail.city,
          state: patient.insuranceDetailByPolicy.primaryInsuranceDetail.state,
          zipcode: patient.insuranceDetailByPolicy.primaryInsuranceDetail.zipcode,
          endDate: patient.insuranceDetailByPolicy.primaryInsuranceDetail.endDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.endDate, 'dd-MM-yyyy'),
          startDate: patient.insuranceDetailByPolicy.primaryInsuranceDetail.startDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.startDate, 'dd-MM-yyyy'),
          mrnNumber: patient.insuranceDetailByPolicy.primaryInsuranceDetail.mrnNumber,
        },
        secondaryInsuranceDetail: {
          ssn: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.ssn,
          mop: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.mop,
          patientRelationInsured: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.patientRelationInsured,
          id: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.id,
          insuredlastName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredlastName,
          insuredfirstName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredfirstName,
          insuredmiddleName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredmiddleName,
          // tslint:disable-next-line: max-line-length
          insureddob: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insureddob === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insureddob, 'dd-MM-yyyy'),
          insuredsex: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredsex,
          eligibility: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.eligibility,
          eligibilityCheckSelected: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.eligibilityCheckSelected,
          policyNumber: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.policyNumber,
          statusVerifiedDate: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.statusVerifiedDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.statusVerifiedDate, 'dd-MM-yyyy'),
          group_name: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.group_name,
          insurancePlanName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insurancePlanName,
          insurancePlanType: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insurancePlanType,
          insuranceAddress: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuranceAddress,
          city: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.city,
          state: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.state,
          zipcode: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.zipcode,
          endDate: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.endDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.endDate, 'dd-MM-yyyy'),
          startDate: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.startDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.startDate, 'dd-MM-yyyy'),
          mrnNumber: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.mrnNumber,
        },
        tertiaryInsuranceDetail: {
          ssn: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.ssn,
          mop: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.mop,
          patientRelationInsured: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.patientRelationInsured,
          id: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.id,
          insuredlastName: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuredlastName,
          insuredfirstName: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuredfirstName,
          insuredmiddleName: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuredmiddleName,
          // tslint:disable-next-line: max-line-length
          insureddob: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insureddob === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insureddob, 'dd-MM-yyyy'),
          insuredsex: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuredsex,
          eligibility: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.eligibility,
          eligibilityCheckSelected: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.eligibilityCheckSelected,
          policyNumber: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.policyNumber,
          statusVerifiedDate: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.statusVerifiedDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.statusVerifiedDate, 'dd-MM-yyyy'),
          group_name: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.group_name,
          insurancePlanName: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insurancePlanName,
          insurancePlanType: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insurancePlanType,
          insuranceAddress: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuranceAddress,
          city: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.city,
          state: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.state,
          zipcode: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.zipcode,
          endDate: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.endDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.endDate, 'dd-MM-yyyy'),
          startDate: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.startDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.startDate, 'dd-MM-yyyy'),
          mrnNumber: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.mrnNumber,
        },
      }

    });
  }

  // For Update / inserting data in dB

  updatePatient(patient: Form) {
    console.log(patient);
    const formData: Form = {
      // $key: 101,
      mrnNumber: patient.mrnNumber,
      lastName: patient.lastName,
      firstName: patient.firstName,
      middleName: patient.middleName,
      dob: patient.dob === '' ? '' : this.datePipe.transform(patient.dob, 'dd-MM-yyyy'),
      gender: patient.gender,
      suffix: patient.suffix,
      insuranceDetailByPolicy: {
        policyId: patient.insuranceDetailByPolicy.policyId,
        primaryInsuranceDetail: {
          ssn: patient.insuranceDetailByPolicy.primaryInsuranceDetail.ssn,
          mop: patient.insuranceDetailByPolicy.primaryInsuranceDetail.mop,
          patientRelationInsured: patient.insuranceDetailByPolicy.primaryInsuranceDetail.patientRelationInsured,
          id: patient.insuranceDetailByPolicy.primaryInsuranceDetail.id,
          insuredlastName: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredlastName,
          insuredfirstName: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredfirstName,
          insuredmiddleName: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredmiddleName,
          // tslint:disable-next-line: max-line-length
          insureddob: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insureddob === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.insureddob, 'dd-MM-yyyy'),
          insuredsex: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredsex,
          eligibility: patient.insuranceDetailByPolicy.primaryInsuranceDetail.eligibility,
          eligibilityCheckSelected: patient.insuranceDetailByPolicy.primaryInsuranceDetail.eligibilityCheckSelected,
          policyNumber: patient.insuranceDetailByPolicy.primaryInsuranceDetail.policyNumber,
          statusVerifiedDate: patient.insuranceDetailByPolicy.primaryInsuranceDetail.statusVerifiedDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.statusVerifiedDate, 'dd-MM-yyyy'),
          group_name: patient.insuranceDetailByPolicy.primaryInsuranceDetail.group_name,
          insurancePlanName: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insurancePlanName,
          insurancePlanType: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insurancePlanType,
          insuranceAddress: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuranceAddress,
          city: patient.insuranceDetailByPolicy.primaryInsuranceDetail.city,
          state: patient.insuranceDetailByPolicy.primaryInsuranceDetail.state,
          zipcode: patient.insuranceDetailByPolicy.primaryInsuranceDetail.zipcode,
          endDate: patient.insuranceDetailByPolicy.primaryInsuranceDetail.endDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.endDate, 'dd-MM-yyyy'),
          startDate: patient.insuranceDetailByPolicy.primaryInsuranceDetail.startDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.startDate, 'dd-MM-yyyy'),
          mrnNumber: patient.insuranceDetailByPolicy.primaryInsuranceDetail.mrnNumber,
        },
        secondaryInsuranceDetail: {
          ssn: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.ssn,
          mop: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.mop,
          patientRelationInsured: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.patientRelationInsured,
          id: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.id,
          insuredlastName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredlastName,
          insuredfirstName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredfirstName,
          insuredmiddleName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredmiddleName,
          // tslint:disable-next-line: max-line-length
          insureddob: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insureddob === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insureddob, 'dd-MM-yyyy'),
          insuredsex: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredsex,
          eligibility: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.eligibility,
          eligibilityCheckSelected: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.eligibilityCheckSelected,
          policyNumber: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.policyNumber,
          statusVerifiedDate: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.statusVerifiedDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.statusVerifiedDate, 'dd-MM-yyyy'),
          group_name: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.group_name,
          insurancePlanName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insurancePlanName,
          insurancePlanType: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insurancePlanType,
          insuranceAddress: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuranceAddress,
          city: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.city,
          state: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.state,
          zipcode: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.zipcode,
          endDate: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.endDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.endDate, 'dd-MM-yyyy'),
          startDate: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.startDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.startDate, 'dd-MM-yyyy'),
          mrnNumber: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.mrnNumber,
        },
        tertiaryInsuranceDetail: {
          ssn: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.ssn,
          mop: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.mop,
          patientRelationInsured: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.patientRelationInsured,
          id: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.id,
          insuredlastName: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuredlastName,
          insuredfirstName: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuredfirstName,
          insuredmiddleName: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuredmiddleName,
          // tslint:disable-next-line: max-line-length
          insureddob: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insureddob === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insureddob, 'dd-MM-yyyy'),
          insuredsex: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuredsex,
          eligibility: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.eligibility,
          eligibilityCheckSelected: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.eligibilityCheckSelected,
          policyNumber: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.policyNumber,
          statusVerifiedDate: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.statusVerifiedDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.statusVerifiedDate, 'dd-MM-yyyy'),
          group_name: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.group_name,
          insurancePlanName: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insurancePlanName,
          insurancePlanType: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insurancePlanType,
          insuranceAddress: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuranceAddress,
          city: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.city,
          state: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.state,
          zipcode: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.zipcode,
          endDate: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.endDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.endDate, 'dd-MM-yyyy'),
          startDate: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.startDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.startDate, 'dd-MM-yyyy'),
          mrnNumber: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.mrnNumber,
        },
      }
    };

    console.log(formData);
  }

  dataForEligibilityCheck(patient: any) {
    // let data = [...patient];
    this.dataReceivedForEligibilityCheck = { ...patient };
    //  console.log(patient);
    const formData: Form = {
      // $key: 101,
      mrnNumber: patient.mrnNumber,
      lastName: patient.lastName,
      firstName: patient.firstName,
      middleName: patient.middleName,
      dob: patient.dob === '' ? '' : this.datePipe.transform(patient.dob, 'dd-MM-yyyy'),
      gender: patient.gender,
      suffix: patient.suffix,
      insuranceDetailByPolicy: {
        policyId: patient.insuranceDetailByPolicy.policyId,
        primaryInsuranceDetail: {
          ssn: patient.insuranceDetailByPolicy.primaryInsuranceDetail.ssn,
          mop: patient.insuranceDetailByPolicy.primaryInsuranceDetail.mop,
          patientRelationInsured: patient.insuranceDetailByPolicy.primaryInsuranceDetail.patientRelationInsured,
          id: patient.insuranceDetailByPolicy.primaryInsuranceDetail.id,
          insuredlastName: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredlastName,
          insuredfirstName: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredfirstName,
          insuredmiddleName: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredmiddleName,
          // tslint:disable-next-line: max-line-length
          insureddob: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insureddob === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.insureddob, 'dd-MM-yyyy'),
          insuredsex: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredsex,
          eligibility: patient.insuranceDetailByPolicy.primaryInsuranceDetail.eligibility,
          eligibilityCheckSelected: patient.insuranceDetailByPolicy.primaryInsuranceDetail.eligibilityCheckSelected,
          policyNumber: patient.insuranceDetailByPolicy.primaryInsuranceDetail.policyNumber,
          statusVerifiedDate: patient.insuranceDetailByPolicy.primaryInsuranceDetail.statusVerifiedDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.statusVerifiedDate, 'dd-MM-yyyy'),
          group_name: patient.insuranceDetailByPolicy.primaryInsuranceDetail.group_name,
          insurancePlanName: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insurancePlanName,
          insurancePlanType: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insurancePlanType,
          insuranceAddress: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuranceAddress,
          city: patient.insuranceDetailByPolicy.primaryInsuranceDetail.city,
          state: patient.insuranceDetailByPolicy.primaryInsuranceDetail.state,
          zipcode: patient.insuranceDetailByPolicy.primaryInsuranceDetail.zipcode,
          endDate: patient.insuranceDetailByPolicy.primaryInsuranceDetail.endDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.endDate, 'dd-MM-yyyy'),
          startDate: patient.insuranceDetailByPolicy.primaryInsuranceDetail.startDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.startDate, 'dd-MM-yyyy'),
          mrnNumber: patient.insuranceDetailByPolicy.primaryInsuranceDetail.mrnNumber,
        },
        secondaryInsuranceDetail: {
          ssn: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.ssn,
          mop: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.mop,
          patientRelationInsured: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.patientRelationInsured,
          id: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.id,
          insuredlastName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredlastName,
          insuredfirstName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredfirstName,
          insuredmiddleName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredmiddleName,
          // tslint:disable-next-line: max-line-length
          insureddob: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insureddob === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insureddob, 'dd-MM-yyyy'),
          insuredsex: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredsex,
          eligibility: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.eligibility,
          eligibilityCheckSelected: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.eligibilityCheckSelected,
          policyNumber: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.policyNumber,
          statusVerifiedDate: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.statusVerifiedDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.statusVerifiedDate, 'dd-MM-yyyy'),
          group_name: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.group_name,
          insurancePlanName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insurancePlanName,
          insurancePlanType: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insurancePlanType,
          insuranceAddress: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuranceAddress,
          city: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.city,
          state: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.state,
          zipcode: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.zipcode,
          endDate: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.endDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.endDate, 'dd-MM-yyyy'),
          startDate: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.startDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.startDate, 'dd-MM-yyyy'),
          mrnNumber: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.mrnNumber,
        },
        tertiaryInsuranceDetail: {
          ssn: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.ssn,
          mop: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.mop,
          patientRelationInsured: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.patientRelationInsured,
          id: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.id,
          insuredlastName: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuredlastName,
          insuredfirstName: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuredfirstName,
          insuredmiddleName: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuredmiddleName,
          // tslint:disable-next-line: max-line-length
          insureddob: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insureddob === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insureddob, 'dd-MM-yyyy'),
          insuredsex: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuredsex,
          eligibility: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.eligibility,
          eligibilityCheckSelected: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.eligibilityCheckSelected,
          policyNumber: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.policyNumber,
          statusVerifiedDate: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.statusVerifiedDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.statusVerifiedDate, 'dd-MM-yyyy'),
          group_name: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.group_name,
          insurancePlanName: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insurancePlanName,
          insurancePlanType: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insurancePlanType,
          insuranceAddress: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuranceAddress,
          city: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.city,
          state: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.state,
          zipcode: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.zipcode,
          endDate: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.endDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.endDate, 'dd-MM-yyyy'),
          startDate: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.startDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.startDate, 'dd-MM-yyyy'),
          mrnNumber: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.mrnNumber,
        },
      }
    };
    // console.log(formData);
  }

  // For Delete data in dB
  // deletePatient($key: string) {
  //   this.patientList.remove($key);
  // }

  populatePatientFormData(patient: Form) {
    // let dob = patient.dob.toString().split('T').slice(0);
    // this.insuranceDetailFormBuild(patient.insuranceDetail);
    const formData: Form = {
      // $key: 101,
      mrnNumber: patient.mrnNumber,
      lastName: patient.lastName,
      firstName: patient.firstName,
      middleName: patient.middleName,
      // dob: patient.dob === '' ? '' : this.datePipe.transform(patient.dob, 'dd-MM-yyyy'),
      dob: patient.dob === '' ? '' : this.datePipe.transform(patient.dob, 'M/d/yyyy'),
      gender: patient.gender,
      suffix: patient.suffix,
      insuranceDetailByPolicy: {
        policyId: patient.insuranceDetailByPolicy.policyId ? (patient.insuranceDetailByPolicy.policyId) : null,
        primaryInsuranceDetail: {
          ssn: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.ssn)
            : null,
          mop: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.mop)
            : null,
          patientRelationInsured: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.patientRelationInsured)
            : null,
          id: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.id)
            : null,
          insuredlastName: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredlastName)
            : null,
          insuredfirstName: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredfirstName)
            : null,
          insuredmiddleName: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredmiddleName)
            : null,
          insureddob: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.insureddob === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.insureddob, 'M/d/yyyy'))
            : null,
          insuredsex: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredsex)
            : null,
          eligibility: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.eligibility)
            : null,
          eligibilityCheckSelected: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.eligibilityCheckSelected)
            : null,
          policyNumber: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.policyNumber)
            : null,
          statusVerifiedDate: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.statusVerifiedDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.statusVerifiedDate, 'M/d/yyyy'))
            : null,
          group_name: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.group_name)
            : null,
          insurancePlanName: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.insurancePlanName)
            : null,
          insurancePlanType: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.insurancePlanType)
            : null,
          insuranceAddress: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuranceAddress)
            : null,
          city: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.city)
            : null,
          state: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.state)
            : null,
          zipcode: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.zipcode)
            : null,
          endDate: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.endDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.endDate, 'M/d/yyyy'))
            : null,
          startDate: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.startDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.startDate, 'M/d/yyyy'))
            : null,
          mrnNumber: patient.insuranceDetailByPolicy.primaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.primaryInsuranceDetail.mrnNumber)
            : null,
        },
        secondaryInsuranceDetail: {
          ssn: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.ssn)
            : null,
          mop: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.mop)
            : null,
          patientRelationInsured: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.patientRelationInsured)
            : null,
          id: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.id)
            : null,
          insuredlastName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredlastName)
            : null,
          insuredfirstName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredfirstName)
            : null,
          insuredmiddleName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredmiddleName)
            : null,
          insureddob: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insureddob === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insureddob, 'M/d/yyyy'))
            : null,
          insuredsex: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredsex)
            : null,
          eligibility: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.eligibility)
            : null,
          eligibilityCheckSelected: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.eligibilityCheckSelected)
            : null,
          policyNumber: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.policyNumber)
            : null,
          statusVerifiedDate: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.statusVerifiedDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.statusVerifiedDate, 'M/d/yyyy'))
            : null,
          group_name: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.group_name)
            : null,
          insurancePlanName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insurancePlanName)
            : null,
          insurancePlanType: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insurancePlanType)
            : null,
          insuranceAddress: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuranceAddress)
            : null,
          city: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.city)
            : null,
          state: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.state)
            : null,
          zipcode: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.zipcode)
            : null,
          endDate: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.endDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.endDate, 'M/d/yyyy'))
            : null,
          startDate: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.startDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.startDate, 'M/d/yyyy'))
            : null,
          mrnNumber: patient.insuranceDetailByPolicy.secondaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.secondaryInsuranceDetail.mrnNumber)
            : null,
        },
        tertiaryInsuranceDetail: {
          ssn: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.ssn)
            : null,
          mop: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.mop)
            : null,
          patientRelationInsured: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.patientRelationInsured)
            : null,
          id: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.id)
            : null,
          insuredlastName: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuredlastName)
            : null,
          insuredfirstName: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuredfirstName)
            : null,
          insuredmiddleName: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuredmiddleName)
            : null,
          insureddob: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insureddob === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insureddob, 'M/d/yyyy'))
            : null,
          insuredsex: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuredsex)
            : null,
          eligibility: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.eligibility)
            : null,
          eligibilityCheckSelected: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.eligibilityCheckSelected)
            : null,
          policyNumber: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.policyNumber)
            : null,
          statusVerifiedDate: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.statusVerifiedDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.statusVerifiedDate, 'M/d/yyyy'))
            : null,
          group_name: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.group_name)
            : null,
          insurancePlanName: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insurancePlanName)
            : null,
          insurancePlanType: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insurancePlanType)
            : null,
          insuranceAddress: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.insuranceAddress)
            : null,
          city: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.city)
            : null,
          state: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.state)
            : null,
          zipcode: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.zipcode)
            : null,
          endDate: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.endDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.endDate, 'M/d/yyyy'))
            : null,
          startDate: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.startDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.startDate, 'M/d/yyyy'))
            : null,
          mrnNumber: patient.insuranceDetailByPolicy.tertiaryInsuranceDetail ?
            (patient.insuranceDetailByPolicy.tertiaryInsuranceDetail.mrnNumber)
            : null,
        },
      }
    };
    // formData.dob = new Date(patient.dob.toDateString().split('T').slice(0));
    // formData.dob = new Date(formData.dob.toDateString().split('T')[0]);
    this.form.setValue(formData);
    // this.form.patchValue({ 'patient.insuranceDetailByPolicy.policyId': null });
    // this.form.controls.modeofPayment = patient.insuranceAndDiagnosis.mop;
  }


  // To get list of data
  getFormData(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/checkEligibility/read');
  }

  postFormData(form: Form): Observable<any> {
    return this.httpClient.post('http://localhost:8080/checkEligibility/write', form);
  }

  /* Current Insurance Details*/
  getEligibilityData(): Observable<any> {
    return this.httpClient.post('http://localhost:8080/checkEligibility/eligibilityDetail', this.formData);
  }

  getPdfData(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/checkEligibility/viewDetail');
  }

  /* History Insurance Details*/
  getEligibilityHistoryData(): Observable<any> {
    return this.httpClient.post('http://localhost:8080/checkEligibility/eligibilityDetailHistory', this.formData);
  }

  public getPdfFileStream(rowData) {
    // return this.httpClient.get('http://localhost:8080/checkEligibility/generate',  { responseType: 'blob' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Content-Disposition': 'inline; filename=PatientEligiblityDetail.pdf'
    });

    return this.httpClient.post('http://localhost:8080/checkEligibility/generate', rowData,
      { headers: reqHeader, responseType: 'blob' });
  }


}
