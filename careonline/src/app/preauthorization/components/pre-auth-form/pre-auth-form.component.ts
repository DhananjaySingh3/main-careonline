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
import { PreAuthFormModelRequest } from '../../../preauthorization/models/pre-auth-form.model';
import { PreAuthReadResponse } from '../../../preauthorization/models/read-pre-auth.model';
import { StackedModalComponent } from '../../../preauthorization/components/stacked-modal/stacked-modal.component';
import {
  Suffix, Genders, Plans, City, State, Relation,
  Payment, RequestTypes, InsuranceTypes, RequestFor, CommunicationTypes
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
  isAddiServSelected = false;
  isExtOnlySelected = false;
  isAdditional = false;
  isExtension = false;
  isNewServiceChecked = false;
  isExtOnlyChecked = false;
  isAddSerChecked = false;
  noActionTaken = false;
  savedAsDraft = false;
  isFormUpdated = false;
  isReadonly = true;
  editing = false;

  visitsPattern = '^[0-9]{1,3}$';
  unitsPattern = '^[0-9]{1,3}$';
  // usernamePattern = '^[a-z0-9_-]{8,15}$';

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
  communicationTypes: CommunicationTypes[];

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

    enquiryDetails: new FormGroup({
      enquiryId: new FormControl({ value: '1234', disabled: false }),
      preauthReqSentDate: new FormControl({ value: (new Date('2020-06-04')).toISOString(), disabled: false }),
    }),

    preAuthDemographics: new FormGroup({
      mrnNumber: new FormControl({ value: '', disabled: false }),
      lastName: new FormControl({ value: '', disabled: false }, []),
      firstName: new FormControl({ value: '', disabled: false }, []),
      middleName: new FormControl({ value: '', disabled: false }, []),
      dob: new FormControl({ value: '', disabled: false }, []),
      gender: new FormControl({ value: '', disabled: false }, []),
      suffix: new FormControl({ value: '', disabled: false }),
      prefix: new FormControl({ value: '', disabled: false }),

    }),

    organizationDetails: new FormGroup({
      organizationName: new FormControl({ value: '', disabled: true }),
      orgIdentificationCode: new FormControl({ value: '', disabled: true }),
      orgIdentificationCodeType: new FormControl({ value: '', disabled: true }),
      orgCommunicationNo: new FormControl({ value: '', disabled: false }),
      orgCommunicationExt: new FormControl({ value: '', disabled: false }),
      orgCommunicationType: new FormControl({ value: 'Select', disabled: false }),
    }),

    subscriberDetails: new FormGroup({
      subscriberLastName: new FormControl({ value: '', disabled: false }, []),
      subscriberFirstName: new FormControl({ value: '', disabled: false }, []),
      subscriberMiddleName: new FormControl({ value: '', disabled: false }, []),
      subscriberDob: new FormControl({ value: '', disabled: false }, []),
      subscriberGender: new FormControl({ value: '', disabled: false }, []),
      subscriberSuffix: new FormControl({ value: '', disabled: false }),
      subscriberPrefix: new FormControl({ value: '', disabled: false }),
      subscriberRelToPatient: new FormControl({ value: 'Select', disabled: false }),
      subscriberIdentificationCode: new FormControl({ value: '', disabled: false }),
      subscriberIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
      subscriberSupplementalId: new FormControl({ value: '', disabled: false }),
      subscriberIdNumberType: new FormControl({ value: 'Select', disabled: false }),
    }),

    dependentDetails: new FormGroup({
      dependentLastName: new FormControl({ value: '', disabled: false }, []),
      dependentFirstName: new FormControl({ value: '', disabled: false }, []),
      dependentMiddleName: new FormControl({ value: '', disabled: false }, []),
      dependentDob: new FormControl({ value: '', disabled: false }, []),
      dependentGender: new FormControl({ value: '', disabled: false }, []),
      dependentSuffix: new FormControl({ value: '', disabled: false }),
      dependentPrefix: new FormControl({ value: '', disabled: false }),
      dependentRelToSubscriber: new FormControl({ value: 'Select', disabled: false }),
      dependentSubscriberIdentificationCode: new FormControl({ value: '', disabled: false }),
      dependentSubscriberIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
      dependentSubscriberSupplementalId: new FormControl({ value: '', disabled: false }),
      dependentSubscriberIdNumberType: new FormControl({ value: 'Select', disabled: false }),
    }),
    requesterDetails: new FormGroup({
      reqProviderFullName: new FormControl({ value: '', disabled: false }, []),
      reqProviderType: new FormControl({ value: 'Select', disabled: false }),
      reqProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
      reqProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
      reqProviderSupplimentalId: new FormControl({ value: '', disabled: false }),
      reqProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }),
      serviceDateFrom: new FormControl({ value: '', disabled: false }),
      serviceDateTo: new FormControl({ value: '', disabled: false }),
      admitDate: new FormControl({ value: '', disabled: false }),
      dischargeDate: new FormControl({ value: '', disabled: false }),
      requestCategory: new FormControl({ value: 'Select', disabled: false }),
      certificationType: new FormControl({ value: 'Select', disabled: false }),
      serviceType: new FormControl({ value: 'Select', disabled: false }),
      levelOfService: new FormControl({ value: 'Select', disabled: false }),
    }),

    homeHealthAideRequest: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      // mrnNumber?: string;
      // revenueCode?: number;
      // visits?: number;
      // units?: number;
      // homeHealthAide?: boolean;

      homeHealthAideRequestServiceDateFrom: new FormControl({ value: '', disabled: false }),
      homeHealthAideRequestServiceDateTo: new FormControl({ value: '', disabled: false }),
      homeHealthAideVisit: new FormControl({ value: '', disabled: false }),
      homeHealthAideUnit: new FormControl({ value: '', disabled: false }),
      homeHealthAideCategory: new FormControl({ value: 'Select', disabled: false }),
      homeHealthAideCertificationType: new FormControl({ value: 'Select', disabled: false }),
      homeHealthAideServiceType: new FormControl({ value: 'Select', disabled: false }),
      homeHealthAideLevelOfService: new FormControl({ value: 'Select', disabled: false }),
      homeHealthAideProviderFullName: new FormControl({ value: '', disabled: false }),
      homeHealthAideProviderType: new FormControl({ value: 'Select', disabled: false }),
      homeHealthAideProviderAddress: new FormControl({ value: '', disabled: false }),
      homeHealthAideProviderCity: new FormControl({ value: '', disabled: false }),
      homeHealthAideProviderState: new FormControl({ value: '', disabled: false }),
      homeHealthAideProviderPostalCode: new FormControl({ value: '', disabled: false }),
      homeHealthAideProviderCountryCode: new FormControl({ value: '', disabled: false }),
      homeHealthAideProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
      homeHealthAideProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
      homeHealthAideProviderSupplimentalId: new FormControl({ value: '', disabled: false }),
      homeHealthAideProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }),
      homeHealthAideSelected: new FormControl({ value: '', disabled: false }),
    }),

    medicalSocialWorkRequest: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      // mrnNumber?: string;
      // revenueCode?: number;
      // visits?: number;
      // units?: number;
      // medicalSocialWork?: boolean;

      medicalSocialWorkRequestServiceDateFrom: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkRequestServiceDateTo: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkVisit: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkUnit: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkCategory: new FormControl({ value: 'Select', disabled: false }),
      medicalSocialWorkCertificationType: new FormControl({ value: 'Select', disabled: false }),
      medicalSocialWorkServiceType: new FormControl({ value: 'Select', disabled: false }),
      medicalSocialWorkLevelOfService: new FormControl({ value: 'Select', disabled: false }),
      medicalSocialWorkProviderFullName: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkProviderType: new FormControl({ value: 'Select', disabled: false }),
      medicalSocialWorkProviderAddress: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkProviderCity: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkProviderState: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkProviderPostalCode: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkProviderCountryCode: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
      medicalSocialWorkProviderSupplimentalId: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }),
      medicalSocialWorkSelected: new FormControl({ value: '', disabled: false }),
    }),

    occupationalTherapyRequest: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      // mrnNumber?: string;
      // revenueCode?: number;
      // visits?: number;
      // units?: number;
      // occupationTherapy?: boolean;

      occupationalTherapyRequestServiceDateFrom: new FormControl({ value: '', disabled: false }),
      occupationalTherapyRequestServiceDateTo: new FormControl({ value: '', disabled: false }),
      occupationalTherapyVisit: new FormControl({ value: '', disabled: false }),
      occupationalTherapyUnit: new FormControl({ value: '', disabled: false }),
      occupationalTherapyRequestCategory: new FormControl({ value: 'Select', disabled: false }),
      occupationalTherapyCertificationType: new FormControl({ value: 'Select', disabled: false }),
      occupationalTherapyServiceType: new FormControl({ value: 'Select', disabled: false }),
      occupationalTherapyLevelOfService: new FormControl({ value: 'Select', disabled: false }),
      occupationalTherapyProviderFullName: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderType: new FormControl({ value: 'Select', disabled: false }),
      occupationalTherapyProviderAddress: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderCity: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderState: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderPostalCode: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderCountryCode: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
      occupationalTherapyProviderSupplimentalId: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }),
      occupationalTherapySelected: new FormControl({ value: '', disabled: false }),
    }),

    skilledNursingRequest: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      // mrnNumber?: string;
      // revenueCode?: number;
      // visits?: number;
      // units?: number;
      // skilledNursing?: boolean;
      skilledNursingRequestServiceDateFrom: new FormControl({ value: '', disabled: false }),
      skilledNursingRequestServiceDateTo: new FormControl({ value: '', disabled: false }),
      skilledNursingVisit: new FormControl({ value: '', disabled: false }),
      skilledNursingUnit: new FormControl({ value: '', disabled: false }),
      skilledNursingCategory: new FormControl({ value: 'Select', disabled: false }),
      skilledNursingCertificationType: new FormControl({ value: 'Select', disabled: false }),
      skilledNursingServiceType: new FormControl({ value: 'Select', disabled: false }),
      skilledNursingLevelOfService: new FormControl({ value: 'Select', disabled: false }),
      skilledNursingProviderFullName: new FormControl({ value: '', disabled: false }),
      skilledNursingProviderType: new FormControl({ value: 'Select', disabled: false }),
      skilledNursingProviderAddress: new FormControl({ value: '', disabled: false }),
      skilledNursingProviderCity: new FormControl({ value: '', disabled: false }),
      skilledNursingProviderState: new FormControl({ value: '', disabled: false }),
      skilledNursingProviderPostalCode: new FormControl({ value: '', disabled: false }),
      skilledNursingProviderCountryCode: new FormControl({ value: '', disabled: false }),
      skilledNursingProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
      skilledNursingProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
      skilledNursingProviderSupplimentalId: new FormControl({ value: '', disabled: false }),
      skilledNursingProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }),
      skilledNursingSelected: new FormControl({ value: '', disabled: false }),
    }),

    physicalTherapyRequest: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      // mrnNumber?: string;
      // revenueCode?: number;
      // visits?: number;
      // units?: number;
      // physicalTherapy?: boolean;

      physicalTherapyRequestServiceDateFrom: new FormControl({ value: '', disabled: false }),
      physicalTherapyRequestServiceDateTo: new FormControl({ value: '', disabled: false }),
      physicalTherapyVisit: new FormControl({ value: '', disabled: false }),
      physicalTherapyUnit: new FormControl({ value: '', disabled: false }),
      physicalTherapyRequestCategory: new FormControl({ value: 'Select', disabled: false }),
      physicalTherapyCertificationType: new FormControl({ value: 'Select', disabled: false }),
      physicalTherapyServiceType: new FormControl({ value: 'Select', disabled: false }),
      physicalTherapyLevelOfService: new FormControl({ value: 'Select', disabled: false }),
      physicalTherapyProviderFullName: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderType: new FormControl({ value: 'Select', disabled: false }),
      physicalTherapyProviderAddress: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderCity: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderState: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderPostalCode: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderCountryCode: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
      physicalTherapyProviderSupplimentalId: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }),
      physicalTherapySelected: new FormControl({ value: '', disabled: false }),
    }),

    speechPathologyRequest: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      // mrnNumber?: string;
      // revenueCode?: number;
      // visits?: number;
      // units?: number;
      // speechPathology?: boolean;

      speechPathologyRequestServiceDateFrom: new FormControl({ value: '', disabled: false }),
      speechPathologyRequestServiceDateTo: new FormControl({ value: '', disabled: false }),
      speechPathologyVisit: new FormControl({ value: '', disabled: false }),
      speechPathologyUnit: new FormControl({ value: '', disabled: false }),
      speechPathologyCategory: new FormControl({ value: 'Select', disabled: false }),
      speechPathologyCertificationType: new FormControl({ value: 'Select', disabled: false }),
      speechPathologyServiceType: new FormControl({ value: 'Select', disabled: false }),
      speechPathologyLevelOfService: new FormControl({ value: 'Select', disabled: false }),
      speechPathologyProviderFullName: new FormControl({ value: '', disabled: false }),
      speechPathologyProviderType: new FormControl({ value: 'Select', disabled: false }),
      speechPathologyProviderAddress: new FormControl({ value: '', disabled: false }),
      speechPathologyProviderCity: new FormControl({ value: '', disabled: false }),
      speechPathologyProviderState: new FormControl({ value: '', disabled: false }),
      speechPathologyProviderPostalCode: new FormControl({ value: '', disabled: false }),
      speechPathologyProviderCountryCode: new FormControl({ value: '', disabled: false }),
      speechPathologyProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
      speechPathologyProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
      speechPathologyProviderSupplimentalId: new FormControl({ value: '', disabled: false }),
      speechPathologyProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }),
      speechPathologySelected: new FormControl({ value: '', disabled: false }),
    }),

  });

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
    this.communicationTypes = this.commonService.getCommunicationTypes();
  }
  /* Common methods */

  /* Common getters for drop down values */
  get physicalTherapy() {
    return this.preAuthForm.get('requestService').get('physicalTherapy').get('physicalTherapy').value;
  }

  get occupationTherapy() {
    return this.preAuthForm.get('requestService').get('occupationTherapy').get('occupationTherapy').value;
  }

  get speechPathology() {
    return this.preAuthForm.get('requestService').get('speechPathology').get('speechPathology').value;
  }

  get skilledNursing() {
    return this.preAuthForm.get('requestService').get('skilledNursing').get('skilledNursing').value;
  }

  get medicalSocialWork() {
    return this.preAuthForm.get('requestService').get('medicalSocialWork').get('medicalSocialWork').value;
  }

  get homeHealthAide() {
    return this.preAuthForm.get('requestService').get('homeHealthAide').get('homeHealthAide').value;
  }

  get serviceflag() {
    return this.preAuthForm.get('requestFor').get('extension').get('serviceflag').value;
  }

  get newadmissionService() {
    return this.preAuthForm.get('requestFor').get('newadmissionService').value;
  }
  /* Common getters for drop down values */

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
          this.isAdditional = true;
        }
        if (selectedPatAuthformInfo[0].requestFor.extension.serviceflag === true) {
          this.isExtOnlyChecked = true;
          this.isExtension = true;
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
  populatePatientFormData(patient: PreAuthFormModelRequest) {
    console.log('Pat data ', patient);

    const formData: PreAuthFormModelRequest = {
      id: patient.id,
      mrnNumber: patient.mrnNumber,

      enquiryDetails: {
        enquiryId: patient.enquiryDetails.enquiryId ? patient.enquiryDetails.enquiryId : null,
        preauthReqSentDate: patient.enquiryDetails.preauthReqSentDate ?
          (new Date(patient.enquiryDetails.preauthReqSentDate)).toISOString() :
          (new Date()).toISOString(),
      },

      preAuthDemographics: {
        mrnNumber: patient.preAuthDemographics.mrnNumber,
        lastName: patient.preAuthDemographics.lastName,
        firstName: patient.preAuthDemographics.firstName,
        middleName: patient.preAuthDemographics.middleName,
        dob: (new Date(patient.preAuthDemographics.dob)).toISOString(),
        gender: patient.preAuthDemographics.gender,
        suffix: patient.preAuthDemographics.suffix,
        prefix: patient.preAuthDemographics.prefix,

      },

      organizationDetails: {
        organizationName: patient.organizationDetails.organizationName,
        orgIdentificationCode: patient.organizationDetails.orgIdentificationCode,
        orgIdentificationCodeType: patient.organizationDetails.orgIdentificationCodeType,
        orgCommunicationNo: patient.organizationDetails.orgCommunicationNo,
        orgCommunicationExt: patient.organizationDetails.orgCommunicationExt,
        orgCommunicationType: patient.organizationDetails.orgCommunicationType,
      },

      subscriberDetails: {
        subscriberLastName: patient.subscriberDetails.subscriberLastName,
        subscriberFirstName: patient.subscriberDetails.subscriberFirstName,
        subscriberMiddleName: patient.subscriberDetails.subscriberMiddleName,
        subscriberDob: (new Date(patient.subscriberDetails.subscriberDob)).toISOString(),
        subscriberGender: patient.subscriberDetails.subscriberGender,
        subscriberSuffix: patient.subscriberDetails.subscriberSuffix,
        subscriberPrefix: patient.subscriberDetails.subscriberPrefix,
        subscriberRelToPatient: patient.subscriberDetails.subscriberRelToPatient,
        subscriberIdentificationCode: patient.subscriberDetails.subscriberIdentificationCode,
        subscriberIdentificationNumberType: patient.subscriberDetails.subscriberIdentificationNumberType,
        subscriberSupplementalId: patient.subscriberDetails.subscriberSupplementalId,
        subscriberIdNumberType: patient.subscriberDetails.subscriberIdNumberType,
      },

      dependentDetails: {
        dependentLastName: patient.dependentDetails.dependentLastName,
        dependentFirstName: patient.dependentDetails.dependentFirstName,
        dependentMiddleName: patient.dependentDetails.dependentMiddleName,
        dependentDob: (new Date(patient.dependentDetails.dependentDob)).toISOString(),
        dependentGender: patient.dependentDetails.dependentGender,
        dependentSuffix: patient.dependentDetails.dependentSuffix,
        dependentPrefix: patient.dependentDetails.dependentPrefix,
        dependentRelToSubscriber: patient.dependentDetails.dependentRelToSubscriber,
        dependentSubscriberIdentificationCode: patient.dependentDetails.dependentSubscriberIdentificationCode,
        dependentSubscriberIdentificationNumberType: patient.dependentDetails.dependentSubscriberIdentificationNumberType,
        dependentSubscriberSupplementalId: patient.dependentDetails.dependentSubscriberSupplementalId,
        dependentSubscriberIdNumberType: patient.dependentDetails.dependentSubscriberIdNumberType,
      },

      requesterDetails: {
        reqProviderFullName: patient.requesterDetails.reqProviderFullName,
        reqProviderType: patient.requesterDetails.reqProviderType,
        reqProviderIdentificationNumber: patient.requesterDetails.reqProviderIdentificationNumber,
        reqProviderIdentificationNumberType: patient.requesterDetails.reqProviderIdentificationNumberType,
        reqProviderSupplimentalId: patient.requesterDetails.reqProviderSupplimentalId,
        reqProviderIdNumberType: patient.requesterDetails.reqProviderIdNumberType,
        serviceDateFrom: (new Date(patient.requesterDetails.serviceDateFrom)).toISOString(),
        serviceDateTo: (new Date(patient.requesterDetails.serviceDateTo)).toISOString(),
        admitDate: (new Date(patient.requesterDetails.admitDate)).toISOString(),
        dischargeDate: (new Date(patient.requesterDetails.dischargeDate)).toISOString(),
        requestCategory: patient.requesterDetails.requestCategory,
        certificationType: patient.requesterDetails.certificationType,
        serviceType: patient.requesterDetails.serviceType,
        levelOfService: patient.requesterDetails.levelOfService,
      },

      homeHealthAideRequest: {
        id: patient.homeHealthAideRequest.id,
        // mrnNumber?: string;
        // revenueCode?: number;
        // visits?: number;
        // units?: number;
        // homeHealthAide?: boolean;

        homeHealthAideRequestServiceDateFrom: (new Date(patient.homeHealthAideRequest.homeHealthAideRequestServiceDateFrom)).toISOString(),
        homeHealthAideRequestServiceDateTo: (new Date(patient.homeHealthAideRequest.homeHealthAideRequestServiceDateTo)).toISOString(),
        homeHealthAideVisit: patient.homeHealthAideRequest.homeHealthAideVisit,
        homeHealthAideUnit: patient.homeHealthAideRequest.homeHealthAideUnit,
        homeHealthAideCategory: patient.homeHealthAideRequest.homeHealthAideCategory,
        homeHealthAideCertificationType: patient.homeHealthAideRequest.homeHealthAideCertificationType,
        homeHealthAideServiceType: patient.homeHealthAideRequest.homeHealthAideServiceType,
        homeHealthAideLevelOfService: patient.homeHealthAideRequest.homeHealthAideLevelOfService,
        homeHealthAideProviderFullName: patient.homeHealthAideRequest.homeHealthAideProviderFullName,
        homeHealthAideProviderType: patient.homeHealthAideRequest.homeHealthAideProviderType,
        homeHealthAideProviderAddress: patient.homeHealthAideRequest.homeHealthAideProviderAddress,
        homeHealthAideProviderCity: patient.homeHealthAideRequest.homeHealthAideProviderCity,
        homeHealthAideProviderState: patient.homeHealthAideRequest.homeHealthAideProviderState,
        homeHealthAideProviderPostalCode: patient.homeHealthAideRequest.homeHealthAideProviderPostalCode,
        homeHealthAideProviderCountryCode: patient.homeHealthAideRequest.homeHealthAideProviderCountryCode,
        homeHealthAideProviderIdentificationNumber: patient.homeHealthAideRequest.homeHealthAideProviderIdentificationNumber,
        homeHealthAideProviderIdentificationNumberType: patient.homeHealthAideRequest.homeHealthAideProviderIdentificationNumberType,
        homeHealthAideProviderSupplimentalId: patient.homeHealthAideRequest.homeHealthAideProviderSupplimentalId,
        homeHealthAideProviderIdNumberType: patient.homeHealthAideRequest.homeHealthAideProviderIdNumberType,
        homeHealthAideSelected: patient.homeHealthAideRequest.homeHealthAideSelected,
      },

      medicalSocialWorkRequest: {
        id: patient.medicalSocialWorkRequest.id,
        // mrnNumber?: string;
        // revenueCode?: number;
        // visits?: number;
        // units?: number;
        // medicalSocialWork?: boolean;

        medicalSocialWorkRequestServiceDateFrom: patient.medicalSocialWorkRequest.medicalSocialWorkRequestServiceDateFrom,
        medicalSocialWorkRequestServiceDateTo: patient.medicalSocialWorkRequest.medicalSocialWorkRequestServiceDateTo,
        medicalSocialWorkVisit: patient.medicalSocialWorkRequest.medicalSocialWorkVisit,
        medicalSocialWorkUnit: patient.medicalSocialWorkRequest.medicalSocialWorkUnit,
        medicalSocialWorkCategory: patient.medicalSocialWorkRequest.medicalSocialWorkCategory,
        medicalSocialWorkCertificationType: patient.medicalSocialWorkRequest.medicalSocialWorkCertificationType,
        medicalSocialWorkServiceType: patient.medicalSocialWorkRequest.medicalSocialWorkServiceType,
        medicalSocialWorkLevelOfService: patient.medicalSocialWorkRequest.medicalSocialWorkLevelOfService,
        medicalSocialWorkProviderFullName: patient.medicalSocialWorkRequest.medicalSocialWorkProviderFullName,
        medicalSocialWorkProviderType: patient.medicalSocialWorkRequest.medicalSocialWorkProviderType,
        medicalSocialWorkProviderAddress: patient.medicalSocialWorkRequest.medicalSocialWorkProviderAddress,
        medicalSocialWorkProviderCity: patient.medicalSocialWorkRequest.medicalSocialWorkProviderCity,
        medicalSocialWorkProviderState: patient.medicalSocialWorkRequest.medicalSocialWorkProviderState,
        medicalSocialWorkProviderPostalCode: patient.medicalSocialWorkRequest.medicalSocialWorkProviderPostalCode,
        medicalSocialWorkProviderCountryCode: patient.medicalSocialWorkRequest.medicalSocialWorkProviderCountryCode,
        medicalSocialWorkProviderIdentificationNumber: patient.medicalSocialWorkRequest.medicalSocialWorkProviderIdentificationNumber,
        medicalSocialWorkProviderIdentificationNumberType:
          patient.medicalSocialWorkRequest.medicalSocialWorkProviderIdentificationNumberType,
        medicalSocialWorkProviderSupplimentalId: patient.medicalSocialWorkRequest.medicalSocialWorkProviderSupplimentalId,
        medicalSocialWorkProviderIdNumberType: patient.medicalSocialWorkRequest.medicalSocialWorkProviderIdNumberType,
        medicalSocialWorkSelected: patient.medicalSocialWorkRequest.medicalSocialWorkSelected,
      },

      occupationalTherapyRequest: {
        id: patient.occupationalTherapyRequest.id,
        // mrnNumber?: string;
        // revenueCode?: number;
        // visits?: number;
        // units?: number;
        // occupationTherapy?: boolean;

        occupationalTherapyRequestServiceDateFrom: patient.occupationalTherapyRequest.occupationalTherapyRequestServiceDateFrom,
        occupationalTherapyRequestServiceDateTo: patient.occupationalTherapyRequest.occupationalTherapyRequestServiceDateTo,
        occupationalTherapyVisit: patient.occupationalTherapyRequest.occupationalTherapyVisit,
        occupationalTherapyUnit: patient.occupationalTherapyRequest.occupationalTherapyUnit,
        occupationalTherapyRequestCategory: patient.occupationalTherapyRequest.occupationalTherapyRequestCategory,
        occupationalTherapyCertificationType: patient.occupationalTherapyRequest.occupationalTherapyCertificationType,
        occupationalTherapyServiceType: patient.occupationalTherapyRequest.occupationalTherapyServiceType,
        occupationalTherapyLevelOfService: patient.occupationalTherapyRequest.occupationalTherapyLevelOfService,
        occupationalTherapyProviderFullName: patient.occupationalTherapyRequest.occupationalTherapyProviderFullName,
        occupationalTherapyProviderType: patient.occupationalTherapyRequest.occupationalTherapyProviderType,
        occupationalTherapyProviderAddress: patient.occupationalTherapyRequest.occupationalTherapyProviderAddress,
        occupationalTherapyProviderCity: patient.occupationalTherapyRequest.occupationalTherapyProviderCity,
        occupationalTherapyProviderState: patient.occupationalTherapyRequest.occupationalTherapyProviderState,
        occupationalTherapyProviderPostalCode: patient.occupationalTherapyRequest.occupationalTherapyProviderPostalCode,
        occupationalTherapyProviderCountryCode: patient.occupationalTherapyRequest.occupationalTherapyProviderCountryCode,
        occupationalTherapyProviderIdentificationNumber: patient.occupationalTherapyRequest.occupationalTherapyProviderIdentificationNumber,
        occupationalTherapyProviderIdentificationNumberType:
          patient.occupationalTherapyRequest.occupationalTherapyProviderIdentificationNumberType,
        occupationalTherapyProviderSupplimentalId: patient.occupationalTherapyRequest.occupationalTherapyProviderSupplimentalId,
        occupationalTherapyProviderIdNumberType: patient.occupationalTherapyRequest.occupationalTherapyProviderIdNumberType,
        occupationalTherapySelected: patient.occupationalTherapyRequest.occupationalTherapySelected,
      },

      skilledNursingRequest: {
        id: patient.skilledNursingRequest.id,
        // mrnNumber?: string;
        // revenueCode?: number;
        // visits?: number;
        // units?: number;
        // skilledNursing?: boolean;
        skilledNursingRequestServiceDateFrom: patient.skilledNursingRequest.skilledNursingRequestServiceDateFrom,
        skilledNursingRequestServiceDateTo: patient.skilledNursingRequest.skilledNursingRequestServiceDateTo,
        skilledNursingVisit: patient.skilledNursingRequest.skilledNursingVisit,
        skilledNursingUnit: patient.skilledNursingRequest.skilledNursingUnit,
        skilledNursingCategory: patient.skilledNursingRequest.skilledNursingCategory,
        skilledNursingCertificationType: patient.skilledNursingRequest.skilledNursingCertificationType,
        skilledNursingServiceType: patient.skilledNursingRequest.skilledNursingServiceType,
        skilledNursingLevelOfService: patient.skilledNursingRequest.skilledNursingLevelOfService,
        skilledNursingProviderFullName: patient.skilledNursingRequest.skilledNursingProviderFullName,
        skilledNursingProviderType: patient.skilledNursingRequest.skilledNursingProviderType,
        skilledNursingProviderAddress: patient.skilledNursingRequest.skilledNursingProviderAddress,
        skilledNursingProviderCity: patient.skilledNursingRequest.skilledNursingProviderCity,
        skilledNursingProviderState: patient.skilledNursingRequest.skilledNursingProviderState,
        skilledNursingProviderPostalCode: patient.skilledNursingRequest.skilledNursingProviderPostalCode,
        skilledNursingProviderCountryCode: patient.skilledNursingRequest.skilledNursingProviderCountryCode,
        skilledNursingProviderIdentificationNumber: patient.skilledNursingRequest.skilledNursingProviderIdentificationNumber,
        skilledNursingProviderIdentificationNumberType: patient.skilledNursingRequest.skilledNursingProviderIdentificationNumberType,
        skilledNursingProviderSupplimentalId: patient.skilledNursingRequest.skilledNursingProviderSupplimentalId,
        skilledNursingProviderIdNumberType: patient.skilledNursingRequest.skilledNursingProviderIdNumberType,
        skilledNursingSelected: patient.skilledNursingRequest.skilledNursingSelected,
      },

      physicalTherapyRequest: {
        id: patient.physicalTherapyRequest.id,
        // mrnNumber?: string;
        // revenueCode?: number;
        // visits?: number;
        // units?: number;
        // physicalTherapy?: boolean;

        physicalTherapyRequestServiceDateFrom: patient.physicalTherapyRequest.physicalTherapyRequestServiceDateFrom,
        physicalTherapyRequestServiceDateTo: patient.physicalTherapyRequest.physicalTherapyRequestServiceDateTo,
        physicalTherapyVisit: patient.physicalTherapyRequest.physicalTherapyVisit,
        physicalTherapyUnit: patient.physicalTherapyRequest.physicalTherapyUnit,
        physicalTherapyRequestCategory: patient.physicalTherapyRequest.physicalTherapyRequestCategory,
        physicalTherapyCertificationType: patient.physicalTherapyRequest.physicalTherapyCertificationType,
        physicalTherapyServiceType: patient.physicalTherapyRequest.physicalTherapyServiceType,
        physicalTherapyLevelOfService: patient.physicalTherapyRequest.physicalTherapyLevelOfService,
        physicalTherapyProviderFullName: patient.physicalTherapyRequest.physicalTherapyProviderFullName,
        physicalTherapyProviderType: patient.physicalTherapyRequest.physicalTherapyProviderType,
        physicalTherapyProviderAddress: patient.physicalTherapyRequest.physicalTherapyProviderAddress,
        physicalTherapyProviderCity: patient.physicalTherapyRequest.physicalTherapyProviderCity,
        physicalTherapyProviderState: patient.physicalTherapyRequest.physicalTherapyProviderState,
        physicalTherapyProviderPostalCode: patient.physicalTherapyRequest.physicalTherapyProviderPostalCode,
        physicalTherapyProviderCountryCode: patient.physicalTherapyRequest.physicalTherapyProviderCountryCode,
        physicalTherapyProviderIdentificationNumber: patient.physicalTherapyRequest.physicalTherapyProviderIdentificationNumber,
        physicalTherapyProviderIdentificationNumberType: patient.physicalTherapyRequest.physicalTherapyProviderIdentificationNumberType,
        physicalTherapyProviderSupplimentalId: patient.physicalTherapyRequest.physicalTherapyProviderSupplimentalId,
        physicalTherapyProviderIdNumberType: patient.physicalTherapyRequest.physicalTherapyProviderIdNumberType,
        physicalTherapySelected: patient.physicalTherapyRequest.physicalTherapySelected,
      },

      speechPathologyRequest: {
        id: patient.speechPathologyRequest.id,
        // mrnNumber?: string;
        // revenueCode?: number;
        // visits?: number;
        // units?: number;
        // speechPathology?: boolean;

        speechPathologyRequestServiceDateFrom: patient.speechPathologyRequest.speechPathologyRequestServiceDateFrom,
        speechPathologyRequestServiceDateTo: patient.speechPathologyRequest.speechPathologyRequestServiceDateTo,
        speechPathologyVisit: patient.speechPathologyRequest.speechPathologyVisit,
        speechPathologyUnit: patient.speechPathologyRequest.speechPathologyUnit,
        speechPathologyCategory: patient.speechPathologyRequest.speechPathologyCategory,
        speechPathologyCertificationType: patient.speechPathologyRequest.speechPathologyCertificationType,
        speechPathologyServiceType: patient.speechPathologyRequest.speechPathologyServiceType,
        speechPathologyLevelOfService: patient.speechPathologyRequest.speechPathologyLevelOfService,
        speechPathologyProviderFullName: patient.speechPathologyRequest.speechPathologyProviderFullName,
        speechPathologyProviderType: patient.speechPathologyRequest.speechPathologyProviderType,
        speechPathologyProviderAddress: patient.speechPathologyRequest.speechPathologyProviderAddress,
        speechPathologyProviderCity: patient.speechPathologyRequest.speechPathologyProviderCity,
        speechPathologyProviderState: patient.speechPathologyRequest.speechPathologyProviderState,
        speechPathologyProviderPostalCode: patient.speechPathologyRequest.speechPathologyProviderPostalCode,
        speechPathologyProviderCountryCode: patient.speechPathologyRequest.speechPathologyProviderCountryCode,
        speechPathologyProviderIdentificationNumber: patient.speechPathologyRequest.speechPathologyProviderIdentificationNumber,
        speechPathologyProviderIdentificationNumberType: patient.speechPathologyRequest.speechPathologyProviderIdentificationNumberType,
        speechPathologyProviderSupplimentalId: patient.speechPathologyRequest.speechPathologyProviderSupplimentalId,
        speechPathologyProviderIdNumberType: patient.speechPathologyRequest.speechPathologyProviderIdNumberType,
        speechPathologySelected: patient.speechPathologyRequest.speechPathologySelected,
      },
    };
    // formData.insuranceDetailPreAuth.insuranceTypeSelcted = 'primaryInsuranceDetail';
    this.preAuthForm.setValue(formData);
    // if (this.preAuthForm.get('requestFor').get('newadmissionService').value === true) {
    //   this.preAuthForm.get('requestFor').patchValue({ newadmissionService: this.newAdmissService.checked = true });
    // }

    //  this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'primaryInsuranceDetail' });
    console.log('Form Populated Data ', formData);
  }
  /* Populating Form Data */

  // compareInsurance = (val1: string, val2: string) => val1 === val2;

  /* Request for New Admission Service via Radio button starts */
  onNewServiceChange(event) {
    if (this.newAdmissService.checked) {
      console.log('New Service', this.newAdmissService.checked.valueOf());
      // console.log('New Service2', event.target.value);
      this.isNewAdmissionSelected = true;
      this.newAdmissService.checked = true;
      this.isNewServiceChecked = true;
      // formcontrol =newadmissionService and template ref = newAdmissService
      this.preAuthForm.get('requestFor').patchValue({ newadmissionService: true });
      // this.isAddSerChecked = false;
      // this.isExtOnlyChecked = false;

      this.isAddSerChecked = false;
      this.additionalService.checked = false;
      this.preAuthForm.get('requestFor').get('additionalServices').patchValue({ serviceflag: false });

      this.isExtOnlyChecked = false;
      this.extensionOnly.checked = false;
      this.preAuthForm.get('requestFor').get('extension').patchValue({ serviceflag: false });
    }
  }

  onExtensionChange() {
    console.log(this.extensionOnly.checked);
    if (this.extensionOnly.checked) {
      // this.preAuthForm.patchValue({ serviceflag: true });

      this.isExtOnlySelected = true;
      this.preAuthForm.get('requestFor').get('extension').patchValue({ serviceflag: true });

      this.isNewAdmissionSelected = false;
      this.isNewServiceChecked = false;
      this.newAdmissService.checked = false;
      this.preAuthForm.get('requestFor').patchValue({ newadmissionService: false });

      this.isAddSerChecked = false;
      this.additionalService.checked = false;
      this.preAuthForm.get('requestFor').get('additionalServices').patchValue({ serviceflag: false });
    }
  }

  onAddServiceChange() {
    if (this.additionalService.checked) {
      console.log(this.additionalService.checked);
      this.isAddiServSelected = true;
      this.preAuthForm.get('requestFor').get('additionalServices').patchValue({ serviceflag: true });
      //  this.isNewServiceChecked = false;
      this.isNewAdmissionSelected = false;
      this.isNewServiceChecked = false;
      this.newAdmissService.checked = false;
      this.preAuthForm.get('requestFor').patchValue({ newadmissionService: false });

      this.isExtOnlyChecked = false;
      this.extensionOnly.checked = false;
      this.preAuthForm.get('requestFor').get('extension').patchValue({ serviceflag: false });
    }
  }
  /* Request for New Admission Service via Radio button ends */
  /*Save as Draft */

  /*On Send Request for PreAutorization*/
  onSendRequest(selectedPatntData: PreAuthFormModelRequest) {
    // selectedPatientData.currenttimdate = new Date().toISOString();
    // console.log('Date after change ', selectedPatientData);
    console.log('Form data on send request', selectedPatntData);

    //  setTimeout(() => {
    // formcontrol =newadmissionService and template ref = newAdmissService
    if (this.isNewAdmissionSelected) {
      this.preAuthForm.get('requestFor').patchValue({ newadmissionService: true });
    }

    if (this.isAddiServSelected) {
      this.preAuthForm.get('requestFor').patchValue({ newadmissionService: false });
      this.preAuthForm.get('requestFor').get('additionalServices').patchValue({ serviceflag: true });
    }

    if (this.isExtOnlySelected) {
      this.preAuthForm.get('requestFor').patchValue({ newadmissionService: false });
      this.preAuthForm.get('requestFor').get('extension').patchValue({ serviceflag: true });
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
    // });
  }


  onClose() {

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

  }

  onNoClick(): void {
    //  this.dialogRef.close(false);
    // console.log('Form data on save', selectedPatntData);

    setTimeout(() => {

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

        if (result) {
          console.log('Confirm is clicked: ' + result);
          this.dialogRef.close(false);
          // this.preAuthService.filter('Refresh Initiated');
        }

      });
    });
  }

  onSave(selectedPatntData: PreAuthFormModelRequest) {
    // selectedPatientData.currenttimdate = new Date().toISOString();
    // console.log('Date after change ', selectedPatientData);
    console.log('Form data on save', selectedPatntData);

    // setTimeout(() => {
    // formcontrol =newadmissionService and template ref = newAdmissService
    if (this.isNewAdmissionSelected) {
      this.preAuthForm.get('requestFor').patchValue({ newadmissionService: true });
      // console.log('New Add selected after modific', this.newAdmissService.checked);
      // console.log('New Add selected after modific', this.newAdmissService.checked.valueOf());
    }

    if (this.isAddiServSelected) {
      this.preAuthForm.get('requestFor').patchValue({ newadmissionService: false });
      this.preAuthForm.get('requestFor').get('additionalServices').patchValue({ serviceflag: true });
    }

    if (this.isExtOnlySelected) {
      this.preAuthForm.get('requestFor').patchValue({ newadmissionService: false });
      this.preAuthForm.get('requestFor').get('extension').patchValue({ serviceflag: true });
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
        // this.preAuthService.filter('Refresh Initiated');
      }

    });
    // });
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

  phyThepySelected(event) {
    //  const isSelected = this.preAuthForm.get('requestService').get('physicalTherapy').get('physicalTherapy').value;
    // console.log('PT ', event.checked); // gices true when checked
    // if (event.checked || this.physicalTherapyChk) {
    //   this.isReadonlyPt = false;
    // } else {
    //   this.isReadonlyPt = true;
    // }
  }

  onEdit(selectedPatntData: PreAuthFormModelRequest) {
    console.log('on edit ', selectedPatntData);
    this.editing = true;
    if (this.selectedPatientViaDialog.episode.preauthFormStatus !== 'Sent For Approval') { // 'Saved As Draft'
      this.preAuthForm.get('enquiryDetails').patchValue({ preauthReqSentDate: (new Date()).toISOString() });
    }

    console.log('on edit after date change', this.preAuthForm);
  }

  compareFn = (val1: string, val2: string) => {
    return (val1 === val2);
  }
}
