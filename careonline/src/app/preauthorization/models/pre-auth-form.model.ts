export class PreAuthFormModelRequest {
    id?: number;
    mrnNumber?: string;
    enquiryDeatils?: EnquiryDetails;
    preAuthDemographics?: PreAuthDemographics;
    organizationInformation?: OrganizationDetails;
    subscriberDetails?: SubscriberDetails;
    dependentDetails?: DependentDetails;
    providerDetail?: RequesterDetails;
    requestService?: RequestService;
}

export class PreAuthFormModelResponse {
    id?: number;
    mrnNumber?: string;
    currenttimdate?: any;
    preAuthDemographics?: PreAuthDemographics;
    insuranceDetailPreAuth?: InsuranceDetailPreAuth;
    providerDetail?: ProviderDetail;
    admissionDetail?: AdmissionDetail;
    requestFor?: RequestFor;
    requestService?: RequestService;
}

export class InsuranceDetailPreAuth {
    mrnNumber: string;
    // policyId?: string;
    id?: number;
    insuranceTypeSelcted: string;
    primaryInsuranceDetail?: PrimaryInsuranceDetail;
    secondaryInsuranceDetail?: SecondaryInsuranceDetail;
    tertiaryInsuranceDetail?: TertiaryInsuranceDetail;
}

export class PrimaryInsuranceDetail {
    insuredlastName?: string;
    insuredfirstName?: string;
    insuredmiddleName?: string;
    insureddob?: any;
    insuredsex?: string;
    eligibility?: string;
    eligibilityCheckSelected?: boolean;
    id?: number;
    policyNumber?: string;
    statusVerifiedDate?: any;
    'group_name'?: string;
    insurancePlanName?: string;
    insurancePlanType?: string;
    insuranceAddress?: string;
    city?: string;
    state?: string;
    zipcode?: number;
    endDate?: any;
    startDate?: any;
    mrnNumber?: string;
    ssn?: string;
    mop?: string;
    patientRelationInsured?: string;
}

export class TertiaryInsuranceDetail {
    insuredlastName?: string;
    insuredfirstName?: string;
    insuredmiddleName?: string;
    insureddob?: any;
    insuredsex?: string;
    eligibility?: string;
    eligibilityCheckSelected?: boolean;
    id?: number;
    policyNumber?: string;
    statusVerifiedDate?: any;
    'group_name'?: string;
    insurancePlanName?: string;
    insurancePlanType?: string;
    insuranceAddress?: string;
    city?: string;
    state?: string;
    zipcode?: number;
    endDate?: any;
    startDate?: any;
    mrnNumber?: string;
    ssn?: string;
    mop?: string;
    patientRelationInsured?: string;
}

export class SecondaryInsuranceDetail {
    insuredlastName?: string;
    insuredfirstName?: string;
    insuredmiddleName?: string;
    insureddob?: any;
    insuredsex?: string;
    eligibility?: string;
    eligibilityCheckSelected?: boolean;
    id?: number;
    policyNumber?: string;
    statusVerifiedDate?: any;
    'group_name'?: string;
    insurancePlanName?: string;
    insurancePlanType?: string;
    insuranceAddress?: string;
    city?: string;
    state?: string;
    zipcode?: number;
    endDate?: any;
    startDate?: any;
    mrnNumber?: string;
    ssn?: string;
    mop?: string;
    patientRelationInsured?: string;
}

export class ProviderDetail {
    id?: number;
    requestingProviderIDNumber?: string;
    requestingAgency?: string;
    providerName?: string;
    providerTaxIDNumber?: string;
    phoneNumber?: number;
    extension?: number;
    faxNumber?: number;
}

export class AdmissionDetail {
    id?: number;
    mrnNumber?: string;
    requestType?: string;
    admissionDate?: any;
    dischargeDate?: any;
    referringPhysician?: string;
    primaryDiagnosis?: string;
    primaryDiagnosisDescription?: string;
}

export class RequestFor {
    id?: number;
    mrnNumber?: string;
    newadmissionService?: boolean;
    additionalServices?: AdditionalServices;
    extension?: Extension;
}

export class AdditionalServices {
    id?: number;
    previousAuthorizationNumber?: string;
    numberOfServiceCompletedTillDate?: number;
    fromDate?: any;
    toDate?: any;
    serviceflag?: boolean;
}

