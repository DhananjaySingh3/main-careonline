export class PatientFormDataRequest {
    mrnNumber?: string;
    lastName?: string;
    firstName?: string;
    middleName?: string;
    dob?: any;
    gender?: string;
    suffix?: string;
}

export class PdgmToolEpisodeDetailsModel {   
    mrnNumber: "";
    firstName: "";
    lastName: "";
    middleName: "";
    suffix: "";
    gender: "";
    dob: "";
    episodeId: "";
    episodeType: "";
    episodeStartDate: "";
    episodeEndDate: "";
    numberOrVisits: "";
   
}

export class PdgmAdmissionSourceModel{
    earlyVisits: false;
    lateVisits: false;
    position1Code: ""
    community: ""
}