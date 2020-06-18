import { Component, OnInit, Inject, ViewChild, Input, AfterViewInit } from '@angular/core';
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
import {
  StackedModalResponseComponent
} from '../../../preauthorization/components/stacked-modal-response/stacked-modal-response.component';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    // return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    return !!(control && control.invalid);
    // return !!(control && control.invalid || (control.dirty || control.touched || isSubmitted));
  }
}

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const invalidCtrl = !!(control && control.invalid);
//     const invalidParent = !!(control && control.parent && control.parent.invalid);

//     return (invalidCtrl || invalidParent);
//   }
// }

@Component({
  selector: 'app-denied-dialog',
  templateUrl: './denied-dialog.component.html',
  styleUrls: ['./denied-dialog.component.css']
})

export class DeniedDialogComponent implements OnInit, AfterViewInit {
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
  requestCategories: RequestCategory[];
  certificationTypes: CertificationType[];
  serviceTypes: ServiceType[];
  levelOfServices: LevelOfService[];
  certificationActions: CertificationAction[];
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
  prefixPattern = '^[a-zA-Z.]{1,3}$';
  suffixPattern = '^[a-zA-Z.-]{1,5}$';

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
      enquiryId: new FormControl({ value: '', disabled: false }, []),
      processDateAndTime: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
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
    orgIdentificationCodeType: new FormControl({ value: 'Select', disabled: false }, []),
    orgRejectionReason: new FormControl({ value: 'Select', disabled: false }),
    orgFollowUpActionDescription: new FormControl({ value: 'Select', disabled: false }),

    // orgFollowUpActionRequired: new FormControl({ value: 'true', disabled: true }),
    // orgRequestValidationAccepted: new FormControl({ value: 'true', disabled: true }),
    // orgTransactionRejected: new FormControl({ value: 'true', disabled: true }),

