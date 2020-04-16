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
