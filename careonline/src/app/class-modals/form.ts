export class ResponseReceivedForm {
    ackn: boolean;
    beneficierydetail: Form;
}

export class Form {
    // $key: string;
    mrnNumber: string;
    lastName: string;
    firstName: string;
    middleName: string;
    dob: any;
    gender: string;
    suffix: string;
    // age: number;
    insuranceDetail: InsuranceDetail;
    insuranceAndDiagnosis: InsuranceAndDiagnosis;


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

export class InsuranceDetail {
    policyNumber: string;
    // tslint:disable-next-line: variable-name
    group_name: string;
    insurancePlanName: string;
    insurancePlanType: string;
    insuranceAddress: string;
    city: string;
    state: string;
    zipcode: number;
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
    eligibility: string;
    viewDetails: boolean;
}

export class HomeHealthEpisodeInfo {
    episodeId: string;
    homeHealthAgencyName: string;
    serviceStartDate: any;
    serviceEndtDate: any;
    admissionStatus: string;
}
