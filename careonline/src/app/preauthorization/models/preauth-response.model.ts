export class PreAuthResponse {
    id?: number;

    /*Enquiry Details*/
    enquiryId?: string;
    processDateAndTime?: any;
    serviceDateFrom?: any;
    serviceDateTo?: any;
    effectiveDateTo?: any;
    effectiveDateFrom?: any;
    expirationeDateTo?: any;
    admitDate?: any;
    dischargeDate?: any;
    certificationIdentificationNumber?: string;
    preAuthorizationStatus?: string;
    enquiryDetailStatus?: string;

    /*Member Details*/
    mrnNumber?: string;
    memberfirstName?: string;
    memberlastName?: string;
    membermiddleName?: string;
    membersuffix?: string;
    membergender?: string;
    memberdob?: any;
    memberPrefix?: string;
    memberRelationshipToSubscriber?: string;
    memberDetailStatus?: string;

    /*Organization Details*/
    organizationName?: string;
    orgIdentificationCode?: string;
    orgIdentificationCodeType?: string;
    orgRejectionReason?: string;
    orgFollowUpActionDescription?: string;
    orgDetailStatus?: string;

    /*Requester Provider Details*/
    reqProviderFullName?: string;
    reqProviderFirstName?: string;
    reqProviderLastName?: string;
    reqProviderType?: string;
    reqProviderIdentificationNumber?: string;
    reqProviderIdentificationNumberType?: string;
    reqProviderSupplimentalId?: string;
    reqProviderIdNumberType?: string;
    reqProviderRejectionReason?: string;
    reqProviderFollowUpActionDescription?: string;
    reqProviderDetailStatus?: string;

    /*Subscriber Details*/
    subscriberFirstName?: string;
    subscriberLastName?: string;
    subscriberMiddleName?: string;
    subscriberSuffix?: string;
    subscriberGender?: string;
    subscriberDob?: any;
    subscriberPrefix?: string;
    subscriberSupplementalId?: string;
    subscriberIdentificationNumberType?: string;
    subscriberRejectionReason?: string;
    subscriberFollowUpActionDescription?: string;
    subscriberDetailStatus?: string;

    /*Dependent Details*/
    dependentFirstName?: string;
    dependentLastName?: string;
    dependentMiddleName?: string;
    dependentSuffix?: string;
    dependentGender?: string;
    dependentDob?: any;
    // dependentPrefix?: string;
    dependentReletionship?: string;

    /*Servicing Provider Details*/
    servicingProviderFullName?: string;
    servicingProviderFirstName?: string;
    servicingProviderLastName?: string;
    servicingProviderType?: string;
    servicingProviderAddress?: string;
    servicingProviderCity?: string;
    servicingProviderState?: string;
    servicingProviderPostalCode?: string;
    servicingProviderCountryCode?: string;
    servicingProviderIdentificationNumber?: string;
    servicingProviderIdentificationNumberType?: string;
    servicingProviderSupplimentId?: string;
    servicingProviderIdNumberType?: string;
    servicingProviderRejectionReason?: string;
    servicingProviderFollowUpActionDescription?: string;
    servicingProviderDetailStatus?: string;
    homeHealthAideResponse?: HomeHealthAideResponse;
    occupationalTherapyResponse?: OccupationalTherapyResponse;
    medicalSocialWorkResponse?: MedicalSocialWorkResponse;
    physicalTherapyResponse?: PhysicalTherapyResponse;
    skilledNursingResponse?: SkilledNursingResponse;
    speechPathologyResponse?: SpeechPathologyResponse;
    authorizationDetail?: AuthorizationDetail;
}

