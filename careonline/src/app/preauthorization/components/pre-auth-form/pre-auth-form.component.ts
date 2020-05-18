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
import {
  Sex, Suffix, Genders, Plans, City, State, Relation,
  Payment, RequestTypes, InsuranceTypes, RequestFor
} from '../../../preauthorization/models/preauth-common.model';


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
  requestedFor: string;
  isNewAdmission = false;
  isNewAdmissionSelected = false;
  isAdditional = false;
  isExtension = false;
  isNewServiceChecked = false;
  isExtOnlyChecked = false;
  isAddSerChecked = false;
  noActionTaken = false;
  savedAsDraft = false;
  isFormUpdated = false;
  isReadonly = true;
  editing = true;
  // toSelect = this.insuranceTypes().find(c => c.name === 'Primary Insurance');
  // this.patientCategory.get('patientCategory').setValue(toSelect);

  /* Common Data Source from api*/
  genders: Genders[];
  relations: Relation[];
  states: State[];
  cities: City[];
  payments: Payment[];
  insurancePlans: Plans[];
  suffixes: Suffix[];
  requestTypes: RequestTypes[];
  requestFor: RequestFor[];
  insuranceTypes: InsuranceTypes[];

  /* Common Data Source from api*/

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
    id: new FormControl({ value: '', disabled: false }),
    mrnNumber: new FormControl({ value: '', disabled: false }),
    currenttimdate: new FormControl({ value: (new Date()).toISOString(), disabled: false }),

    preAuthDemographics: new FormGroup({
      // id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }),
      lastName: new FormControl({ value: '', disabled: false }, []),
      firstName: new FormControl({ value: '', disabled: false }, []),
      middleName: new FormControl({ value: '', disabled: false }, []),
      dob: new FormControl({ value: '', disabled: false }, []),
      gender: new FormControl({ value: '', disabled: false }, []),
      suffix: new FormControl({ value: '', disabled: false }),
      ssn: new FormControl({ value: '', disabled: false }),
    }),

    insuranceDetailPreAuth: new FormGroup({
      mrnNumber: new FormControl({ value: '', disabled: false }),
      insuranceTypeSelcted: new FormControl({ value: '', disabled: false }),
      primaryInsuranceDetail: this.createInsuranceFormGroup(),
      secondaryInsuranceDetail: this.createInsuranceFormGroup(),
      tertiaryInsuranceDetail: this.createInsuranceFormGroup(),
    }),

    providerDetail: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      requestingProviderIDNumber: new FormControl({ value: '', disabled: false }),
      requestingAgency: new FormControl({ value: '', disabled: false }),
      providerName: new FormControl({ value: '', disabled: false }),
      providerTaxIDNumber: new FormControl({ value: '', disabled: false }),
      phoneNumber: new FormControl({ value: '', disabled: false }),
      extension: new FormControl({ value: '', disabled: false }),
      faxNumber: new FormControl({ value: '', disabled: false }),
    }),

    admissionDetail: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }),
      requestType: new FormControl({ value: '', disabled: false }),
      admissionDate: new FormControl({ value: '', disabled: false }),
      dischargeDate: new FormControl({ value: '', disabled: false }),
      referringPhysician: new FormControl({ value: '', disabled: false }),
      primaryDiagnosis: new FormControl({ value: '', disabled: false }),
      primaryDiagnosisDescription: new FormControl({ value: '', disabled: false }),
    }),

    requestFor: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }),
      newadmissionService: new FormControl({ value: '', disabled: false }),
      additionalServices: new FormGroup({
        // this.createAdditionalServicesFormGroup(),

        id: new FormControl({ value: '', disabled: false }),
        previousAuthorizationNumber: new FormControl({ value: '', disabled: false }),
        numberOfServiceCompletedTillDate: new FormControl({ value: '', disabled: false }),
        fromDate: new FormControl({ value: '', disabled: false }, [Validators.required]),
        toDate: new FormControl({ value: '', disabled: false }, [Validators.required]),
        serviceflag: new FormControl({ value: false, disabled: false }),
      }),

      extension: this.createExtensionFormGroup(),
    }),

    requestService: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }),
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
      ssn: new FormControl({ value: '', disabled: false }, [Validators.required]),
      mop: new FormControl({ value: '', disabled: false }),
      patientRelationInsured: new FormControl({ value: '', disabled: false }, [Validators.required]),
      insuredlastName: new FormControl({ value: '', disabled: false }, [Validators.required]),
      insuredfirstName: new FormControl({ value: '', disabled: false }, [Validators.required]),
      insuredmiddleName: new FormControl({ value: '', disabled: false }),
      insureddob: new FormControl({ value: '', disabled: false }, [Validators.required]),
      insuredsex: new FormControl({ value: '', disabled: false }, [Validators.required]),
      eligibility: new FormControl({ value: '', disabled: false }),
      eligibilityCheckSelected: new FormControl({ value: '', disabled: false }),
      id: new FormControl({ value: '', disabled: false }),
      statusVerifiedDate: new FormControl({ value: '', disabled: false }),
      policyNumber: new FormControl({ value: '', disabled: false }, [Validators.required]),
      group_name: new FormControl({ value: '', disabled: false }),
      insurancePlanName: new FormControl({ value: '', disabled: false }, [Validators.required]),
      insurancePlanType: new FormControl({ value: '', disabled: false }, [Validators.required]),
      insuranceAddress: new FormControl({ value: '', disabled: false }, [Validators.required]),
      city: new FormControl({ value: '', disabled: false }, [Validators.required]),
      state: new FormControl({ value: '', disabled: false }, [Validators.required]),
      zipcode: new FormControl({ value: '', disabled: false }, [Validators.required]),
      endDate: new FormControl({ value: '', disabled: false }, [Validators.required]),
      startDate: new FormControl({ value: '', disabled: false }, [Validators.required]),
      mrnNumber: new FormControl({ value: '', disabled: false }),
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
      id: new FormControl({ value: '', disabled: false }),
      previousAuthorizationNumber: new FormControl({ value: '', disabled: false }),
      fromDate: new FormControl({ value: '', disabled: false }, [Validators.required]),
      toDate: new FormControl({ value: '', disabled: false }, [Validators.required]),
      serviceflag: new FormControl({ value: '', disabled: false }),
    });
  }

  createMedicalSocialWorkFormGroup() {
    return new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }),
      revenueCode: new FormControl({ value: '', disabled: false }),
      visits: new FormControl({ value: '', disabled: false }),
      units: new FormControl({ value: '', disabled: false }),
      medicalSocialWork: new FormControl({ value: '', disabled: false }),
    });
  }

  createOccupationTherapyFormGroup() {
    return new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }),
      revenueCode: new FormControl({ value: '', disabled: false }),
      visits: new FormControl({ value: '', disabled: false }),
      units: new FormControl({ value: '', disabled: false }),
      occupationTherapy: new FormControl({ value: '', disabled: false }),
    });
  }

  createSkilledNursingFormGroup() {
    return new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }),
      revenueCode: new FormControl({ value: '', disabled: false }),
      visits: new FormControl({ value: '', disabled: false }),
      units: new FormControl({ value: '', disabled: false }),
      skilledNursing: new FormControl({ value: '', disabled: false }),
    });
  }

  createPhysicalTherapyFormGroup() {
    return new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }),
      revenueCode: new FormControl({ value: '', disabled: false }),
      visits: new FormControl({ value: '', disabled: false }),
      units: new FormControl({ value: '', disabled: false }),
      physicalTherapy: new FormControl({ value: '', disabled: false }),
    });
  }

  createSpeechPathologyFormGroup() {
    return new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }),
      revenueCode: new FormControl({ value: '', disabled: false }),
      visits: new FormControl({ value: '', disabled: false }),
      units: new FormControl({ value: '', disabled: false }),
      speechPathology: new FormControl({ value: '', disabled: false }),
    });
  }

  createHomeHealthAideFormGroup() {
    return new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }),
      revenueCode: new FormControl({ value: '', disabled: false }),
      visits: new FormControl({ value: '', disabled: false }),
      units: new FormControl({ value: '', disabled: false }),
      homeHealthAide: new FormControl({ value: '', disabled: false }),
    });
  }

  /* Building Form */

  /* Common Methods */
  commonMethods() {
    this.genders = this.commonService.getGenders();
    this.cities = this.commonService.getCities();
    this.payments = this.commonService.getPayments();
    this.insurancePlans = this.commonService.getPlans();
    this.relations = this.commonService.getRelations();
    this.states = this.commonService.getStates();
    this.suffixes = this.commonService.getSuffixes();
    this.requestTypes = this.commonService.getRequestTypes();
    this.requestFor = this.commonService.getRequestFor();
    this.insuranceTypes = this.commonService.getInsuranceTypes();
    console.log(this.insuranceTypes);
  }
  /* Common methods */

  ngOnInit() {
    this.commonMethods();
    console.log('Data via list page ', this.selectedPatientViaDialog);


    if (this.selectedPatientViaDialog.episode.preauthFormStatus === 'No Action Taken') {
      this.noActionTaken = true;
      this.isNewAdmission = true;
      this.isAdditional = false;
      this.isExtension = false;
      // this.isExtOnlyChecked = false;
      // this.isAddSerChecked = false;
      // this.isNewServiceChecked = false;
    }

    if (this.selectedPatientViaDialog.episode.preauthFormStatus === 'Saved As Draft') {
      this.noActionTaken = true;
      this.savedAsDraft = true;
      this.isNewAdmission = true;
      this.isAdditional = false;
      this.isExtension = false;
    }

    if (this.selectedPatientViaDialog.episode.preauthFormStatus === 'Sent For Approval') {
      this.isNewAdmission = false;
      this.isAdditional = true;
      this.isExtension = true;
    }

    this.preAuthService.viewEditPatientData(this.selectedPatientViaDialog).subscribe((selectedPatAuthformInfo) => {
      if (selectedPatAuthformInfo) {
        this.isLoadingResults = false;
        // this.preAuthformDetails = { ...selectedPatAuthformInfo };
        //  selectedPatAuthformInfo[0].insuranceDetailPreAuth.insuranceTypeSelcted = 'primaryInsuranceDetail';

        /* For Cecking and unckecking radio buttons */
        if (selectedPatAuthformInfo[0].requestFor.newadmissionService === true) {
          this.isNewServiceChecked = true;
          this.isNewAdmission = false;
          this.isAdditional = true;
          this.isExtension = true;
          console.log('Additional Service is "False"');
          console.log('"requestFor" error cuz api is not returning data');
        } else {
          // this.isAdditional = false;
        }

        if (selectedPatAuthformInfo[0].requestFor.additionalServices.serviceflag === true) {
          this.isAddSerChecked = true;
        }
        if (selectedPatAuthformInfo[0].requestFor.extension.serviceflag === true) {
          this.isExtOnlyChecked = true;
        }
        /* For Cecking and unckecking radio buttons */

        if (selectedPatAuthformInfo[0].requestFor.additionalServices.serviceflag === false) {
          this.isAdditional = false;
          console.log('Additional Service is "False"');
          console.log('"requestFor" error cuz api is not returning data');
        } else {
          this.isAdditional = false;
        }

        if (selectedPatAuthformInfo[0].requestFor.extension.serviceflag === false) {
          this.isExtension = false;
          console.log('Extension Service is "False"');
          console.log('"extension" error cuz api is not returning data');
        } else {
          this.isAdditional = false;
        }

        if ((selectedPatAuthformInfo[0].requestFor.additionalServices.serviceflag === false) &&
          (selectedPatAuthformInfo[0].requestFor.extension.serviceflag === false)) {
          // selectedPatAuthformInfo[0].requestFor.newadmissionService === false
          console.log('Both Additional and Extension Service is "False" enabling newService true for ui show');
          this.isNewAdmission = true;
        }

        this.populatePatientFormData(selectedPatAuthformInfo[0]);
      }
    },
      (error) => {
        console.log(error);
      });

    //  this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'primaryInsuranceDetail' });
  }

  /* Populating Form Data */
  populatePatientFormData(patient: PreAuthFormModelResponse) {
    console.log('Pat data ', patient);

    const formData: PreAuthFormModelResponse = {
      id: patient.id,
      mrnNumber: patient.mrnNumber,
      // currenttimdate: patient.currenttimdate === '' ? '' : this.datePipe.transform(patient.currenttimdate, 'M/d/yyyy'),
      currenttimdate: (new Date()).toISOString(),
      // === '' ? '' : this.datePipe.transform(patient.currenttimdate, 'yyyy-MM-dd'),
      preAuthDemographics: {
        mrnNumber: patient.preAuthDemographics.mrnNumber ? (patient.preAuthDemographics.mrnNumber) : null,
        firstName: patient.preAuthDemographics.firstName ? (patient.preAuthDemographics.firstName) : null,
        lastName: patient.preAuthDemographics.lastName ? (patient.preAuthDemographics.lastName) : null,
        middleName: patient.preAuthDemographics.middleName ? (patient.preAuthDemographics.middleName) : null,
        suffix: patient.preAuthDemographics.suffix ? (patient.preAuthDemographics.suffix) : null,
        gender: patient.preAuthDemographics.gender ? (patient.preAuthDemographics.gender) : null,
        // dob: patient.preAuthDemographics ? (patient.preAuthDemographics.dob === '' ? '' :
        //   this.datePipe.transform(patient.preAuthDemographics.dob, 'yyyy-MM-dd')) : null,
        dob: (new Date(patient.preAuthDemographics.dob)).toISOString(),
        ssn: patient.preAuthDemographics.ssn ? (patient.preAuthDemographics.ssn) : null,
      },

      insuranceDetailPreAuth: {
        mrnNumber: patient.insuranceDetailPreAuth.mrnNumber ?
          (patient.insuranceDetailPreAuth.mrnNumber) : null,
        insuranceTypeSelcted: patient.insuranceDetailPreAuth.insuranceTypeSelcted,
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
          insureddob: (new Date(patient.insuranceDetailPreAuth.primaryInsuranceDetail.insureddob)).toISOString(),
          // patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
          //   (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insureddob) : null,
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
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.statusVerifiedDate)
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
          endDate: (new Date(patient.insuranceDetailPreAuth.primaryInsuranceDetail.endDate)).toISOString(),
          startDate: (new Date(patient.insuranceDetailPreAuth.primaryInsuranceDetail.startDate)).toISOString(),
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
          insureddob: (new Date(patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insureddob)).toISOString(),
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
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.statusVerifiedDate)
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
          // endDate: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
          //   (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.endDate)
          //   : null,
          // startDate: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
          //   (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.startDate)
          //   : null,
          endDate: (new Date(patient.insuranceDetailPreAuth.secondaryInsuranceDetail.endDate)).toISOString(),
          startDate: (new Date(patient.insuranceDetailPreAuth.secondaryInsuranceDetail.startDate)).toISOString(),
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
          // insureddob: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
          //   (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insureddob)
          //   : null,
          insureddob: (new Date(patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insureddob)).toISOString(),
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
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.statusVerifiedDate)
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
          endDate: (new Date(patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.endDate)).toISOString(),
          startDate: (new Date(patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.startDate)).toISOString(),
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
        admissionDate: (new Date(patient.admissionDetail.admissionDate)).toISOString(),
        // ? (patient.admissionDetail.admissionDate === '' ? '' :
        // this.datePipe.transform(patient.admissionDetail.admissionDate, 'yyyy-MM-dd')) : null,
        dischargeDate: (new Date(patient.admissionDetail.dischargeDate)).toISOString(),
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
          // fromDate: patient.requestFor.additionalServices ? (patient.requestFor.additionalServices.fromDate) : null,
          // toDate: patient.requestFor.additionalServices ? (patient.requestFor.additionalServices.toDate) : null,
          fromDate: (new Date(patient.requestFor.additionalServices.fromDate)).toISOString(),
          toDate: (new Date(patient.requestFor.additionalServices.toDate)).toISOString(),
          serviceflag: patient.requestFor.additionalServices ? (patient.requestFor.additionalServices.serviceflag) : null,
        },

        extension: {
          id: patient.requestFor.extension ? (patient.requestFor.extension.id) : null,
          previousAuthorizationNumber: patient.requestFor.extension ?
            (patient.requestFor.extension.previousAuthorizationNumber) : null,
          fromDate: (new Date(patient.requestFor.extension.fromDate)).toISOString(),
          toDate: (new Date(patient.requestFor.extension.toDate)).toISOString(),
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
    this.preAuthForm.get('requestFor').patchValue({ newadmissionService: this.newAdmissService.checked = true });
    //  this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'primaryInsuranceDetail' });
    console.log('Form Populated Data ', formData);
  }
  /* Populating Form Data */


  /* Request for New Admission Service via Radio button starts */
  onNewServiceChange(event) {
    if (this.newAdmissService.checked) {
      console.log('New Service', this.newAdmissService.checked.valueOf());
      // console.log('New Service2', event.target.value);
      this.isNewAdmissionSelected = true;
      // formcontrol =newadmissionService and template ref = newAdmissService
      this.preAuthForm.get('requestFor').patchValue({ newadmissionService: true });
      // this.isAddSerChecked = false;
      // this.isExtOnlyChecked = false;
    }
  }

  onExtensionChange() {
    console.log(this.extensionOnly.checked);
    if (this.extensionOnly.checked) {
      // this.preAuthForm.patchValue({ serviceflag: true });
      this.preAuthForm.get('requestFor').get('extension').patchValue({ serviceflag: true });
      // get('requestFor').get('extension').get('serviceflag') as FormContro.value = true;
      this.isNewServiceChecked = false;
      this.preAuthForm.get('requestFor').patchValue({ newadmissionService: false });
      // this.isAddSerChecked = false;
    }
  }

  onAddServiceChange() {
    if (this.additionalService.checked) {
      console.log(this.additionalService.checked);
      this.preAuthForm.get('requestFor').get('additionalService').patchValue({ serviceflag: true });
      //  this.isNewServiceChecked = false;
      this.isNewServiceChecked = false;
      this.preAuthForm.get('requestFor').patchValue({ newadmissionService: false });
    }
  }
  /* Request for New Admission Service via Radio button ends */
  /*Save as Draft */

  /*On Send Request for PreAutorization*/
  onSendRequest(selectedPatntData: PreAuthFormModelResponse) {
    // selectedPatientData.currenttimdate = new Date().toISOString();
    // console.log('Date after change ', selectedPatientData);
    console.log('Form data on send request', selectedPatntData);

    setTimeout(() => {
      // formcontrol =newadmissionService and template ref = newAdmissService
      if (this.isNewAdmissionSelected) {
        this.preAuthForm.get('requestFor').patchValue({ newadmissionService: true });
        // console.log('New Add selected after modific', this.newAdmissService.checked);
        // console.log('New Add selected after modific', this.newAdmissService.checked.valueOf());
      }

      const config = new MatDialogConfig();
      config.disableClose = true;
      config.autoFocus = false;
      config.hasBackdrop = true;
      config.width = '40%';
      config.data = {
        heading: '"Send Request" Confirmation Alert',
        messageContent: 'Do you want to "Send" the Preauthorization form?',
        selectedPatientData: selectedPatntData,
        actionType: 'sendRequest'
      };
      const dialogRef = this.dialog.open(StackedModalComponent, config);

      dialogRef.afterClosed().subscribe(result => {
        console.log('Stacked Dialog Closed: true / false will come ' + result);
        if (result) {
          console.log('Confirm is clicked: ' + result);
          this.isFormUpdated = result;
          this.dialogRef.close(false);
        }

      });
    });
  }


  /* Common getters for drop down values */


  get serviceflag() {
    return this.preAuthForm.get('requestFor').get('extension').get('serviceflag').value;
  }

  get newadmissionService() {
    return this.preAuthForm.get('requestFor').get('newadmissionService').value;
  }
  /* Common getters for drop down values */

  onClose() {
    setTimeout(() => {
      // formcontrol =newadmissionService and template ref = newAdmissService
      // if (this.isNewAdmissionSelected) {
      //   this.preAuthForm.get('requestFor').patchValue({ newadmissionService: true });
      //   // console.log('New Add selected after modific', this.newAdmissService.checked);
      //   // console.log('New Add selected after modific', this.newAdmissService.checked.valueOf());
      // }

      const config = new MatDialogConfig();
      config.disableClose = true;
      config.autoFocus = false;
      config.hasBackdrop = true;
      config.width = '40%';
      config.data = {
        heading: '"Close" Confirmation Alert',
        messageContent: 'Do you want to "Close" without saving or sending the preauth form?',
        selectedPatientData: null,
        actionType: 'onXicon'
      };
      const dialogRef = this.dialog.open(StackedModalComponent, config);

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
          this.isFormUpdated = result;
        }

      });
    });
    //  this.preAuthForm.reset();
    //  this.dialogRef.close();
  }

  onNoClick(): void {
    //  this.dialogRef.close(false);
    // console.log('Form data on save', selectedPatntData);

    setTimeout(() => {
      // formcontrol =newadmissionService and template ref = newAdmissService
      // if (this.isNewAdmissionSelected) {
      //   this.preAuthForm.get('requestFor').patchValue({ newadmissionService: true });
      //   // console.log('New Add selected after modific', this.newAdmissService.checked);
      //   // console.log('New Add selected after modific', this.newAdmissService.checked.valueOf());
      // }

      const config = new MatDialogConfig();
      config.disableClose = true;
      config.autoFocus = false;
      config.hasBackdrop = true;
      config.width = '40%';
      config.data = {
        heading: '"Close" Confirmation Alert',
        messageContent: 'Do you want to "Close" without saving or sending the preauth form?',
        selectedPatientData: null,
        actionType: 'onCloseBtn'
      };
      const dialogRef = this.dialog.open(StackedModalComponent, config);

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
          this.dialogRef.close(false);
        }

      });
    });
  }

  onSave(selectedPatntData: PreAuthFormModelResponse) {
    // selectedPatientData.currenttimdate = new Date().toISOString();
    // console.log('Date after change ', selectedPatientData);
    console.log('Form data on save', selectedPatntData);

    setTimeout(() => {
      // formcontrol =newadmissionService and template ref = newAdmissService
      if (this.isNewAdmissionSelected) {
        this.preAuthForm.get('requestFor').patchValue({ newadmissionService: true });
        // console.log('New Add selected after modific', this.newAdmissService.checked);
        // console.log('New Add selected after modific', this.newAdmissService.checked.valueOf());
      }

      const config = new MatDialogConfig();
      config.disableClose = true;
      config.autoFocus = false;
      config.hasBackdrop = true;
      config.width = '40%';
      config.data = {
        heading: '"Save" Confirmation Alert',
        messageContent: 'Do you want to "Save" the content?',
        selectedPatientData: selectedPatntData,
        actionType: 'saveRequest'
      };
      const dialogRef = this.dialog.open(StackedModalComponent, config);

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
          this.isFormUpdated = result;
          this.dialogRef.close(false);
        }

      });
    });
  }

  /* On Selection of Insurance Type Drop down */
  selectedInsuranceType(event) {
    // console.log(event.source.value);
    //  this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: event.source.value });
    if (event.source.value === 'Primary Insurance') {
      this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'Primary Insurance' });
      // return true;
    } else if (event.source.value === 'Secondary Insurance') {
      this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'Secondary Insurance' });
    } else if (event.source.value === 'Tertiary Insurance') {
      this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'Tertiary Insurance' });
    }
  }
  /* On Selection of Insurance Type Drop down */
  /*
    primarySelected(event) {
      // event.stopPropagation();
      // this.selectedPatientViaDialog.insuranceDetailPreAuth.primaryInsuranceDetail.eligibilityCheckSelected =
      //   !this.selectedPatientViaDialog.insuranceDetailPreAuth.primaryInsuranceDetail.eligibilityCheckSelected;
      // console.log(this.selectedPatientViaDialog.insuranceDetailPreAuth.primaryInsuranceDetail.eligibilityCheckSelected);
    }

  // get primaryInsuranceDetail() {
  //   return this.preAuthForm.get('insuranceDetailPreAuth.primaryInsuranceDetail').value.eligibilityCheckSelected;
  // }

  */

  phyThepySelected(event) {
    // event.stopPropagation();
    // this.selectedPatientViaDialog.requestService.physicalTherapy.physicalTherapy =
    //   !this.selectedPatientViaDialog.requestService.physicalTherapy.physicalTherapy;

    // console.log(this.selectedPatientViaDialog.requestService.physicalTherapy.physicalTherapy);
  }

}
