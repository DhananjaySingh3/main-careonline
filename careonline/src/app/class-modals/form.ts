export class Form {
   // $key: string;
    lastName: string;
    firstName: string;
    middleName: string;
    dob: string;
    gender: string;
   // suffix: string;
   // age: number;
    mrnNumber: number;
    insuranceAndDiagnosis: {
        insuredlastName: string;
        insuredfirstName: string;
        insuredmiddleName: string;
        insureddob: string;
        insuredsex: string;
        patientReltoInsured: string;
       // insuranceInuse: string;
        insuranceAddress: string;
        insuranceCity: string;
        insuranceState: string;
        insurancezipcode: string;
        ssn: string;
        modeofPayment: string;
    };
    insuranceDetails: {
        policyNumber: number;
        group: number;
        insurancePlanName: string;
        insurancePlanType: string;
        insuranceAddress: string;
        insuranceCity: string;
        insuranceState: string;
        insurancezipcode: string;
    };
}
