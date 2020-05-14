import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import {
  MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatTabGroup, MatTableDataSource,
  MatPaginator, MatSort, MatRadioButton
} from '@angular/material';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CommonService } from '../../../preauthorization/services/common.service';
import { PreAuthFormService } from '../../../preauthorization/services/pre-auth-form.service';
import { PreAuthService } from '../../../preauthorization/services/pre-auth.service';
import { DialogData } from '../../../preauthorization/models/preauth-dialog-data.model';
import { PreAuthFormModelResponse } from '../../../preauthorization/models/pre-auth-form.model';
import { StackedModalComponent } from '../../../preauthorization/components/stacked-modal/stacked-modal.component';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-pre-auth-form',
  templateUrl: './pre-auth-form.component.html',
  styleUrls: ['./pre-auth-form.component.css']
})
export class PreAuthFormComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  /* Selected Patient's Data received via Dialog while opening from preauthList Component*/
  heading = this.data.heading;
  selectedPatientViaDialog = { ...this.data.selectedPatientData };
  /* Selected Patient's Data received via Dialog while opening from preauthList Component ends*/

  /* For Radio buttons under Request For */
  @ViewChild('newService') newAdmissService: MatRadioButton;
  @ViewChild('additionalService') additionalService: MatRadioButton;
  @ViewChild('extensionOnly') extensionOnly: MatRadioButton;
  /* For Radio buttons under Request For */
  isLoadingResults = true;
  // editForm = false;
  // selected = 'primaryInsuranceDetail';
  // primaryInsuranceSelected = false;
  // secondaryInsuranceSelected = false;
  // tertiaryInsuranceSelected = false;
  // noneInsuranceSelected = false;
  // toSelect = this.insuranceTypes().find(c => c.name === 'Primar Insurance');
  // this.patientCategory.get('patientCategory').setValue(toSelect);


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PreAuthFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public preAuthFormService: PreAuthFormService,
    public commonService: CommonService,
    public preAuthService: PreAuthService,
    public datePipe: DatePipe,
  ) { }


  /* Building Form */
  preAuthForm: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    mrnNumber: new FormControl({ value: '', disabled: true }),
    currenttimdate: new FormControl({ value: '', disabled: true }),

    preAuthDemographics: new FormGroup({
      // id: new FormControl({ value: '', disabled: true }),
      mrnNumber: new FormControl({ value: '', disabled: true }),
      lastName: new FormControl({ value: '', disabled: true }, []),
      firstName: new FormControl({ value: '', disabled: true }, []),
      middleName: new FormControl({ value: '', disabled: true }, []),
      dob: new FormControl({ value: '', disabled: true }, []),
      gender: new FormControl({ value: '', disabled: true }, []),
      suffix: new FormControl({ value: '', disabled: true }),
      ssn: new FormControl({ value: '', disabled: true }),
    }),

    insuranceDetailPreAuth: new FormGroup({
      mrnNumber: new FormControl({ value: '', disabled: true }),
      insuranceTypeSelcted: new FormControl({ value: '', disabled: true }),
      primaryInsuranceDetail: this.createInsuranceFormGroup(),
      secondaryInsuranceDetail: this.createInsuranceFormGroup(),
      tertiaryInsuranceDetail: this.createInsuranceFormGroup(),
    }),

    providerDetail: new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      requestingProviderIDNumber: new FormControl({ value: '', disabled: true }),
      requestingAgency: new FormControl({ value: '', disabled: true }),
      providerName: new FormControl({ value: '', disabled: true }),
      providerTaxIDNumber: new FormControl({ value: '', disabled: true }),
      phoneNumber: new FormControl({ value: '', disabled: true }),
      extension: new FormControl({ value: '', disabled: true }),
      faxNumber: new FormControl({ value: '', disabled: true }),
    }),

    admissionDetail: new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      mrnNumber: new FormControl({ value: '', disabled: true }),
      requestType: new FormControl({ value: '', disabled: true }),
      admissionDate: new FormControl({ value: '', disabled: true }),
      dischargeDate: new FormControl({ value: '', disabled: true }),
      referringPhysician: new FormControl({ value: '', disabled: true }),
      primaryDiagnosis: new FormControl({ value: '', disabled: true }),
      primaryDiagnosisDescription: new FormControl({ value: '', disabled: true }),
    }),

    requestFor: new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      mrnNumber: new FormControl({ value: '', disabled: true }),
      newadmissionService: new FormControl({ value: '', disabled: true }),
      additionalServices: new FormGroup({
        // this.createAdditionalServicesFormGroup(),

        id: new FormControl({ value: '', disabled: true }),
        previousAuthorizationNumber: new FormControl({ value: '', disabled: true }),
        numberOfServiceCompletedTillDate: new FormControl({ value: '', disabled: true }),
        fromDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
        toDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
        serviceflag: new FormControl({ value: false, disabled: true }),
      }),

      extension: this.createExtensionFormGroup(),
    }),

    requestService: new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      mrnNumber: new FormControl({ value: '', disabled: true }),
      medicalSocialWork: this.createMedicalSocialWorkFormGroup(),
      occupationTherapy: this.createOccupationTherapyFormGroup(),
      skilledNursing: this.createSkilledNursingFormGroup(),
      physicalTherapy: this.createPhysicalTherapyFormGroup(),
      speechPathology: this.createSpeechPathologyFormGroup(),
      homeHealthAide: this.createHomeHealthAideFormGroup(),
    }),

  });

  createInsuranceFormGroup() {
    return new FormGroup({
      ssn: new FormControl({ value: '', disabled: true }, [Validators.required]),
      mop: new FormControl({ value: '', disabled: true }),
      patientRelationInsured: new FormControl({ value: '', disabled: true }, [Validators.required]),
      insuredlastName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      insuredfirstName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      insuredmiddleName: new FormControl({ value: '', disabled: true }),
      insureddob: new FormControl({ value: '', disabled: true }, [Validators.required]),
      insuredsex: new FormControl({ value: '', disabled: true }, [Validators.required]),
      eligibility: new FormControl({ value: '', disabled: true }),
      eligibilityCheckSelected: new FormControl({ value: '', disabled: true }),
      id: new FormControl({ value: '', disabled: true }),
      statusVerifiedDate: new FormControl({ value: '', disabled: true }),
      policyNumber: new FormControl({ value: '', disabled: true }, [Validators.required]),
      group_name: new FormControl({ value: '', disabled: true }),
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

  // createAdditionalServicesFormGroup() {
  //   return new FormGroup({
  //     id: new FormControl({ value: '', disabled: true }),
  //     previousAuthorizationNumber: new FormControl({ value: '', disabled: true }),
  //     numberOfServiceCompletedTillDate: new FormControl({ value: '', disabled: true }),
  //     fromDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
  //     toDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
  //     serviceflag: new FormControl({ value: '', disabled: false }),
  //   });
  // }

  createExtensionFormGroup() {
    return new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      previousAuthorizationNumber: new FormControl({ value: '', disabled: true }),
      fromDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
      toDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
      serviceflag: new FormControl({ value: '', disabled: true }),
    });
  }

  createMedicalSocialWorkFormGroup() {
    return new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      mrnNumber: new FormControl({ value: '', disabled: true }),
      revenueCode: new FormControl({ value: '', disabled: true }),
      visits: new FormControl({ value: '', disabled: true }),
      units: new FormControl({ value: '', disabled: true }),
      medicalSocialWork: new FormControl({ value: '', disabled: true }),
    });
  }

  createOccupationTherapyFormGroup() {
    return new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      mrnNumber: new FormControl({ value: '', disabled: true }),
      revenueCode: new FormControl({ value: '', disabled: true }),
      visits: new FormControl({ value: '', disabled: true }),
      units: new FormControl({ value: '', disabled: true }),
      occupationTherapy: new FormControl({ value: '', disabled: true }),
    });
  }

  createSkilledNursingFormGroup() {
    return new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      mrnNumber: new FormControl({ value: '', disabled: true }),
      revenueCode: new FormControl({ value: '', disabled: true }),
      visits: new FormControl({ value: '', disabled: true }),
      units: new FormControl({ value: '', disabled: true }),
      skilledNursing: new FormControl({ value: '', disabled: true }),
    });
  }

  createPhysicalTherapyFormGroup() {
    return new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      mrnNumber: new FormControl({ value: '', disabled: true }),
      revenueCode: new FormControl({ value: '', disabled: true }),
      visits: new FormControl({ value: '', disabled: true }),
      units: new FormControl({ value: '', disabled: true }),
      physicalTherapy: new FormControl({ value: '', disabled: true }),
    });
  }

  createSpeechPathologyFormGroup() {
    return new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      mrnNumber: new FormControl({ value: '', disabled: true }),
      revenueCode: new FormControl({ value: '', disabled: true }),
      visits: new FormControl({ value: '', disabled: true }),
      units: new FormControl({ value: '', disabled: true }),
      speechPathology: new FormControl({ value: '', disabled: true }),
    });
  }

  createHomeHealthAideFormGroup() {
    return new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      mrnNumber: new FormControl({ value: '', disabled: true }),
      revenueCode: new FormControl({ value: '', disabled: true }),
      visits: new FormControl({ value: '', disabled: true }),
      units: new FormControl({ value: '', disabled: true }),
      homeHealthAide: new FormControl({ value: '', disabled: true }),
    });
  }

  /* Building Form */


  ngOnInit() {
    console.log('Data via list page ', this.selectedPatientViaDialog);
    this.preAuthService.postPreauthPatientData(this.selectedPatientViaDialog).subscribe((selectedPatAuthformInfo) => {
      if (selectedPatAuthformInfo) {
        this.isLoadingResults = false;
        // this.preAuthformDetails = selectedPatAuthformInfo;
        // this.preAuthformDetails = { ...selectedPatAuthformInfo };
        //  selectedPatAuthformInfo[0].insuranceDetailPreAuth.insuranceTypeSelcted = 'primaryInsuranceDetail';
        this.populatePatientFormData(selectedPatAuthformInfo[2]);
      }
    },
      (error) => {
        console.log(error);
      });

    // this.preAuthService.getPreauthPatientData().subscribe((selectedPatAuthformInfo) => {
    //   if (selectedPatAuthformInfo) {
    //     // this.preAuthformDetails = selectedPatAuthformInfo;
    //     // this.preAuthformDetails = { ...selectedPatAuthformInfo };
    //     this.populatePatientFormData(selectedPatAuthformInfo);
    //   }
    // }
    // );
    this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'primaryInsuranceDetail' });
  }

  /* Populating Form Data */
  populatePatientFormData(patient: PreAuthFormModelResponse) {
    console.log('Pat data ', patient);

    const formData: PreAuthFormModelResponse = {
      id: patient.id,
      mrnNumber: patient.mrnNumber,
      // currenttimdate: patient.currenttimdate === '' ? '' : this.datePipe.transform(patient.currenttimdate, 'M/d/yyyy'),
      currenttimdate: patient.currenttimdate === '' ? '' : this.datePipe.transform(patient.currenttimdate, 'M/d/yyyy'),
      preAuthDemographics: {
        mrnNumber: patient.preAuthDemographics.mrnNumber ? (patient.preAuthDemographics.mrnNumber) : null,
        firstName: patient.preAuthDemographics.firstName ? (patient.preAuthDemographics.firstName) : null,
        lastName: patient.preAuthDemographics.lastName ? (patient.preAuthDemographics.lastName) : null,
        middleName: patient.preAuthDemographics.middleName ? (patient.preAuthDemographics.middleName) : null,
        suffix: patient.preAuthDemographics.suffix ? (patient.preAuthDemographics.suffix) : null,
        gender: patient.preAuthDemographics.gender ? (patient.preAuthDemographics.gender) : null,
        dob: patient.preAuthDemographics ? (patient.preAuthDemographics.dob === '' ? '' :
          this.datePipe.transform(patient.preAuthDemographics.dob, 'M/d/yyyy')) : null,
        ssn: patient.preAuthDemographics.ssn ? (patient.preAuthDemographics.ssn) : null,
      },

      insuranceDetailPreAuth: {
        mrnNumber: patient.insuranceDetailPreAuth.mrnNumber ?
          (patient.insuranceDetailPreAuth.mrnNumber) : null,
        insuranceTypeSelcted: patient.insuranceDetailPreAuth.insuranceTypeSelcted ?
          (patient.insuranceDetailPreAuth.insuranceTypeSelcted) : null,
        primaryInsuranceDetail: {
          ssn: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.ssn)
            : null,
          mop: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.mop)
            : null,
          patientRelationInsured: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.patientRelationInsured)
            : null,
          id: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.id)
            : null,
          insuredlastName: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insuredlastName)
            : null,
          insuredfirstName: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insuredfirstName)
            : null,
          insuredmiddleName: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insuredmiddleName)
            : null,
          insureddob: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insureddob === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.primaryInsuranceDetail.insureddob, 'M/d/yyyy'))
            : null,
          insuredsex: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insuredsex)
            : null,
          eligibility: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.eligibility)
            : null,
          eligibilityCheckSelected: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.eligibilityCheckSelected)
            : null,
          policyNumber: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.policyNumber)
            : null,
          statusVerifiedDate: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.statusVerifiedDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.primaryInsuranceDetail.statusVerifiedDate, 'M/d/yyyy'))
            : null,
          group_name: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.group_name)
            : null,
          insurancePlanName: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insurancePlanName)
            : null,
          insurancePlanType: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insurancePlanType)
            : null,
          insuranceAddress: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insuranceAddress)
            : null,
          city: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.city)
            : null,
          state: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.state)
            : null,
          zipcode: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.zipcode)
            : null,
          endDate: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.endDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.primaryInsuranceDetail.endDate, 'M/d/yyyy'))
            : null,
          startDate: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.startDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.primaryInsuranceDetail.startDate, 'M/d/yyyy'))
            : null,
          mrnNumber: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.mrnNumber)
            : null,
        },
        secondaryInsuranceDetail: {
          ssn: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.ssn)
            : null,
          mop: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.mop)
            : null,
          patientRelationInsured: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.patientRelationInsured)
            : null,
          id: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.id)
            : null,
          insuredlastName: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insuredlastName)
            : null,
          insuredfirstName: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insuredfirstName)
            : null,
          insuredmiddleName: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insuredmiddleName)
            : null,
          insureddob: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insureddob === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insureddob, 'M/d/yyyy'))
            : null,
          insuredsex: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insuredsex)
            : null,
          eligibility: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.eligibility)
            : null,
          eligibilityCheckSelected: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.eligibilityCheckSelected)
            : null,
          policyNumber: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.policyNumber)
            : null,
          statusVerifiedDate: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.statusVerifiedDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.secondaryInsuranceDetail.statusVerifiedDate, 'M/d/yyyy'))
            : null,
          group_name: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.group_name)
            : null,
          insurancePlanName: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insurancePlanName)
            : null,
          insurancePlanType: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insurancePlanType)
            : null,
          insuranceAddress: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insuranceAddress)
            : null,
          city: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.city)
            : null,
          state: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.state)
            : null,
          zipcode: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.zipcode)
            : null,
          endDate: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.endDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.secondaryInsuranceDetail.endDate, 'M/d/yyyy'))
            : null,
          startDate: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.startDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.secondaryInsuranceDetail.startDate, 'M/d/yyyy'))
            : null,
          mrnNumber: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.mrnNumber)
            : null,
        },
        tertiaryInsuranceDetail: {
          ssn: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.ssn)
            : null,
          mop: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.mop)
            : null,
          patientRelationInsured: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.patientRelationInsured)
            : null,
          id: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.id)
            : null,
          insuredlastName: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insuredlastName)
            : null,
          insuredfirstName: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insuredfirstName)
            : null,
          insuredmiddleName: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insuredmiddleName)
            : null,
          insureddob: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insureddob === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insureddob, 'M/d/yyyy'))
            : null,
          insuredsex: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insuredsex)
            : null,
          eligibility: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.eligibility)
            : null,
          eligibilityCheckSelected: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.eligibilityCheckSelected)
            : null,
          policyNumber: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.policyNumber)
            : null,
          statusVerifiedDate: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.statusVerifiedDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.statusVerifiedDate, 'M/d/yyyy'))
            : null,
          group_name: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.group_name)
            : null,
          insurancePlanName: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insurancePlanName)
            : null,
          insurancePlanType: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insurancePlanType)
            : null,
          insuranceAddress: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insuranceAddress)
            : null,
          city: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.city)
            : null,
          state: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.state)
            : null,
          zipcode: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.zipcode)
            : null,
          endDate: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.endDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.endDate, 'M/d/yyyy'))
            : null,
          startDate: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.startDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.startDate, 'M/d/yyyy'))
            : null,
          mrnNumber: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.mrnNumber)
            : null,
        },
      },

      providerDetail: {
        id: patient.providerDetail.id ? (patient.providerDetail.id) : null,
        requestingProviderIDNumber: patient.providerDetail.requestingProviderIDNumber ?
          (patient.providerDetail.requestingProviderIDNumber) : null,
        requestingAgency: patient.providerDetail.requestingAgency ? (patient.providerDetail.requestingAgency) : null,
        providerName: patient.providerDetail.providerName ? (patient.providerDetail.providerName) : null,
        providerTaxIDNumber: patient.providerDetail.providerTaxIDNumber ?
          (patient.providerDetail.providerTaxIDNumber) : null,
        phoneNumber: patient.providerDetail.phoneNumber ? (patient.providerDetail.phoneNumber) : null,
        extension: patient.providerDetail.extension ? (patient.providerDetail.extension) : null,
        faxNumber: patient.providerDetail.faxNumber ? (patient.providerDetail.faxNumber) : null,
      },

      admissionDetail: {
        id: patient.admissionDetail.id ? (patient.admissionDetail.id) : null,
        mrnNumber: patient.admissionDetail.mrnNumber ? (patient.admissionDetail.mrnNumber) : null,
        requestType: patient.admissionDetail.requestType ? (patient.admissionDetail.requestType) : null,
        admissionDate: patient.admissionDetail.dischargeDate ? (patient.admissionDetail.admissionDate === '' ? '' :
          this.datePipe.transform(patient.admissionDetail.admissionDate, 'M/d/yyyy')) : null,
        dischargeDate: patient.admissionDetail.dischargeDate ? (patient.admissionDetail.dischargeDate === '' ? '' :
          this.datePipe.transform(patient.admissionDetail.dischargeDate, 'M/d/yyyy')) : null,
        referringPhysician: patient.admissionDetail.referringPhysician ?
          (patient.admissionDetail.referringPhysician) : null,
        primaryDiagnosis: patient.admissionDetail.primaryDiagnosis ? (patient.admissionDetail.primaryDiagnosis) : null,
        primaryDiagnosisDescription: patient.admissionDetail.primaryDiagnosisDescription ?
          (patient.admissionDetail.primaryDiagnosisDescription) : null,
      },

      requestFor: {
        id: patient.requestFor.id ? (patient.requestFor.id) : null,
        mrnNumber: patient.requestFor.mrnNumber ? (patient.requestFor.mrnNumber) : null,
        newadmissionService: patient.requestFor.newadmissionService ? (patient.requestFor.newadmissionService) : null,

        additionalServices: {
          id: patient.requestFor.additionalServices ? (patient.requestFor.additionalServices.id) : null,
          previousAuthorizationNumber: patient.requestFor.additionalServices ?
            (patient.requestFor.additionalServices.previousAuthorizationNumber) : null,
          numberOfServiceCompletedTillDate: patient.requestFor.additionalServices ?
            (patient.requestFor.additionalServices.numberOfServiceCompletedTillDate) : null,
          fromDate: patient.requestFor.additionalServices ? (patient.requestFor.additionalServices.fromDate === '' ? '' :
            this.datePipe.transform(patient.requestFor.additionalServices.fromDate, 'M/d/yyyy')) : null,
          toDate: patient.requestFor.additionalServices ? (patient.requestFor.additionalServices.toDate === '' ? '' :
            this.datePipe.transform(patient.requestFor.additionalServices.toDate, 'M/d/yyyy')) : null,
          serviceflag: patient.requestFor.additionalServices ? (patient.requestFor.additionalServices.serviceflag) : null,
        },

        extension: {
          id: patient.requestFor.extension ? (patient.requestFor.extension.id) : null,
          previousAuthorizationNumber: patient.requestFor.extension ?
            (patient.requestFor.extension.previousAuthorizationNumber) : null,
          fromDate: patient.requestFor.extension ? (patient.requestFor.extension.fromDate === '' ? '' :
            this.datePipe.transform(patient.requestFor.extension.fromDate, 'M/d/yyyy')) : null,
          toDate: patient.requestFor.extension ? (patient.requestFor.extension.toDate === '' ? '' :
            this.datePipe.transform(patient.requestFor.extension.toDate, 'M/d/yyyy')) : null,
          serviceflag: patient.requestFor.extension ? (patient.requestFor.extension.serviceflag) : null,
        }
      },

      requestService: {
        id: patient.requestService.id ? (patient.requestService.id) : null,
        mrnNumber: patient.requestService.mrnNumber ? (patient.requestService.mrnNumber) : null,

        homeHealthAide: {
          id: patient.requestService.homeHealthAide ? (patient.requestService.homeHealthAide.id) : null,
          mrnNumber: patient.requestService.homeHealthAide ? (patient.requestService.homeHealthAide.mrnNumber) : null,
          revenueCode: patient.requestService.homeHealthAide ? (patient.requestService.homeHealthAide.revenueCode)
            : null,
          visits: patient.requestService.homeHealthAide ? (patient.requestService.homeHealthAide.visits) : null,
          units: patient.requestService.homeHealthAide ? (patient.requestService.homeHealthAide.units) : null,
          homeHealthAide: patient.requestService.homeHealthAide ? (patient.requestService.homeHealthAide.homeHealthAide)
            : null,
        },

        medicalSocialWork: {
          id: patient.requestService.medicalSocialWork ? (patient.requestService.medicalSocialWork.id) : null,
          mrnNumber: patient.requestService.medicalSocialWork ? (patient.requestService.medicalSocialWork.mrnNumber) : null,
          revenueCode: patient.requestService.medicalSocialWork ? (patient.requestService.medicalSocialWork.revenueCode)
            : null,
          visits: patient.requestService.medicalSocialWork ? (patient.requestService.medicalSocialWork.visits) : null,
          units: patient.requestService.medicalSocialWork ? (patient.requestService.medicalSocialWork.units) : null,
          medicalSocialWork: patient.requestService.medicalSocialWork ? (patient.requestService.medicalSocialWork.medicalSocialWork)
            : null,
        },

        occupationTherapy: {
          id: patient.requestService.occupationTherapy ? (patient.requestService.occupationTherapy.id) : null,
          mrnNumber: patient.requestService.occupationTherapy ? (patient.requestService.occupationTherapy.mrnNumber) : null,
          revenueCode: patient.requestService.occupationTherapy ? (patient.requestService.occupationTherapy.revenueCode)
            : null,
          visits: patient.requestService.occupationTherapy ? (patient.requestService.occupationTherapy.visits) : null,
          units: patient.requestService.occupationTherapy ? (patient.requestService.occupationTherapy.units) : null,
          occupationTherapy: patient.requestService.occupationTherapy ? (patient.requestService.occupationTherapy.occupationTherapy)
            : null,
        },

        skilledNursing: {
          id: patient.requestService.skilledNursing ? (patient.requestService.skilledNursing.id) : null,
          mrnNumber: patient.requestService.skilledNursing ? (patient.requestService.skilledNursing.mrnNumber) : null,
          revenueCode: patient.requestService.skilledNursing ? (patient.requestService.skilledNursing.revenueCode)
            : null,
          visits: patient.requestService.skilledNursing ? (patient.requestService.skilledNursing.visits) : null,
          units: patient.requestService.skilledNursing ? (patient.requestService.skilledNursing.units) : null,
          skilledNursing: patient.requestService.skilledNursing ? (patient.requestService.skilledNursing.skilledNursing)
            : null,
        },

        physicalTherapy: {
          id: patient.requestService.physicalTherapy ? (patient.requestService.physicalTherapy.id) : null,
          mrnNumber: patient.requestService.physicalTherapy ? (patient.requestService.physicalTherapy.mrnNumber) : null,
          revenueCode: patient.requestService.physicalTherapy ? (patient.requestService.physicalTherapy.revenueCode)
            : null,
          visits: patient.requestService.physicalTherapy ? (patient.requestService.physicalTherapy.visits) : null,
          units: patient.requestService.physicalTherapy ? (patient.requestService.physicalTherapy.units) : null,
          physicalTherapy: patient.requestService.physicalTherapy ? (patient.requestService.physicalTherapy.physicalTherapy)
            : null,
        },

        speechPathology: {
          id: patient.requestService.speechPathology ? (patient.requestService.speechPathology.id) : null,
          mrnNumber: patient.requestService.speechPathology ? (patient.requestService.speechPathology.mrnNumber) : null,
          revenueCode: patient.requestService.speechPathology ? (patient.requestService.speechPathology.revenueCode)
            : null,
          visits: patient.requestService.speechPathology ? (patient.requestService.speechPathology.visits) : null,
          units: patient.requestService.speechPathology ? (patient.requestService.speechPathology.units) : null,
          speechPathology: patient.requestService.speechPathology ? (patient.requestService.speechPathology.speechPathology)
            : null,
        }

      },

    };
    // formData.insuranceDetailPreAuth.insuranceTypeSelcted = 'primaryInsuranceDetail';
    this.preAuthForm.setValue(formData);
    this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'primaryInsuranceDetail' });
    console.log('Form Populated Data ', formData);
  }
  /* Populating Form Data */


  /* Request for New Admission Service via Radio button starts */
  onNewServiceChange() {
    console.log(this.newAdmissService.checked);
  }

  get serviceflag() {
    return this.preAuthForm.get('requestFor').get('extension').get('serviceflag').value;
  }

  onExtensionChange() {
    console.log(this.extensionOnly.checked);
    if (this.extensionOnly.checked) {
      this.preAuthForm.patchValue({ serviceflag: true });
      // get('requestFor').get('extension').get('serviceflag') as FormContro.value = true;
    }
  }

  onAddServiceChange() {
    console.log(this.additionalService.checked);
  }
  /* Request for New Admission Service via Radio button ends */
  /*Save as Draft */
  onSave(selectedPatientData: PreAuthFormModelResponse) {
    /*
    if (this.preAuthFormService.patientForm.valid) {
      if (!this.preAuthFormService.patientForm.get('$key').value) {
        // this.preAuthFormService.insertOrCreatePatient(this.preAuthFormService.patientForm.value);
      } else {
        // this.toasterService.success(':: Submitted Successfully');
        this.preAuthFormService.updatePatient(this.preAuthFormService.patientForm.value);
        this.preAuthFormService.patientForm.reset();
        // this.preAuthFormService.clearFormData(); // initializeFormGroup() = clearFormData()
        // this.toasterService.success(':: Submitted Successfully');
        this.onClose();
      }
    }

    */
    this.preAuthService.saveOrDraftPatientData(selectedPatientData).subscribe((saveResponse) => {
      if (saveResponse) {
        // this.preAuthformDetails = selectedPatAuthformInfo;
        // this.preAuthformDetails = { ...selectedPatAuthformInfo };
        //  selectedPatAuthformInfo[0].insuranceDetailPreAuth.insuranceTypeSelcted = 'primaryInsuranceDetail';
        console.log('Save Respon ', saveResponse);
        this.onClose();
      }
    },
      (error) => {
        console.log(error);
        this.onClose();
      });

    console.log('On Save ', selectedPatientData);
  }

  /*Edit Form*/
  onEditForm(preAuthForm) {

    // this.newAdmissService.disabled = false;
    // this.additionalService.disabled = false;
    // this.extensionOnly.disabled = false;

    // const ctrl = this.preAuthForm.get('currenttimdate');
    // preAuthForm.controls.currenttimdate.enabled();
    // if (event.value === 'currenttimdate') {
    //   ctrl.enable();
    // } else {
    //   ctrl.disable();
    // }
    // this.editForm = true;
    // this.preAuthService.postPreauthPatientData(this.selectedPatientViaDialog).subscribe((selectedPatAuthformInfo) => {
    //   if (selectedPatAuthformInfo) {
    //     // this.preAuthformDetails = selectedPatAuthformInfo;
    //     // this.preAuthformDetails = { ...selectedPatAuthformInfo };
    //     this.populatePatientFormData(selectedPatAuthformInfo[0]);
    //   }
    // },
    //   (error) => {
    //     console.log(error);
    //   });
  }

  /*On Send Request for PreAutorization*/
  onSendRequest() {

  }

  /* Common getters for drop down values */
  get genders() {
    return this.commonService.getGenders();
  }

  get cities() {
    return this.commonService.getCities();
  }

  get payments() {
    return this.commonService.getPayments();
  }

  get insurancePlans() {
    return this.commonService.getPlans();
  }

  get relations() {
    return this.commonService.getRelations();
  }

  get states() {
    return this.commonService.getStates();
  }

  get suffixes() {
    return this.commonService.getSuffixes();
  }

  get requestTypes() {
    return this.commonService.getRequestTypes();
  }

  get insuranceTypes() {
    return this.commonService.getInsuranceTypes();
  }


  /* Common getters for drop down values */

  onClose() {
    // this.preAuthFormService.patientForm.reset();
    // this.preAuthFormService.clearFormValues();
    this.dialogRef.close();
    // this.toasterService.success(':: Submitted Successfully');
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }


  onEligibilityCheck() {
    console.log('Data Received From Patient List: Start');
    console.log(this.selectedPatientViaDialog);
    console.log('Data Received From Patient List: Ends');
    // this.patientFormService.dataForEligibilityCheck(this.patientFormService.form.value);
    setTimeout(() => {
      const config = new MatDialogConfig();
      config.disableClose = true; // does not allow to close popup on clicking ESC or outside popup
      config.autoFocus = false; // does not allow popup to focus on any field or icon
      config.hasBackdrop = true;
      config.width = '40%';
      config.data = { heading: 'Verify Eligibility', form: this.selectedPatientViaDialog };
      const dialogRef = this.dialog.open(StackedModalComponent, config);
      // dialogRef.afterOpened().subscribe(result => {
      //   console.log('Dialog Opend:' + result);
      // });
      dialogRef.afterClosed().subscribe(result => {
        console.log('Stacked Dialog Closed: true / false will come ' + result);
        // this.toasterService.success(':: Submitted Successfully');
        // this.insuranceList = this.eligibilityCheckService.getEligibilityCheckData();
        console.log('Data received from stacked model to patient component start : Acknowlegement of eligi chk');
        // console.log(this.insuranceList);
        console.log('Data received from stacked model to patient component ends');
        // console.log(this.eligibilityCheckService.getEligibilityCheckData().value);
        // if (this.insuranceList) {
        //   this.ngOnInit();
        //   console.log('ngOnInit() was executed for patient component');
        // }
        if (result) {
          console.log('Confirm is clicked: ' + result);
        }

      });
    });
  }



  /* On Selection of Insurance Type Drop down */
  selectedInsuranceType(event) {
    // console.log(event.source.value);
    if (event.source.value === 'primaryInsuranceDetail') {
      this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'primaryInsuranceDetail' });
    } else if (event.source.value === 'secondaryInsuranceDetail') {
      this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'secondaryInsuranceDetail' });
    } else if (event.source.value === 'tertiaryInsuranceDetail') {
      this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'tertiaryInsuranceDetail' });
    }

    // switch (event.source.value) {
    //   case 'primaryInsuranceDetail': {
    //     this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: null });
    //     this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'primaryInsuranceDetail' });
    //     // this.preAuthForm.get('insuranceDetailPreAuth').get('primaryInsuranceDetail').patchValue({ eligibilityCheckSelected: 'true' });
    //     console.log('Primary selected and eligibilityCheckSelected = true :', this.preAuthForm.value);
    //     // this.primaryInsuranceSelected = true;
    //     // this.secondaryInsuranceSelected = false;
    //     // this.tertiaryInsuranceSelected = false;
    //     break;
    //   }
    //   case 'secondaryInsuranceDetail': {
    //     this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: null });
    //     this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'secondaryInsuranceDetail' });
    //     // this.primaryInsuranceSelected = false;
    //     // this.secondaryInsuranceSelected = true;
    //     // this.tertiaryInsuranceSelected = false;
    //     // console.log('Selcted Insu: ', event.source.value);
    //     // this.selectedPatientViaDialog.insuranceDetailPreAuth.primaryInsuranceDetail.eligibilityCheckSelected = false;
    //     // this.selectedPatientViaDialog.insuranceDetailPreAuth.secondaryInsuranceDetail.eligibilityCheckSelected = true;
    //     // this.selectedPatientViaDialog.insuranceDetailPreAuth.tertiaryInsuranceDetail.eligibilityCheckSelected = false;
    //     break;
    //   }
    //   case 'tertiaryInsuranceDetail': {
    //     this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: null });
    //     this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'tertiaryInsuranceDetail' });
    //     // this.primaryInsuranceSelected = false;
    //     // this.secondaryInsuranceSelected = false;
    //     // this.tertiaryInsuranceSelected = true;
    //     break;
    //   }
    //   default: {
    //     this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: null });
    //     // this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'null' });
    //     // this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'primaryInsuranceDetail' });
    //     // this.primaryInsuranceSelected = false;
    //     // this.secondaryInsuranceSelected = false;
    //     // this.tertiaryInsuranceSelected = false;
    //     break;
    //   }
    // }
  }
  /* On Selection of Insurance Type Drop down */

  primarySelected(event) {
    // event.stopPropagation();
    // this.selectedPatientViaDialog.insuranceDetailPreAuth.primaryInsuranceDetail.eligibilityCheckSelected =
    //   !this.selectedPatientViaDialog.insuranceDetailPreAuth.primaryInsuranceDetail.eligibilityCheckSelected;
    // console.log(this.selectedPatientViaDialog.insuranceDetailPreAuth.primaryInsuranceDetail.eligibilityCheckSelected);
  }

  secondarySelected(event) {
    // event.stopPropagation();
    // this.selectedPatientViaDialog.insuranceDetailPreAuth.secondaryInsuranceDetail.eligibilityCheckSelected =
    //   !this.selectedPatientViaDialog.insuranceDetailPreAuth.secondaryInsuranceDetail.eligibilityCheckSelected;
    // console.log(this.selectedPatientViaDialog.insuranceDetailPreAuth.secondaryInsuranceDetail.eligibilityCheckSelected);
  }

  tertiarySelected(event) {
    //   event.stopPropagation();
    //   this.selectedPatientViaDialog.insuranceDetailPreAuth.tertiaryInsuranceDetail.eligibilityCheckSelected =
    //     !this.selectedPatientViaDialog.insuranceDetailPreAuth.tertiaryInsuranceDetail.eligibilityCheckSelected;
    //   console.log(this.selectedPatientViaDialog.insuranceDetailPreAuth.tertiaryInsuranceDetail.eligibilityCheckSelected);
  }

  get secondaryInsuranceDetail() {
    return this.preAuthForm.get('insuranceDetailPreAuth.secondaryInsuranceDetail').value.eligibilityCheckSelected;
  }

  get tertiaryInsuranceDetail() {
    return this.preAuthForm.get('insuranceDetailPreAuth.tertiaryInsuranceDetail').value.eligibilityCheckSelected;
  }

  get primaryInsuranceDetail() {
    return this.preAuthForm.get('insuranceDetailPreAuth.primaryInsuranceDetail').value.eligibilityCheckSelected;
  }


  phyThepySelected(event) {
    // event.stopPropagation();
    // this.selectedPatientViaDialog.requestService.physicalTherapy.physicalTherapy =
    //   !this.selectedPatientViaDialog.requestService.physicalTherapy.physicalTherapy;

    // console.log(this.selectedPatientViaDialog.requestService.physicalTherapy.physicalTherapy);
  }



}
