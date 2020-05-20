export class PreAuthFormModelRequest {

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

export class PreAuthDemographics {
   // id?: number;
    mrnNumber?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    suffix?: string;
    gender?: string;
    dob?: any;
    ssn?: string;
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
    homeHealthAide?: HomeHealthAide;
    medicalSocialWork?: MedicalSocialWork;
    occupationTherapy?: OccupationTherapy;
    skilledNursing?: SkilledNursing;
    physicalTherapy?: PhysicalTherapy;
    speechPathology?: SpeechPathology;
}

export class HomeHealthAide {
    id?: number;
    mrnNumber?: string;
    revenueCode?: number;
    visits?: number;
    units?: number;
    homeHealthAide?: boolean;
}

export class MedicalSocialWork {
    id?: number;
    mrnNumber?: string;
    revenueCode?: number;
    visits?: number;
    units?: number;
    medicalSocialWork?: boolean;
}

export class OccupationTherapy {
    id?: number;
    mrnNumber?: string;
    revenueCode?: number;
    visits?: number;
    units?: number;
    occupationTherapy?: boolean;
}

export class SkilledNursing {
    id?: number;
    mrnNumber?: string;
    revenueCode?: number;
    visits?: number;
    units?: number;
    skilledNursing?: boolean;
}
export class PhysicalTherapy {
    id?: number;
    mrnNumber?: string;
    revenueCode?: number;
    visits?: number;
    units?: number;
    physicalTherapy?: boolean;
}
export class SpeechPathology {
    id?: number;
    mrnNumber?: string;
    revenueCode?: number;
    visits?: number;
    units?: number;
    speechPathology?: boolean;
}
