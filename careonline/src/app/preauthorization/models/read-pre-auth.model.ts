export class PreAuthReadResponse {
    mrnNumber: string;
    preAuthId: number;
    episode: Episode;
    preAuthDemographics: PreAuthDemographics;
}

export class Episode {
    id: number;
    mrnNumber: string;
    episodeType: string;
    payorType: string;
    preauthFormStatus: string;
    formSentDate: any;
    preAuthorisationStatus: string; // added after the mail next day and it was not informed to me
    admissionStatus: string;
    admissionDate: any;
   // formStatus: string;
    formReceivedDate: string;
}

export class PreAuthDemographics {
    id: number;
    mrnNumber: string;
    firstName: string;
    lastName: string;
    middleName: string;
    suffix: string;
    gender: string;
    dob: any;
    ssn: string;
}