export class Extension {
    id?: number;
    previousAuthorizationNumber?: string;
    fromDate?: any;
    toDate?: any;
    serviceflag?: boolean;
}

// export class RequestService {
//     id?: number;
//     mrnNumber?: string;
//     // homeHealthAide?: HomeHealthAide;
//     // medicalSocialWork?: MedicalSocialWork;
//     // occupationTherapy?: OccupationTherapy;
//     // skilledNursing?: SkilledNursing;
//     // physicalTherapy?: PhysicalTherapy;
//     // speechPathology?: SpeechPathology;
//     homeHealthAideRequest?: HomeHealthAideRequest;
//     medicalSocialWorkRequest?: MedicalSocialWorkRequest;
//     occupationalTherapyRequest?: OccupationalTherapyRequest;
//     skilledNursingRequest?: SkilledNursingRequest;
//     physicalTherapyRequest: PhysicalTherapyRequest;
//     speechPathologyRequest?: SpeechPathologyRequest;
// }

export class EnquiryDetails {
    id?: number;
    mrnNumber?: string;
    enquiryId?: string;
    preauthReqSentDate?: any;
}

export class PreAuthDemographics {
    id?: number;
    mrnNumber?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    suffix?: string;
    gender?: string;
    dob?: any;
    ssn?: string;
    prefix?: string;
    relationshipToSubscriber?: string;
}

export class OrganizationDetails {
    id?: number;
    mrnNumber?: string;
    organizationName?: string;
    orgIdentificationCode?: string;
    orgIdentificationCodeType?: string;
    orgCommunicationTypeTelephone?: string;
    orgCommunicationTypeFacsimile?: string;
    orgCommunicationTypeEMail?: string;
    orgCommunicationExt?: number;
}

export class SubscriberDetails {
    id?: number;
    mrnNumber?: string;
    subscriberFirstName?: string;
    subscriberLastName?: string;
    subscriberMiddleName?: string;
    subscriberSuffix?: string;
    subscriberGender?: string;
    subscriberDob?: any;
    subscriberPrefix?: string;
    subscriberRelToInsured?: string;
    subscriberIdentificationCode?: string;
    subscriberIdentificationNumberType?: string;
    subscriberSupplementalId?: string;
    subscriberIdNumberType?: string;
}

export class DependentDetails {
    id?: number;
    mrnNumber?: string;
    dependentFirstName?: string;
    dependentLastName?: string;
    dependentMiddleName?: string;
    dependentSuffix?: string;
    dependentGender?: string;
    dependentDob?: any;
    dependentPrefix?: string;
    dependentRelToSubscriber?: string;
    dependentSubscriberIdentificationCode?: string;
    dependentSubscriberIdentificationNumberType?: string;
    dependentSubscriberSupplementalId?: string;
    dependentSubscriberIdNumberType?: string;
}

export class RequesterDetails {
    id?: number;
    mrnNumber?: string;
    reqProviderFullName?: string;

    reqProviderFirstName?: string;
    reqProviderLastName?: string;
    reqProviderMiddleName?: string;
    reqProviderSuffix?: string;
    reqProviderPrefix?: string;

    reqProviderType?: string;
    reqProviderIdentificationNumber?: string;
    reqProviderIdentificationNumberType?: string;
    reqProviderSupplimentalId?: string;
    reqProviderIdNumberType?: string;
    serviceDateFrom?: any;
    serviceDateTo?: any;
    admitDate?: any;
    dischargeDate?: any;
    requestCategory?: string;
    certificationType?: string;
    serviceType?: string;
    levelOfService?: string;
}

export class RequestService {
    id?: number;
    mrnNumber?: string;
    // homeHealthAide?: HomeHealthAide;
    // medicalSocialWork?: MedicalSocialWork;
    // occupationTherapy?: OccupationTherapy;
    // skilledNursing?: SkilledNursing;
    // physicalTherapy?: PhysicalTherapy;
    // speechPathology?: SpeechPathology;
    // homeHealthAideRequest?: HomeHealthAideRequest;
    // medicalSocialWorkRequest?: MedicalSocialWorkRequest;
    // occupationalTherapyRequest?: OccupationalTherapyRequest;
    // skilledNursingRequest?: SkilledNursingRequest;
    // physicalTherapyRequest: PhysicalTherapyRequest;
    // speechPathologyRequest?: SpeechPathologyRequest;
    homeHealthAide?: HomeHealthAideRequest;
    medicalSocialWork?: MedicalSocialWorkRequest;
    occupationTherapy?: OccupationalTherapyRequest;
    skilledNursing?: SkilledNursingRequest;
    physicalTherapy: PhysicalTherapyRequest;
    speechPathology?: SpeechPathologyRequest;
}

