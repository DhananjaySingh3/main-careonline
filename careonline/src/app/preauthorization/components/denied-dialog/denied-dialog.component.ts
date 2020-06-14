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
import {
  Sex, Suffix, Genders, Plans, City, State, Relation, Prefixes,
  Payment, RequestTypes, InsuranceTypes, RequestFor, PreAuthStatus, RejectReasons, FollowUpActDesc,
  IdentificationNoType, RequestCategory, CertificationType, ServiceType, LevelOfService, CertificationAction,
  RejectReasonsMsg, IdNoType, IdentificationCodeType, ProviderTypes, PerUnitTypes, PreAuthResponseStatus
} from '../../../preauthorization/models/preauth-common.model';
// import {  } from '../../../preauthorization/components/denied-dialog/;


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-denied-dialog',
  templateUrl: './denied-dialog.component.html',
  styleUrls: ['./denied-dialog.component.css']
})

export class DeniedDialogComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  /* Selected Patient's Data received via Dialog while opening from preauthList Component*/
  heading = this.data.heading;
  selectedPatientViaDialog = { ...this.data.selectedPatientData };
  /* Selected Patient's Data received via Dialog while opening from preauthList Component ends*/

  isLoadingResults = true;
  select;

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

  // ............
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
    public dialogRef: MatDialogRef<DeniedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public preAuthFormService: PreAuthFormService,
    public commonService: CommonService,
    public preAuthService: PreAuthService,
    public datePipe: DatePipe,
  ) { }

  /* Building Form */
  preAuthReponseForm: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: false }),

    /*Preauthorization Details*/
    authorizationDetail: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),

      totalUnitsApproved: new FormControl({ value: '0', disabled: false }, [Validators.required, Validators.pattern(this.unitsPattern)]),
      totalUnitsConsumed: new FormControl({ value: '0', disabled: false }, [Validators.required, Validators.pattern(this.unitsPattern)]),
      remainingUnits: new FormControl({ value: '0', disabled: false }, [Validators.required, Validators.pattern(this.unitsPattern)]),
      noOfUnitsTobeUsed: new FormControl({ value: '0', disabled: false }, [Validators.pattern(this.unitsPattern)]),
      unitsForNoOfUnitsTobeUsed: new FormControl({ value: '', disabled: false }, [Validators.required]),
      enquiryDetailStatus: new FormControl({ value: '', disabled: false }),
      enquiryId: new FormControl({ value: '', disabled: false }, [Validators.required]),
      processDateAndTime: new FormControl({ value: '', disabled: false }, [Validators.required]),
      serviceDateFrom: new FormControl({ value: '', disabled: false }),
      serviceDateTo: new FormControl({ value: '', disabled: false }),
      admitDate: new FormControl({ value: '', disabled: false }),
      dischargeDate: new FormControl({ value: '', disabled: false }),
      certificationIdentificationNumber: new FormControl({ value: '', disabled: false }),
      effectiveDateFrom: new FormControl({ value: '', disabled: false }),
      effectiveDateTo: new FormControl({ value: '', disabled: false }),
      expirationeDateTo: new FormControl({ value: '', disabled: false }),
      preAuthorizationStatus: new FormControl({ value: '', disabled: false }, [Validators.required]),
    }),
    /*Preauthorization Details*/

    /*Member Demographic details*/
    memberDetailStatus: new FormControl({ value: '', disabled: false }),
    mrnNumber: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.mrnNumberPattern)]),
    memberlastName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.userNamePattern)]),
    memberfirstName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.userNamePattern)]),
    membermiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
    memberdob: new FormControl({ value: '', disabled: false }, [Validators.required]),
    membergender: new FormControl({ value: 'Unknown', disabled: false }, [Validators.required]),
    membersuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
    memberPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
    // ssn: new FormControl({ value: '', disabled: false }),
    memberRelationshipToSubscriber: new FormControl({ value: 'Select', disabled: false }),

    /*Organization Information*/
    orgCommunicationTypeTelephone: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.communPatrn)]),
    orgCommunicationTypeFacsimile: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.communPatrn)]),
    orgCommunicationTypeEMail: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.communPatrn)]),
    orgCommunicationExt: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.extPattern)]),

    orgDetailStatus: new FormControl({ value: '', disabled: false }),
    organizationName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.orgNamePattern)]),
    orgIdentificationCode: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.orgIdCodePatrn)]),
    orgIdentificationCodeType: new FormControl({ value: '', disabled: false }, [Validators.required]),
    orgRejectionReason: new FormControl({ value: 'Select', disabled: false }),
    orgFollowUpActionDescription: new FormControl({ value: 'Select', disabled: false }),

    // orgFollowUpActionRequired: new FormControl({ value: 'true', disabled: true }),
    // orgRequestValidationAccepted: new FormControl({ value: 'true', disabled: true }),
    // orgTransactionRejected: new FormControl({ value: 'true', disabled: true }),

    /*Subscriber Details*/
    subscriberRelToInsured: new FormControl({ value: 'Unknown', disabled: false }, [Validators.required]),
    subscriberIdNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
    subscriberIdentificationCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.orgIdCodePatrn)]),

    subscriberDetailStatus: new FormControl({ value: '', disabled: false }),
    subscriberLastName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.userNamePattern)]),
    subscriberFirstName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.userNamePattern)]),
    subscriberMiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
    subscriberDob: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
    subscriberGender: new FormControl({ value: 'Unknown', disabled: false }, [Validators.required]),
    subscriberSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
    subscriberPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
    // subscSsn: new FormControl({ value: '', disabled: false }),
    subscriberSupplementalId: new FormControl({ value: '', disabled: false },
      [Validators.required, Validators.pattern(this.supplIdPattern)]),
    subscriberIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
    subscriberRejectionReason: new FormControl({ value: 'Select', disabled: false }),
    subscriberFollowUpActionDescription: new FormControl({ value: 'Select', disabled: false }),

    /*Dependent Information*/
    // dependentDetailStatus: new FormControl({ value: '', disabled: false }),
    // dependentSupplementalId: new FormControl({ value: '', disabled: false },
    //   [Validators.required, Validators.pattern(this.supplIdPattern)]),
    // dependentIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
    // dependentRejectionReason: new FormControl({ value: 'Select', disabled: false }),
    // dependentFollowUpActionDescription: new FormControl({ value: 'Select', disabled: false }),

    dependentSubscriberIdentificationCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.orgIdCodePatrn)]),
    dependentSubscriberIdNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
    dependentPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),

    dependentLastName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.userNamePattern)]),
    dependentFirstName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.userNamePattern)]),
    dependentMiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
    dependentDob: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
    dependentGender: new FormControl({ value: '', disabled: false }, [Validators.required]),
    dependentSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
    dependentReletionship: new FormControl({ value: '', disabled: false }, [Validators.required]),

    /*Requester Provider Information*/

    /*Note: Requester Provider Full Name is missing*/
    requesterResponseInformation: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      reqProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      reqProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      serviceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      serviceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      admitDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      dischargeDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      requestCategory: new FormControl({ value: 'Select', disabled: false }, [Validators.required]), // Admission Review
      certificationType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      serviceType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      levelOfService: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),

      reqProviderDetailStatus: new FormControl({ value: '', disabled: false }),
      reqProviderFullName: new FormControl({ value: '', disabled: false }, []),
      reqProviderFirstName: new FormControl({ value: '', disabled: false }, []),
      reqProviderLastName: new FormControl({ value: '', disabled: false }, []),
      reqProviderMiddleName: new FormControl({ value: '', disabled: false }, []),
      reqProviderType: new FormControl({ value: 'Select', disabled: false }, []),
      reqProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
      reqProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
      reqProviderSupplimentalId: new FormControl({ value: '', disabled: false }),
      reqProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }),
      reqProviderRejectionReason: new FormControl({ value: 'Select', disabled: false }),
      reqProviderFollowUpActionDescription: new FormControl({ value: 'Select', disabled: false }),
    }),

    /*Servicing Provider Information*/

    servicingProviderDetailStatus: new FormControl({ value: '', disabled: false }),
    servicingProviderFullName: new FormControl({ value: '', disabled: false }, []),
    servicingProviderFirstName: new FormControl({ value: '', disabled: false }, []),
    servicingProviderLastName: new FormControl({ value: '', disabled: false }, []),
    servicingProviderMiddleName: new FormControl({ value: '', disabled: false }, []),
    servicingProviderType: new FormControl({ value: 'Select', disabled: false }, []),
    servicingProviderAddress: new FormControl({ value: '', disabled: false }, []),
    servicingProviderCity: new FormControl({ value: '', disabled: false }, []),
    servicingProviderState: new FormControl({ value: '', disabled: false }, []),
    servicingProviderPostalCode: new FormControl({ value: '', disabled: false }, []),
    servicingProviderCountryCode: new FormControl({ value: '', disabled: false }, []),

    servicingProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
    servicingProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
    servicingProviderSupplimentId: new FormControl({ value: '', disabled: false }),
    servicingProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }),
    servicingProviderRejectionReason: new FormControl({ value: 'Select', disabled: false }),
    servicingProviderFollowUpActionDescription: new FormControl({ value: 'Select', disabled: false }),

    /*Physical Therapy Information*/
    physicalTherapyResponse: new FormGroup({
      physicalTherapyProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      physicalTherapyProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      physicalTherapyResponseServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      physicalTherapyResponseServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      physicalTherapyRevenueCode: new FormControl({ value: '', disabled: false }, []),

      id: new FormControl({ value: '', disabled: false }),
      physicalTherapyDetailStatus: new FormControl({ value: '', disabled: false }),

      physicalTherapyRequestCategory: new FormControl({ value: 'Select', disabled: false }),
      physicalTherapyCertificationType: new FormControl({ value: 'Select', disabled: false }),
      physicalTherapyServiceType: new FormControl({ value: 'Select', disabled: false }),
      physicalTherapyLevelOfService: new FormControl({ value: 'Select', disabled: false }),
      physicalTherapyVisit: new FormControl({ value: '', disabled: false }),
      physicalTherapyUnit: new FormControl({ value: '', disabled: false }),
      physicalTherapyCertificationAction: new FormControl({ value: 'Select', disabled: false }),
      physicalTherapyRejectionReason: new FormControl({ value: 'Select', disabled: false }),
      physicalTherapyRejectionReasonMSG: new FormControl({ value: 'Select', disabled: false }),

      physicalTherapyProviderFullName: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderFirstName: new FormControl({ value: '', disabled: false }),
      physicalTherapyPoviderLastName: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderMiddleName: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderType: new FormControl({ value: 'Select', disabled: false }),

      physicalTherapyProviderAddress: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderCity: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderState: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderPostalCode: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderCountryCode: new FormControl({ value: '', disabled: false }),

      physicalTherapyProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderIdentificationNumberType: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderSupplimentalId: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderIdNumberType: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderRejectionReason: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderFollowUpActionDescription: new FormControl({ value: '', disabled: false }),

    }),
    /*Occupational Therapy Information*/
    occupationalTherapyResponse: new FormGroup({
      occupationalTherapyProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      occupationalTherapyProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      occupationalTherapyResponseServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      occupationalTherapyResponseServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      occupationalTherapyRevenueCode: new FormControl({ value: '', disabled: false }, []),

      id: new FormControl({ value: '', disabled: false }),
      occupationalTherapyDetailStatus: new FormControl({ value: '', disabled: false }),

      occupationalTherapyRequestCategory: new FormControl({ value: 'Select', disabled: false }),
      occupationalTherapyCertificationType: new FormControl({ value: 'Select', disabled: false }),
      occupationalTherapyServiceType: new FormControl({ value: 'Select', disabled: false }),
      occupationalTherapyLevelOfService: new FormControl({ value: 'Select', disabled: false }),
      occupationalTherapyVisit: new FormControl({ value: '', disabled: false }),
      occupationalTherapyUnit: new FormControl({ value: '', disabled: false }),
      occupationalTherapyCertificationAction: new FormControl({ value: 'Select', disabled: false }),
      occupationalTherapyRejectionReason: new FormControl({ value: 'Select', disabled: false }),
      occupationalTherapyRejectionReasonMSG: new FormControl({ value: 'Select', disabled: false }),

      occupationalTherapyProviderFullName: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderFirstName: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderMiddleName: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderLastName: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderType: new FormControl({ value: 'Select', disabled: false }),

      occupationalTherapyAddress: new FormControl({ value: '', disabled: false }),
      occupationalTherapyCity: new FormControl({ value: '', disabled: false }),
      occupationalTherapyState: new FormControl({ value: '', disabled: false }),
      occupationalTherapyPostalCode: new FormControl({ value: '', disabled: false }),
      occupationalTherapyCountryCode: new FormControl({ value: '', disabled: false }),

      occupationalTherapyProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
      occupationalProviderIdentificationNumberType: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderSupplimentalId: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderIdNumberType: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderRejectionReason: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderFollowUpActionDescription: new FormControl({ value: '', disabled: false }),
    }),
    /*Medical Social Work Information*/
    medicalSocialWorkResponse: new FormGroup({
      medicalSocialWorkProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      medicalSocialWorkProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      medicalSocialWorkResponseServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      medicalSocialWorkResponseServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      medicalSocialWorkRevenueCode: new FormControl({ value: '', disabled: false }, []),

      id: new FormControl({ value: '', disabled: true }),
      medicalSocialWorkDetailStatus: new FormControl({ value: '', disabled: true }),

      medicalSocialWorkRequestCategory: new FormControl({ value: 'Select', disabled: true }),
      medicalSocialWorkCertificationType: new FormControl({ value: 'Select', disabled: true }),
      medicalSocialWorkServiceType: new FormControl({ value: 'Select', disabled: true }),
      medicalSocialWorkLevelOfService: new FormControl({ value: 'Select', disabled: true }),
      medicalSocialWorkUnit: new FormControl({ value: '', disabled: true }),
      medicalSocialWorkVisit: new FormControl({ value: '', disabled: true }),
      medicalSocialWorkCertificationAction: new FormControl({ value: 'Select', disabled: true }),
      medicalSocialWorkRejectionReason: new FormControl({ value: 'Select', disabled: true }),
      medicalSocialWorkRejectionReasonMSG: new FormControl({ value: 'Select', disabled: true }),

      medicalSocialWorkProviderFullName: new FormControl({ value: '', disabled: true }),
      medicalSocialWorkProviderFirstName: new FormControl({ value: '', disabled: true }),
      medicalSocialWorkPoviderLastName: new FormControl({ value: '', disabled: true }),
      medicalSocialWorkProviderMiddleName: new FormControl({ value: '', disabled: true }),
      medicalSocialWorkProviderType: new FormControl({ value: 'Select', disabled: true }),

      medicalSocialWorkProviderAddress: new FormControl({ value: '', disabled: true }),
      medicalSocialWorkProviderState: new FormControl({ value: '', disabled: true }),
      medicalSocialWorkProviderCity: new FormControl({ value: '', disabled: true }),
      medicalSocialWorkProviderPostalCode: new FormControl({ value: '', disabled: true }),
      medicalSocialWorkProviderCountryCode: new FormControl({ value: '', disabled: true }),

      medicalSocialWorkProviderIdentificationNumber: new FormControl({ value: '', disabled: true }),
      medicalSocialWorkProviderIdentificationNumberType: new FormControl({ value: '', disabled: true }),
      medicalSocialWorkProviderSupplimentalId: new FormControl({ value: '', disabled: true }),
      medicalSocialWorkProviderIdNumberType: new FormControl({ value: '', disabled: true }),
      medicalSocialWorkProviderRejectionReason: new FormControl({ value: '', disabled: true }),
      medicalSocialWorkProviderFollowUpActionDescription: new FormControl({ value: '', disabled: true }),
    }),

    /*Skilled Nursing Information*/
    skilledNursingResponse: new FormGroup({
      skilledNursingProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      skilledNursingProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      skilledNursingResponseServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      skilledNursingResponseServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      skilledNursingRevenueCode: new FormControl({ value: '', disabled: false }, []),

      id: new FormControl({ value: '', disabled: true }),
      skilledNursingDetailStatus: new FormControl({ value: '', disabled: true }),

      skilledNursingRequestCategory: new FormControl({ value: 'Select', disabled: true }),
      skilledNursingCertificationType: new FormControl({ value: 'Select', disabled: true }),
      skilledNursingServiceType: new FormControl({ value: 'Select', disabled: true }),
      skilledNursingLevelOfService: new FormControl({ value: 'Select', disabled: true }),
      skilledNursingUnit: new FormControl({ value: '', disabled: true }),
      skilledNursingVisit: new FormControl({ value: '', disabled: true }),
      skilledNursingCertificationAction: new FormControl({ value: 'Select', disabled: true }),
      skilledNursingRejectionReason: new FormControl({ value: 'Select', disabled: true }),
      skilledNursingRejectionReasonMSG: new FormControl({ value: 'Select', disabled: true }),

      skilledNursingProviderFullName: new FormControl({ value: '', disabled: true }),
      skilledNursingProviderFirstName: new FormControl({ value: '', disabled: true }),
      skilledNursingPoviderLastName: new FormControl({ value: '', disabled: true }),
      skilledNursingProviderMiddleName: new FormControl({ value: '', disabled: true }),
      skilledNursingProviderType: new FormControl({ value: 'Select', disabled: true }),

      skilledNursingProviderAddress: new FormControl({ value: '', disabled: true }),
      skilledNursingProviderCity: new FormControl({ value: '', disabled: true }),
      skilledNursingProviderState: new FormControl({ value: '', disabled: true }),
      skilledNursingProviderPostalCode: new FormControl({ value: '', disabled: true }),
      skilledNursingProviderCountryCode: new FormControl({ value: '', disabled: true }),

      skilledNursingProviderIdentificationNumber: new FormControl({ value: '', disabled: true }),
      skilledNursingProviderIdentificationNumberType: new FormControl({ value: '', disabled: true }),
      skilledNursingProviderSupplimentalId: new FormControl({ value: '', disabled: true }),
      skilledNursingProviderIdNumberType: new FormControl({ value: '', disabled: true }),
      skilledNursingProviderRejectionReason: new FormControl({ value: '', disabled: true }),
      skilledNursingProviderFollowUpActionDescription: new FormControl({ value: '', disabled: true }),
    }),

    /*speech Pathology Information*/

    speechPathologyResponse: new FormGroup({
      speechPathologyProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      speechPathologyProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      speechPathologyResponseServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      speechPathologyResponseServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      speechPathologyRevenueCode: new FormControl({ value: '', disabled: false }, []),

      id: new FormControl({ value: '', disabled: true }),
      speechPathologyDetailStatus: new FormControl({ value: '', disabled: true }),

      speechPathologyRequestCategory: new FormControl({ value: 'Select', disabled: true }),
      speechPathologyCertificationType: new FormControl({ value: 'Select', disabled: true }),
      speechPathologyServiceType: new FormControl({ value: 'Select', disabled: true }),
      speechPathologyLevelOfService: new FormControl({ value: 'Select', disabled: true }),
      speechPathologyVisit: new FormControl({ value: '', disabled: true }),
      speechPathologyUnit: new FormControl({ value: '', disabled: true }),
      speechPathologyCertificationAction: new FormControl({ value: 'Select', disabled: true }),
      speechPathologyRejectionReason: new FormControl({ value: 'Select', disabled: true }),
      speechPathologyRejectionReasonMSG: new FormControl({ value: 'Select', disabled: true }),

      speechPathologyProviderFullName: new FormControl({ value: '', disabled: true }),
      speechPathologyProviderFirstName: new FormControl({ value: '', disabled: true }),
      speechPathologyPoviderLastName: new FormControl({ value: '', disabled: true }),
      speechPathologyProviderMiddleName: new FormControl({ value: '', disabled: true }),
      speechPathologyProviderType: new FormControl({ value: 'Select', disabled: true }),

      speechPathologyProviderAddress: new FormControl({ value: '', disabled: true }),
      speechPathologyProviderCity: new FormControl({ value: '', disabled: true }),
      speechPathologyProviderState: new FormControl({ value: '', disabled: true }),
      speechPathologyProviderPostalCode: new FormControl({ value: '', disabled: true }),
      speechPathologyProviderCountryCode: new FormControl({ value: '', disabled: true }),

      speechPathologyProviderIdentificationNumber: new FormControl({ value: '', disabled: true }),
      speechPathologyProviderIdentificationNumberType: new FormControl({ value: '', disabled: true }),
      speechPathologyProviderSupplimentalId: new FormControl({ value: '', disabled: true }),
      speechPathologyProviderIdNumberType: new FormControl({ value: '', disabled: true }),
      speechPathologyProviderRejectionReason: new FormControl({ value: '', disabled: true }),
      speechPathologyProviderFollowUpActionDescription: new FormControl({ value: '', disabled: true }),
    }),

    /*Home health aide Information*/
    homeHealthAideResponse: new FormGroup({
      homeHealthAideProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      homeHealthAideProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      homeHealthAideResponseServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      homeHealthAideResponseServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      homeHealthAideRevenueCode: new FormControl({ value: '', disabled: false }, []),

      id: new FormControl({ value: '', disabled: true }),
      homeHealthAideDetailStatus: new FormControl({ value: '', disabled: true }),

      homeHealthAideRequestCategory: new FormControl({ value: 'Select', disabled: true }),
      homeHealthAideCertificationType: new FormControl({ value: 'Select', disabled: true }),
      homeHealthAideServiceType: new FormControl({ value: 'Select', disabled: true }),
      homeHealthAideLevelOfService: new FormControl({ value: 'Select', disabled: true }),
      homeHealthAideVisit: new FormControl({ value: '', disabled: true }),
      homeHealthAideUnit: new FormControl({ value: '', disabled: true }),
      homeHealthAideCertificationAction: new FormControl({ value: 'Select', disabled: true }),
      homeHealthAideRejectionReason: new FormControl({ value: 'Select', disabled: true }),
      homeHealthAideRejectionReasonMSG: new FormControl({ value: 'Select', disabled: true }),

      homeHealthAideProviderFullName: new FormControl({ value: '', disabled: true }),
      homeHealthAideProviderFirstName: new FormControl({ value: '', disabled: true }),
      homeHealthAidePoviderLastName: new FormControl({ value: '', disabled: true }),
      homeHealthAideProviderMiddleName: new FormControl({ value: '', disabled: true }),
      homeHealthAideProviderType: new FormControl({ value: 'Select', disabled: true }),

      homeHealthAideProviderAddress: new FormControl({ value: '', disabled: true }),
      homeHealthAideProviderCity: new FormControl({ value: '', disabled: true }),
      homeHealthAideProviderState: new FormControl({ value: '', disabled: true }),
      homeHealthAideProviderPostalCode: new FormControl({ value: '', disabled: true }),
      homeHealthAideProviderCountryCode: new FormControl({ value: '', disabled: true }),

      homeHealthAideProviderIdentificationNumber: new FormControl({ value: '', disabled: true }),
      homeHealthAideProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: true }),
      homeHealthAideProviderSupplimentalId: new FormControl({ value: '', disabled: true }),
      homeHealthAideProviderIdNumberType: new FormControl({ value: 'Select', disabled: true }),
      homeHealthAideProviderRejectionReason: new FormControl({ value: '', disabled: true }),
      homeHealthAideProviderFollowUpActionDescription: new FormControl({ value: '', disabled: true }),
    }),

  });

  /* Building Form */

  /* Common Getters */

  get memberDetailStatus() {
    return this.preAuthReponseForm.get('memberDetailStatus').value;
  }

  /* Common Getters */

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
    // setTimeout(() => {
    this.isLoadingResults = true;
    this.commonMethods();
    this.preAuthService.viewDenialResponseData(this.selectedPatientViaDialog).subscribe((response) => {
      this.isLoadingResults = true;
      console.log('Denial data response ', response);
      if (response) {
        this.populateResponseFormData(response[0]);
        this.isLoadingResults = false;
      }
    },
      (error) => {
        console.log(error);
        this.isLoadingResults = false;
      });
    // });
  }

  compareFn = (val1: string, val2: string) => {
    return (val1 === val2);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSubmit(formData) {
    console.log(formData);
  }

  /* Populating ResponseForm Data */
  populateResponseFormData(patient: PreAuthResponse) {
    console.log('Pat data ', patient);

    const formData: PreAuthResponse = {
      id: patient.id,

      /*Preauthorization Details*/
      authorizationDetail: {
        id: patient.authorizationDetail.id,
        totalUnitsApproved: patient.authorizationDetail.totalUnitsApproved,
        totalUnitsConsumed: patient.authorizationDetail.totalUnitsConsumed,
        remainingUnits: patient.authorizationDetail.remainingUnits,
        noOfUnitsTobeUsed: patient.authorizationDetail.noOfUnitsTobeUsed,
        unitsForNoOfUnitsTobeUsed: patient.authorizationDetail.unitsForNoOfUnitsTobeUsed,
        enquiryId: patient.authorizationDetail.enquiryId,
        processDateAndTime: patient.authorizationDetail.processDateAndTime,
        serviceDateFrom: patient.authorizationDetail.serviceDateFrom,
        serviceDateTo: patient.authorizationDetail.serviceDateTo,
        effectiveDateTo: patient.authorizationDetail.effectiveDateTo,
        effectiveDateFrom: patient.authorizationDetail.effectiveDateFrom,
        expirationeDateTo: patient.authorizationDetail.expirationeDateTo,
        admitDate: patient.authorizationDetail.admitDate,
        dischargeDate: patient.authorizationDetail.dischargeDate,
        certificationIdentificationNumber: patient.authorizationDetail.certificationIdentificationNumber,
        preAuthorizationStatus: patient.authorizationDetail.preAuthorizationStatus,
        enquiryDetailStatus: patient.authorizationDetail.enquiryDetailStatus,
      },

      /*Member Details*/
      mrnNumber: patient.mrnNumber,
      memberfirstName: patient.memberfirstName,
      memberlastName: patient.memberlastName,
      membermiddleName: patient.membermiddleName,
      membersuffix: patient.membersuffix,
      membergender: patient.membergender,
      memberdob: patient.memberdob,
      memberPrefix: patient.memberPrefix,
      memberRelationshipToSubscriber: patient.memberRelationshipToSubscriber,
      memberDetailStatus: patient.memberDetailStatus,

      /*Organization Details*/
      orgCommunicationTypeTelephone: patient.orgCommunicationTypeTelephone,
      orgCommunicationTypeFacsimile: patient.orgCommunicationTypeFacsimile,
      orgCommunicationTypeEMail: patient.orgCommunicationTypeEMail,
      orgCommunicationExt: patient.orgCommunicationExt,

      organizationName: patient.organizationName,
      orgIdentificationCode: patient.orgIdentificationCode,
      orgIdentificationCodeType: patient.orgIdentificationCodeType,
      orgRejectionReason: patient.orgRejectionReason,
      orgFollowUpActionDescription: patient.orgFollowUpActionDescription,
      orgDetailStatus: patient.orgDetailStatus,

      /*Requester Provider Details*/
      requesterResponseInformation: {
        id: patient.requesterResponseInformation.id,
        reqProviderSuffix: patient.requesterResponseInformation.reqProviderSuffix,
        reqProviderPrefix: patient.requesterResponseInformation.reqProviderPrefix,
        serviceDateFrom: patient.requesterResponseInformation.serviceDateFrom,
        serviceDateTo: patient.requesterResponseInformation.serviceDateTo,
        admitDate: patient.requesterResponseInformation.admitDate,
        dischargeDate: patient.requesterResponseInformation.dischargeDate,
        requestCategory: patient.requesterResponseInformation.requestCategory,
        certificationType: patient.requesterResponseInformation.certificationType,
        serviceType: patient.requesterResponseInformation.serviceType,
        levelOfService: patient.requesterResponseInformation.levelOfService,

        reqProviderFullName: patient.requesterResponseInformation.reqProviderFullName,
        reqProviderFirstName: patient.requesterResponseInformation.reqProviderFirstName,
        reqProviderLastName: patient.requesterResponseInformation.reqProviderLastName,
        reqProviderMiddleName: patient.requesterResponseInformation.reqProviderMiddleName,
        reqProviderType: patient.requesterResponseInformation.reqProviderType,
        reqProviderIdentificationNumber: patient.requesterResponseInformation.reqProviderIdentificationNumber,
        reqProviderIdentificationNumberType: patient.requesterResponseInformation.reqProviderIdentificationNumberType,
        reqProviderSupplimentalId: patient.requesterResponseInformation.reqProviderSupplimentalId,
        reqProviderIdNumberType: patient.requesterResponseInformation.reqProviderIdNumberType,
        reqProviderRejectionReason: patient.requesterResponseInformation.reqProviderRejectionReason,
        reqProviderFollowUpActionDescription: patient.requesterResponseInformation.reqProviderFollowUpActionDescription,
        reqProviderDetailStatus: patient.requesterResponseInformation.reqProviderDetailStatus,
      },

      /*Subscriber Details*/
      subscriberRelToInsured: patient.subscriberRelToInsured,
      subscriberIdentificationCode: patient.subscriberIdentificationCode,
      subscriberIdNumberType: patient.subscriberIdNumberType,

      subscriberFirstName: patient.subscriberFirstName,
      subscriberLastName: patient.subscriberLastName,
      subscriberMiddleName: patient.subscriberMiddleName,
      subscriberSuffix: patient.subscriberSuffix,
      subscriberGender: patient.subscriberGender,
      subscriberDob: patient.subscriberDob,
      subscriberPrefix: patient.subscriberPrefix,
      subscriberSupplementalId: patient.subscriberSupplementalId,
      subscriberIdentificationNumberType: patient.subscriberIdentificationNumberType,
      subscriberRejectionReason: patient.subscriberRejectionReason,
      subscriberFollowUpActionDescription: patient.subscriberFollowUpActionDescription,
      subscriberDetailStatus: patient.subscriberDetailStatus,

      /*Dependent Details*/
      // dependentDetailStatus: patient.dependentDetailStatus,
      // dependentSupplementalId: patient.dependentSupplementalId,
      // dependentIdentificationNumberType: patient.dependentIdentificationNumberType,
      // dependentRejectionReason: patient.dependentRejectionReason,
      // dependentFollowUpActionDescription: patient.dependentFollowUpActionDescription,

      dependentSubscriberIdentificationCode: patient.dependentSubscriberIdentificationCode,
      dependentSubscriberIdNumberType: patient.dependentSubscriberIdNumberType,
      dependentPrefix: patient.dependentPrefix,

      dependentFirstName: patient.dependentFirstName,
      dependentLastName: patient.dependentLastName,
      dependentMiddleName: patient.dependentMiddleName,
      dependentSuffix: patient.dependentSuffix,
      dependentGender: patient.dependentGender,
      dependentDob: patient.dependentDob,
      // dependentPrefix: patient.dependentPrefix,
      dependentReletionship: patient.dependentReletionship,

      /*Servicing Provider Details*/
      servicingProviderFullName: patient.servicingProviderFullName,
      servicingProviderFirstName: patient.servicingProviderFirstName,
      servicingProviderLastName: patient.servicingProviderLastName,
      servicingProviderMiddleName: patient.servicingProviderMiddleName,
      servicingProviderType: patient.servicingProviderType,
      servicingProviderAddress: patient.servicingProviderAddress,
      servicingProviderCity: patient.servicingProviderCity,
      servicingProviderState: patient.servicingProviderState,
      servicingProviderPostalCode: patient.servicingProviderPostalCode,
      servicingProviderCountryCode: patient.servicingProviderCountryCode,
      servicingProviderIdentificationNumber: patient.servicingProviderIdentificationNumber,
      servicingProviderIdentificationNumberType: patient.servicingProviderIdentificationNumberType,
      servicingProviderSupplimentId: patient.servicingProviderSupplimentId,
      servicingProviderIdNumberType: patient.servicingProviderIdNumberType,
      servicingProviderRejectionReason: patient.servicingProviderRejectionReason,
      servicingProviderFollowUpActionDescription: patient.servicingProviderFollowUpActionDescription,
      servicingProviderDetailStatus: patient.servicingProviderDetailStatus,
      homeHealthAideResponse: {
        mrnNumber: patient.homeHealthAideResponse.mrnNumber,
        homeHealthAideRevenueCode: patient.homeHealthAideResponse.homeHealthAideRevenueCode,
        homeHealthAideProviderSuffix: patient.homeHealthAideResponse.homeHealthAideProviderSuffix,
        homeHealthAideProviderPrefix: patient.homeHealthAideResponse.homeHealthAideProviderPrefix,
        homeHealthAideResponseServiceDateFrom:
          (new Date(patient.homeHealthAideResponse.homeHealthAideResponseServiceDateFrom)).toISOString(),
        homeHealthAideResponseServiceDateTo:
          (new Date(patient.homeHealthAideResponse.homeHealthAideResponseServiceDateTo)).toISOString(),

        id: patient.homeHealthAideResponse.id,
        homeHealthAideProviderIdentificationNumberType: patient.homeHealthAideResponse.homeHealthAideProviderIdentificationNumberType,
        homeHealthAideProviderFollowUpActionDescription: patient.homeHealthAideResponse.homeHealthAideProviderFollowUpActionDescription,
        homeHealthAideRejectionReasonMSG: patient.homeHealthAideResponse.homeHealthAideRejectionReasonMSG,
        homeHealthAideProviderCountryCode: patient.homeHealthAideResponse.homeHealthAideProviderCountryCode,
        homeHealthAideProviderPostalCode: patient.homeHealthAideResponse.homeHealthAideProviderPostalCode,
        homeHealthAideProviderIdentificationNumber: patient.homeHealthAideResponse.homeHealthAideProviderIdentificationNumber,
        homeHealthAideProviderSupplimentalId: patient.homeHealthAideResponse.homeHealthAideProviderSupplimentalId,
        homeHealthAideProviderFirstName: patient.homeHealthAideResponse.homeHealthAideProviderFirstName,
        homeHealthAideProviderFullName: patient.homeHealthAideResponse.homeHealthAideProviderFullName,
        homeHealthAideCertificationAction: patient.homeHealthAideResponse.homeHealthAideCertificationAction,
        homeHealthAideProviderMiddleName: patient.homeHealthAideResponse.homeHealthAideProviderMiddleName,
        homeHealthAideCertificationType: patient.homeHealthAideResponse.homeHealthAideCertificationType,
        homeHealthAideProviderIdNumberType: patient.homeHealthAideResponse.homeHealthAideProviderIdNumberType,
        homeHealthAideProviderRejectionReason: patient.homeHealthAideResponse.homeHealthAideProviderRejectionReason,
        homeHealthAideProviderType: patient.homeHealthAideResponse.homeHealthAideProviderType,
        homeHealthAideDetailStatus: patient.homeHealthAideResponse.homeHealthAideDetailStatus,
        homeHealthAideVisit: patient.homeHealthAideResponse.homeHealthAideVisit,
        homeHealthAideRejectionReason: patient.homeHealthAideResponse.homeHealthAideRejectionReason,
        homeHealthAideServiceType: patient.homeHealthAideResponse.homeHealthAideServiceType,
        homeHealthAidePoviderLastName: patient.homeHealthAideResponse.homeHealthAidePoviderLastName,
        homeHealthAideUnit: patient.homeHealthAideResponse.homeHealthAideUnit,
        homeHealthAideLevelOfService: patient.homeHealthAideResponse.homeHealthAideLevelOfService,
        homeHealthAideProviderCity: patient.homeHealthAideResponse.homeHealthAideProviderCity,
        homeHealthAideProviderState: patient.homeHealthAideResponse.homeHealthAideProviderState,
        homeHealthAideProviderAddress: patient.homeHealthAideResponse.homeHealthAideProviderAddress,
        homeHealthAideRequestCategory: patient.homeHealthAideResponse.homeHealthAideRequestCategory,
      },
      occupationalTherapyResponse: {
        mrnNumber: patient.occupationalTherapyResponse.mrnNumber,
        occupationalTherapyRevenueCode: patient.occupationalTherapyResponse.occupationalTherapyRevenueCode,
        occupationalTherapyProviderSuffix: patient.occupationalTherapyResponse.occupationalTherapyProviderSuffix,
        occupationalTherapyProviderPrefix: patient.occupationalTherapyResponse.occupationalTherapyProviderPrefix,
        occupationalTherapyResponseServiceDateFrom:
          (new Date(patient.occupationalTherapyResponse.occupationalTherapyResponseServiceDateFrom)).toISOString(),
        occupationalTherapyResponseServiceDateTo:
          (new Date(patient.occupationalTherapyResponse.occupationalTherapyResponseServiceDateTo)).toISOString(),

        id: patient.occupationalTherapyResponse.id,
        occupationalTherapyProviderIdentificationNumber:
          patient.occupationalTherapyResponse.occupationalTherapyProviderIdentificationNumber,
        occupationalTherapyProviderFollowUpActionDescription:
          patient.occupationalTherapyResponse.occupationalTherapyProviderFollowUpActionDescription,
        occupationalTherapyRequestCategory: patient.occupationalTherapyResponse.occupationalTherapyRequestCategory,
        occupationalTherapyProviderRejectionReason: patient.occupationalTherapyResponse.occupationalTherapyProviderRejectionReason,
        occupationalTherapyProviderLastName: patient.occupationalTherapyResponse.occupationalTherapyProviderLastName,
        occupationalTherapyServiceType: patient.occupationalTherapyResponse.occupationalTherapyServiceType,
        occupationalTherapyProviderFullName: patient.occupationalTherapyResponse.occupationalTherapyProviderFullName,
        occupationalTherapyProviderType: patient.occupationalTherapyResponse.occupationalTherapyProviderType,
        occupationalTherapyProviderSupplimentalId: patient.occupationalTherapyResponse.occupationalTherapyProviderSupplimentalId,
        occupationalTherapyCountryCode: patient.occupationalTherapyResponse.occupationalTherapyCountryCode,
        occupationalTherapyRejectionReason: patient.occupationalTherapyResponse.occupationalTherapyRejectionReason,
        occupationalProviderIdentificationNumberType: patient.occupationalTherapyResponse.occupationalProviderIdentificationNumberType,
        occupationalTherapyProviderMiddleName: patient.occupationalTherapyResponse.occupationalTherapyProviderMiddleName,
        occupationalTherapyCertificationType: patient.occupationalTherapyResponse.occupationalTherapyCertificationType,
        occupationalTherapyCertificationAction: patient.occupationalTherapyResponse.occupationalTherapyCertificationAction,
        occupationalTherapyLevelOfService: patient.occupationalTherapyResponse.occupationalTherapyLevelOfService,
        occupationalTherapyRejectionReasonMSG: patient.occupationalTherapyResponse.occupationalTherapyRejectionReasonMSG,
        occupationalTherapyProviderIdNumberType: patient.occupationalTherapyResponse.occupationalTherapyProviderIdNumberType,
        occupationalTherapyProviderFirstName: patient.occupationalTherapyResponse.occupationalTherapyProviderFirstName,
        occupationalTherapyDetailStatus: patient.occupationalTherapyResponse.occupationalTherapyDetailStatus,
        occupationalTherapyVisit: patient.occupationalTherapyResponse.occupationalTherapyVisit,
        occupationalTherapyCity: patient.occupationalTherapyResponse.occupationalTherapyCity,
        occupationalTherapyState: patient.occupationalTherapyResponse.occupationalTherapyState,
        occupationalTherapyAddress: patient.occupationalTherapyResponse.occupationalTherapyAddress,
        occupationalTherapyPostalCode: patient.occupationalTherapyResponse.occupationalTherapyPostalCode,
        occupationalTherapyUnit: patient.occupationalTherapyResponse.occupationalTherapyUnit,
      },
      medicalSocialWorkResponse: {
        mrnNumber: patient.medicalSocialWorkResponse.mrnNumber,
        medicalSocialWorkRevenueCode: patient.medicalSocialWorkResponse.medicalSocialWorkRevenueCode,
        medicalSocialWorkProviderSuffix: patient.medicalSocialWorkResponse.medicalSocialWorkProviderSuffix,
        medicalSocialWorkProviderPrefix: patient.medicalSocialWorkResponse.medicalSocialWorkProviderPrefix,
        medicalSocialWorkResponseServiceDateFrom:
          (new Date(patient.medicalSocialWorkResponse.medicalSocialWorkResponseServiceDateFrom)).toISOString(),
        medicalSocialWorkResponseServiceDateTo:
          (new Date(patient.medicalSocialWorkResponse.medicalSocialWorkResponseServiceDateTo)).toISOString(),


        id: patient.medicalSocialWorkResponse.id,
        medicalSocialWorkProviderFollowUpActionDescription:
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderFollowUpActionDescription,
        medicalSocialWorkProviderIdentificationNumberType:
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderIdentificationNumberType,
        medicalSocialWorkProviderState: patient.medicalSocialWorkResponse.medicalSocialWorkProviderState,
        medicalSocialWorkCertificationAction: patient.medicalSocialWorkResponse.medicalSocialWorkCertificationAction,
        medicalSocialWorkProviderPostalCode: patient.medicalSocialWorkResponse.medicalSocialWorkProviderPostalCode,
        medicalSocialWorkProviderSupplimentalId: patient.medicalSocialWorkResponse.medicalSocialWorkProviderSupplimentalId,
        medicalSocialWorkProviderCountryCode: patient.medicalSocialWorkResponse.medicalSocialWorkProviderCountryCode,
        medicalSocialWorkProviderRejectionReason: patient.medicalSocialWorkResponse.medicalSocialWorkProviderRejectionReason,
        medicalSocialWorkProviderFullName: patient.medicalSocialWorkResponse.medicalSocialWorkProviderFullName,
        medicalSocialWorkRejectionReason: patient.medicalSocialWorkResponse.medicalSocialWorkRejectionReason,
        medicalSocialWorkRejectionReasonMSG: patient.medicalSocialWorkResponse.medicalSocialWorkRejectionReasonMSG,
        medicalSocialWorkProviderIdentificationNumber: patient.medicalSocialWorkResponse.medicalSocialWorkProviderIdentificationNumber,
        medicalSocialWorkCertificationType: patient.medicalSocialWorkResponse.medicalSocialWorkCertificationType,
        medicalSocialWorkProviderMiddleName: patient.medicalSocialWorkResponse.medicalSocialWorkProviderMiddleName,
        medicalSocialWorkProviderIdNumberType: patient.medicalSocialWorkResponse.medicalSocialWorkProviderIdNumberType,
        medicalSocialWorkProviderFirstName: patient.medicalSocialWorkResponse.medicalSocialWorkProviderFirstName,
        medicalSocialWorkPoviderLastName: patient.medicalSocialWorkResponse.medicalSocialWorkPoviderLastName,
        medicalSocialWorkRequestCategory: patient.medicalSocialWorkResponse.medicalSocialWorkRequestCategory,
        medicalSocialWorkProviderAddress: patient.medicalSocialWorkResponse.medicalSocialWorkProviderAddress,
        medicalSocialWorkLevelOfService: patient.medicalSocialWorkResponse.medicalSocialWorkLevelOfService,
        medicalSocialWorkVisit: patient.medicalSocialWorkResponse.medicalSocialWorkVisit,
        medicalSocialWorkUnit: patient.medicalSocialWorkResponse.medicalSocialWorkUnit,
        medicalSocialWorkServiceType: patient.medicalSocialWorkResponse.medicalSocialWorkServiceType,
        medicalSocialWorkDetailStatus: patient.medicalSocialWorkResponse.medicalSocialWorkDetailStatus,
        medicalSocialWorkProviderType: patient.medicalSocialWorkResponse.medicalSocialWorkProviderType,
        medicalSocialWorkProviderCity: patient.medicalSocialWorkResponse.medicalSocialWorkProviderCity,
      },
      physicalTherapyResponse: {
        mrnNumber: patient.physicalTherapyResponse.mrnNumber,
        physicalTherapyRevenueCode: patient.physicalTherapyResponse.physicalTherapyRevenueCode,
        physicalTherapyProviderSuffix: patient.physicalTherapyResponse.physicalTherapyProviderSuffix,
        physicalTherapyProviderPrefix: patient.physicalTherapyResponse.physicalTherapyProviderPrefix,
        physicalTherapyResponseServiceDateFrom:
          (new Date(patient.physicalTherapyResponse.physicalTherapyResponseServiceDateFrom)).toISOString(),
        physicalTherapyResponseServiceDateTo:
          (new Date(patient.physicalTherapyResponse.physicalTherapyResponseServiceDateTo)).toISOString(),


        id: patient.physicalTherapyResponse.id,
        physicalTherapyRequestCategory: patient.physicalTherapyResponse.physicalTherapyRequestCategory,
        physicalTherapyCertificationType: patient.physicalTherapyResponse.physicalTherapyCertificationType,
        physicalTherapyServiceType: patient.physicalTherapyResponse.physicalTherapyServiceType,
        physicalTherapyLevelOfService: patient.physicalTherapyResponse.physicalTherapyLevelOfService,
        physicalTherapyVisit: patient.physicalTherapyResponse.physicalTherapyVisit,
        physicalTherapyUnit: patient.physicalTherapyResponse.physicalTherapyUnit,
        physicalTherapyCertificationAction: patient.physicalTherapyResponse.physicalTherapyCertificationAction,
        physicalTherapyRejectionReason: patient.physicalTherapyResponse.physicalTherapyRejectionReason,
        physicalTherapyRejectionReasonMSG: patient.physicalTherapyResponse.physicalTherapyRejectionReasonMSG,
        physicalTherapyProviderFirstName: patient.physicalTherapyResponse.physicalTherapyProviderFirstName,
        physicalTherapyPoviderLastName: patient.physicalTherapyResponse.physicalTherapyPoviderLastName,
        physicalTherapyProviderMiddleName: patient.physicalTherapyResponse.physicalTherapyProviderMiddleName,
        physicalTherapyProviderType: patient.physicalTherapyResponse.physicalTherapyProviderType,
        physicalTherapyProviderIdentificationNumber: patient.physicalTherapyResponse.physicalTherapyProviderIdentificationNumber,
        physicalTherapyProviderIdentificationNumberType: patient.physicalTherapyResponse.physicalTherapyProviderIdentificationNumberType,
        physicalTherapyProviderSupplimentalId: patient.physicalTherapyResponse.physicalTherapyProviderSupplimentalId,
        physicalTherapyProviderIdNumberType: patient.physicalTherapyResponse.physicalTherapyProviderIdNumberType,
        physicalTherapyProviderRejectionReason: patient.physicalTherapyResponse.physicalTherapyProviderRejectionReason,
        physicalTherapyProviderFollowUpActionDescription: patient.physicalTherapyResponse.physicalTherapyProviderFollowUpActionDescription,
        physicalTherapyProviderAddress: patient.physicalTherapyResponse.physicalTherapyProviderAddress,
        physicalTherapyProviderCity: patient.physicalTherapyResponse.physicalTherapyProviderCity,
        physicalTherapyProviderState: patient.physicalTherapyResponse.physicalTherapyProviderState,
        physicalTherapyProviderPostalCode: patient.physicalTherapyResponse.physicalTherapyProviderPostalCode,
        physicalTherapyProviderCountryCode: patient.physicalTherapyResponse.physicalTherapyProviderCountryCode,
        physicalTherapyProviderFullName: patient.physicalTherapyResponse.physicalTherapyProviderFullName,
        physicalTherapyDetailStatus: patient.physicalTherapyResponse.physicalTherapyDetailStatus,
      },
      skilledNursingResponse: {
        mrnNumber: patient.skilledNursingResponse.mrnNumber,
        skilledNursingRevenueCode: patient.skilledNursingResponse.skilledNursingRevenueCode,
        skilledNursingProviderSuffix: patient.skilledNursingResponse.skilledNursingProviderSuffix,
        skilledNursingProviderPrefix: patient.skilledNursingResponse.skilledNursingProviderPrefix,
        skilledNursingResponseServiceDateFrom:
          (new Date(patient.skilledNursingResponse.skilledNursingResponseServiceDateFrom)).toISOString(),
        skilledNursingResponseServiceDateTo:
          (new Date(patient.skilledNursingResponse.skilledNursingResponseServiceDateTo)).toISOString(),


        id: patient.skilledNursingResponse.id,
        skilledNursingProviderIdentificationNumberType: patient.skilledNursingResponse.skilledNursingProviderIdentificationNumberType,
        skilledNursingProviderFollowUpActionDescription: patient.skilledNursingResponse.skilledNursingProviderFollowUpActionDescription,
        skilledNursingProviderIdNumberType: patient.skilledNursingResponse.skilledNursingProviderIdNumberType,
        skilledNursingProviderRejectionReason: patient.skilledNursingResponse.skilledNursingProviderRejectionReason,
        skilledNursingProviderPostalCode: patient.skilledNursingResponse.skilledNursingProviderPostalCode,
        skilledNursingProviderSupplimentalId: patient.skilledNursingResponse.skilledNursingProviderSupplimentalId,
        skilledNursingCertificationType: patient.skilledNursingResponse.skilledNursingCertificationType,
        skilledNursingProviderMiddleName: patient.skilledNursingResponse.skilledNursingProviderMiddleName,
        skilledNursingCertificationAction: patient.skilledNursingResponse.skilledNursingCertificationAction,
        skilledNursingProviderIdentificationNumber: patient.skilledNursingResponse.skilledNursingProviderIdentificationNumber,
        skilledNursingProviderFirstName: patient.skilledNursingResponse.skilledNursingProviderFirstName,
        skilledNursingProviderFullName: patient.skilledNursingResponse.skilledNursingProviderFullName,
        skilledNursingRejectionReasonMSG: patient.skilledNursingResponse.skilledNursingRejectionReasonMSG,
        skilledNursingProviderCountryCode: patient.skilledNursingResponse.skilledNursingProviderCountryCode,
        skilledNursingPoviderLastName: patient.skilledNursingResponse.skilledNursingPoviderLastName,
        skilledNursingUnit: patient.skilledNursingResponse.skilledNursingUnit,
        skilledNursingServiceType: patient.skilledNursingResponse.skilledNursingServiceType,
        skilledNursingRequestCategory: patient.skilledNursingResponse.skilledNursingRequestCategory,
        skilledNursingLevelOfService: patient.skilledNursingResponse.skilledNursingLevelOfService,
        skilledNursingProviderType: patient.skilledNursingResponse.skilledNursingProviderType,
        skilledNursingProviderState: patient.skilledNursingResponse.skilledNursingProviderState,
        skilledNursingRejectionReason: patient.skilledNursingResponse.skilledNursingRejectionReason,
        skilledNursingVisit: patient.skilledNursingResponse.skilledNursingVisit,
        skilledNursingProviderAddress: patient.skilledNursingResponse.skilledNursingProviderAddress,
        skilledNursingDetailStatus: patient.skilledNursingResponse.skilledNursingDetailStatus,
        skilledNursingProviderCity: patient.skilledNursingResponse.skilledNursingProviderCity,
      },
      speechPathologyResponse: {
        mrnNumber: patient.speechPathologyResponse.mrnNumber,
        speechPathologyRevenueCode: patient.speechPathologyResponse.speechPathologyRevenueCode,
        speechPathologyProviderSuffix: patient.speechPathologyResponse.speechPathologyProviderSuffix,
        speechPathologyProviderPrefix: patient.speechPathologyResponse.speechPathologyProviderPrefix,
        speechPathologyResponseServiceDateFrom:
          (new Date(patient.speechPathologyResponse.speechPathologyResponseServiceDateFrom)).toISOString(),
        speechPathologyResponseServiceDateTo:
          (new Date(patient.speechPathologyResponse.speechPathologyResponseServiceDateTo)).toISOString(),


        id: patient.speechPathologyResponse.id,
        speechPathologyProviderIdentificationNumberType: patient.speechPathologyResponse.speechPathologyProviderIdentificationNumberType,
        speechPathologyProviderFollowUpActionDescription: patient.speechPathologyResponse.speechPathologyProviderFollowUpActionDescription,
        speechPathologyProviderRejectionReason: patient.speechPathologyResponse.speechPathologyProviderRejectionReason,
        speechPathologyProviderIdNumberType: patient.speechPathologyResponse.speechPathologyProviderIdNumberType,
        speechPathologyRequestCategory: patient.speechPathologyResponse.speechPathologyRequestCategory,
        speechPathologyProviderAddress: patient.speechPathologyResponse.speechPathologyProviderAddress,
        speechPathologyProviderFullName: patient.speechPathologyResponse.speechPathologyProviderFullName,
        speechPathologyProviderSupplimentalId: patient.speechPathologyResponse.speechPathologyProviderSupplimentalId,
        speechPathologyRejectionReason: patient.speechPathologyResponse.speechPathologyRejectionReason,
        speechPathologyCertificationAction: patient.speechPathologyResponse.speechPathologyCertificationAction,
        speechPathologyProviderPostalCode: patient.speechPathologyResponse.speechPathologyProviderPostalCode,
        speechPathologyRejectionReasonMSG: patient.speechPathologyResponse.speechPathologyRejectionReasonMSG,
        speechPathologyProviderCountryCode: patient.speechPathologyResponse.speechPathologyProviderCountryCode,
        speechPathologyPoviderLastName: patient.speechPathologyResponse.speechPathologyPoviderLastName,
        speechPathologyProviderFirstName: patient.speechPathologyResponse.speechPathologyProviderFirstName,
        speechPathologyCertificationType: patient.speechPathologyResponse.speechPathologyCertificationType,
        speechPathologyProviderMiddleName: patient.speechPathologyResponse.speechPathologyProviderMiddleName,
        speechPathologyProviderIdentificationNumber: patient.speechPathologyResponse.speechPathologyProviderIdentificationNumber,
        speechPathologyVisit: patient.speechPathologyResponse.speechPathologyVisit,
        speechPathologyDetailStatus: patient.speechPathologyResponse.speechPathologyDetailStatus,
        speechPathologyUnit: patient.speechPathologyResponse.speechPathologyUnit,
        speechPathologyServiceType: patient.speechPathologyResponse.speechPathologyServiceType,
        speechPathologyProviderState: patient.speechPathologyResponse.speechPathologyProviderState,
        speechPathologyProviderCity: patient.speechPathologyResponse.speechPathologyProviderCity,
        speechPathologyProviderType: patient.speechPathologyResponse.speechPathologyProviderType,
        speechPathologyLevelOfService: patient.speechPathologyResponse.speechPathologyLevelOfService,
      },
    };

    this.preAuthReponseForm.setValue(formData);

    //  this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'primaryInsuranceDetail' });
    console.log('Form Populated Data ', formData);

  }
  /* Populating ResponseForm Data */

  onSave(formDataOnSave) {
    console.log('On save ', formDataOnSave);
    /*
    if (formDataOnSave.valid) {
      let selectedPatntData: PreAuthResponse;
      selectedPatntData = formDataOnSave.value;

      // selectedPatientData.currenttimdate = new Date().toISOString();
      // console.log('Date after change ', selectedPatientData);
      console.log('Form data on save', selectedPatntData);

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

        if (result) {
          console.log('Confirm is clicked: ' + result);
          this.isFormUpdated = result;
          this.dialogRef.close(false);
          // this.preAuthService.filter('Refresh Initiated');
        }

      });

    }
     */
  }

  onEdit(selectedPatntData: PreAuthResponse) {
    this.editing = true;
    this.preAuthReponseForm.get('authorizationDetail').patchValue({ processDateAndTime: (new Date()).toISOString() });
    console.log('on edit ', selectedPatntData);

    // this.preAuthReponseForm.get('authorizationDetail').get('preAuthorizationStatus').clearValidators();
    // this.preAuthReponseForm.get('authorizationDetail').get('preAuthorizationStatus').setValidators([Validators.required]);
    this.preAuthReponseForm.get('authorizationDetail').get('preAuthorizationStatus').updateValueAndValidity();
    this.preAuthReponseForm.get('authorizationDetail').get('unitsForNoOfUnitsTobeUsed').updateValueAndValidity();
    this.preAuthReponseForm.get('membergender').updateValueAndValidity();
    this.preAuthReponseForm.get('orgIdentificationCodeType').updateValueAndValidity();
    this.preAuthReponseForm.get('orgRejectionReason').updateValueAndValidity();
    this.preAuthReponseForm.get('orgFollowUpActionDescription').updateValueAndValidity();

    this.preAuthReponseForm.get('subscriberIdNumberType').updateValueAndValidity();
    this.preAuthReponseForm.get('subscriberRelToInsured').updateValueAndValidity();
    this.preAuthReponseForm.get('subscriberGender').updateValueAndValidity();
    this.preAuthReponseForm.get('subscriberIdentificationNumberType').updateValueAndValidity();

    this.preAuthReponseForm.get('subscriberRejectionReason').updateValueAndValidity();
    this.preAuthReponseForm.get('subscriberFollowUpActionDescription').updateValueAndValidity();

    this.preAuthReponseForm.get('subscriberIdNumberType').updateValueAndValidity();
    this.preAuthReponseForm.get('subscriberRelToInsured').updateValueAndValidity();
    this.preAuthReponseForm.get('subscriberGender').updateValueAndValidity();
    this.preAuthReponseForm.get('subscriberIdentificationNumberType').updateValueAndValidity();

    this.preAuthReponseForm.get('subscriberRejectionReason').updateValueAndValidity();
    this.preAuthReponseForm.get('subscriberFollowUpActionDescription').updateValueAndValidity();

    this.preAuthReponseForm.get('dependentSubscriberIdNumberType').updateValueAndValidity();
    this.preAuthReponseForm.get('dependentReletionship').updateValueAndValidity();
    this.preAuthReponseForm.get('dependentGender').updateValueAndValidity();
    this.preAuthReponseForm.get('dependentIdentificationNumberType').updateValueAndValidity();

    this.preAuthReponseForm.get('dependentRejectionReason').updateValueAndValidity();
    this.preAuthReponseForm.get('dependentFollowUpActionDescription').updateValueAndValidity();

    // if (this.selectedPatientViaDialog.episode.preauthFormStatus !== 'Sent For Approval') { // 'Saved As Draft'
    //   this.preAuthReponseForm.get('enquiryDeatils').patchValue({ preauthReqSentDate: (new Date()).toISOString() });
    // }

    // this.preAuthService.onEditPatientData(selectedPatntData).subscribe((dataForSelectedPat) => {
    //   this.isLoadingResults = true;
    //   if (dataForSelectedPat) {
    //     this.preAuthReponseForm.reset();
    //     this.populatePatientFormData(dataForSelectedPat[0]);
    //     console.log('Data received for edit btn', dataForSelectedPat[0]);
    //     this.editing = true;
    //     this.isLoadingResults = false;
    //   }
    // },
    //   (error) => {
    //     this.isLoadingResults = false;
    //     console.log(error);
    //   }
    // );

  }


  printPage() {
    // window.print();
    const printContent = document.getElementById('formId');
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    // WindowPrt.document.write(`<link rel="stylesheet" type="text/css"
    //   href = "../../../preauthorization/components/denied-dialog/denied-dialog.component.css" > `);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

}
