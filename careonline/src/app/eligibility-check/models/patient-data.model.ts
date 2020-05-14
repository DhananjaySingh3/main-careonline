export class ResponseReceivedForm {
    lastName?: string;
    firstName?: string;
    statusVerifiedDate: any;
    endDate: any;
    ackn: boolean;
    eligibility: string;
    insurancePlanType: string;
    insurancePlanName: string;
    startDate: any;
    viewDetails: boolean;
}

export class PatientFormDataRequest {
    mrnNumber?: string;
    lastName?: string;
    firstName?: string;
    middleName?: string;
    dob?: any;
    gender?: string;
    suffix?: string;
    insuranceDetailByPolicy?: InsuranceDetailByPolicy;
}

export class InsuranceAndDiagnosis {
    insuredlastName: string;
    insuredfirstName: string;
    insuredmiddleName: string;
    insureddob: any;
    insuredsex: string;
    patientReltoInsured: string;
    // insuranceInuse: string;
    insuredAddress: string;
    insuredCity: string;
    insuredState: string;
    insuredzipcode: number;
    ssn: string;
    mop: string;
}

export class InsuranceDetailByPolicy {
    policyId?: string;
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

export class MemberInsuranceHistory {
    statusVerifiedDate: any;
    lastName: string;
    firstName: string;
    insurancePlanType: string;
    insurancePlanName: string;
    eligibilityStartDate: any;
    eligibilityEndDate: any;
}

export class InsuranceEligibility {
    insurancePlanType: string;
    insurancePlanName: string;
    startDate: any;
    endtDate: any;
    ackn: boolean;
    eligibility: string;
    viewDetails?: boolean;
    lastName: string;
    firstName: string;
    statusVerifiedDate: any;
}

export class HomeHealthEpisodeInfo {
    episodeId: string;
    homeHealthAgencyName: string;
    serviceStartDate: any;
    serviceEndtDate: any;
    admissionStatus: string;
}