export class HomeHealthAideRequest {
    id?: number;
    mrnNumber?: string;
    homeHealthAideRevenueCode?: number;
    homeHealthAideProviderMiddleName?: string;
    homeHealthAidePoviderLastName?: string;
    homeHealthAideProviderFirstName?: string;
    // visits?: number;
    homeHealthAideProviderSuffix?: string;
    homeHealthAideProviderPrefix?: string;

    homeHealthAideRequestServiceDateFrom?: any;
    homeHealthAideRequestServiceDateTo?: any;
    homeHealthAideVisit?: number;
    homeHealthAideUnit?: number;
    homeHealthAideRequestCategory?: string;
    homeHealthAideCertificationType?: string;
    homeHealthAideServiceType?: string;
    homeHealthAideLevelOfService?: string;
    homeHealthAideProviderFullName?: string;
    homeHealthAideProviderType?: string;
    homeHealthAideProviderAddress?: string;
    homeHealthAideProviderCity?: string;
    homeHealthAideProviderState?: string;
    homeHealthAideProviderPostalCode?: string;
    homeHealthAideProviderCountryCode?: string;
    homeHealthAideProviderIdentificationNumber?: string;
    homeHealthAideProviderIdentificationNumberType?: string;
    homeHealthAideProviderSupplimentalId?: string;
    homeHealthAideProviderIdNumberType?: string;
    homeHealthAideSelected?: boolean;
}

export class MedicalSocialWorkRequest {
    id?: number;
    mrnNumber?: string;
    medicalSocialWorkRevenueCode?: number;
    medicalSocialWorkProviderMiddleName?: string;
    medicalSocialWorkPoviderLastName?: string;
    medicalSocialWorkProviderFirstName?: string;

    medicalSocialWorkProviderSuffix?: string;
    medicalSocialWorkProviderPrefix?: string;

    medicalSocialWorkRequestServiceDateFrom?: any;
    medicalSocialWorkRequestServiceDateTo?: any;
    medicalSocialWorkVisit?: number;
    medicalSocialWorkUnit?: number;
    medicalSocialWorkRequestCategory?: string;
    medicalSocialWorkCertificationType?: string;
    medicalSocialWorkServiceType?: string;
    medicalSocialWorkLevelOfService?: string;
    medicalSocialWorkProviderFullName?: string;
    medicalSocialWorkProviderType?: string;
    medicalSocialWorkProviderAddress?: string;
    medicalSocialWorkProviderCity?: string;
    medicalSocialWorkProviderState?: string;
    medicalSocialWorkProviderPostalCode?: string;
    medicalSocialWorkProviderCountryCode?: string;
    medicalSocialWorkProviderIdentificationNumber?: string;
    medicalSocialWorkProviderIdentificationNumberType?: string;
    medicalSocialWorkProviderSupplimentalId?: string;
    medicalSocialWorkProviderIdNumberType?: string;
    medicalSocialWorkSelected?: boolean;
}

export class OccupationalTherapyRequest {
    id?: number;
    mrnNumber?: string;
    occupationTherapyRevenueCode?: number;
    occupationTherapyProviderMiddleName?: string;
    occupationTherapyPoviderLastName?: string;
    occupationTherapyProviderFirstName?: string;

    occupationTherapyProviderSuffix?: string;
    occupationTherapyProviderPrefix?: string;

    occupationalTherapyRequestServiceDateFrom?: any;
    occupationalTherapyRequestServiceDateTo?: any;
    occupationalTherapyVisit?: number;
    occupationalTherapyUnit?: number;
    occupationTherapyRequestCategory?: string;
    occupationalTherapyCertificationType?: string;
    occupationalTherapyServiceType?: string;
    occupationalTherapyLevelOfService?: string;
    occupationalTherapyProviderFullName?: string;
    occupationalTherapyProviderType?: string;
    occupationalTherapyProviderAddress?: string;
    occupationalTherapyProviderCity?: string;
    occupationalTherapyProviderState?: string;
    occupationalTherapyProviderPostalCode?: string;
    occupationalTherapyProviderCountryCode?: string;
    occupationalTherapyProviderIdentificationNumber?: string;
    occupationalTherapyProviderIdentificationNumberType?: string;
    occupationalTherapyProviderSupplimentalId?: string;
    occupationalTherapyProviderIdNumberType?: string;
    occupationalTherapySelected?: boolean;
}

