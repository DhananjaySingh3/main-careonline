export class PreAuthFormModelRequest {
    id?: number;
    mrnNumber?: string;
    enquiryDetails?: EnquiryDetails;
    preAuthDemographics?: PreAuthDemographics;
    organizationDetails?: OrganizationDetails;
    subscriberDetails?: SubscriberDetails;
    dependentDetails?: DependentDetails;
    requesterDetails?: RequesterDetails;
    homeHealthAideRequest?: HomeHealthAideRequest;
    medicalSocialWorkRequest?: MedicalSocialWorkRequest;
    occupationalTherapyRequest?: OccupationalTherapyRequest;
    skilledNursingRequest?: SkilledNursingRequest;
    physicalTherapyRequest: PhysicalTherapyRequest;
    speechPathologyRequest?: SpeechPathologyRequest;
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

export class RequestService {
    id?: number;
    mrnNumber?: string;
    // homeHealthAide?: HomeHealthAide;
    // medicalSocialWork?: MedicalSocialWork;
    // occupationTherapy?: OccupationTherapy;
    // skilledNursing?: SkilledNursing;
    // physicalTherapy?: PhysicalTherapy;
    // speechPathology?: SpeechPathology;
}

export class EnquiryDetails {
    enquiryId?: string;
    preauthReqSentDate?: any;
}

export class PreAuthDemographics {
    // id?: number;
    mrnNumber?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    suffix?: string;
    gender?: string;
    dob?: any;
    //  ssn?: string;
    prefix?: string;
    // relToSubscriber?: string;
}

export class OrganizationDetails {
    organizationName?: string;
    orgIdentificationCode?: string;
    orgIdentificationCodeType?: string;
    orgCommunicationNo?: string;
    orgCommunicationExt?: string;
    orgCommunicationType?: string;
}

export class SubscriberDetails {
    subscriberFirstName?: string;
    subscriberLastName?: string;
    subscriberMiddleName?: string;
    subscriberSuffix?: string;
    subscriberGender?: string;
    subscriberDob?: any;
    subscriberPrefix?: string;
    subscriberRelToPatient?: string;
    subscriberIdentificationCode?: string;
    subscriberIdentificationNumberType?: string;
    subscriberSupplementalId?: string;
    subscriberIdNumberType?: string;
}

export class DependentDetails {
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
    reqProviderFullName?: string;
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

export class HomeHealthAideRequest {
    id?: number;
    // mrnNumber?: string;
    // revenueCode?: number;
    // visits?: number;
    // units?: number;
    // homeHealthAide?: boolean;

    homeHealthAideRequestServiceDateFrom?: any;
    homeHealthAideRequestServiceDateTo?: any;
    homeHealthAideVisit?: number;
    homeHealthAideUnit?: number;
    homeHealthAideCategory?: string;
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
    // mrnNumber?: string;
    // revenueCode?: number;
    // visits?: number;
    // units?: number;
    // medicalSocialWork?: boolean;

    medicalSocialWorkRequestServiceDateFrom?: any;
    medicalSocialWorkRequestServiceDateTo?: any;
    medicalSocialWorkVisit?: number;
    medicalSocialWorkUnit?: number;
    medicalSocialWorkCategory?: string;
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
    // mrnNumber?: string;
    // revenueCode?: number;
    // visits?: number;
    // units?: number;
    // occupationTherapy?: boolean;

    occupationalTherapyRequestServiceDateFrom?: any;
    occupationalTherapyRequestServiceDateTo?: any;
    occupationalTherapyVisit?: number;
    occupationalTherapyUnit?: number;
    occupationalTherapyRequestCategory?: string;
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
    // mrnNumber?: string;
    // revenueCode?: number;
    // visits?: number;
    // units?: number;
    // skilledNursing?: boolean;
    skilledNursingRequestServiceDateFrom?: any;
    skilledNursingRequestServiceDateTo?: any;
    skilledNursingVisit?: number;
    skilledNursingUnit?: number;
    skilledNursingCategory?: string;
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
    // mrnNumber?: string;
    // revenueCode?: number;
    // visits?: number;
    // units?: number;
    // physicalTherapy?: boolean;

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
    // mrnNumber?: string;
    // revenueCode?: number;
    // visits?: number;
    // units?: number;
    // speechPathology?: boolean;

    speechPathologyRequestServiceDateFrom?: any;
    speechPathologyRequestServiceDateTo?: any;
    speechPathologyVisit?: number;
    speechPathologyUnit?: number;
    speechPathologyCategory?: string;
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
