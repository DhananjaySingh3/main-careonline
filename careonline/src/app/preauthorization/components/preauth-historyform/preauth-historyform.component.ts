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
import { PreAuthResponse } from '../../../preauthorization/models/preauth-response.model';
import { PreauthHistoryList } from '../../../preauthorization/models/preauth-history-list.model';
import { PreAuthReadResponse } from '../../../preauthorization/models/read-pre-auth.model';
import { PreAuthFormModelRequest } from '../../../preauthorization/models/pre-auth-form.model';



import {
  Sex, Suffix, Genders, Plans, City, State, Relation, Prefixes,
  Payment, RequestTypes, InsuranceTypes, RequestFor, PreAuthStatus, RejectReasons, FollowUpActDesc,
  IdentificationNoType, RequestCategory, CertificationType, ServiceType, LevelOfService, CertificationAction,
  RejectReasonsMsg, IdNoType, IdentificationCodeType, ProviderTypes, PerUnitTypes, PreAuthResponseStatus
} from '../../../preauthorization/models/preauth-common.model';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-preauth-historyform',
  templateUrl: './preauth-historyform.component.html',
  styleUrls: ['./preauth-historyform.component.css']
})
export class PreauthHistoryformComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  /* Selected Patient's Data received via Dialog while opening from preauthList Component*/
  heading = this.data.heading;
  selectedPatientViaDialog = { ...this.data.selectedPatientData };
  /* Selected Patient's Data received via Dialog while opening from preauthList Component ends*/

  resultsLength = 0;
  isLoadingResults = true;

  /* Common Data Source from api*/
  perUnitTypes: PerUnitTypes[];
  preAuthStatuses: PreAuthStatus[];
  preAuthResponseStatuses: PreAuthResponseStatus[];
  prefixes: Prefixes[];
  rejectReasons: RejectReasons[];
  followUpActDesc: FollowUpActDesc[];
  identificationNoType: IdentificationNoType[];
  identificationCodeType: IdentificationCodeType[];
  requestCategory: RequestCategory[];
  certificationType: CertificationType[];
  serviceType: ServiceType[];
  levelOfService: LevelOfService[];
  certificationAction: CertificationAction[];
  rejectReasonsMsg: RejectReasonsMsg[];
  idNoType: IdNoType[];
  providerTypes: ProviderTypes[];

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
  editing = false;
  isReadonly = true;
  unitsPattern = '^[0-9]{1,4}$';

  visitsPattern = '^[0-9]{1,3}$';
  // usernamePattern = '^[a-z0-9_-]{1,15}$';
  userNamePattern = '^[a-zA-Z.-]{1,15}$';
  mrnNumberPattern = '^[a-zA-Z0-9-]{4,15}$';
  prefixPattern = '^[a-zA-Z.]{1,15}$';
  suffixPattern = '^[a-zA-Z.-]{1,15}$';

  orgNamePattern = '^[a-zA-Z]{1,20}$';
  orgIdCodePatrn = '^[a-zA-Z0-9]{1,20}$';
  communPatrn = '^[a-zA-Z0-9.@_-]{1,25}$';
  extPattern = '^[0-9]{0,5}$';

  supplIdPattern = '^[a-zA-Z0-9-]{1,20}$';
  // addPattern = '^[#.0-9a-zA-Z/(),-]+$';
  statePattern = '^[a-zA-Z ]{2,15}$';
  cityPattern = '^[a-zA-Z ]{4,15}$';
  zipPattern = '^[0-9]{5}(-[0-9]{2})?$';
  countryCodePattern = '^[A-Z0-9+]{2,5}$';

  ssnPattern = '^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$'; // '^\d{3}-\d{2}-\d{4}$';
  policyPattern = '^[0-9_]{5,15}$';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PreauthHistoryformComponent>,
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

    enquiryDeatils: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      enquiryId: new FormControl({ value: '1234', disabled: false }, [Validators.required]),
      preauthReqSentDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
    }),

    preAuthDemographics: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.mrnNumberPattern)]),
      lastName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      firstName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      middleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      dob: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      gender: new FormControl({ value: 'Unknown', disabled: false }, [Validators.required]),
      suffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      prefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      ssn: new FormControl({ value: '', disabled: false }),
      relationshipToSubscriber: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
    }),

    organizationInformation: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      organizationName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.orgNamePattern)]),
      orgIdentificationCode: new FormControl({ value: '', disabled: false },
        [Validators.pattern(this.orgIdCodePatrn)]),
      orgIdentificationCodeType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),

      orgCommunicationTypeTelephone: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.communPatrn)]),
      orgCommunicationTypeFacsimile: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.communPatrn)]),
      orgCommunicationTypeEMail: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.communPatrn)]),
      orgCommunicationExt: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.extPattern)]),
    }),

    subscriberDetails: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      subscriberLastName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      subscriberFirstName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      subscriberMiddleName: new FormControl({ value: '', disabled: false },
        [Validators.pattern(this.userNamePattern)]),
      subscriberDob: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      subscriberGender: new FormControl({ value: 'Unknown', disabled: false }),
      subscriberSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      subscriberPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      subscriberRelToInsured: new FormControl({ value: '', disabled: false }, [Validators.required]),
      subscriberIdentificationCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.orgIdCodePatrn)]),
      subscriberIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      subscriberSupplementalId: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.supplIdPattern)]),
      subscriberIdNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
    }),

    dependentDetails: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      dependentLastName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      dependentFirstName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      dependentMiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      dependentDob: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      dependentGender: new FormControl({ value: 'Unknown', disabled: false }),
      dependentSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      dependentPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      dependentRelToSubscriber: new FormControl({ value: 'Unknown', disabled: false }),
      dependentSubscriberIdentificationCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.orgIdCodePatrn)]),
      dependentSubscriberIdentificationNumberType: new FormControl({ value: 'Payor Identification', disabled: false },
        [Validators.required]),
      dependentSubscriberSupplementalId: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.supplIdPattern)]),
      dependentSubscriberIdNumberType: new FormControl({ value: 'Payor Identification', disabled: false }),
    }),
    providerDetail: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),

      reqProviderFirstName: new FormControl({ value: '', disabled: false },
        [Validators.pattern(this.userNamePattern)]),
      reqProviderLastName: new FormControl({ value: '', disabled: false },
        [Validators.pattern(this.userNamePattern)]),
      reqProviderMiddleName: new FormControl({ value: '', disabled: false },
        [Validators.pattern(this.userNamePattern)]),
      reqProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      reqProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),

      reqProviderFullName: new FormControl({ value: '', disabled: false }, []),
      reqProviderType: new FormControl({ value: 'Referring', disabled: false }),
      reqProviderIdentificationNumber: new FormControl({ value: '', disabled: false },
        [Validators.pattern(this.orgIdCodePatrn)]),
      reqProviderIdentificationNumberType: new FormControl({ value: 'Payor Identification', disabled: false }, [Validators.required]),
      reqProviderSupplimentalId: new FormControl({ value: '', disabled: false },
        [Validators.pattern(this.supplIdPattern)]),
      reqProviderIdNumberType: new FormControl({ value: 'Payor Identification', disabled: false }),
      serviceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      serviceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      admitDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      dischargeDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      requestCategory: new FormControl({ value: 'Select', disabled: false }), // Admission Review
      certificationType: new FormControl({ value: 'Select', disabled: false }),
      serviceType: new FormControl({ value: 'Select', disabled: false }),
      levelOfService: new FormControl({ value: 'Select', disabled: false }),
    }),

    requestService: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),

      homeHealthAide: new FormGroup({
        id: new FormControl({ value: '', disabled: false }),
        mrnNumber: new FormControl({ value: '', disabled: false }, []),
        homeHealthAideRevenueCode: new FormControl({ value: '', disabled: false }, []),
        homeHealthAideProviderMiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
        homeHealthAidePoviderLastName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
        homeHealthAideProviderFirstName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),

        homeHealthAideProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
        homeHealthAideProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),

        homeHealthAideRequestServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
        homeHealthAideRequestServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
        homeHealthAideVisit: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.unitsPattern)]),
        homeHealthAideUnit: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.unitsPattern)]),
        homeHealthAideRequestCategory: new FormControl({ value: 'Select', disabled: false }),
        homeHealthAideCertificationType: new FormControl({ value: 'Select', disabled: false }),
        homeHealthAideServiceType: new FormControl({ value: 'Select', disabled: false }),
        homeHealthAideLevelOfService: new FormControl({ value: 'Select', disabled: false }),
        homeHealthAideProviderFullName: new FormControl({ value: '', disabled: false }),
        homeHealthAideProviderType: new FormControl({ value: 'Select', disabled: false }),
        homeHealthAideProviderAddress: new FormControl({ value: '', disabled: false }),
        homeHealthAideProviderCity: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.cityPattern)]),
        homeHealthAideProviderState: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.statePattern)]),
        homeHealthAideProviderPostalCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.zipPattern)]),
        homeHealthAideProviderCountryCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.countryCodePattern)]),
        homeHealthAideProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
        homeHealthAideProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
        homeHealthAideProviderSupplimentalId: new FormControl({ value: '', disabled: false }),
        homeHealthAideProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }),
        homeHealthAideSelected: new FormControl({ value: '', disabled: false }),
      }),

      medicalSocialWork: new FormGroup({
        id: new FormControl({ value: '', disabled: false }),
        mrnNumber: new FormControl({ value: '', disabled: false }),
        medicalSocialWorkRevenueCode: new FormControl({ value: '', disabled: false }),
        medicalSocialWorkProviderMiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
        medicalSocialWorkPoviderLastName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
        medicalSocialWorkProviderFirstName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),

        medicalSocialWorkProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
        medicalSocialWorkProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),

        medicalSocialWorkRequestServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
        medicalSocialWorkRequestServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
        medicalSocialWorkVisit: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.unitsPattern)]),
        medicalSocialWorkUnit: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.unitsPattern)]),
        medicalSocialWorkRequestCategory: new FormControl({ value: 'Select', disabled: false }),
        medicalSocialWorkCertificationType: new FormControl({ value: 'Select', disabled: false }),
        medicalSocialWorkServiceType: new FormControl({ value: 'Select', disabled: false }),
        medicalSocialWorkLevelOfService: new FormControl({ value: 'Select', disabled: false }),
        medicalSocialWorkProviderFullName: new FormControl({ value: '', disabled: false }),
        medicalSocialWorkProviderType: new FormControl({ value: 'Select', disabled: false }),
        medicalSocialWorkProviderAddress: new FormControl({ value: '', disabled: false }),
        medicalSocialWorkProviderCity: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.cityPattern)]),
        medicalSocialWorkProviderState: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.statePattern)]),
        medicalSocialWorkProviderPostalCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.zipPattern)]),
        medicalSocialWorkProviderCountryCode: new FormControl({ value: '', disabled: false },
          [Validators.pattern(this.countryCodePattern)]),
        medicalSocialWorkProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
        medicalSocialWorkProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
        medicalSocialWorkProviderSupplimentalId: new FormControl({ value: '', disabled: false }),
        medicalSocialWorkProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }),
        medicalSocialWorkSelected: new FormControl({ value: '', disabled: false }),
      }),

      occupationTherapy: new FormGroup({
        id: new FormControl({ value: '', disabled: false }),
        mrnNumber: new FormControl({ value: '', disabled: false }),
        occupationTherapyRevenueCode: new FormControl({ value: '', disabled: false }),

        occupationTherapyProviderMiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
        occupationTherapyPoviderLastName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
        occupationTherapyProviderFirstName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
        occupationTherapyProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
        occupationTherapyProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),

        occupationTherapyRequestServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
        occupationTherapyRequestServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
        occupationTherapyVisit: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.unitsPattern)]),
        occupationTherapyUnit: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.unitsPattern)]),
        occupationTherapyRequestCategory: new FormControl({ value: 'Select', disabled: false }),
        occupationTherapyCertificationType: new FormControl({ value: 'Select', disabled: false }),
        occupationTherapyServiceType: new FormControl({ value: 'Select', disabled: false }),
        occupationTherapyLevelOfService: new FormControl({ value: 'Select', disabled: false }),

        occupationTherapyProviderFullName: new FormControl({ value: '', disabled: false }),
        occupationTherapyProviderType: new FormControl({ value: 'Select', disabled: false }),

        occupationTherapyProviderAddress: new FormControl({ value: '', disabled: false }),
        occupationTherapyProviderCity: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.cityPattern)]),
        occupationTherapyProviderState: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.statePattern)]),
        occupationTherapyProviderPostalCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.zipPattern)]),
        occupationTherapyProviderCountryCode: new FormControl({ value: '', disabled: false },
          [Validators.pattern(this.countryCodePattern)]),

        occupationTherapyProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
        occupationTherapyProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
        occupationTherapyProviderSupplimentalId: new FormControl({ value: '', disabled: false }),
        occupationTherapyProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }),
        occupationTherapySelected: new FormControl({ value: '', disabled: false }),
      }),

      skilledNursing: new FormGroup({
        id: new FormControl({ value: '', disabled: false }),
        mrnNumber: new FormControl({ value: '', disabled: false }),
        skilledNursingRevenueCode: new FormControl({ value: '', disabled: false }),
        skilledNursingProviderMiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
        skilledNursingPoviderLastName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
        skilledNursingProviderFirstName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),

        skilledNursingProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
        skilledNursingProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),

        skilledNursingRequestServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
        skilledNursingRequestServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
        skilledNursingVisit: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.unitsPattern)]),
        skilledNursingUnit: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.unitsPattern)]),
        skilledNursingRequestCategory: new FormControl({ value: 'Select', disabled: false }),
        skilledNursingCertificationType: new FormControl({ value: 'Select', disabled: false }),
        skilledNursingServiceType: new FormControl({ value: 'Select', disabled: false }),
        skilledNursingLevelOfService: new FormControl({ value: 'Select', disabled: false }),
        skilledNursingProviderFullName: new FormControl({ value: '', disabled: false }),
        skilledNursingProviderType: new FormControl({ value: 'Select', disabled: false }),
        skilledNursingProviderAddress: new FormControl({ value: '', disabled: false }),
        skilledNursingProviderCity: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.cityPattern)]),
        skilledNursingProviderState: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.statePattern)]),
        skilledNursingProviderPostalCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.zipPattern)]),
        skilledNursingProviderCountryCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.countryCodePattern)]),
        skilledNursingProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
        skilledNursingProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
        skilledNursingProviderSupplimentalId: new FormControl({ value: '', disabled: false }),
        skilledNursingProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }),
        skilledNursingSelected: new FormControl({ value: '', disabled: false }),
      }),

      physicalTherapy: new FormGroup({
        id: new FormControl({ value: '', disabled: false }),
        mrnNumber: new FormControl({ value: '', disabled: false }),
        physicalTherapyrevenueCode: new FormControl({ value: '', disabled: false }),
        physicalTherapyProviderMiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
        physicalTherapyPoviderLastName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
        physicalTherapyProviderFirstName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),

        physicalTherapyProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
        physicalTherapyProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),

        physicalTherapyRequestServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
        physicalTherapyRequestServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
        physicalTherapyVisit: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.unitsPattern)]),
        physicalTherapyUnit: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.unitsPattern)]),
        physicalTherapyRequestCategory: new FormControl({ value: 'Select', disabled: false }),
        physicalTherapyCertificationType: new FormControl({ value: 'Select', disabled: false }),
        physicalTherapyServiceType: new FormControl({ value: 'Select', disabled: false }),
        physicalTherapyLevelOfService: new FormControl({ value: 'Select', disabled: false }),
        physicalTherapyProviderFullName: new FormControl({ value: '', disabled: false }),
        physicalTherapyProviderType: new FormControl({ value: 'Select', disabled: false }),
        physicalTherapyProviderAddress: new FormControl({ value: '', disabled: false }),
        physicalTherapyProviderCity: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.cityPattern)]),
        physicalTherapyProviderState: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.statePattern)]),
        physicalTherapyProviderPostalCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.zipPattern)]),
        physicalTherapyProviderCountryCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.countryCodePattern)]),
        physicalTherapyProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
        physicalTherapyProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
        physicalTherapyProviderSupplimentalId: new FormControl({ value: '', disabled: false }),
        physicalTherapyProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }),
        physicalTherapySelected: new FormControl({ value: '', disabled: false }),
      }),

      speechPathology: new FormGroup({
        id: new FormControl({ value: '', disabled: false }),
        mrnNumber: new FormControl({ value: '', disabled: false }),
        speechPathologyRevenueCode: new FormControl({ value: '', disabled: false }),
        speechPathologyProviderMiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
        speechPathologyPoviderLastName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
        speechPathologyProviderFirstName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),

        speechPathologyProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
        speechPathologyProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),

        speechPathologyRequestServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
        speechPathologyRequestServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
        speechPathologyVisit: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.unitsPattern)]),
        speechPathologyUnit: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.unitsPattern)]),
        speechPathologyRequestCategory: new FormControl({ value: 'Select', disabled: false }),
        speechPathologyCertificationType: new FormControl({ value: 'Select', disabled: false }),
        speechPathologyServiceType: new FormControl({ value: 'Select', disabled: false }),
        speechPathologyLevelOfService: new FormControl({ value: 'Select', disabled: false }),
        speechPathologyProviderFullName: new FormControl({ value: '', disabled: false }),
        speechPathologyProviderType: new FormControl({ value: 'Select', disabled: false }),
        speechPathologyProviderAddress: new FormControl({ value: '', disabled: false }),
        speechPathologyProviderCity: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.cityPattern)]),
        speechPathologyProviderState: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.statePattern)]),
        speechPathologyProviderPostalCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.zipPattern)]),
        speechPathologyProviderCountryCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.countryCodePattern)]),
        speechPathologyProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
        speechPathologyProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
        speechPathologyProviderSupplimentalId: new FormControl({ value: '', disabled: false }),
        speechPathologyProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }),
        speechPathologySelected: new FormControl({ value: '', disabled: false }),
      }),
    }),

  });

  /* Building Form */

  /* Common Methods */
  commonMethods() {
    this.perUnitTypes = this.commonService.getPerUnitTypes();
    this.preAuthStatuses = this.commonService.getPreAuthStatus();
    this.prefixes = this.commonService.getPrefixes();
    this.rejectReasons = this.commonService.getRejectReasons();
    this.rejectReasonsMsg = this.commonService.getRejectReasonsMsg();
    this.followUpActDesc = this.commonService.getFollowUpActDesc();
    this.identificationNoType = this.commonService.getIdentificationNoType();
    this.requestCategory = this.commonService.getRequestCategory();
    this.certificationType = this.commonService.getCertificationType();
    this.serviceType = this.commonService.getServiceType();
    this.levelOfService = this.commonService.getLevelOfService();
    this.certificationAction = this.commonService.getCertificationAction();
    this.idNoType = this.commonService.getIdNoType();
    this.identificationCodeType = this.commonService.getIdNoType();
    this.providerTypes = this.commonService.getProviderTypes();

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
    this.preAuthResponseStatuses = this.commonService.getPreAuthResponseStatus();
  }
  /* Common methods */

  ngOnInit() {
    setTimeout(() => {
      this.preAuthService.preauthResponseHistoryFormView(this.selectedPatientViaDialog).subscribe((dataForSelectedPat) => {
        this.isLoadingResults = true;
        if (dataForSelectedPat) {
          this.populatePatientFormData(dataForSelectedPat[0]);
          console.log('Data received for edit btn', dataForSelectedPat[0]);
          this.editing = true;
          this.isLoadingResults = false;
        }
      },
        (error) => {
          this.isLoadingResults = false;
          console.log(error);
        }
      );
    });
  }

  /* Populating Form Data */
  populatePatientFormData(patient: PreAuthFormModelRequest) {
    console.log('Pat data ', patient);

    const formData: PreAuthFormModelRequest = {
      id: patient.id,
      mrnNumber: patient.mrnNumber,

      enquiryDeatils: {
        id: patient.enquiryDeatils.id,
        mrnNumber: patient.enquiryDeatils.mrnNumber,
        enquiryId: patient.enquiryDeatils.enquiryId ? patient.enquiryDeatils.enquiryId : null,
        preauthReqSentDate: patient.enquiryDeatils.preauthReqSentDate ?
          (new Date(patient.enquiryDeatils.preauthReqSentDate)).toISOString() :
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
        id: patient.preAuthDemographics.id,
        ssn: patient.preAuthDemographics.ssn,
        relationshipToSubscriber: patient.preAuthDemographics.relationshipToSubscriber,
      },

      organizationInformation: {
        id: patient.organizationInformation.id,
        mrnNumber: patient.organizationInformation.mrnNumber,
        organizationName: patient.organizationInformation.organizationName,
        orgIdentificationCode: patient.organizationInformation.orgIdentificationCode,
        orgIdentificationCodeType: patient.organizationInformation.orgIdentificationCodeType,

        orgCommunicationTypeTelephone: patient.organizationInformation.orgCommunicationTypeTelephone,
        orgCommunicationExt: patient.organizationInformation.orgCommunicationExt,
        orgCommunicationTypeFacsimile: patient.organizationInformation.orgCommunicationTypeFacsimile,
        orgCommunicationTypeEMail: patient.organizationInformation.orgCommunicationTypeEMail,
      },

      subscriberDetails: {
        id: patient.subscriberDetails.id,
        mrnNumber: patient.subscriberDetails.mrnNumber,
        subscriberLastName: patient.subscriberDetails.subscriberLastName,
        subscriberFirstName: patient.subscriberDetails.subscriberFirstName,
        subscriberMiddleName: patient.subscriberDetails.subscriberMiddleName,
        subscriberDob: (new Date(patient.subscriberDetails.subscriberDob)).toISOString(),
        subscriberGender: patient.subscriberDetails.subscriberGender,
        subscriberSuffix: patient.subscriberDetails.subscriberSuffix,
        subscriberPrefix: patient.subscriberDetails.subscriberPrefix,
        subscriberRelToInsured: patient.subscriberDetails.subscriberRelToInsured,
        subscriberIdentificationCode: patient.subscriberDetails.subscriberIdentificationCode,
        subscriberIdentificationNumberType: patient.subscriberDetails.subscriberIdentificationNumberType,
        subscriberSupplementalId: patient.subscriberDetails.subscriberSupplementalId,
        subscriberIdNumberType: patient.subscriberDetails.subscriberIdNumberType,
      },

      dependentDetails: {
        id: patient.dependentDetails.id,
        mrnNumber: patient.dependentDetails.mrnNumber,
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

      providerDetail: {
        id: patient.providerDetail.id,
        mrnNumber: patient.providerDetail.mrnNumber,
        reqProviderFullName: patient.providerDetail.reqProviderFullName,

        reqProviderFirstName: patient.providerDetail.reqProviderFirstName,
        reqProviderLastName: patient.providerDetail.reqProviderLastName,
        reqProviderMiddleName: patient.providerDetail.reqProviderMiddleName,
        reqProviderSuffix: patient.providerDetail.reqProviderSuffix,
        reqProviderPrefix: patient.providerDetail.reqProviderPrefix,

        reqProviderType: patient.providerDetail.reqProviderType,
        reqProviderIdentificationNumber: patient.providerDetail.reqProviderIdentificationNumber,
        reqProviderIdentificationNumberType: patient.providerDetail.reqProviderIdentificationNumberType,
        reqProviderSupplimentalId: patient.providerDetail.reqProviderSupplimentalId,
        reqProviderIdNumberType: patient.providerDetail.reqProviderIdNumberType,
        serviceDateFrom: (new Date(patient.providerDetail.serviceDateFrom)).toISOString(),
        serviceDateTo: (new Date(patient.providerDetail.serviceDateTo)).toISOString(),
        admitDate: (new Date(patient.providerDetail.admitDate)).toISOString(),
        dischargeDate: (new Date(patient.providerDetail.dischargeDate)).toISOString(),
        requestCategory: patient.providerDetail.requestCategory,
        certificationType: patient.providerDetail.certificationType,
        serviceType: patient.providerDetail.serviceType,
        levelOfService: patient.providerDetail.levelOfService,
      },
      requestService: {
        id: patient.requestService.id,
        mrnNumber: patient.requestService.mrnNumber,
        homeHealthAide: {
          id: patient.requestService.homeHealthAide.id,
          mrnNumber: patient.requestService.homeHealthAide.mrnNumber,
          homeHealthAideRevenueCode: patient.requestService.homeHealthAide.homeHealthAideRevenueCode,
          homeHealthAideProviderMiddleName: patient.requestService.homeHealthAide.homeHealthAideProviderMiddleName,
          homeHealthAidePoviderLastName: patient.requestService.homeHealthAide.homeHealthAidePoviderLastName,
          homeHealthAideProviderFirstName: patient.requestService.homeHealthAide.homeHealthAideProviderFirstName,
          homeHealthAideProviderSuffix: patient.requestService.homeHealthAide.homeHealthAideProviderSuffix,
          homeHealthAideProviderPrefix: patient.requestService.homeHealthAide.homeHealthAideProviderPrefix,

          homeHealthAideRequestServiceDateFrom:
            (new Date(patient.requestService.homeHealthAide.homeHealthAideRequestServiceDateFrom)).toISOString(),
          homeHealthAideRequestServiceDateTo:
            (new Date(patient.requestService.homeHealthAide.homeHealthAideRequestServiceDateTo)).toISOString(),
          homeHealthAideVisit: patient.requestService.homeHealthAide.homeHealthAideVisit,
          homeHealthAideUnit: patient.requestService.homeHealthAide.homeHealthAideUnit,
          homeHealthAideRequestCategory: patient.requestService.homeHealthAide.homeHealthAideRequestCategory,
          homeHealthAideCertificationType: patient.requestService.homeHealthAide.homeHealthAideCertificationType,
          homeHealthAideServiceType: patient.requestService.homeHealthAide.homeHealthAideServiceType,
          homeHealthAideLevelOfService: patient.requestService.homeHealthAide.homeHealthAideLevelOfService,
          homeHealthAideProviderFullName: patient.requestService.homeHealthAide.homeHealthAideProviderFullName,
          homeHealthAideProviderType: patient.requestService.homeHealthAide.homeHealthAideProviderType,
          homeHealthAideProviderAddress: patient.requestService.homeHealthAide.homeHealthAideProviderAddress,
          homeHealthAideProviderCity: patient.requestService.homeHealthAide.homeHealthAideProviderCity,
          homeHealthAideProviderState: patient.requestService.homeHealthAide.homeHealthAideProviderState,
          homeHealthAideProviderPostalCode: patient.requestService.homeHealthAide.homeHealthAideProviderPostalCode,
          homeHealthAideProviderCountryCode: patient.requestService.homeHealthAide.homeHealthAideProviderCountryCode,
          homeHealthAideProviderIdentificationNumber: patient.requestService.homeHealthAide.homeHealthAideProviderIdentificationNumber,
          homeHealthAideProviderIdentificationNumberType:
            patient.requestService.homeHealthAide.homeHealthAideProviderIdentificationNumberType,
          homeHealthAideProviderSupplimentalId: patient.requestService.homeHealthAide.homeHealthAideProviderSupplimentalId,
          homeHealthAideProviderIdNumberType: patient.requestService.homeHealthAide.homeHealthAideProviderIdNumberType,
          homeHealthAideSelected: patient.requestService.homeHealthAide.homeHealthAideSelected,
        },

        medicalSocialWork: {
          id: patient.requestService.medicalSocialWork.id,
          mrnNumber: patient.requestService.medicalSocialWork.mrnNumber,
          medicalSocialWorkRevenueCode: patient.requestService.medicalSocialWork.medicalSocialWorkRevenueCode,
          medicalSocialWorkProviderMiddleName: patient.requestService.medicalSocialWork.medicalSocialWorkProviderMiddleName,
          medicalSocialWorkPoviderLastName: patient.requestService.medicalSocialWork.medicalSocialWorkPoviderLastName,
          medicalSocialWorkProviderFirstName: patient.requestService.medicalSocialWork.medicalSocialWorkProviderFirstName,
          medicalSocialWorkProviderSuffix: patient.requestService.medicalSocialWork.medicalSocialWorkProviderSuffix,
          medicalSocialWorkProviderPrefix: patient.requestService.medicalSocialWork.medicalSocialWorkProviderPrefix,

          medicalSocialWorkRequestServiceDateFrom:
            (new Date(patient.requestService.medicalSocialWork.medicalSocialWorkRequestServiceDateFrom)).toISOString(),
          medicalSocialWorkRequestServiceDateTo:
            (new Date(patient.requestService.medicalSocialWork.medicalSocialWorkRequestServiceDateTo)).toISOString(),
          medicalSocialWorkVisit: patient.requestService.medicalSocialWork.medicalSocialWorkVisit,
          medicalSocialWorkUnit: patient.requestService.medicalSocialWork.medicalSocialWorkUnit,
          medicalSocialWorkRequestCategory: patient.requestService.medicalSocialWork.medicalSocialWorkRequestCategory,
          medicalSocialWorkCertificationType: patient.requestService.medicalSocialWork.medicalSocialWorkCertificationType,
          medicalSocialWorkServiceType: patient.requestService.medicalSocialWork.medicalSocialWorkServiceType,
          medicalSocialWorkLevelOfService: patient.requestService.medicalSocialWork.medicalSocialWorkLevelOfService,
          medicalSocialWorkProviderFullName: patient.requestService.medicalSocialWork.medicalSocialWorkProviderFullName,
          medicalSocialWorkProviderType: patient.requestService.medicalSocialWork.medicalSocialWorkProviderType,
          medicalSocialWorkProviderAddress: patient.requestService.medicalSocialWork.medicalSocialWorkProviderAddress,
          medicalSocialWorkProviderCity: patient.requestService.medicalSocialWork.medicalSocialWorkProviderCity,
          medicalSocialWorkProviderState: patient.requestService.medicalSocialWork.medicalSocialWorkProviderState,
          medicalSocialWorkProviderPostalCode: patient.requestService.medicalSocialWork.medicalSocialWorkProviderPostalCode,
          medicalSocialWorkProviderCountryCode: patient.requestService.medicalSocialWork.medicalSocialWorkProviderCountryCode,
          medicalSocialWorkProviderIdentificationNumber:
            patient.requestService.medicalSocialWork.medicalSocialWorkProviderIdentificationNumber,
          medicalSocialWorkProviderIdentificationNumberType:
            patient.requestService.medicalSocialWork.medicalSocialWorkProviderIdentificationNumberType,
          medicalSocialWorkProviderSupplimentalId: patient.requestService.medicalSocialWork.medicalSocialWorkProviderSupplimentalId,
          medicalSocialWorkProviderIdNumberType: patient.requestService.medicalSocialWork.medicalSocialWorkProviderIdNumberType,
          medicalSocialWorkSelected: patient.requestService.medicalSocialWork.medicalSocialWorkSelected,
        },

        occupationTherapy: {
          id: patient.requestService.occupationTherapy.id,
          mrnNumber: patient.requestService.occupationTherapy.mrnNumber,
          occupationTherapyRevenueCode: patient.requestService.occupationTherapy.occupationTherapyRevenueCode,
          occupationTherapyProviderMiddleName: patient.requestService.occupationTherapy.occupationTherapyProviderMiddleName,
          occupationTherapyPoviderLastName: patient.requestService.occupationTherapy.occupationTherapyPoviderLastName,
          occupationTherapyProviderFirstName: patient.requestService.occupationTherapy.occupationTherapyProviderFirstName,
          occupationTherapyProviderSuffix: patient.requestService.occupationTherapy.occupationTherapyProviderSuffix,
          occupationTherapyProviderPrefix: patient.requestService.occupationTherapy.occupationTherapyProviderPrefix,

          occupationTherapyRequestServiceDateFrom:
            (new Date(patient.requestService.occupationTherapy.occupationTherapyRequestServiceDateFrom)).toISOString(),
          occupationTherapyRequestServiceDateTo:
            (new Date(patient.requestService.occupationTherapy.occupationTherapyRequestServiceDateTo)).toISOString(),
          occupationTherapyVisit: patient.requestService.occupationTherapy.occupationTherapyVisit,
          occupationTherapyUnit: patient.requestService.occupationTherapy.occupationTherapyUnit,
          occupationTherapyRequestCategory: patient.requestService.occupationTherapy.occupationTherapyRequestCategory,
          occupationTherapyCertificationType: patient.requestService.occupationTherapy.occupationTherapyCertificationType,
          occupationTherapyServiceType: patient.requestService.occupationTherapy.occupationTherapyServiceType,
          occupationTherapyLevelOfService: patient.requestService.occupationTherapy.occupationTherapyLevelOfService,
          occupationTherapyProviderFullName: patient.requestService.occupationTherapy.occupationTherapyProviderFullName,
          occupationTherapyProviderType: patient.requestService.occupationTherapy.occupationTherapyProviderType,
          occupationTherapyProviderAddress: patient.requestService.occupationTherapy.occupationTherapyProviderAddress,
          occupationTherapyProviderCity: patient.requestService.occupationTherapy.occupationTherapyProviderCity,
          occupationTherapyProviderState: patient.requestService.occupationTherapy.occupationTherapyProviderState,
          occupationTherapyProviderPostalCode: patient.requestService.occupationTherapy.occupationTherapyProviderPostalCode,
          occupationTherapyProviderCountryCode: patient.requestService.occupationTherapy.occupationTherapyProviderCountryCode,
          occupationTherapyProviderIdentificationNumber:
            patient.requestService.occupationTherapy.occupationTherapyProviderIdentificationNumber,
          occupationTherapyProviderIdentificationNumberType:
            patient.requestService.occupationTherapy.occupationTherapyProviderIdentificationNumberType,
          occupationTherapyProviderSupplimentalId: patient.requestService.occupationTherapy.occupationTherapyProviderSupplimentalId,
          occupationTherapyProviderIdNumberType: patient.requestService.occupationTherapy.occupationTherapyProviderIdNumberType,
          occupationTherapySelected: patient.requestService.occupationTherapy.occupationTherapySelected,
        },

        skilledNursing: {
          id: patient.requestService.skilledNursing.id,
          mrnNumber: patient.requestService.skilledNursing.mrnNumber,
          skilledNursingRevenueCode: patient.requestService.skilledNursing.skilledNursingRevenueCode,
          skilledNursingProviderMiddleName: patient.requestService.skilledNursing.skilledNursingProviderMiddleName,
          skilledNursingPoviderLastName: patient.requestService.skilledNursing.skilledNursingPoviderLastName,
          skilledNursingProviderFirstName: patient.requestService.skilledNursing.skilledNursingProviderFirstName,
          skilledNursingProviderSuffix: patient.requestService.skilledNursing.skilledNursingProviderSuffix,
          skilledNursingProviderPrefix: patient.requestService.skilledNursing.skilledNursingProviderPrefix,

          skilledNursingRequestServiceDateFrom:
            (new Date(patient.requestService.skilledNursing.skilledNursingRequestServiceDateFrom)).toISOString(),
          skilledNursingRequestServiceDateTo:
            (new Date(patient.requestService.skilledNursing.skilledNursingRequestServiceDateTo)).toISOString(),
          skilledNursingVisit: patient.requestService.skilledNursing.skilledNursingVisit,
          skilledNursingUnit: patient.requestService.skilledNursing.skilledNursingUnit,
          skilledNursingRequestCategory: patient.requestService.skilledNursing.skilledNursingRequestCategory,
          skilledNursingCertificationType: patient.requestService.skilledNursing.skilledNursingCertificationType,
          skilledNursingServiceType: patient.requestService.skilledNursing.skilledNursingServiceType,
          skilledNursingLevelOfService: patient.requestService.skilledNursing.skilledNursingLevelOfService,
          skilledNursingProviderFullName: patient.requestService.skilledNursing.skilledNursingProviderFullName,
          skilledNursingProviderType: patient.requestService.skilledNursing.skilledNursingProviderType,
          skilledNursingProviderAddress: patient.requestService.skilledNursing.skilledNursingProviderAddress,
          skilledNursingProviderCity: patient.requestService.skilledNursing.skilledNursingProviderCity,
          skilledNursingProviderState: patient.requestService.skilledNursing.skilledNursingProviderState,
          skilledNursingProviderPostalCode: patient.requestService.skilledNursing.skilledNursingProviderPostalCode,
          skilledNursingProviderCountryCode: patient.requestService.skilledNursing.skilledNursingProviderCountryCode,
          skilledNursingProviderIdentificationNumber: patient.requestService.skilledNursing.skilledNursingProviderIdentificationNumber,
          skilledNursingProviderIdentificationNumberType:
            patient.requestService.skilledNursing.skilledNursingProviderIdentificationNumberType,
          skilledNursingProviderSupplimentalId: patient.requestService.skilledNursing.skilledNursingProviderSupplimentalId,
          skilledNursingProviderIdNumberType: patient.requestService.skilledNursing.skilledNursingProviderIdNumberType,
          skilledNursingSelected: patient.requestService.skilledNursing.skilledNursingSelected,
        },

        physicalTherapy: {
          id: patient.requestService.physicalTherapy.id,
          mrnNumber: patient.requestService.physicalTherapy.mrnNumber,
          physicalTherapyrevenueCode: patient.requestService.physicalTherapy.physicalTherapyrevenueCode,
          physicalTherapyProviderMiddleName: patient.requestService.physicalTherapy.physicalTherapyProviderMiddleName,
          physicalTherapyPoviderLastName: patient.requestService.physicalTherapy.physicalTherapyPoviderLastName,
          physicalTherapyProviderFirstName: patient.requestService.physicalTherapy.physicalTherapyProviderFirstName,
          physicalTherapyProviderSuffix: patient.requestService.physicalTherapy.physicalTherapyProviderSuffix,
          physicalTherapyProviderPrefix: patient.requestService.physicalTherapy.physicalTherapyProviderPrefix,

          physicalTherapyRequestServiceDateFrom:
            (new Date(patient.requestService.physicalTherapy.physicalTherapyRequestServiceDateFrom)).toISOString(),
          physicalTherapyRequestServiceDateTo:
            (new Date(patient.requestService.physicalTherapy.physicalTherapyRequestServiceDateTo)).toISOString(),
          physicalTherapyVisit: patient.requestService.physicalTherapy.physicalTherapyVisit,
          physicalTherapyUnit: patient.requestService.physicalTherapy.physicalTherapyUnit,
          physicalTherapyRequestCategory: patient.requestService.physicalTherapy.physicalTherapyRequestCategory,
          physicalTherapyCertificationType: patient.requestService.physicalTherapy.physicalTherapyCertificationType,
          physicalTherapyServiceType: patient.requestService.physicalTherapy.physicalTherapyServiceType,
          physicalTherapyLevelOfService: patient.requestService.physicalTherapy.physicalTherapyLevelOfService,
          physicalTherapyProviderFullName: patient.requestService.physicalTherapy.physicalTherapyProviderFullName,
          physicalTherapyProviderType: patient.requestService.physicalTherapy.physicalTherapyProviderType,
          physicalTherapyProviderAddress: patient.requestService.physicalTherapy.physicalTherapyProviderAddress,
          physicalTherapyProviderCity: patient.requestService.physicalTherapy.physicalTherapyProviderCity,
          physicalTherapyProviderState: patient.requestService.physicalTherapy.physicalTherapyProviderState,
          physicalTherapyProviderPostalCode: patient.requestService.physicalTherapy.physicalTherapyProviderPostalCode,
          physicalTherapyProviderCountryCode: patient.requestService.physicalTherapy.physicalTherapyProviderCountryCode,
          physicalTherapyProviderIdentificationNumber: patient.requestService.physicalTherapy.physicalTherapyProviderIdentificationNumber,
          physicalTherapyProviderIdentificationNumberType:
            patient.requestService.physicalTherapy.physicalTherapyProviderIdentificationNumberType,
          physicalTherapyProviderSupplimentalId: patient.requestService.physicalTherapy.physicalTherapyProviderSupplimentalId,
          physicalTherapyProviderIdNumberType: patient.requestService.physicalTherapy.physicalTherapyProviderIdNumberType,
          physicalTherapySelected: patient.requestService.physicalTherapy.physicalTherapySelected,
        },

        speechPathology: {
          id: patient.requestService.speechPathology.id,
          mrnNumber: patient.requestService.speechPathology.mrnNumber,
          speechPathologyRevenueCode: patient.requestService.speechPathology.speechPathologyRevenueCode,
          speechPathologyProviderMiddleName: patient.requestService.speechPathology.speechPathologyProviderMiddleName,
          speechPathologyPoviderLastName: patient.requestService.speechPathology.speechPathologyPoviderLastName,
          speechPathologyProviderFirstName: patient.requestService.speechPathology.speechPathologyProviderFirstName,
          speechPathologyProviderSuffix: patient.requestService.speechPathology.speechPathologyProviderSuffix,
          speechPathologyProviderPrefix: patient.requestService.speechPathology.speechPathologyProviderPrefix,

          speechPathologyRequestServiceDateFrom:
            (new Date(patient.requestService.speechPathology.speechPathologyRequestServiceDateFrom)).toISOString(),
          speechPathologyRequestServiceDateTo:
            (new Date(patient.requestService.speechPathology.speechPathologyRequestServiceDateTo)).toISOString(),
          speechPathologyVisit: patient.requestService.speechPathology.speechPathologyVisit,
          speechPathologyUnit: patient.requestService.speechPathology.speechPathologyUnit,
          speechPathologyRequestCategory: patient.requestService.speechPathology.speechPathologyRequestCategory,
          speechPathologyCertificationType: patient.requestService.speechPathology.speechPathologyCertificationType,
          speechPathologyServiceType: patient.requestService.speechPathology.speechPathologyServiceType,
          speechPathologyLevelOfService: patient.requestService.speechPathology.speechPathologyLevelOfService,
          speechPathologyProviderFullName: patient.requestService.speechPathology.speechPathologyProviderFullName,
          speechPathologyProviderType: patient.requestService.speechPathology.speechPathologyProviderType,
          speechPathologyProviderAddress: patient.requestService.speechPathology.speechPathologyProviderAddress,
          speechPathologyProviderCity: patient.requestService.speechPathology.speechPathologyProviderCity,
          speechPathologyProviderState: patient.requestService.speechPathology.speechPathologyProviderState,
          speechPathologyProviderPostalCode: patient.requestService.speechPathology.speechPathologyProviderPostalCode,
          speechPathologyProviderCountryCode: patient.requestService.speechPathology.speechPathologyProviderCountryCode,
          speechPathologyProviderIdentificationNumber: patient.requestService.speechPathology.speechPathologyProviderIdentificationNumber,
          speechPathologyProviderIdentificationNumberType:
            patient.requestService.speechPathology.speechPathologyProviderIdentificationNumberType,
          speechPathologyProviderSupplimentalId: patient.requestService.speechPathology.speechPathologyProviderSupplimentalId,
          speechPathologyProviderIdNumberType: patient.requestService.speechPathology.speechPathologyProviderIdNumberType,
          speechPathologySelected: patient.requestService.speechPathology.speechPathologySelected,
        },
      },
    };

    this.preAuthForm.setValue(formData);

    console.log('Form Populated Data ', formData);
  }
  /* Populating Form Data */

  compareFn = (val1: string, val2: string) => {
    return (val1 === val2);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSubmit(formData) {
    console.log(formData);
  }


}