export class HomeHealthAideResponse {
    id?: number;
    homeHealthAideProviderIdentificationNumberType?: string;
    homeHealthAideProviderFollowUpActionDescription?: string;
    homeHealthAideRejectionReasonMSG?: string;
    homeHealthAideProviderCountryCode?: string;
    homeHealthAideProviderPostalCode?: string;
    homeHealthAideProviderIdentificationNumber?: string;
    homeHealthAideProviderSupplimentalId?: string;
    homeHealthAideProviderFirstName?: string;
    homeHealthAideProviderFullName?: string;
    homeHealthAideCertificationAction?: string;
    homeHealthAideProviderMiddleName?: string;
    homeHealthAideCertificationType?: string;
    homeHealthAideProviderIdNumberType?: string;
    homeHealthAideProviderRejectionReason?: string;
    homeHealthAideProviderType?: string;
    homeHealthAideDetailStatus?: string;
    homeHealthAideVisit?: string;
    homeHealthAideRejectionReason?: string;
    homeHealthAideServiceType?: string;
    homeHealthAidePoviderLastName?: string;
    homeHealthAideUnit?: string;
    homeHealthAideLevelOfService?: string;
    homeHealthAideProviderCity?: string;
    homeHealthAideProviderState?: string;
    homeHealthAideProviderAddress?: string;
    homeHealthAideRequestCategory?: string;
}

export class OccupationalTherapyResponse {
    id?: number;
    occupationalTherapyProviderIdentificationNumber?: string;
    occupationalTherapyProviderFollowUpActionDescription?: string;
    occupationalTherapyRequestCategory?: string;
    occupationalTherapyProviderRejectionReason?: string;
    occupationalTherapyProviderLastName?: string;
    occupationalTherapyServiceType?: string;
    occupationalTherapyProviderFullName?: string;
    occupationalTherapyProviderType?: string;
    occupationalTherapyProviderSupplimentalId?: string;
    occupationalTherapyCountryCode?: string;
    occupationalTherapyRejectionReason?: string;
    occupationalProviderIdentificationNumberType?: string;
    occupationalTherapyProviderMiddleName?: string;
    occupationalTherapyCertificationType?: string;
    occupationalTherapyCertificationAction?: string;
    occupationalTherapyLevelOfService?: string;
    occupationalTherapyRejectionReasonMSG?: string;
    occupationalTherapyProviderIdNumberType?: string;
    occupationalTherapyProviderFirstName?: string;
    occupationalTherapyDetailStatus?: string;
    occupationalTherapyVisit?: string;
    occupationalTherapyCity?: string;
    occupationalTherapyState?: string;
    occupationalTherapyAddress?: string;
    occupationalTherapyPostalCode?: string;
    occupationalTherapyUnit?: string;
}

export class MedicalSocialWorkResponse {
    id?: number;
    medicalSocialWorkProviderFollowUpActionDescription?: string;
    medicalSocialWorkProviderIdentificationNumberType?: string;
    medicalSocialWorkProviderState?: string;
    medicalSocialWorkCertificationAction?: string;
    medicalSocialWorkProviderPostalCode?: string;
    medicalSocialWorkProviderSupplimentalId?: string;
    medicalSocialWorkProviderCountryCode?: string;
    medicalSocialWorkProviderRejectionReason?: string;
    medicalSocialWorkProviderFullName?: string;
    medicalSocialWorkRejectionReason?: string;
    medicalSocialWorkRejectionReasonMSG?: string;
    medicalSocialWorkProviderIdentificationNumber?: string;
    medicalSocialWorkCertificationType?: string;
    medicalSocialWorkProviderMiddleName?: string;
    medicalSocialWorkProviderIdNumberType?: string;
    medicalSocialWorkProviderFirstName?: string;
    medicalSocialWorkPoviderLastName?: string;
    medicalSocialWorkRequestCategory?: string;
    medicalSocialWorkProviderAddress?: string;
    medicalSocialWorkLevelOfService?: string;
    medicalSocialWorkVisit?: string;
    medicalSocialWorkUnit?: string;
    medicalSocialWorkServiceType?: string;
    medicalSocialWorkDetailStatus?: string;
    medicalSocialWorkProviderType?: string;
    medicalSocialWorkProviderCity?: string;
}

