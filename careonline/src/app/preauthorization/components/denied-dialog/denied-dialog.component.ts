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
  RejectReasonsMsg, IdNoType, IdentificationCodeType, ProviderTypes, PerUnitTypes
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

  /* Common Data Source from api*/
  perUnitTypes: PerUnitTypes[];
  preAuthStatuses: PreAuthStatus[];
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

  isReadonly = true;
  unitsPattern = '^[0-9]{1,3}$';

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
      // authorizationNo: new FormControl({ value: '', disabled: false }),
      // authStartDate: new FormControl({ value: '', disabled: false }),
      // authEndDate: new FormControl({ value: '', disabled: false }),
      totalUnitsApproved: new FormControl({ value: '0', disabled: true }),
      totalUnitsConsumed: new FormControl({ value: '0', disabled: true }),
      remainingUnits: new FormControl({ value: '0', disabled: true }),
      noOfUnitsTobeUsed: new FormControl({ value: '0', disabled: true }),
      unitsForNoOfUnitsTobeUsed: new FormControl({ value: 'Select', disabled: true }),
      enquiryDetailStatus: new FormControl({ value: '', disabled: true }),
      enquiryId: new FormControl({ value: '', disabled: true }),
      processDateAndTime: new FormControl({ value: '', disabled: true }),
      serviceDateFrom: new FormControl({ value: '', disabled: true }),
      serviceDateTo: new FormControl({ value: '', disabled: true }),
      admitDate: new FormControl({ value: '', disabled: true }),
      dischargeDate: new FormControl({ value: '', disabled: true }),
      certificationIdentificationNumber: new FormControl({ value: '', disabled: true }),
      effectiveDateFrom: new FormControl({ value: '', disabled: true }),
      effectiveDateTo: new FormControl({ value: '', disabled: true }),
      expirationeDateTo: new FormControl({ value: '', disabled: true }),
      preAuthorizationStatus: new FormControl({ value: 'Select', disabled: true }),
    }),
    /*Preauthorization Details*/

    /*Enquiry Details*/

    // enquiryDetailStatus: new FormControl({ value: '', disabled: true }),
    // enquiryId: new FormControl({ value: '', disabled: true }),
    // preAuthorizationNumber: new FormControl({ value: '', disabled: true }),
    // processDateAndTime: new FormControl({ value: (new Date()).toISOString(), disabled: true }),
    // processDateAndTime: new FormControl({ value: '', disabled: true }),
    // serviceDateFrom: new FormControl({ value: '', disabled: true }),
    // serviceDateTo: new FormControl({ value: '', disabled: true }),
    // admitDate: new FormControl({ value: '', disabled: true }),
    // dischargeDate: new FormControl({ value: '', disabled: true }),
    // certificationIdentificationNumber: new FormControl({ value: '', disabled: true }),
    // effectiveDateFrom: new FormControl({ value: '', disabled: true }),
    // effectiveDateTo: new FormControl({ value: '', disabled: true }),
    // expirationeDateTo: new FormControl({ value: '', disabled: true }),
    // preAuthorizationStatus: new FormControl({ value: 'Select', disabled: true }),

    /*Member Demographic details*/
    memberDetailStatus: new FormControl({ value: '', disabled: true }),
    mrnNumber: new FormControl({ value: '', disabled: true }),
    memberlastName: new FormControl({ value: '', disabled: true }, []),
    memberfirstName: new FormControl({ value: '', disabled: true }, []),
    membermiddleName: new FormControl({ value: '', disabled: true }, []),
    memberdob: new FormControl({ value: '', disabled: true }, []),
    membergender: new FormControl({ value: '', disabled: true }, []),
    membersuffix: new FormControl({ value: '', disabled: true }),
    memberPrefix: new FormControl({ value: '', disabled: true }),
    // ssn: new FormControl({ value: '', disabled: true }),
    memberRelationshipToSubscriber: new FormControl({ value: 'Select', disabled: true }),

    /*Organization Information*/
    orgDetailStatus: new FormControl({ value: '', disabled: true }),
    organizationName: new FormControl({ value: '', disabled: true }),
    orgIdentificationCode: new FormControl({ value: '', disabled: true }),
    orgIdentificationCodeType: new FormControl({ value: '', disabled: true }),
    orgRejectionReason: new FormControl({ value: 'Select', disabled: true }),
    orgFollowUpActionDescription: new FormControl({ value: 'Select', disabled: true }),

    // orgFollowUpActionRequired: new FormControl({ value: 'true', disabled: true }),
    // orgRequestValidationAccepted: new FormControl({ value: 'true', disabled: true }),
    // orgTransactionRejected: new FormControl({ value: 'true', disabled: true }),

    /*Subscriber Details*/
    subscriberDetailStatus: new FormControl({ value: '', disabled: true }),
    subscriberLastName: new FormControl({ value: '', disabled: true }, []),
    subscriberFirstName: new FormControl({ value: '', disabled: true }, []),
    subscriberMiddleName: new FormControl({ value: '', disabled: true }, []),
    subscriberDob: new FormControl({ value: '', disabled: true }, []),
    subscriberGender: new FormControl({ value: '', disabled: true }, []),
    subscriberSuffix: new FormControl({ value: '', disabled: true }),
    subscriberPrefix: new FormControl({ value: '', disabled: true }),
    // subscSsn: new FormControl({ value: '', disabled: true }),
    subscriberSupplementalId: new FormControl({ value: '', disabled: true }),
    subscriberIdentificationNumberType: new FormControl({ value: 'Select', disabled: true }),
    subscriberRejectionReason: new FormControl({ value: 'Select', disabled: true }),
    subscriberFollowUpActionDescription: new FormControl({ value: 'Select', disabled: true }),

    // subscriberRequestValidationAccepted: new FormControl({ value: '', disabled: true }),
    // subscriberTransactionRejected: new FormControl({ value: '', disabled: true }),
    // subscriberFollowUpActionRequired: new FormControl({ value: '', disabled: true }),

    /*Dependent Information*/
    dependentLastName: new FormControl({ value: '', disabled: false }, []),
    dependentFirstName: new FormControl({ value: '', disabled: false }, []),
    dependentMiddleName: new FormControl({ value: '', disabled: false }, []),
    dependentDob: new FormControl({ value: '', disabled: false }, []),
    dependentGender: new FormControl({ value: '', disabled: false }, []),
    dependentSuffix: new FormControl({ value: '', disabled: false }),
    // dependentPrefix: new FormControl({ value: '', disabled: false }),
    dependentReletionship: new FormControl({ value: '', disabled: false }),

    /*Requester Provider Information*/

    /*Note: Requester Provider Full Name is missing*/
    reqProviderDetailStatus: new FormControl({ value: '', disabled: true }),
    reqProviderFullName: new FormControl({ value: '', disabled: true }, []),
    reqProviderFirstName: new FormControl({ value: '', disabled: true }, []),
    reqProviderLastName: new FormControl({ value: '', disabled: true }, []),
    // providerMiddleName: new FormControl({ value: '', disabled: true }, []),
    reqProviderType: new FormControl({ value: 'Select', disabled: true }, []),
    reqProviderIdentificationNumber: new FormControl({ value: '', disabled: true }),
    reqProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: true }),
    reqProviderSupplimentalId: new FormControl({ value: '', disabled: true }),
    reqProviderIdNumberType: new FormControl({ value: 'Select', disabled: true }),
    reqProviderRejectionReason: new FormControl({ value: 'Select', disabled: true }),
    reqProviderFollowUpActionDescription: new FormControl({ value: 'Select', disabled: true }),

    // providerRequestValidationAccepted: new FormControl({ value: '', disabled: true }),
    // providerTransactionRejected: new FormControl({ value: '', disabled: true }),
    // providerFollowUpActionRequired: new FormControl({ value: '', disabled: true }),

    /*Servicing Provider Information*/

    servicingProviderDetailStatus: new FormControl({ value: '', disabled: true }),
    servicingProviderFullName: new FormControl({ value: '', disabled: true }, []),
    servicingProviderFirstName: new FormControl({ value: '', disabled: true }, []),
    servicingProviderLastName: new FormControl({ value: '', disabled: true }, []),
    // servicingProviderMiddleName: new FormControl({ value: '', disabled: true }, []),
    servicingProviderType: new FormControl({ value: 'Select', disabled: true }, []),
    servicingProviderAddress: new FormControl({ value: '', disabled: true }, []),
    servicingProviderCity: new FormControl({ value: '', disabled: true }, []),
    servicingProviderState: new FormControl({ value: '', disabled: true }, []),
    servicingProviderPostalCode: new FormControl({ value: '', disabled: true }, []),
    servicingProviderCountryCode: new FormControl({ value: '', disabled: true }, []),

    servicingProviderIdentificationNumber: new FormControl({ value: '', disabled: true }),
    servicingProviderIdentificationNumberType: new FormControl({ value: 'Select', disabled: true }),
    servicingProviderSupplimentId: new FormControl({ value: '', disabled: true }),
    servicingProviderIdNumberType: new FormControl({ value: 'Select', disabled: true }),
    servicingProviderRejectionReason: new FormControl({ value: 'Select', disabled: true }),
    servicingProviderFollowUpActionDescription: new FormControl({ value: 'Select', disabled: true }),

    /*Physical Therapy Information*/
    physicalTherapyResponse: new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      physicalTherapyDetailStatus: new FormControl({ value: '', disabled: true }),

      physicalTherapyRequestCategory: new FormControl({ value: 'Select', disabled: true }),
      physicalTherapyCertificationType: new FormControl({ value: 'Select', disabled: true }),
      physicalTherapyServiceType: new FormControl({ value: 'Select', disabled: true }),
      physicalTherapyLevelOfService: new FormControl({ value: 'Select', disabled: true }),
      physicalTherapyVisit: new FormControl({ value: '', disabled: true }),
      physicalTherapyUnit: new FormControl({ value: '', disabled: true }),
      physicalTherapyCertificationAction: new FormControl({ value: 'Select', disabled: true }),
      physicalTherapyRejectionReason: new FormControl({ value: 'Select', disabled: true }),
      physicalTherapyRejectionReasonMSG: new FormControl({ value: 'Select', disabled: false }),

      physicalTherapyProviderFullName: new FormControl({ value: '', disabled: true }),
      physicalTherapyProviderFirstName: new FormControl({ value: '', disabled: true }),
      physicalTherapyPoviderLastName: new FormControl({ value: '', disabled: true }),
      physicalTherapyProviderMiddleName: new FormControl({ value: '', disabled: true }),
      physicalTherapyProviderType: new FormControl({ value: 'Select', disabled: true }),

      physicalTherapyProviderAddress: new FormControl({ value: '', disabled: true }),
      physicalTherapyProviderCity: new FormControl({ value: '', disabled: true }),
      physicalTherapyProviderState: new FormControl({ value: '', disabled: true }),
      physicalTherapyProviderPostalCode: new FormControl({ value: '', disabled: true }),
      physicalTherapyProviderCountryCode: new FormControl({ value: '', disabled: true }),

      physicalTherapyProviderIdentificationNumber: new FormControl({ value: '', disabled: true }),
      physicalTherapyProviderIdentificationNumberType: new FormControl({ value: '', disabled: true }),
      physicalTherapyProviderSupplimentalId: new FormControl({ value: '', disabled: true }),
      physicalTherapyProviderIdNumberType: new FormControl({ value: '', disabled: true }),
      physicalTherapyProviderRejectionReason: new FormControl({ value: '', disabled: true }),
      physicalTherapyProviderFollowUpActionDescription: new FormControl({ value: '', disabled: true }),

    }),
    /*Occupational Therapy Information*/
    occupationalTherapyResponse: new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      occupationalTherapyDetailStatus: new FormControl({ value: '', disabled: true }),

      occupationalTherapyRequestCategory: new FormControl({ value: 'Select', disabled: true }),
      occupationalTherapyCertificationType: new FormControl({ value: 'Select', disabled: true }),
      occupationalTherapyServiceType: new FormControl({ value: 'Select', disabled: true }),
      occupationalTherapyLevelOfService: new FormControl({ value: 'Select', disabled: true }),
      occupationalTherapyVisit: new FormControl({ value: '', disabled: true }),
      occupationalTherapyUnit: new FormControl({ value: '', disabled: true }),
      occupationalTherapyCertificationAction: new FormControl({ value: 'Select', disabled: true }),
      occupationalTherapyRejectionReason: new FormControl({ value: 'Select', disabled: true }),
      occupationalTherapyRejectionReasonMSG: new FormControl({ value: 'Select', disabled: true }),

      occupationalTherapyProviderFullName: new FormControl({ value: '', disabled: true }),
      occupationalTherapyProviderFirstName: new FormControl({ value: '', disabled: true }),
      occupationalTherapyProviderMiddleName: new FormControl({ value: '', disabled: true }),
      occupationalTherapyProviderLastName: new FormControl({ value: '', disabled: true }),
      occupationalTherapyProviderType: new FormControl({ value: 'Select', disabled: true }),

      occupationalTherapyAddress: new FormControl({ value: '', disabled: true }),
      occupationalTherapyCity: new FormControl({ value: '', disabled: true }),
      occupationalTherapyState: new FormControl({ value: '', disabled: true }),
      occupationalTherapyPostalCode: new FormControl({ value: '', disabled: true }),
      occupationalTherapyCountryCode: new FormControl({ value: '', disabled: true }),

      occupationalTherapyProviderIdentificationNumber: new FormControl({ value: '', disabled: true }),
      occupationalProviderIdentificationNumberType: new FormControl({ value: '', disabled: true }),
      occupationalTherapyProviderSupplimentalId: new FormControl({ value: '', disabled: true }),
      occupationalTherapyProviderIdNumberType: new FormControl({ value: '', disabled: true }),
      occupationalTherapyProviderRejectionReason: new FormControl({ value: '', disabled: true }),
      occupationalTherapyProviderFollowUpActionDescription: new FormControl({ value: '', disabled: true }),
    }),
    /*Medical Social Work Information*/
    medicalSocialWorkResponse: new FormGroup({
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

  }
  /* Common methods */

  ngOnInit() {
    // setTimeout(() => {
    this.isLoadingResults = true;
    this.commonMethods();
    this.preAuthService.viewDenialResponseData(this.selectedPatientViaDialog).subscribe((response) => {
      console.log(response);
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
        // authorizationNo: patient.authorizationDetail.authorizationNo,
        // authStartDate: patient.authorizationDetail.authStartDate,
        // authEndDate: patient.authorizationDetail.authEndDate,
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

      /*Preauthorization Details*/

      /*Enquiry Details*/
      // enquiryId: patient.enquiryId,
      // processDateAndTime: patient.processDateAndTime,
      // serviceDateFrom: patient.serviceDateFrom,
      // serviceDateTo: patient.serviceDateTo,
      // effectiveDateTo: patient.effectiveDateTo,
      // effectiveDateFrom: patient.effectiveDateFrom,
      // expirationeDateTo: patient.expirationeDateTo,
      // admitDate: patient.admitDate,
      // dischargeDate: patient.dischargeDate,
      // certificationIdentificationNumber: patient.certificationIdentificationNumber,
      // preAuthorizationStatus: patient.preAuthorizationStatus,
      // enquiryDetailStatus: patient.enquiryDetailStatus,

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
      organizationName: patient.organizationName,
      orgIdentificationCode: patient.orgIdentificationCode,
      orgIdentificationCodeType: patient.orgIdentificationCodeType,
      orgRejectionReason: patient.orgRejectionReason,
      orgFollowUpActionDescription: patient.orgFollowUpActionDescription,
      orgDetailStatus: patient.orgDetailStatus,

      /*Requester Provider Details*/
      reqProviderFullName: patient.reqProviderFullName,
      reqProviderFirstName: patient.reqProviderFirstName,
      reqProviderLastName: patient.reqProviderLastName,
      reqProviderType: patient.reqProviderType,
      reqProviderIdentificationNumber: patient.reqProviderIdentificationNumber,
      reqProviderIdentificationNumberType: patient.reqProviderIdentificationNumberType,
      reqProviderSupplimentalId: patient.reqProviderSupplimentalId,
      reqProviderIdNumberType: patient.reqProviderIdNumberType,
      reqProviderRejectionReason: patient.reqProviderRejectionReason,
      reqProviderFollowUpActionDescription: patient.reqProviderFollowUpActionDescription,
      reqProviderDetailStatus: patient.reqProviderDetailStatus,

      /*Subscriber Details*/
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