export class SkilledNursingRequest {
    id?: number;
    mrnNumber?: string;
    skilledNursingRevenueCode?: number;
    skilledNursingProviderMiddleName?: string;
    skilledNursingPoviderLastName?: string;
    skilledNursingProviderFirstName?: string;

    skilledNursingProviderSuffix?: string;
    skilledNursingProviderPrefix?: string;

    skilledNursingRequestServiceDateFrom?: any;
    skilledNursingRequestServiceDateTo?: any;
    skilledNursingVisit?: number;
    skilledNursingUnit?: number;
    skilledNursingRequestCategory?: string;
    skilledNursingCertificationType?: string;
    skilledNursingServiceType?: string;
    skilledNursingLevelOfService?: string;
    skilledNursingProviderFullName?: string;
    skilledNursingProviderType?: string;
    skilledNursingProviderAddress?: string;
    skilledNursingProviderCity?: string;
    skilledNursingProviderState?: string;
    skilledNursingProviderPostalCode?: string;
    skilledNursingProviderCountryCode?: string;
    skilledNursingProviderIdentificationNumber?: string;
    skilledNursingProviderIdentificationNumberType?: string;
    skilledNursingProviderSupplimentalId?: string;
    skilledNursingProviderIdNumberType?: string;
    skilledNursingSelected?: boolean;
}
export class PhysicalTherapyRequest {
    id?: number;
    mrnNumber?: string;
    physicalTherapyrevenueCode?: number;
    physicalTherapyProviderMiddleName?: string;
    physicalTherapyPoviderLastName?: string;
    physicalTherapyProviderFirstName?: string;

    physicalTherapyProviderSuffix?: string;
    physicalTherapyProviderPrefix?: string;

    physicalTherapyRequestServiceDateFrom?: any;
    physicalTherapyRequestServiceDateTo?: any;
    physicalTherapyVisit?: number;
    physicalTherapyUnit?: number;
    physicalTherapyRequestCategory?: string;
    physicalTherapyCertificationType?: string;
    physicalTherapyServiceType?: string;
    physicalTherapyLevelOfService?: string;
    physicalTherapyProviderFullName?: string;
    physicalTherapyProviderType?: string;
    physicalTherapyProviderAddress?: string;
    physicalTherapyProviderCity?: string;
    physicalTherapyProviderState?: string;
    physicalTherapyProviderPostalCode?: string;
    physicalTherapyProviderCountryCode?: string;
    physicalTherapyProviderIdentificationNumber?: string;
    physicalTherapyProviderIdentificationNumberType?: string;
    physicalTherapyProviderSupplimentalId?: string;
    physicalTherapyProviderIdNumberType?: string;
    physicalTherapySelected?: boolean;
}
export class SpeechPathologyRequest {
    id?: number;
    mrnNumber?: string;
    speechPathologyRevenueCode?: number;
    speechPathologyProviderMiddleName?: string;
    speechPathologyPoviderLastName?: string;
    speechPathologyProviderFirstName?: string;

    speechPathologyProviderSuffix?: string;
    speechPathologyProviderPrefix?: string;

    speechPathologyRequestServiceDateFrom?: any;
    speechPathologyRequestServiceDateTo?: any;
    speechPathologyVisit?: number;
    speechPathologyUnit?: number;
    speechPathologyRequestCategory?: string;
    speechPathologyCertificationType?: string;
    speechPathologyServiceType?: string;
    speechPathologyLevelOfService?: string;
    speechPathologyProviderFullName?: string;
    speechPathologyProviderType?: string;
    speechPathologyProviderAddress?: string;
    speechPathologyProviderCity?: string;
    speechPathologyProviderState?: string;
    speechPathologyProviderPostalCode?: string;
    speechPathologyProviderCountryCode?: string;
    speechPathologyProviderIdentificationNumber?: string;
    speechPathologyProviderIdentificationNumberType?: string;
    speechPathologyProviderSupplimentalId?: string;
    speechPathologyProviderIdNumberType?: string;
    speechPathologySelected?: boolean;
}