export class PhysicalTherapyResponse {
    id?: number;
    physicalTherapyRequestCategory?: string;
    physicalTherapyCertificationType?: string;
    physicalTherapyServiceType?: string;
    physicalTherapyLevelOfService?: string;
    physicalTherapyVisit?: string;
    physicalTherapyUnit?: string;
    physicalTherapyCertificationAction?: string;
    physicalTherapyRejectionReason?: string;
    physicalTherapyRejectionReasonMSG?: string;
    physicalTherapyProviderFirstName?: string;
    physicalTherapyPoviderLastName?: string;
    physicalTherapyProviderMiddleName?: string;
    physicalTherapyProviderType?: string;
    physicalTherapyProviderIdentificationNumber?: string;
    physicalTherapyProviderIdentificationNumberType?: string;
    physicalTherapyProviderSupplimentalId?: string;
    physicalTherapyProviderIdNumberType?: string;
    physicalTherapyProviderRejectionReason?: string;
    physicalTherapyProviderFollowUpActionDescription?: string;
    physicalTherapyProviderAddress?: string;
    physicalTherapyProviderCity?: string;
    physicalTherapyProviderState?: string;
    physicalTherapyProviderPostalCode?: string;
    physicalTherapyProviderCountryCode?: string;
    physicalTherapyProviderFullName?: string;
    physicalTherapyDetailStatus?: string;
}

export class SkilledNursingResponse {
    id?: number;
    skilledNursingProviderIdentificationNumberType?: string;
    skilledNursingProviderFollowUpActionDescription?: string;
    skilledNursingProviderIdNumberType?: string;
    skilledNursingProviderRejectionReason?: string;
    skilledNursingProviderPostalCode?: string;
    skilledNursingProviderSupplimentalId?: string;
    skilledNursingCertificationType?: string;
    skilledNursingProviderMiddleName?: string;
    skilledNursingCertificationAction?: string;
    skilledNursingProviderIdentificationNumber?: string;
    skilledNursingProviderFirstName?: string;
    skilledNursingProviderFullName?: string;
    skilledNursingRejectionReasonMSG?: string;
    skilledNursingProviderCountryCode?: string;
    skilledNursingPoviderLastName?: string;
    skilledNursingUnit?: string;
    skilledNursingServiceType?: string;
    skilledNursingRequestCategory?: string;
    skilledNursingLevelOfService?: string;
    skilledNursingProviderType?: string;
    skilledNursingProviderState?: string;
    skilledNursingRejectionReason?: string;
    skilledNursingVisit?: string;
    skilledNursingProviderAddress?: string;
    skilledNursingDetailStatus?: string;
    skilledNursingProviderCity?: string;
}

export class SpeechPathologyResponse {
    id?: number;
    speechPathologyProviderIdentificationNumberType?: string;
    speechPathologyProviderFollowUpActionDescription?: string;
    speechPathologyProviderRejectionReason?: string;
    speechPathologyProviderIdNumberType?: string;
    speechPathologyRequestCategory?: string;
    speechPathologyProviderAddress?: string;
    speechPathologyProviderFullName?: string;
    speechPathologyProviderSupplimentalId?: string;
    speechPathologyRejectionReason?: string;
    speechPathologyCertificationAction?: string;
    speechPathologyProviderPostalCode?: string;
    speechPathologyRejectionReasonMSG?: string;
    speechPathologyProviderCountryCode?: string;
    speechPathologyPoviderLastName?: string;
    speechPathologyProviderFirstName?: string;
    speechPathologyCertificationType?: string;
    speechPathologyProviderMiddleName?: string;
    speechPathologyProviderIdentificationNumber?: string;
    speechPathologyVisit?: string;
    speechPathologyDetailStatus?: string;
    speechPathologyUnit?: string;
    speechPathologyServiceType?: string;
    speechPathologyProviderState?: string;
    speechPathologyProviderCity?: string;
    speechPathologyProviderType?: string;
    speechPathologyLevelOfService?: string;
}

export class AuthorizationDetail {
    /*Preauthorization Details*/
    id?: number;
    authorizationNo?: number;
    authStartDate?: any;
    authEndDate?: any;
    totalUnitsApproved?: number;
    totalUnitsConsumed?: number;
    remainingUnits?: number;
    noOfUnitsTobeUsed?: number;
    unitsForNoOfUnitsTobeUsed?: string;
    /*Preauthorization Details*/
}

