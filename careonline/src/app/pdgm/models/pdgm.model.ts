export class PatientFormDataRequest {
    mrnNumber: string;
    lastName: string;
    firstName: string;
    middleName: string;
    dob: any;
    gender: string;
    suffix: string;
}


export class PdgmToolEpisodeDetailsModel {
    mrnNumber: string;
    firstName: string;
    lastName: string;
    middleName: string;
    suffix: string;
    gender: string;
    dob: string;
    episodeId: string;
    episodeType: string;
    episodeStartDate: string;
    episodeEndDate: string;
    numberOrVisits: string;

}

export class CaseMixHippsCodeModel {
    position1: number;
    position2: number;
    position3: number;
    position4: number;
    position5: number;
    hippscode: number;
    mrnNumber: string;
    weight: number;
}

export class PdgmAdmissionSourceModel {
    earlyVisits: boolean;
    lateVisits: boolean;
    position1Code: string;
    community: string;
}

export class ComorbidityModel {
    secondDiagnosisCodeList: [];
    comorbidityTypeAndHippsCode: {
        comorbidityType: string;
        hippsCode: string;
        mrnNumber: string;
    };
}

export class OasisDetailsPdgmModel {
    mrnNumber: string;
    m1800: {};
    m1810: {};
    m1820: {};
    m1830: {};
    m1840: {};
    m1850: {};
    m1860: {};
}

export class ClinicalGroupingModel {
    primaryDiagnosisCode: string;
    discription: string;
    clinicalGroup: string;
    comorbiditySubGroup: string;
    secondPositionHIPPSCode: string;
}