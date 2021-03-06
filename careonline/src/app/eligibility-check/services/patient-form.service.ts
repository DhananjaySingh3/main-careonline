import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, FormArray } from '@angular/forms';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PatientFormDataRequest } from '../../eligibility-check/models/patient-data.model';

@Injectable({
  providedIn: 'root'
})
export class PatientFormService {



  constructor(
    public httpClient: HttpClient,
    public datePipe: DatePipe,

  ) { }


  patientForm: FormGroup = new FormGroup({
    lastName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    firstName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    middleName: new FormControl({ value: '', disabled: true }, []),
    dob: new FormControl({ value: '', disabled: true }, [Validators.required]),
    gender: new FormControl({ value: '', disabled: true }, [Validators.required]),
    suffix: new FormControl({ value: '', disabled: true }),
    mrnNumber: new FormControl({ value: '', disabled: true }),
    insuranceDetailByPolicy: new FormGroup({
      policyId: new FormControl({ value: '', disabled: true }, [Validators.required]),
      primaryInsuranceDetail: this.createInsuranceFormGroup(),
      secondaryInsuranceDetail: this.createInsuranceFormGroup(),
      tertiaryInsuranceDetail: this.createInsuranceFormGroup(),
    }),

  });

  createInsuranceFormGroup() {
    return new FormGroup({
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
    });
  }

  populatePatientFormData(patient: PatientFormDataRequest) {
    const formData: PatientFormDataRequest = {
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
    this.patientForm.setValue(formData);
  }

  updatePatient(patient: PatientFormDataRequest) {
    const formData: PatientFormDataRequest = {
      // $key: 101,
      mrnNumber: patient.mrnNumber,
      lastName: patient.lastName,
      firstName: patient.firstName,
      middleName: patient.middleName,
      dob: patient.dob === '' ? '' : this.datePipe.transform(patient.dob, 'M/d/yyyy'),
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
            this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.insureddob, 'M/d/yyyy'),
          insuredsex: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuredsex,
          eligibility: patient.insuranceDetailByPolicy.primaryInsuranceDetail.eligibility,
          eligibilityCheckSelected: patient.insuranceDetailByPolicy.primaryInsuranceDetail.eligibilityCheckSelected,
          policyNumber: patient.insuranceDetailByPolicy.primaryInsuranceDetail.policyNumber,
          statusVerifiedDate: patient.insuranceDetailByPolicy.primaryInsuranceDetail.statusVerifiedDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.statusVerifiedDate, 'M/d/yyyy'),
          group_name: patient.insuranceDetailByPolicy.primaryInsuranceDetail.group_name,
          insurancePlanName: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insurancePlanName,
          insurancePlanType: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insurancePlanType,
          insuranceAddress: patient.insuranceDetailByPolicy.primaryInsuranceDetail.insuranceAddress,
          city: patient.insuranceDetailByPolicy.primaryInsuranceDetail.city,
          state: patient.insuranceDetailByPolicy.primaryInsuranceDetail.state,
          zipcode: patient.insuranceDetailByPolicy.primaryInsuranceDetail.zipcode,
          endDate: patient.insuranceDetailByPolicy.primaryInsuranceDetail.endDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.endDate, 'M/d/yyyy'),
          startDate: patient.insuranceDetailByPolicy.primaryInsuranceDetail.startDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.primaryInsuranceDetail.startDate, 'M/d/yyyy'),
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
            this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insureddob, 'M/d/yyyy'),
          insuredsex: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuredsex,
          eligibility: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.eligibility,
          eligibilityCheckSelected: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.eligibilityCheckSelected,
          policyNumber: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.policyNumber,
          statusVerifiedDate: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.statusVerifiedDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.statusVerifiedDate, 'M/d/yyyy'),
          group_name: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.group_name,
          insurancePlanName: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insurancePlanName,
          insurancePlanType: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insurancePlanType,
          insuranceAddress: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.insuranceAddress,
          city: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.city,
          state: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.state,
          zipcode: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.zipcode,
          endDate: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.endDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.endDate, 'M/d/yyyy'),
          startDate: patient.insuranceDetailByPolicy.secondaryInsuranceDetail.startDate === '' ? '' :
            this.datePipe.transform(patient.insuranceDetailByPolicy.secondaryInsuranceDetail.startDate, 'M/d/yyyy'),
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
  }

  clearFormValues() {
    const formData = {
      mrnNumber: null,
      lastName: '',
      firstName: '',
      middleName: '',
      dob: '',
      gender: '0',
      suffix: '',
      insuranceDetailByPolicy: {
        policyId: '',
        primaryInsuranceDetail: {
          ssn: '',
          mop: '',
          patientRelationInsured: '',
          id: '',
          insuredlastName: '',
          insuredfirstName: '',
          insuredmiddleName: '',
          insureddob: '',
          insuredsex: '',
          eligibility: '',
          eligibilityCheckSelected: false,
          policyNumber: 0,
          statusVerifiedDate: '',
          group_name: '',
          insurancePlanName: '',
          insurancePlanType: '',
          insuranceAddress: '',
          city: '',
          state: '',
          zipcode: '',
          endDate: '',
          startDate: '',
          mrnNumber: '',
        },
        secondaryInsuranceDetail: {
          ssn: '',
          mop: '',
          patientRelationInsured: '',
          id: '',
          insuredlastName: '',
          insuredfirstName: '',
          insuredmiddleName: '',
          insureddob: '',
          insuredsex: '',
          eligibility: '',
          eligibilityCheckSelected: false,
          policyNumber: 0,
          statusVerifiedDate: '',
          group_name: '',
          insurancePlanName: '',
          insurancePlanType: '',
          insuranceAddress: '',
          city: '',
          state: '',
          zipcode: '',
          endDate: '',
          startDate: '',
          mrnNumber: '',
        },
        tertiaryInsuranceDetail: {
          ssn: '',
          mop: '',
          patientRelationInsured: '',
          id: '',
          insuredlastName: '',
          insuredfirstName: '',
          insuredmiddleName: '',
          insureddob: '',
          insuredsex: '',
          eligibility: '',
          eligibilityCheckSelected: false,
          policyNumber: 0,
          statusVerifiedDate: '',
          group_name: '',
          insurancePlanName: '',
          insurancePlanType: '',
          insuranceAddress: '',
          city: '',
          state: '',
          zipcode: '',
          endDate: '',
          startDate: '',
          mrnNumber: '',
        }
      }
    }
    this.patientForm.setValue(formData);
    /*End of the service class */
  }

}
