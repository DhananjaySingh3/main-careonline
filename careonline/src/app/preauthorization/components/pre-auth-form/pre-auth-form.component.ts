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
  Suffix, Genders, Plans, City, State, Relation, IdentificationCodeType, ProviderTypes, RequestCategory, CertificationType, LevelOfService,
  Payment, RequestTypes, InsuranceTypes, RequestFor, CommunicationTypes, ServiceType
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
  // usernamePattern = '^[a-z0-9_-]{1,15}$';
  userNamePattern = '^[a-zA-Z.-]{1,15}$';
  mrnNumberPattern = '^[a-zA-Z0-9-]{4,15}$';
  prefixPattern = '^[a-zA-Z.]{1,15}$';
  suffixPattern = '^[a-zA-Z.-]{1,15}$';

  orgNamePattern = '^[a-zA-Z]{1,20}$';
  orgIdCodePatrn = '^[a-zA-Z0-9]{1,20}$';
  communPatrn = '^[a-zA-Z0-9.@_-]{1,25}$';
  extPattern = '^[0-9]{1,5}$';

  supplIdPattern = '^[a-zA-Z0-9-]{1,20}$';


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
  identificationCodeTypes: IdentificationCodeType[];
  communicationTypes: CommunicationTypes[];
  providerTypes: ProviderTypes[];

  requestCategories: RequestCategory[];
  certificationTypes: CertificationType[];
  serviceTypes: ServiceType[];
  levelOfServices: LevelOfService[];

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

    enquiryDeatils: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      enquiryId: new FormControl({ value: '1234', disabled: false }, [Validators.required]),
      preauthReqSentDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
    }),

    preAuthDemographics: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.mrnNumberPattern)]),
      lastName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.userNamePattern)]),
      firstName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.userNamePattern)]),
      middleName: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.userNamePattern)]),
      dob: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      gender: new FormControl({ value: 'Unknown', disabled: false }, [Validators.required]),
      suffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      prefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      ssn: new FormControl({ value: '', disabled: false }),
      relationshipToSubscriber: new FormControl({ value: 'Select', disabled: false }),
    }),

    organizationInformation: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      organizationName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.orgNamePattern)]),
      orgIdentificationCode: new FormControl({ value: '', disabled: false },
        [Validators.required, Validators.pattern(this.orgIdCodePatrn)]),
      orgIdentificationCodeType: new FormControl({ value: 'Payor Identification', disabled: false }, [Validators.required]),

      orgCommunicationTypeTelephone: new FormControl({ value: '000-000-0000', disabled: false }, [Validators.pattern(this.communPatrn)]),
      orgCommunicationTypeFacsimile: new FormControl({ value: '000-000-0000', disabled: false }, [Validators.pattern(this.communPatrn)]),
      orgCommunicationTypeEMail: new FormControl({ value: 'emailid@domain.com', disabled: false }, [Validators.pattern(this.communPatrn)]),
      orgCommunicationExt: new FormControl({ value: '00000', disabled: false }, [Validators.pattern(this.extPattern)]),
    }),

    subscriberDetails: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      subscriberLastName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.userNamePattern)]),
      subscriberFirstName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.userNamePattern)]),
      subscriberMiddleName: new FormControl({ value: '', disabled: false },
        [Validators.required, Validators.pattern(this.userNamePattern)]),
      subscriberDob: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      subscriberGender: new FormControl({ value: 'Unknown', disabled: false }, [Validators.required]),
      subscriberSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      subscriberPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      subscriberRelToInsured: new FormControl({ value: 'Unknown', disabled: false }, [Validators.required]),
      subscriberIdentificationCode: new FormControl({ value: '', disabled: false },
        [Validators.required, Validators.pattern(this.orgIdCodePatrn)]),
      subscriberIdentificationNumberType: new FormControl({ value: 'Payor Identification', disabled: false }, [Validators.required]),
      subscriberSupplementalId: new FormControl({ value: '', disabled: false },
        [Validators.required, Validators.pattern(this.supplIdPattern)]),
      subscriberIdNumberType: new FormControl({ value: 'Payor Identification', disabled: false }, [Validators.required]),
    }),

    dependentDetails: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),
      dependentLastName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.userNamePattern)]),
      dependentFirstName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.userNamePattern)]),
      dependentMiddleName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.userNamePattern)]),
      dependentDob: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      dependentGender: new FormControl({ value: 'Unknown', disabled: false }, [Validators.required]),
      dependentSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      dependentPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),
      dependentRelToSubscriber: new FormControl({ value: 'Unknown', disabled: false }, [Validators.required]),
      dependentSubscriberIdentificationCode: new FormControl({ value: '', disabled: false },
        [Validators.required, Validators.pattern(this.orgIdCodePatrn)]),
      dependentSubscriberIdentificationNumberType: new FormControl({ value: 'Payor Identification', disabled: false },
        [Validators.required]),
      dependentSubscriberSupplementalId: new FormControl({ value: '', disabled: false },
        [Validators.required, Validators.pattern(this.supplIdPattern)]),
      dependentSubscriberIdNumberType: new FormControl({ value: 'Payor Identification', disabled: false }, [Validators.required]),
    }),
    providerDetail: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),

      reqProviderFirstName: new FormControl({ value: '', disabled: false },
        [Validators.required, Validators.pattern(this.userNamePattern)]),
      reqProviderLastName: new FormControl({ value: '', disabled: false },
        [Validators.required, Validators.pattern(this.userNamePattern)]),
      reqProviderMiddleName: new FormControl({ value: '', disabled: false },
        [Validators.required, Validators.pattern(this.userNamePattern)]),
      reqProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
      reqProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),

      reqProviderFullName: new FormControl({ value: '', disabled: false }, []),
      reqProviderType: new FormControl({ value: 'Referring', disabled: false }, [Validators.required]),
      reqProviderIdentificationNumber: new FormControl({ value: '', disabled: false },
        [Validators.required, Validators.pattern(this.orgIdCodePatrn)]),
      reqProviderIdentificationNumberType: new FormControl({ value: 'Payor Identification', disabled: false }, [Validators.required]),
      reqProviderSupplimentalId: new FormControl({ value: '', disabled: false },
        [Validators.required, Validators.pattern(this.supplIdPattern)]),
      reqProviderIdNumberType: new FormControl({ value: 'Payor Identification', disabled: false }, [Validators.required]),
      serviceDateFrom: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      serviceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      admitDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      dischargeDate: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
      requestCategory: new FormControl({ value: 'Select', disabled: false }, [Validators.required]), // Admission Review
      certificationType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      serviceType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
      levelOfService: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
    }),

    requestService: new FormGroup({
      id: new FormControl({ value: '', disabled: false }),
      mrnNumber: new FormControl({ value: '', disabled: false }, []),

      homeHealthAide: new FormGroup({
        id: new FormControl({ value: '', disabled: false }),
        mrnNumber: new FormControl({ value: '', disabled: false }, []),
        homeHealthAideRevenueCode: new FormControl({ value: '', disabled: false }, []),
        homeHealthAideProviderMiddleName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),
        homeHealthAidePoviderLastName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),
        homeHealthAideProviderFirstName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),

        homeHealthAideProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
        homeHealthAideProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),

        homeHealthAideRequestServiceDateFrom:
          new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
        homeHealthAideRequestServiceDateTo: new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
        homeHealthAideVisit: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.unitsPattern)]),
        homeHealthAideUnit: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(this.unitsPattern)]),
        homeHealthAideRequestCategory: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
        homeHealthAideCertificationType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
        homeHealthAideServiceType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
        homeHealthAideLevelOfService: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
        homeHealthAideProviderFullName: new FormControl({ value: '', disabled: false }),
        homeHealthAideProviderType: new FormControl({ value: 'Select', disabled: false }, [Validators.required]),
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

      medicalSocialWork: new FormGroup({
        id: new FormControl({ value: '', disabled: false }),
        mrnNumber: new FormControl({ value: '', disabled: false }),
        medicalSocialWorkRevenueCode: new FormControl({ value: '', disabled: false }),
        medicalSocialWorkProviderMiddleName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),
        medicalSocialWorkPoviderLastName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),
        medicalSocialWorkProviderFirstName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),

        medicalSocialWorkProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
        medicalSocialWorkProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),

        medicalSocialWorkRequestServiceDateFrom: new FormControl({ value: '', disabled: false }),
        medicalSocialWorkRequestServiceDateTo: new FormControl({ value: '', disabled: false }),
        medicalSocialWorkVisit: new FormControl({ value: '', disabled: false }),
        medicalSocialWorkUnit: new FormControl({ value: '', disabled: false }),
        medicalSocialWorkRequestCategory: new FormControl({ value: 'Select', disabled: false }),
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

      occupationTherapy: new FormGroup({
        id: new FormControl({ value: '', disabled: false }),
        mrnNumber: new FormControl({ value: '', disabled: false }),
        occupationTherapyRevenueCode: new FormControl({ value: '', disabled: false }),
        occupationTherapyProviderMiddleName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),
        occupationTherapyPoviderLastName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),
        occupationTherapyProviderFirstName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),

        occupationTherapyProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
        occupationTherapyProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),

        occupationalTherapyRequestServiceDateFrom:
          new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
        occupationalTherapyRequestServiceDateTo:
          new FormControl({ value: (new Date()).toISOString(), disabled: false }, [Validators.required]),
        occupationalTherapyVisit: new FormControl({ value: '', disabled: false }),
        occupationalTherapyUnit: new FormControl({ value: '', disabled: false }),
        occupationTherapyRequestCategory: new FormControl({ value: 'Select', disabled: false }),
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

      skilledNursing: new FormGroup({
        id: new FormControl({ value: '', disabled: false }),
        mrnNumber: new FormControl({ value: '', disabled: false }),
        skilledNursingRevenueCode: new FormControl({ value: '', disabled: false }),
        skilledNursingProviderMiddleName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),
        skilledNursingPoviderLastName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),
        skilledNursingProviderFirstName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),

        skilledNursingProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
        skilledNursingProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),

        skilledNursingRequestServiceDateFrom: new FormControl({ value: '', disabled: false }),
        skilledNursingRequestServiceDateTo: new FormControl({ value: '', disabled: false }),
        skilledNursingVisit: new FormControl({ value: '', disabled: false }),
        skilledNursingUnit: new FormControl({ value: '', disabled: false }),
        skilledNursingRequestCategory: new FormControl({ value: 'Select', disabled: false }),
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

      physicalTherapy: new FormGroup({
        id: new FormControl({ value: '', disabled: false }),
        mrnNumber: new FormControl({ value: '', disabled: false }),
        physicalTherapyrevenueCode: new FormControl({ value: '', disabled: false }),
        physicalTherapyProviderMiddleName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),
        physicalTherapyPoviderLastName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),
        physicalTherapyProviderFirstName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),

        physicalTherapyProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
        physicalTherapyProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),

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

      speechPathology: new FormGroup({
        id: new FormControl({ value: '', disabled: false }),
        mrnNumber: new FormControl({ value: '', disabled: false }),
        speechPathologyRevenueCode: new FormControl({ value: '', disabled: false }),
        speechPathologyProviderMiddleName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),
        speechPathologyPoviderLastName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),
        speechPathologyProviderFirstName: new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern(this.userNamePattern)]),

        speechPathologyProviderSuffix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.suffixPattern)]),
        speechPathologyProviderPrefix: new FormControl({ value: '', disabled: false }, [Validators.pattern(this.prefixPattern)]),

        speechPathologyRequestServiceDateFrom: new FormControl({ value: '', disabled: false }),
        speechPathologyRequestServiceDateTo: new FormControl({ value: '', disabled: false }),
        speechPathologyVisit: new FormControl({ value: '', disabled: false }),
        speechPathologyUnit: new FormControl({ value: '', disabled: false }),
        speechPathologyRequestCategory: new FormControl({ value: 'Select', disabled: false }),
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
    this.identificationCodeTypes = this.commonService.getIdentificationCodeType();
    this.providerTypes = this.commonService.getProviderTypes();

    this.requestCategories = this.commonService.getRequestCategory();
    this.certificationTypes = this.commonService.getCertificationType();
    this.serviceTypes = this.commonService.getServiceType();
    this.levelOfServices = this.commonService.getLevelOfService();
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
        // if (selectedPatAuthformInfo[0].requestFor.newadmissionService === true) {
        //   this.isNewServiceChecked = true;
        //   this.isNewAdmission = false;
        //   this.isAdditional = true;
        //   this.isExtension = true;
        //   console.log('Additional Service is "False"');
        //   console.log('"requestFor" error cuz api is not returning data');
        // } else {
        //   // this.isAdditional = false;
        // }

        // if (selectedPatAuthformInfo[0].requestFor.additionalServices.serviceflag === true) {
        //   this.isAddSerChecked = true;
        //   this.isAdditional = true;
        // }
        // if (selectedPatAuthformInfo[0].requestFor.extension.serviceflag === true) {
        //   this.isExtOnlyChecked = true;
        //   this.isExtension = true;
        // }
        /* For Cecking and unckecking radio buttons */

        // if (selectedPatAuthformInfo[0].requestFor.additionalServices.serviceflag === false) {
        //   this.isAdditional = false;
        //   console.log('Additional Service is "False"');
        //   console.log('"requestFor" error cuz api is not returning data');
        // } else {
        //   this.isAdditional = false;
        // }

        // if (selectedPatAuthformInfo[0].requestFor.extension.serviceflag === false) {
        //   this.isExtension = false;
        //   console.log('Extension Service is "False"');
        //   console.log('"extension" error cuz api is not returning data');
        // } else {
        //   this.isAdditional = false;
        // }

        // if ((selectedPatAuthformInfo[0].requestFor.additionalServices.serviceflag === false) &&
        //   (selectedPatAuthformInfo[0].requestFor.extension.serviceflag === false)) {
        //   // selectedPatAuthformInfo[0].requestFor.newadmissionService === false
        //   console.log('Both Additional and Extension Service is "False" enabling newService true for ui show');
        //   this.isNewAdmission = true;
        // }

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

          medicalSocialWorkRequestServiceDateFrom: patient.requestService.medicalSocialWork.medicalSocialWorkRequestServiceDateFrom,
          medicalSocialWorkRequestServiceDateTo: patient.requestService.medicalSocialWork.medicalSocialWorkRequestServiceDateTo,
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

          occupationalTherapyRequestServiceDateFrom: patient.requestService.occupationTherapy.occupationalTherapyRequestServiceDateFrom,
          occupationalTherapyRequestServiceDateTo: patient.requestService.occupationTherapy.occupationalTherapyRequestServiceDateTo,
          occupationalTherapyVisit: patient.requestService.occupationTherapy.occupationalTherapyVisit,
          occupationalTherapyUnit: patient.requestService.occupationTherapy.occupationalTherapyUnit,
          occupationTherapyRequestCategory: patient.requestService.occupationTherapy.occupationTherapyRequestCategory,
          occupationalTherapyCertificationType: patient.requestService.occupationTherapy.occupationalTherapyCertificationType,
          occupationalTherapyServiceType: patient.requestService.occupationTherapy.occupationalTherapyServiceType,
          occupationalTherapyLevelOfService: patient.requestService.occupationTherapy.occupationalTherapyLevelOfService,
          occupationalTherapyProviderFullName: patient.requestService.occupationTherapy.occupationalTherapyProviderFullName,
          occupationalTherapyProviderType: patient.requestService.occupationTherapy.occupationalTherapyProviderType,
          occupationalTherapyProviderAddress: patient.requestService.occupationTherapy.occupationalTherapyProviderAddress,
          occupationalTherapyProviderCity: patient.requestService.occupationTherapy.occupationalTherapyProviderCity,
          occupationalTherapyProviderState: patient.requestService.occupationTherapy.occupationalTherapyProviderState,
          occupationalTherapyProviderPostalCode: patient.requestService.occupationTherapy.occupationalTherapyProviderPostalCode,
          occupationalTherapyProviderCountryCode: patient.requestService.occupationTherapy.occupationalTherapyProviderCountryCode,
          occupationalTherapyProviderIdentificationNumber:
            patient.requestService.occupationTherapy.occupationalTherapyProviderIdentificationNumber,
          occupationalTherapyProviderIdentificationNumberType:
            patient.requestService.occupationTherapy.occupationalTherapyProviderIdentificationNumberType,
          occupationalTherapyProviderSupplimentalId: patient.requestService.occupationTherapy.occupationalTherapyProviderSupplimentalId,
          occupationalTherapyProviderIdNumberType: patient.requestService.occupationTherapy.occupationalTherapyProviderIdNumberType,
          occupationalTherapySelected: patient.requestService.occupationTherapy.occupationalTherapySelected,
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

          skilledNursingRequestServiceDateFrom: patient.requestService.skilledNursing.skilledNursingRequestServiceDateFrom,
          skilledNursingRequestServiceDateTo: patient.requestService.skilledNursing.skilledNursingRequestServiceDateTo,
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

          physicalTherapyRequestServiceDateFrom: patient.requestService.physicalTherapy.physicalTherapyRequestServiceDateFrom,
          physicalTherapyRequestServiceDateTo: patient.requestService.physicalTherapy.physicalTherapyRequestServiceDateTo,
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

          speechPathologyRequestServiceDateFrom: patient.requestService.speechPathology.speechPathologyRequestServiceDateFrom,
          speechPathologyRequestServiceDateTo: patient.requestService.speechPathology.speechPathologyRequestServiceDateTo,
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
      this.preAuthForm.get('enquiryDeatils').patchValue({ preauthReqSentDate: (new Date()).toISOString() });
    }

    console.log('on edit after date change', this.preAuthForm);
  }

  compareFn = (val1: string, val2: string) => {
    return (val1 === val2);
  }

  homeHealthAideSelected(event) {
    event.stopPropagation();
    // this.primaryChecked = !this.primaryChecked;
    // console.log('Primary Insurance selected: ', event.target.value);

    // this.selectedPatientViaDialog.
    //   insuranceDetailByPolicy.primaryInsuranceDetail.
    //   eligibilityCheckSelected = !this.selectedPatientViaDialog.insuranceDetailByPolicy
    //     .primaryInsuranceDetail.eligibilityCheckSelected;
  }


}