    /*Subscriber Details*/
    subscriberRelToInsured: new FormControl({ value: 'Unknown', disabled: false }, [Validators.required]),
    subscriberIdNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
    subscriberIdentificationCode: new FormControl({ value: '', disabled: false },
      [Validators.required, Validators.pattern(this.orgIdCodePatrn)]),

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
    dependentDetailResponse: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      dependentDetailStatus: new FormControl({ value: '', disabled: false }),
      dependentSupplementalId: new FormControl({ value: '', disabled: false },
        [Validators.required, Validators.pattern(this.supplIdPattern)]),
      dependentIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      dependentRejectionReaso: new FormControl({ value: 'Select', disabled: false }),
      dependentFollowUpActionDescription: new FormControl({ value: 'Select', disabled: false }),

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
    }),
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
      reqProviderFirstName: new FormControl({ value: '', disabled: false },
        [Validators.required, Validators.pattern(this.userNamePattern)]),
      reqProviderLastName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.userNamePattern)]),
      reqProviderMiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      reqProviderType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      reqProviderIdentificationNumber: new FormControl({ value: '', disabled: false },
        [Validators.required, Validators.pattern(this.orgIdCodePatrn)]),
      reqProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      reqProviderSupplimentalId: new FormControl({ value: '', disabled: false },
        [Validators.required, Validators.pattern(this.supplIdPattern)]),
      reqProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
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

    servicingProviderCity: new FormControl({ value: '', disabled: true }, [Validators.pattern(this.cityPattern)]),
    servicingProviderState: new FormControl({ value: '', disabled: true }, [Validators.pattern(this.statePattern)]),
    servicingProviderPostalCode: new FormControl({ value: '', disabled: true }, [Validators.pattern(this.zipPattern)]),
    servicingProviderCountryCode: new FormControl({ value: '', disabled: true }, [Validators.pattern(this.countryCodePattern)]),

    servicingProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
    servicingProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }),
    servicingProviderSupplimentId: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.supplIdPattern)]),
    servicingProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }),
    servicingProviderRejectionReason: new FormControl({ value: 'Select', disabled: false }),
    servicingProviderFollowUpActionDescription: new FormControl({ value: 'Select', disabled: false }),

    /*Physical Therapy Information*/
    physicalTherapyResponse: new FormGroup({
      physicalTherapyAuthorizationIdNo: new FormControl({ value: '', disabled: false }, [Validators.required]),
      physicalTherapyEffectiveDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      physicalTherapyEffectiveDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      physicalTherapyExpirationDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      physicalTherapySelected: new FormControl({ value: '', disabled: false }),

      physicalTherapyProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      physicalTherapyProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      physicalTherapyResponseServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false },
        [Validators.required]),
      physicalTherapyResponseServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      physicalTherapyRevenueCode: new FormControl({ value: '', disabled: false }, []),

      id: new FormControl({ value: '', disabled: false }),
      physicalTherapyDetailStatus: new FormControl({ value: '', disabled: false }),

      physicalTherapyRequestCategory: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      physicalTherapyCertificationType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      physicalTherapyServiceType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      physicalTherapyLevelOfService: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      physicalTherapyVisit: new FormControl({ value: '', disabled: false }),
      physicalTherapyUnit: new FormControl({ value: '', disabled: false }),
      physicalTherapyCertificationAction: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      physicalTherapyRejectionReason: new FormControl({ value: 'Select', disabled: false }),
      physicalTherapyRejectionReasonMSG: new FormControl({ value: 'Select', disabled: false }),

      physicalTherapyProviderFullName: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderFirstName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      physicalTherapyPoviderLastName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      physicalTherapyProviderMiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      physicalTherapyProviderType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),

      physicalTherapyProviderAddress: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderCity: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.cityPattern)]),
      physicalTherapyProviderState: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.statePattern)]),
      physicalTherapyProviderPostalCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.zipPattern)]),
      physicalTherapyProviderCountryCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.countryCodePattern)]),

      physicalTherapyProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      physicalTherapyProviderSupplimentalId: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.supplIdPattern)]),
      physicalTherapyProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      physicalTherapyProviderRejectionReason: new FormControl({ value: '', disabled: false }),
      physicalTherapyProviderFollowUpActionDescription: new FormControl({ value: '', disabled: false }),

    }),
    /*Occupational Therapy Information*/
    occupationalTherapyResponse: new FormGroup({
      occupationalTherapyAuthorizationIdNo: new FormControl({ value: '', disabled: false }, [Validators.required]),
      occupationalTherapyEffectiveDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      occupationalTherapyEffectiveDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      occupationalTherapyExpirationDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      occupationalTherapySelected: new FormControl({ value: '', disabled: false }),

      occupationalTherapyProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      occupationalTherapyProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      occupationalTherapyResponseServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false },
        [Validators.required]),
      occupationalTherapyResponseServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false },
        [Validators.required]),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      occupationalTherapyRevenueCode: new FormControl({ value: '', disabled: false }, []),

      id: new FormControl({ value: '', disabled: false }),
      occupationalTherapyDetailStatus: new FormControl({ value: '', disabled: false }),

      occupationalTherapyRequestCategory: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      occupationalTherapyCertificationType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      occupationalTherapyServiceType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      occupationalTherapyLevelOfService: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      occupationalTherapyVisit: new FormControl({ value: '', disabled: false }),
      occupationalTherapyUnit: new FormControl({ value: '', disabled: false }),
      occupationalTherapyCertificationAction: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      occupationalTherapyRejectionReason: new FormControl({ value: 'Select', disabled: false }),
      occupationalTherapyRejectionReasonMSG: new FormControl({ value: 'Select', disabled: false }),

      occupationalTherapyProviderFullName: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderFirstName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      occupationalTherapyProviderLastName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      occupationalTherapyProviderMiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      occupationalTherapyProviderType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),

      occupationalTherapyAddress: new FormControl({ value: '', disabled: false }),
      occupationalTherapyCity: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.cityPattern)]),
      occupationalTherapyState: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.statePattern)]),
      occupationalTherapyPostalCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.zipPattern)]),
      occupationalTherapyCountryCode: new FormControl({ value: '', disabled: false },
        [Validators.pattern(this.countryCodePattern)]),

      occupationalTherapyProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
      occupationalProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      occupationalTherapyProviderSupplimentalId: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.supplIdPattern)]),
      occupationalTherapyProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      occupationalTherapyProviderRejectionReason: new FormControl({ value: '', disabled: false }),
      occupationalTherapyProviderFollowUpActionDescription: new FormControl({ value: '', disabled: false }),
    }),
    /*Medical Social Work Information*/
    medicalSocialWorkResponse: new FormGroup({
      medicalSocialWorkAuthorizationIdNo: new FormControl({ value: '', disabled: false }, [Validators.required]),
      medicalSocialWorkEffectiveDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      medicalSocialWorkEffectiveDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      medicalSocialWorkExpirationDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      medicalSocialWorkSelected: new FormControl({ value: '', disabled: false }),

      medicalSocialWorkProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      medicalSocialWorkProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      medicalSocialWorkResponseServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false },
        [Validators.required]),
      medicalSocialWorkResponseServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false },
        [Validators.required]),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      medicalSocialWorkRevenueCode: new FormControl({ value: '', disabled: false }, []),

      id: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkDetailStatus: new FormControl({ value: '', disabled: false }),

      medicalSocialWorkRequestCategory: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      medicalSocialWorkCertificationType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      medicalSocialWorkServiceType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      medicalSocialWorkLevelOfService: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      medicalSocialWorkVisit: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkUnit: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkCertificationAction: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      medicalSocialWorkRejectionReason: new FormControl({ value: 'Select', disabled: false }),
      medicalSocialWorkRejectionReasonMSG: new FormControl({ value: 'Select', disabled: false }),

      medicalSocialWorkProviderFullName: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkProviderFirstName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      medicalSocialWorkPoviderLastName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      medicalSocialWorkProviderMiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      medicalSocialWorkProviderType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),

      medicalSocialWorkProviderAddress: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkProviderCity: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.cityPattern)]),
      medicalSocialWorkProviderState: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.statePattern)]),
      medicalSocialWorkProviderPostalCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.zipPattern)]),
      medicalSocialWorkProviderCountryCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.countryCodePattern)]),

      medicalSocialWorkProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      medicalSocialWorkProviderSupplimentalId: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.supplIdPattern)]),
      medicalSocialWorkProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      medicalSocialWorkProviderRejectionReason: new FormControl({ value: '', disabled: false }),
      medicalSocialWorkProviderFollowUpActionDescription: new FormControl({ value: '', disabled: false }),
    }),

    /*Skilled Nursing Information*/
    skilledNursingResponse: new FormGroup({
      skilledNursingAuthorizationIdNo: new FormControl({ value: '', disabled: false }, [Validators.required]),
      skilledNursingEffectiveDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      skilledNursingEffectiveDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      skilledNursingExpirationDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      skilledNursingSelected: new FormControl({ value: '', disabled: false }),

      skilledNursingProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      skilledNursingProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      skilledNursingResponseServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      skilledNursingResponseServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      skilledNursingRevenueCode: new FormControl({ value: '', disabled: false }, []),

      id: new FormControl({ value: '', disabled: false }),
      skilledNursingDetailStatus: new FormControl({ value: '', disabled: false }),

      skilledNursingRequestCategory: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      skilledNursingCertificationType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      skilledNursingServiceType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      skilledNursingLevelOfService: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      skilledNursingVisit: new FormControl({ value: '', disabled: false }),
      skilledNursingUnit: new FormControl({ value: '', disabled: false }),
      skilledNursingCertificationAction: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      skilledNursingRejectionReason: new FormControl({ value: 'Select', disabled: false }),
      skilledNursingRejectionReasonMSG: new FormControl({ value: 'Select', disabled: false }),

      skilledNursingProviderFullName: new FormControl({ value: '', disabled: false }),
      skilledNursingProviderFirstName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      skilledNursingPoviderLastName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      skilledNursingProviderMiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      skilledNursingProviderType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),

      skilledNursingProviderAddress: new FormControl({ value: '', disabled: false }),
      skilledNursingProviderCity: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.cityPattern)]),
      skilledNursingProviderState: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.statePattern)]),
      skilledNursingProviderPostalCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.zipPattern)]),
      skilledNursingProviderCountryCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.countryCodePattern)]),

      skilledNursingProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
      skilledNursingProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      skilledNursingProviderSupplimentalId: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.supplIdPattern)]),
      skilledNursingProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      skilledNursingProviderRejectionReason: new FormControl({ value: '', disabled: false }),
      skilledNursingProviderFollowUpActionDescription: new FormControl({ value: '', disabled: false }),
    }),

    /*speech Pathology Information*/

    speechPathologyResponse: new FormGroup({
      speechPathologyAuthorizationIdNo: new FormControl({ value: '', disabled: false }, [Validators.required]),
      speechPathologyEffectiveDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      speechPathologyEffectiveDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      speechPathologyExpirationDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      speechPathologySelected: new FormControl({ value: '', disabled: false }),

      speechPathologyProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      speechPathologyProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      speechPathologyResponseServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false },
        [Validators.required]),
      speechPathologyResponseServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      speechPathologyRevenueCode: new FormControl({ value: '', disabled: false }, []),

      id: new FormControl({ value: '', disabled: false }),
      speechPathologyDetailStatus: new FormControl({ value: '', disabled: false }),

      speechPathologyRequestCategory: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      speechPathologyCertificationType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      speechPathologyServiceType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      speechPathologyLevelOfService: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      speechPathologyVisit: new FormControl({ value: '', disabled: false }),
      speechPathologyUnit: new FormControl({ value: '', disabled: false }),
      speechPathologyCertificationAction: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      speechPathologyRejectionReason: new FormControl({ value: 'Select', disabled: false }),
      speechPathologyRejectionReasonMSG: new FormControl({ value: 'Select', disabled: false }),

      speechPathologyProviderFullName: new FormControl({ value: '', disabled: false }),
      speechPathologyProviderFirstName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      speechPathologyPoviderLastName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      speechPathologyProviderMiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      speechPathologyProviderType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),

      speechPathologyProviderAddress: new FormControl({ value: '', disabled: false }),
      speechPathologyProviderCity: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.cityPattern)]),
      speechPathologyProviderState: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.statePattern)]),
      speechPathologyProviderPostalCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.zipPattern)]),
      speechPathologyProviderCountryCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.countryCodePattern)]),

      speechPathologyProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
      speechPathologyProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      speechPathologyProviderSupplimentalId: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.supplIdPattern)]),
      speechPathologyProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      speechPathologyProviderRejectionReason: new FormControl({ value: '', disabled: false }),
      speechPathologyProviderFollowUpActionDescription: new FormControl({ value: '', disabled: false }),
    }),

    /*Home health aide Information*/
    homeHealthAideResponse: new FormGroup({
      homeHealthAideAuthorizationIdNo: new FormControl({ value: '', disabled: false }, [Validators.required]),
      homeHealthAideEffectiveDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      homeHealthAideEffectiveDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      homeHealthAideExpirationDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      homeHealthAideSelected: new FormControl({ value: '', disabled: false }),

      homeHealthAideProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      homeHealthAideProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      homeHealthAideResponseServiceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      homeHealthAideResponseServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      homeHealthAideRevenueCode: new FormControl({ value: '', disabled: false }, []),

      id: new FormControl({ value: '', disabled: false }),
      homeHealthAideDetailStatus: new FormControl({ value: '', disabled: false }),

      homeHealthAideRequestCategory: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      homeHealthAideCertificationType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      homeHealthAideServiceType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      homeHealthAideLevelOfService: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      homeHealthAideVisit: new FormControl({ value: '', disabled: false }),
      homeHealthAideUnit: new FormControl({ value: '', disabled: false }),
      homeHealthAideCertificationAction: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      homeHealthAideRejectionReason: new FormControl({ value: 'Select', disabled: false }),
      homeHealthAideRejectionReasonMSG: new FormControl({ value: 'Select', disabled: false }),

      homeHealthAideProviderFullName: new FormControl({ value: '', disabled: false }),
      homeHealthAideProviderFirstName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      homeHealthAidePoviderLastName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      homeHealthAideProviderMiddleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      homeHealthAideProviderType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),

      homeHealthAideProviderAddress: new FormControl({ value: '', disabled: false }),
      homeHealthAideProviderCity: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.cityPattern)]),
      homeHealthAideProviderState: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.statePattern)]),
      homeHealthAideProviderPostalCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.zipPattern)]),
      homeHealthAideProviderCountryCode: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.countryCodePattern)]),

      homeHealthAideProviderIdentificationNumber: new FormControl({ value: '', disabled: false }),
      homeHealthAideProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      homeHealthAideProviderSupplimentalId: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.supplIdPattern)]),
      homeHealthAideProviderIdNumberType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      homeHealthAideProviderRejectionReason: new FormControl({ value: '', disabled: false }),
      homeHealthAideProviderFollowUpActionDescription: new FormControl({ value: '', disabled: false }),
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
    this.requestCategories = this.commonService.getRequestCategory();
    this.certificationTypes = this.commonService.getCertificationType();
    this.serviceTypes = this.commonService.getServiceType();
    this.levelOfServices = this.commonService.getLevelOfService();
    this.certificationActions = this.commonService.getCertificationAction();
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
    this.preAuthService.viewEditedResponseDataPatient(this.selectedPatientViaDialog).subscribe((response) => {
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
    // this.dialogRef.close(false);
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
      const dialogRef = this.dialog.open(StackedModalResponseComponent, config);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Confirm is clicked: ' + result);
          this.dialogRef.close(false);

        }

      });
    });
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
    const dialogRef = this.dialog.open(StackedModalResponseComponent, config);

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log('Confirm is clicked: ' + result);
        //  this.isFormUpdated = result;
      }

    });

  }

  onSubmit(formData) {
    console.log(formData);
  }

  /* Populating ResponseForm Data */
  populateResponseFormData(patient: PreAuthResponse) {
    console.log('Pat data ', patient);

    const formData: PreAuthResponse = {
      id: patient.id,

      /*Preauthorization Details, this.datePipe.transform(patient.dob, 'M/d/yyyy')*/
      authorizationDetail: {
        id: patient.authorizationDetail.id,
        totalUnitsApproved: patient.authorizationDetail.totalUnitsApproved,
        totalUnitsConsumed: patient.authorizationDetail.totalUnitsConsumed,
        remainingUnits: patient.authorizationDetail.remainingUnits,
        noOfUnitsTobeUsed: patient.authorizationDetail.noOfUnitsTobeUsed,
        unitsForNoOfUnitsTobeUsed: patient.authorizationDetail.unitsForNoOfUnitsTobeUsed,
        enquiryId: patient.authorizationDetail.enquiryId,
        processDateAndTime: (new Date(patient.authorizationDetail.processDateAndTime)).toISOString(),

        serviceDateFrom: (new Date(patient.authorizationDetail.serviceDateFrom)).toISOString(),
        serviceDateTo: (new Date(patient.authorizationDetail.serviceDateTo)).toISOString(),
        effectiveDateTo: (new Date(patient.authorizationDetail.effectiveDateTo)).toISOString(),
        effectiveDateFrom: (new Date(patient.authorizationDetail.effectiveDateFrom)).toISOString(),
        expirationeDateTo: (new Date(patient.authorizationDetail.expirationeDateTo)).toISOString(),
        admitDate: (new Date(patient.authorizationDetail.admitDate)).toISOString(),
        dischargeDate: (new Date(patient.authorizationDetail.dischargeDate)).toISOString(),
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
      memberdob: (new Date(patient.memberdob)).toISOString(),
      // this.datePipe.transform(patient.memberdob, 'M/d/yyyy'),
      // yyyy-MM-dd(new Date(patient.memberdob)).toISOString(),
      // this.datePipe.transform(patient.memberdob, 'M/d/yyyy'),
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
        serviceDateFrom: (new Date(patient.requesterResponseInformation.serviceDateFrom)).toISOString(),
        serviceDateTo: (new Date(patient.requesterResponseInformation.serviceDateTo)).toISOString(),
        admitDate: (new Date(patient.requesterResponseInformation.admitDate)).toISOString(),
        dischargeDate: (new Date(patient.requesterResponseInformation.dischargeDate)).toISOString(),
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
      subscriberDob: (new Date(patient.subscriberDob)).toISOString(),
      subscriberPrefix: patient.subscriberPrefix,
      subscriberSupplementalId: patient.subscriberSupplementalId,
      subscriberIdentificationNumberType: patient.subscriberIdentificationNumberType,
      subscriberRejectionReason: patient.subscriberRejectionReason,
      subscriberFollowUpActionDescription: patient.subscriberFollowUpActionDescription,
      subscriberDetailStatus: patient.subscriberDetailStatus,

      dependentDetailResponse: {
        /*Dependent Details*/
        id: patient.id,
        dependentDetailStatus: patient.dependentDetailResponse.dependentDetailStatus,
        dependentSupplementalId: patient.dependentDetailResponse.dependentSupplementalId,
        dependentIdentificationNumberType: patient.dependentDetailResponse.dependentIdentificationNumberType,
        dependentRejectionReaso: patient.dependentDetailResponse.dependentRejectionReaso,
        dependentFollowUpActionDescription: patient.dependentDetailResponse.dependentFollowUpActionDescription,

        dependentSubscriberIdentificationCode: patient.dependentDetailResponse.dependentSubscriberIdentificationCode,
        dependentSubscriberIdNumberType: patient.dependentDetailResponse.dependentSubscriberIdNumberType,
        dependentPrefix: patient.dependentDetailResponse.dependentPrefix,

        dependentFirstName: patient.dependentDetailResponse.dependentFirstName,
        dependentLastName: patient.dependentDetailResponse.dependentLastName,
        dependentMiddleName: patient.dependentDetailResponse.dependentMiddleName,
        dependentSuffix: patient.dependentDetailResponse.dependentSuffix,
        dependentGender: patient.dependentDetailResponse.dependentGender,
        dependentDob: (new Date(patient.dependentDetailResponse.dependentDob)).toISOString(),
        dependentReletionship: patient.dependentDetailResponse.dependentReletionship,
      },
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
        homeHealthAideAuthorizationIdNo: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideAuthorizationIdNo : null,
        homeHealthAideEffectiveDateFrom: patient.homeHealthAideResponse !== null ?
          (new Date(patient.homeHealthAideResponse.homeHealthAideEffectiveDateFrom)).toISOString() : (new Date()).toISOString(),
        homeHealthAideEffectiveDateTo: patient.homeHealthAideResponse !== null ?
          (new Date(patient.homeHealthAideResponse.homeHealthAideEffectiveDateTo)).toISOString() : (new Date()).toISOString(),
        homeHealthAideExpirationDate: patient.homeHealthAideResponse !== null ?
          (new Date(patient.homeHealthAideResponse.homeHealthAideExpirationDate)).toISOString() : (new Date()).toISOString(),
        homeHealthAideSelected: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideSelected : false,

        mrnNumber: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.mrnNumber : null,
        homeHealthAideRevenueCode: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideRevenueCode : null,
        homeHealthAideProviderSuffix: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderSuffix : null,
        homeHealthAideProviderPrefix: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderPrefix : null,
        homeHealthAideResponseServiceDateFrom: patient.homeHealthAideResponse !== null ?

          (new Date(patient.homeHealthAideResponse.homeHealthAideResponseServiceDateFrom)).toISOString() : (new Date()).toISOString(),
        homeHealthAideResponseServiceDateTo: patient.homeHealthAideResponse !== null ?
          (new Date(patient.homeHealthAideResponse.homeHealthAideResponseServiceDateTo)).toISOString() : (new Date()).toISOString(),

        id: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.id : null,
        homeHealthAideProviderIdentificationNumberType: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderIdentificationNumberType : null,
        homeHealthAideProviderFollowUpActionDescription: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderFollowUpActionDescription : null,
        homeHealthAideRejectionReasonMSG: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideRejectionReasonMSG : null,
        homeHealthAideProviderCountryCode: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderCountryCode : null,
        homeHealthAideProviderPostalCode: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderPostalCode : null,
        homeHealthAideProviderIdentificationNumber: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderIdentificationNumber : null,
        homeHealthAideProviderSupplimentalId: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderSupplimentalId : null,
        homeHealthAideProviderFirstName: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderFirstName : null,
        homeHealthAideProviderFullName: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderFullName : null,
        homeHealthAideCertificationAction: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideCertificationAction : null,
        homeHealthAideProviderMiddleName: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderMiddleName : null,
        homeHealthAideCertificationType: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideCertificationType : null,
        homeHealthAideProviderIdNumberType: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderIdNumberType : null,
        homeHealthAideProviderRejectionReason: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderRejectionReason : null,
        homeHealthAideProviderType: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderType : null,
        homeHealthAideDetailStatus: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideDetailStatus : null,
        homeHealthAideVisit: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideVisit : null,
        homeHealthAideRejectionReason: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideRejectionReason : null,
        homeHealthAideServiceType: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideServiceType : null,
        homeHealthAidePoviderLastName: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAidePoviderLastName : null,
        homeHealthAideUnit: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideUnit : null,
        homeHealthAideLevelOfService: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideLevelOfService : null,
        homeHealthAideProviderCity: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderCity : null,
        homeHealthAideProviderState: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderState : null,
        homeHealthAideProviderAddress: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideProviderAddress : null,
        homeHealthAideRequestCategory: patient.homeHealthAideResponse !== null ?
          patient.homeHealthAideResponse.homeHealthAideRequestCategory : null,
      },
      occupationalTherapyResponse: {
        occupationalTherapyAuthorizationIdNo: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyAuthorizationIdNo : null,
        occupationalTherapyEffectiveDateFrom: patient.occupationalTherapyResponse !== null ?
          (new Date(patient.occupationalTherapyResponse.occupationalTherapyEffectiveDateFrom)).toISOString() : (new Date()).toISOString(),
        occupationalTherapyEffectiveDateTo: patient.occupationalTherapyResponse !== null ?
          (new Date(patient.occupationalTherapyResponse.occupationalTherapyEffectiveDateTo)).toISOString() : (new Date()).toISOString(),
        occupationalTherapyExpirationDate: patient.occupationalTherapyResponse !== null ?
          (new Date(patient.occupationalTherapyResponse.occupationalTherapyExpirationDate)).toISOString() : (new Date()).toISOString(),
        occupationalTherapySelected: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapySelected : false,

        mrnNumber: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.mrnNumber : null,
        occupationalTherapyRevenueCode: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyRevenueCode : null,
        occupationalTherapyProviderSuffix: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyProviderSuffix : null,
        occupationalTherapyProviderPrefix: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyProviderPrefix : null,
        occupationalTherapyResponseServiceDateFrom: patient.occupationalTherapyResponse !== null ?
          (new Date(patient.occupationalTherapyResponse.occupationalTherapyResponseServiceDateFrom)).toISOString() :
          (new Date()).toISOString(),
        occupationalTherapyResponseServiceDateTo: patient.occupationalTherapyResponse !== null ?
          (new Date(patient.occupationalTherapyResponse.occupationalTherapyResponseServiceDateTo)).toISOString() :
          (new Date()).toISOString(),

        id: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.id : null,
        occupationalTherapyProviderIdentificationNumber: patient.occupationalTherapyResponse !== null ?

          patient.occupationalTherapyResponse.occupationalTherapyProviderIdentificationNumber : null,
        occupationalTherapyProviderFollowUpActionDescription: patient.occupationalTherapyResponse !== null ?

          patient.occupationalTherapyResponse.occupationalTherapyProviderFollowUpActionDescription : null,
        occupationalTherapyRequestCategory: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyRequestCategory : null,
        occupationalTherapyProviderRejectionReason: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyProviderRejectionReason : null,
        occupationalTherapyProviderLastName: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyProviderLastName : null,
        occupationalTherapyServiceType: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyServiceType : null,
        occupationalTherapyProviderFullName: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyProviderFullName : null,
        occupationalTherapyProviderType: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyProviderType : null,
        occupationalTherapyProviderSupplimentalId: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyProviderSupplimentalId : null,
        occupationalTherapyCountryCode: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyCountryCode : null,
        occupationalTherapyRejectionReason: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyRejectionReason : null,
        occupationalProviderIdentificationNumberType: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalProviderIdentificationNumberType : null,
        occupationalTherapyProviderMiddleName: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyProviderMiddleName : null,
        occupationalTherapyCertificationType: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyCertificationType : null,
        occupationalTherapyCertificationAction: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyCertificationAction : null,
        occupationalTherapyLevelOfService: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyLevelOfService : null,
        occupationalTherapyRejectionReasonMSG: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyRejectionReasonMSG : null,
        occupationalTherapyProviderIdNumberType: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyProviderIdNumberType : null,
        occupationalTherapyProviderFirstName: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyProviderFirstName : null,
        occupationalTherapyDetailStatus: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyDetailStatus : null,
        occupationalTherapyVisit: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyVisit : null,
        occupationalTherapyCity: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyCity : null,
        occupationalTherapyState: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyState : null,
        occupationalTherapyAddress: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyAddress : null,
        occupationalTherapyPostalCode: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyPostalCode : null,
        occupationalTherapyUnit: patient.occupationalTherapyResponse !== null ?
          patient.occupationalTherapyResponse.occupationalTherapyUnit : null,
      },
      medicalSocialWorkResponse: {
        medicalSocialWorkAuthorizationIdNo: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkAuthorizationIdNo : null,
        medicalSocialWorkEffectiveDateFrom: patient.medicalSocialWorkResponse !== null ?
          (new Date(patient.medicalSocialWorkResponse.medicalSocialWorkEffectiveDateFrom)).toISOString() : (new Date()).toISOString(),
        medicalSocialWorkEffectiveDateTo: patient.medicalSocialWorkResponse !== null ?
          (new Date(patient.medicalSocialWorkResponse.medicalSocialWorkEffectiveDateTo)).toISOString() : (new Date()).toISOString(),
        medicalSocialWorkExpirationDate: patient.medicalSocialWorkResponse !== null ?
          (new Date(patient.medicalSocialWorkResponse.medicalSocialWorkExpirationDate)).toISOString() : (new Date()).toISOString(),
        medicalSocialWorkSelected: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkSelected : false,

        mrnNumber: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.mrnNumber : null,
        medicalSocialWorkRevenueCode: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkRevenueCode : null,
        medicalSocialWorkProviderSuffix: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderSuffix : null,
        medicalSocialWorkProviderPrefix: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderPrefix : null,
        medicalSocialWorkResponseServiceDateFrom: patient.medicalSocialWorkResponse !== null ?
          (new Date(patient.medicalSocialWorkResponse.medicalSocialWorkResponseServiceDateFrom)).toISOString() : (new Date()).toISOString(),
        medicalSocialWorkResponseServiceDateTo: patient.medicalSocialWorkResponse !== null ?
          (new Date(patient.medicalSocialWorkResponse.medicalSocialWorkResponseServiceDateTo)).toISOString() : (new Date()).toISOString(),
        id: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.id : null,
        medicalSocialWorkProviderFollowUpActionDescription: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderFollowUpActionDescription : null,
        medicalSocialWorkProviderIdentificationNumberType: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderIdentificationNumberType : null,
        medicalSocialWorkProviderState: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderState : null,
        medicalSocialWorkCertificationAction: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkCertificationAction : null,
        medicalSocialWorkProviderPostalCode: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderPostalCode : null,
        medicalSocialWorkProviderSupplimentalId: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderSupplimentalId : null,
        medicalSocialWorkProviderCountryCode: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderCountryCode : null,
        medicalSocialWorkProviderRejectionReason: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderRejectionReason : null,
        medicalSocialWorkProviderFullName: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderFullName : null,
        medicalSocialWorkRejectionReason: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkRejectionReason : null,
        medicalSocialWorkRejectionReasonMSG: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkRejectionReasonMSG : null,
        medicalSocialWorkProviderIdentificationNumber: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderIdentificationNumber : null,
        medicalSocialWorkCertificationType: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkCertificationType : null,
        medicalSocialWorkProviderMiddleName: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderMiddleName : null,
        medicalSocialWorkProviderIdNumberType: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderIdNumberType : null,
        medicalSocialWorkProviderFirstName: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderFirstName : null,
        medicalSocialWorkPoviderLastName: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkPoviderLastName : null,
        medicalSocialWorkRequestCategory: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkRequestCategory : null,
        medicalSocialWorkProviderAddress: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderAddress : null,
        medicalSocialWorkLevelOfService: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkLevelOfService : null,
        medicalSocialWorkVisit: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkVisit : null,
        medicalSocialWorkUnit: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkUnit : null,
        medicalSocialWorkServiceType: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkServiceType : null,
        medicalSocialWorkDetailStatus: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkDetailStatus : null,
        medicalSocialWorkProviderType: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderType : null,
        medicalSocialWorkProviderCity: patient.medicalSocialWorkResponse !== null ?
          patient.medicalSocialWorkResponse.medicalSocialWorkProviderCity : null,
      },
      physicalTherapyResponse: {
        physicalTherapyAuthorizationIdNo: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyAuthorizationIdNo : null,
        physicalTherapyEffectiveDateFrom: patient.physicalTherapyResponse !== null ?
          (new Date(patient.physicalTherapyResponse.physicalTherapyEffectiveDateFrom)).toISOString() :
          (new Date()).toISOString(),
        physicalTherapyEffectiveDateTo: patient.physicalTherapyResponse !== null ?
          (new Date(patient.physicalTherapyResponse.physicalTherapyEffectiveDateTo)).toISOString() :
          (new Date()).toISOString(),
        physicalTherapyExpirationDate: patient.physicalTherapyResponse !== null ?
          (new Date(patient.physicalTherapyResponse.physicalTherapyExpirationDate)).toISOString() :
          (new Date()).toISOString(),
        physicalTherapySelected: patient.physicalTherapyResponse !== null ? patient.physicalTherapyResponse.physicalTherapySelected : false,

        mrnNumber: patient.physicalTherapyResponse !== null ? patient.physicalTherapyResponse.mrnNumber : null,
        physicalTherapyRevenueCode: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyRevenueCode : null,
        physicalTherapyProviderSuffix: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderSuffix : null,
        physicalTherapyProviderPrefix: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderPrefix : null,
        physicalTherapyResponseServiceDateFrom: patient.physicalTherapyResponse !== null ?
          (new Date(patient.physicalTherapyResponse.physicalTherapyResponseServiceDateFrom)).toISOString() :
          (new Date()).toISOString(),
        physicalTherapyResponseServiceDateTo: patient.physicalTherapyResponse !== null ?
          (new Date(patient.physicalTherapyResponse.physicalTherapyResponseServiceDateTo)).toISOString() :
          (new Date()).toISOString(),


        id: patient.physicalTherapyResponse !== null ? patient.physicalTherapyResponse.id : null,
        physicalTherapyRequestCategory: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyRequestCategory : null,
        physicalTherapyCertificationType: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyCertificationType : null,
        physicalTherapyServiceType: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyServiceType : null,
        physicalTherapyLevelOfService: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyLevelOfService : null,
        physicalTherapyVisit: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyVisit : null,
        physicalTherapyUnit: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyUnit : null,
        physicalTherapyCertificationAction: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyCertificationAction : null,
        physicalTherapyRejectionReason: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyRejectionReason : null,
        physicalTherapyRejectionReasonMSG: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyRejectionReasonMSG : null,
        physicalTherapyProviderFirstName: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderFirstName : null,
        physicalTherapyPoviderLastName: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyPoviderLastName : null,
        physicalTherapyProviderMiddleName: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderMiddleName : null,
        physicalTherapyProviderType: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderType : null,
        physicalTherapyProviderIdentificationNumber: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderIdentificationNumber : null,
        physicalTherapyProviderIdentificationNumberType: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderIdentificationNumberType : null,
        physicalTherapyProviderSupplimentalId: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderSupplimentalId : null,
        physicalTherapyProviderIdNumberType: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderIdNumberType : null,
        physicalTherapyProviderRejectionReason: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderRejectionReason : null,
        physicalTherapyProviderFollowUpActionDescription: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderFollowUpActionDescription : null,
        physicalTherapyProviderAddress: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderAddress : null,
        physicalTherapyProviderCity: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderCity : null,
        physicalTherapyProviderState: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderState : null,
        physicalTherapyProviderPostalCode: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderPostalCode : null,
        physicalTherapyProviderCountryCode: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderCountryCode : null,
        physicalTherapyProviderFullName: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyProviderFullName : null,
        physicalTherapyDetailStatus: patient.physicalTherapyResponse !== null ?
          patient.physicalTherapyResponse.physicalTherapyDetailStatus : null,
      },
      skilledNursingResponse: {
        skilledNursingAuthorizationIdNo: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingAuthorizationIdNo : null,
        skilledNursingEffectiveDateFrom: patient.skilledNursingResponse !== null ?
          (new Date(patient.skilledNursingResponse.skilledNursingEffectiveDateFrom)).toISOString() : (new Date()).toISOString(),
        skilledNursingEffectiveDateTo: patient.skilledNursingResponse !== null ?
          (new Date(patient.skilledNursingResponse.skilledNursingEffectiveDateTo)).toISOString() : (new Date()).toISOString(),
        skilledNursingExpirationDate: patient.skilledNursingResponse !== null ?
          (new Date(patient.skilledNursingResponse.skilledNursingExpirationDate)).toISOString() : (new Date()).toISOString(),
        skilledNursingSelected: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingSelected : false,

        mrnNumber: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.mrnNumber : null,
        skilledNursingRevenueCode: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingRevenueCode : null,
        skilledNursingProviderSuffix: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderSuffix : null,
        skilledNursingProviderPrefix: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderPrefix : null,
        skilledNursingResponseServiceDateFrom: patient.skilledNursingResponse !== null ?
          (new Date(patient.skilledNursingResponse.skilledNursingResponseServiceDateFrom)).toISOString() : (new Date()).toISOString(),
        skilledNursingResponseServiceDateTo: patient.skilledNursingResponse !== null ?
          (new Date(patient.skilledNursingResponse.skilledNursingResponseServiceDateTo)).toISOString() : (new Date()).toISOString(),

        id: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.id : null,
        skilledNursingProviderIdentificationNumberType: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderIdentificationNumberType : null,
        skilledNursingProviderFollowUpActionDescription: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderFollowUpActionDescription : null,
        skilledNursingProviderIdNumberType: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderIdNumberType : null,
        skilledNursingProviderRejectionReason: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderRejectionReason : null,
        skilledNursingProviderPostalCode: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderPostalCode : null,
        skilledNursingProviderSupplimentalId: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderSupplimentalId : null,
        skilledNursingCertificationType: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingCertificationType : null,
        skilledNursingProviderMiddleName: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderMiddleName : null,
        skilledNursingCertificationAction: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingCertificationAction : null,
        skilledNursingProviderIdentificationNumber: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderIdentificationNumber : null,
        skilledNursingProviderFirstName: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderFirstName : null,
        skilledNursingProviderFullName: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderFullName : null,
        skilledNursingRejectionReasonMSG: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingRejectionReasonMSG : null,
        skilledNursingProviderCountryCode: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderCountryCode : null,
        skilledNursingPoviderLastName: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingPoviderLastName : null,
        skilledNursingUnit: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingUnit : null,
        skilledNursingServiceType: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingServiceType : null,
        skilledNursingRequestCategory: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingRequestCategory : null,
        skilledNursingLevelOfService: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingLevelOfService : null,
        skilledNursingProviderType: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderType : null,
        skilledNursingProviderState: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderState : null,
        skilledNursingRejectionReason: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingRejectionReason : null,
        skilledNursingVisit: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingVisit : null,
        skilledNursingProviderAddress: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderAddress : null,
        skilledNursingDetailStatus: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingDetailStatus : null,
        skilledNursingProviderCity: patient.skilledNursingResponse !== null ?
          patient.skilledNursingResponse.skilledNursingProviderCity : null,
      },
      speechPathologyResponse: {
        speechPathologyAuthorizationIdNo: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyAuthorizationIdNo : null,
        speechPathologyEffectiveDateFrom: patient.speechPathologyResponse !== null ?
          (new Date(patient.speechPathologyResponse.speechPathologyEffectiveDateFrom)).toISOString() : (new Date()).toISOString(),
        speechPathologyEffectiveDateTo: patient.speechPathologyResponse !== null ?
          (new Date(patient.speechPathologyResponse.speechPathologyEffectiveDateTo)).toISOString() : (new Date()).toISOString(),
        speechPathologyExpirationDate: patient.speechPathologyResponse !== null ?
          (new Date(patient.speechPathologyResponse.speechPathologyExpirationDate)).toISOString() : (new Date()).toISOString(),
        speechPathologySelected: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologySelected : false,

        mrnNumber: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.mrnNumber : null,
        speechPathologyRevenueCode: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyRevenueCode : null,
        speechPathologyProviderSuffix: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderSuffix : null,
        speechPathologyProviderPrefix: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderPrefix : null,
        speechPathologyResponseServiceDateFrom: patient.speechPathologyResponse !== null ?
          (new Date(patient.speechPathologyResponse.speechPathologyResponseServiceDateFrom)).toISOString() : (new Date()).toISOString(),
        speechPathologyResponseServiceDateTo: patient.speechPathologyResponse !== null ?
          (new Date(patient.speechPathologyResponse.speechPathologyResponseServiceDateTo)).toISOString() : (new Date()).toISOString(),

        id: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.id : null,
        speechPathologyProviderIdentificationNumberType: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderIdentificationNumberType : null,
        speechPathologyProviderFollowUpActionDescription: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderFollowUpActionDescription : null,
        speechPathologyProviderRejectionReason: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderRejectionReason : null,
        speechPathologyProviderIdNumberType: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderIdNumberType : null,
        speechPathologyRequestCategory: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyRequestCategory : null,
        speechPathologyProviderAddress: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderAddress : null,
        speechPathologyProviderFullName: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderFullName : null,
        speechPathologyProviderSupplimentalId: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderSupplimentalId : null,
        speechPathologyRejectionReason: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyRejectionReason : null,
        speechPathologyCertificationAction: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyCertificationAction : null,
        speechPathologyProviderPostalCode: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderPostalCode : null,
        speechPathologyRejectionReasonMSG: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyRejectionReasonMSG : null,
        speechPathologyProviderCountryCode: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderCountryCode : null,
        speechPathologyPoviderLastName: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyPoviderLastName : null,
        speechPathologyProviderFirstName: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderFirstName : null,
        speechPathologyCertificationType: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyCertificationType : null,
        speechPathologyProviderMiddleName: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderMiddleName : null,
        speechPathologyProviderIdentificationNumber: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderIdentificationNumber : null,
        speechPathologyVisit: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyVisit : null,
        speechPathologyDetailStatus: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyDetailStatus : null,
        speechPathologyUnit: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyUnit : null,
        speechPathologyServiceType: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyServiceType : null,
        speechPathologyProviderState: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderState : null,
        speechPathologyProviderCity: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderCity : null,
        speechPathologyProviderType: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyProviderType : null,
        speechPathologyLevelOfService: patient.speechPathologyResponse !== null ?
          patient.speechPathologyResponse.speechPathologyLevelOfService : null,
      },
    };

    this.preAuthReponseForm.setValue(formData);

    //  this.preAuthForm.get('insuranceDetailPreAuth').patchValue({ insuranceTypeSelcted: 'primaryInsuranceDetail' });
    console.log('Form Populated Data ', formData);

  }
  /* Populating ResponseForm Data */

  onSave(formDataOnSave) {
    console.log('On save ', formDataOnSave);


    let selectedPatntData: PreAuthResponse;
    selectedPatntData = formDataOnSave.value;
    /* Converting Date to ISO string */

    selectedPatntData.memberdob = new Date(selectedPatntData.memberdob).toISOString();

    // this.preAuthReponseForm.get('authorizationDetail').patchValue({ processDateAndTime: (new Date()).toISOString() });
    // selectedPatntData.authorizationDetail.processDateAndTime =
    //   new Date(selectedPatntData.authorizationDetail.processDateAndTime).toISOString();

    selectedPatntData.subscriberDob = new Date(selectedPatntData.subscriberDob).toISOString();

    selectedPatntData.dependentDetailResponse.dependentDob =
      new Date(selectedPatntData.dependentDetailResponse.dependentDob).toISOString();

    selectedPatntData.requesterResponseInformation.serviceDateFrom =
      new Date(selectedPatntData.requesterResponseInformation.serviceDateFrom).toISOString();

    selectedPatntData.requesterResponseInformation.serviceDateTo =
      new Date(selectedPatntData.requesterResponseInformation.serviceDateTo).toISOString();

    selectedPatntData.requesterResponseInformation.admitDate =
      new Date(selectedPatntData.requesterResponseInformation.admitDate).toISOString();

    selectedPatntData.requesterResponseInformation.dischargeDate =
      new Date(selectedPatntData.requesterResponseInformation.dischargeDate).toISOString();

    selectedPatntData.speechPathologyResponse.speechPathologyEffectiveDateFrom =
      new Date(selectedPatntData.speechPathologyResponse.speechPathologyEffectiveDateFrom).toISOString();

    selectedPatntData.speechPathologyResponse.speechPathologyEffectiveDateTo =
      new Date(selectedPatntData.speechPathologyResponse.speechPathologyEffectiveDateTo).toISOString();

    selectedPatntData.speechPathologyResponse.speechPathologyExpirationDate =
      new Date(selectedPatntData.speechPathologyResponse.speechPathologyExpirationDate).toISOString();

    selectedPatntData.speechPathologyResponse.speechPathologyResponseServiceDateFrom =
      new Date(selectedPatntData.speechPathologyResponse.speechPathologyResponseServiceDateFrom).toISOString();

    selectedPatntData.speechPathologyResponse.speechPathologyResponseServiceDateTo =
      new Date(selectedPatntData.speechPathologyResponse.speechPathologyResponseServiceDateTo).toISOString();
    /** */
    selectedPatntData.skilledNursingResponse.skilledNursingEffectiveDateFrom =
      new Date(selectedPatntData.skilledNursingResponse.skilledNursingEffectiveDateFrom).toISOString();

    selectedPatntData.skilledNursingResponse.skilledNursingEffectiveDateTo =
      new Date(selectedPatntData.skilledNursingResponse.skilledNursingEffectiveDateTo).toISOString();

    selectedPatntData.skilledNursingResponse.skilledNursingExpirationDate =
      new Date(selectedPatntData.skilledNursingResponse.skilledNursingExpirationDate).toISOString();

    selectedPatntData.skilledNursingResponse.skilledNursingResponseServiceDateFrom =
      new Date(selectedPatntData.skilledNursingResponse.skilledNursingResponseServiceDateFrom).toISOString();

    selectedPatntData.skilledNursingResponse.skilledNursingResponseServiceDateTo =
      new Date(selectedPatntData.skilledNursingResponse.skilledNursingResponseServiceDateTo).toISOString();
    /** */

    /** */
    selectedPatntData.physicalTherapyResponse.physicalTherapyEffectiveDateFrom =
      new Date(selectedPatntData.physicalTherapyResponse.physicalTherapyEffectiveDateFrom).toISOString();

    selectedPatntData.physicalTherapyResponse.physicalTherapyEffectiveDateTo =
      new Date(selectedPatntData.physicalTherapyResponse.physicalTherapyEffectiveDateTo).toISOString();

    selectedPatntData.physicalTherapyResponse.physicalTherapyExpirationDate =
      new Date(selectedPatntData.physicalTherapyResponse.physicalTherapyExpirationDate).toISOString();

    selectedPatntData.physicalTherapyResponse.physicalTherapyResponseServiceDateFrom =
      new Date(selectedPatntData.physicalTherapyResponse.physicalTherapyResponseServiceDateFrom).toISOString();

    selectedPatntData.physicalTherapyResponse.physicalTherapyResponseServiceDateTo =
      new Date(selectedPatntData.physicalTherapyResponse.physicalTherapyResponseServiceDateTo).toISOString();
    /** */

    /** */
    selectedPatntData.medicalSocialWorkResponse.medicalSocialWorkEffectiveDateFrom =
      new Date(selectedPatntData.medicalSocialWorkResponse.medicalSocialWorkEffectiveDateFrom).toISOString();

    selectedPatntData.medicalSocialWorkResponse.medicalSocialWorkEffectiveDateTo =
      new Date(selectedPatntData.medicalSocialWorkResponse.medicalSocialWorkEffectiveDateTo).toISOString();

    selectedPatntData.medicalSocialWorkResponse.medicalSocialWorkExpirationDate =
      new Date(selectedPatntData.medicalSocialWorkResponse.medicalSocialWorkExpirationDate).toISOString();

    selectedPatntData.medicalSocialWorkResponse.medicalSocialWorkResponseServiceDateFrom =
      new Date(selectedPatntData.medicalSocialWorkResponse.medicalSocialWorkResponseServiceDateFrom).toISOString();

    selectedPatntData.medicalSocialWorkResponse.medicalSocialWorkResponseServiceDateTo =
      new Date(selectedPatntData.medicalSocialWorkResponse.medicalSocialWorkResponseServiceDateTo).toISOString();
    /** */

    /** */
    selectedPatntData.occupationalTherapyResponse.occupationalTherapyEffectiveDateFrom =
      new Date(selectedPatntData.occupationalTherapyResponse.occupationalTherapyEffectiveDateFrom).toISOString();

    selectedPatntData.occupationalTherapyResponse.occupationalTherapyEffectiveDateTo =
      new Date(selectedPatntData.occupationalTherapyResponse.occupationalTherapyEffectiveDateTo).toISOString();

    selectedPatntData.occupationalTherapyResponse.occupationalTherapyExpirationDate =
      new Date(selectedPatntData.occupationalTherapyResponse.occupationalTherapyExpirationDate).toISOString();

    selectedPatntData.occupationalTherapyResponse.occupationalTherapyResponseServiceDateFrom =
      new Date(selectedPatntData.occupationalTherapyResponse.occupationalTherapyResponseServiceDateFrom).toISOString();

    selectedPatntData.occupationalTherapyResponse.occupationalTherapyResponseServiceDateTo =
      new Date(selectedPatntData.occupationalTherapyResponse.occupationalTherapyResponseServiceDateTo).toISOString();
    /** */

    /** */
    selectedPatntData.homeHealthAideResponse.homeHealthAideEffectiveDateFrom =
      new Date(selectedPatntData.homeHealthAideResponse.homeHealthAideEffectiveDateFrom).toISOString();

    selectedPatntData.homeHealthAideResponse.homeHealthAideEffectiveDateTo =
      new Date(selectedPatntData.homeHealthAideResponse.homeHealthAideEffectiveDateTo).toISOString();

    selectedPatntData.homeHealthAideResponse.homeHealthAideExpirationDate =
      new Date(selectedPatntData.homeHealthAideResponse.homeHealthAideExpirationDate).toISOString();

    selectedPatntData.homeHealthAideResponse.homeHealthAideResponseServiceDateFrom =
      new Date(selectedPatntData.homeHealthAideResponse.homeHealthAideResponseServiceDateFrom).toISOString();

    selectedPatntData.homeHealthAideResponse.homeHealthAideResponseServiceDateTo =
      new Date(selectedPatntData.homeHealthAideResponse.homeHealthAideResponseServiceDateTo).toISOString();
    /** */
    if (formDataOnSave.valid) {
      console.log(selectedPatntData.memberdob);
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
      const dialogRef = this.dialog.open(StackedModalResponseComponent, config);

      dialogRef.afterClosed().subscribe(result => {
        console.log('Stacked Dialog Closed: true / false will come ' + result);

        if (result) {
          console.log('Confirm is clicked: ' + result);
          // this.isFormUpdated = result;
          this.dialogRef.close(false);
          // this.preAuthService.filter('Refresh Initiated');
        }

      });

    }

  }

  onEdit(formDataOnEdit) {
    this.editing = true;
    this.preAuthReponseForm.get('authorizationDetail').patchValue({ processDateAndTime: (new Date()).toISOString() });
    console.log('Response form on edit ', formDataOnEdit);

    // if (formDataOnEdit.valid) {
    //   let selectedPatntData: PreAuthResponse;
    //   selectedPatntData = formDataOnEdit.value;

    this.preAuthReponseForm.get('authorizationDetail').get('preAuthorizationStatus').updateValueAndValidity();
    this.preAuthReponseForm.get('authorizationDetail').get('unitsForNoOfUnitsTobeUsed').updateValueAndValidity();

    this.preAuthReponseForm.get('membergender').updateValueAndValidity();

    this.preAuthReponseForm.get('orgIdentificationCodeType').updateValueAndValidity();

    this.preAuthReponseForm.get('subscriberIdNumberType').updateValueAndValidity();
    this.preAuthReponseForm.get('subscriberRelToInsured').updateValueAndValidity();
    this.preAuthReponseForm.get('subscriberGender').updateValueAndValidity();
    this.preAuthReponseForm.get('subscriberIdentificationNumberType').updateValueAndValidity();

    this.preAuthReponseForm.get('dependentDetailResponse').get('dependentSubscriberIdNumberType').updateValueAndValidity();
    this.preAuthReponseForm.get('dependentDetailResponse').get('dependentReletionship').updateValueAndValidity();
    this.preAuthReponseForm.get('dependentDetailResponse').get('dependentGender').updateValueAndValidity();
    this.preAuthReponseForm.get('dependentDetailResponse').get('dependentIdentificationNumberType').updateValueAndValidity();

    this.preAuthReponseForm.get('requesterResponseInformation').get('reqProviderIdNumberType').updateValueAndValidity();
    this.preAuthReponseForm.get('requesterResponseInformation').get('reqProviderIdentificationNumberType').updateValueAndValidity();
    this.preAuthReponseForm.get('requesterResponseInformation').get('reqProviderType').updateValueAndValidity();
    this.preAuthReponseForm.get('requesterResponseInformation').get('requestCategory').updateValueAndValidity();
    this.preAuthReponseForm.get('requesterResponseInformation').get('certificationType').updateValueAndValidity();

    this.preAuthReponseForm.get('requesterResponseInformation').get('serviceType').updateValueAndValidity();
    this.preAuthReponseForm.get('requesterResponseInformation').get('levelOfService').updateValueAndValidity();

    this.ngAfterViewInit();
    // }
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

  ngAfterViewInit() {
    console.log('---ngAfterViewInit()---');
    if (this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideSelected').value) {
      console.log('homeHealthAideClicked ', this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideSelected').value);
      this.homeHealthAideClicked(true);
    } else {
      this.homeHealthAideClicked(false);
    }

    if (this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkSelected').value) {
      console.log('medicalSocialWorkClicked ', this.preAuthReponseForm.get('medicalSocialWorkResponse')
        .get('medicalSocialWorkSelected').value);
      this.medicalSocialWorkClicked(true);
    } else {
      this.medicalSocialWorkClicked(false);
    }

    if (this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapySelected').value) {
      console.log('occupationTherapyClicked ', this.preAuthReponseForm.get('occupationalTherapyResponse')
        .get('occupationalTherapySelected').value);
      this.occupationTherapyClicked(true);
    } else {
      this.occupationTherapyClicked(false);
    }

    if (this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingSelected').value) {
      console.log('skilledNursingClicked ', this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingSelected').value);
      this.skilledNursingClicked(true);
    } else {
      this.skilledNursingClicked(false);
    }

    if (this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapySelected').value) {
      console.log('physicalTherapyClicked ', this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapySelected').value);
      this.physicalTherapyClicked(true);
    } else {
      this.physicalTherapyClicked(false);
    }

    if (this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologySelected').value) {
      console.log('speechPathologyClicked ', this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologySelected').value);
      this.speechPathologyClicked(true);
    } else {
      this.speechPathologyClicked(false);
    }
  }

  homeHealthAideClicked(event) {
    if (event.checked) {
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideRequestCategory').updateValueAndValidity();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideCertificationType').updateValueAndValidity();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideServiceType').updateValueAndValidity();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideLevelOfService').updateValueAndValidity();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideAuthorizationIdNo').updateValueAndValidity();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideCertificationAction').updateValueAndValidity();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideProviderType').updateValueAndValidity();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideProviderIdNumberType').updateValueAndValidity();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideProviderIdentificationNumberType').updateValueAndValidity();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideAuthorizationIdNo').updateValueAndValidity();

    } else {
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideRequestCategory').clearValidators();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideCertificationType').clearValidators();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideServiceType').clearValidators();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideLevelOfService').clearValidators();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideAuthorizationIdNo').clearValidators();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideCertificationAction').clearValidators();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideProviderType').clearValidators();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideProviderIdNumberType').clearValidators();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideProviderIdentificationNumberType').clearValidators();
      this.preAuthReponseForm.get('homeHealthAideResponse').get('homeHealthAideAuthorizationIdNo').clearValidators();
    }
  }

  medicalSocialWorkClicked(event) {
    if (event.checked) {
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkRequestCategory').updateValueAndValidity();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkCertificationType').updateValueAndValidity();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkServiceType').updateValueAndValidity();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkLevelOfService').updateValueAndValidity();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkAuthorizationIdNo').updateValueAndValidity();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkCertificationAction').updateValueAndValidity();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkProviderType').updateValueAndValidity();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkProviderIdNumberType').updateValueAndValidity();
      this.preAuthReponseForm
        .get('medicalSocialWorkResponse').get('medicalSocialWorkProviderIdentificationNumberType').updateValueAndValidity();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkAuthorizationIdNo').updateValueAndValidity();

    } else {
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkRequestCategory').clearValidators();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkCertificationType').clearValidators();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkServiceType').clearValidators();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkLevelOfService').clearValidators();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkAuthorizationIdNo').clearValidators();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkCertificationAction').clearValidators();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkProviderType').clearValidators();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkProviderIdNumberType').clearValidators();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkProviderIdentificationNumberType').clearValidators();
      this.preAuthReponseForm.get('medicalSocialWorkResponse').get('medicalSocialWorkAuthorizationIdNo').clearValidators();
    }
  }

  occupationTherapyClicked(event) {
    if (event.checked) {
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyRequestCategory').updateValueAndValidity();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyCertificationType').updateValueAndValidity();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyServiceType').updateValueAndValidity();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyLevelOfService').updateValueAndValidity();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyAuthorizationIdNo').updateValueAndValidity();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyCertificationAction').updateValueAndValidity();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyProviderType').updateValueAndValidity();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyProviderIdNumberType').updateValueAndValidity();
      this.preAuthReponseForm
        .get('occupationalTherapyResponse').get('occupationalProviderIdentificationNumberType').updateValueAndValidity();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyAuthorizationIdNo').updateValueAndValidity();

    } else {
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyRequestCategory').clearValidators();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyCertificationType').clearValidators();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyServiceType').clearValidators();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyLevelOfService').clearValidators();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyAuthorizationIdNo').clearValidators();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyCertificationAction').clearValidators();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyProviderType').clearValidators();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyProviderIdNumberType').clearValidators();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalProviderIdentificationNumberType').clearValidators();
      this.preAuthReponseForm.get('occupationalTherapyResponse').get('occupationalTherapyAuthorizationIdNo').clearValidators();
    }
  }

  skilledNursingClicked(event) {
    if (event.checked) {
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingRequestCategory').updateValueAndValidity();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingCertificationType').updateValueAndValidity();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingServiceType').updateValueAndValidity();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingLevelOfService').updateValueAndValidity();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingAuthorizationIdNo').updateValueAndValidity();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingCertificationAction').updateValueAndValidity();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingProviderType').updateValueAndValidity();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingProviderIdNumberType').updateValueAndValidity();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingProviderIdentificationNumberType').updateValueAndValidity();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingAuthorizationIdNo').updateValueAndValidity();

    } else {
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingRequestCategory').clearValidators();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingCertificationType').clearValidators();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingServiceType').clearValidators();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingLevelOfService').clearValidators();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingAuthorizationIdNo').clearValidators();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingCertificationAction').clearValidators();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingProviderType').clearValidators();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingProviderIdNumberType').clearValidators();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingProviderIdentificationNumberType').clearValidators();
      this.preAuthReponseForm.get('skilledNursingResponse').get('skilledNursingAuthorizationIdNo').clearValidators();
    }
  }

  physicalTherapyClicked(event) {
    if (event.checked) {
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyRequestCategory').updateValueAndValidity();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyCertificationType').updateValueAndValidity();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyServiceType').updateValueAndValidity();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyLevelOfService').updateValueAndValidity();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyAuthorizationIdNo').updateValueAndValidity();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyCertificationAction').updateValueAndValidity();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyProviderType').updateValueAndValidity();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyProviderIdNumberType').updateValueAndValidity();
      this.preAuthReponseForm
        .get('physicalTherapyResponse').get('physicalTherapyProviderIdentificationNumberType').updateValueAndValidity();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyAuthorizationIdNo').updateValueAndValidity();

    } else {
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyRequestCategory').clearValidators();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyCertificationType').clearValidators();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyServiceType').clearValidators();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyLevelOfService').clearValidators();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyAuthorizationIdNo').clearValidators();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyCertificationAction').clearValidators();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyProviderType').clearValidators();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyProviderIdNumberType').clearValidators();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyProviderIdentificationNumberType').clearValidators();
      this.preAuthReponseForm.get('physicalTherapyResponse').get('physicalTherapyAuthorizationIdNo').clearValidators();
    }
  }

  speechPathologyClicked(event) {
    if (event.checked) {
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyRequestCategory').updateValueAndValidity();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyCertificationType').updateValueAndValidity();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyServiceType').updateValueAndValidity();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyLevelOfService').updateValueAndValidity();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyAuthorizationIdNo').updateValueAndValidity();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyCertificationAction').updateValueAndValidity();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyProviderType').updateValueAndValidity();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyProviderIdNumberType').updateValueAndValidity();
      this.preAuthReponseForm
        .get('speechPathologyResponse').get('speechPathologyProviderIdentificationNumberType').updateValueAndValidity();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyAuthorizationIdNo').updateValueAndValidity();

    } else {
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyRequestCategory').clearValidators();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyCertificationType').clearValidators();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyServiceType').clearValidators();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyLevelOfService').clearValidators();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyAuthorizationIdNo').clearValidators();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyCertificationAction').clearValidators();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyProviderType').clearValidators();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyProviderIdNumberType').clearValidators();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyProviderIdentificationNumberType').clearValidators();
      this.preAuthReponseForm.get('speechPathologyResponse').get('speechPathologyAuthorizationIdNo').clearValidators();
    }
  }


}
