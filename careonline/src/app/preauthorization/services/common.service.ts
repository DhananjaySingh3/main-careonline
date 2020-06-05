import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {
  Sex, Suffix, Genders, Plans, City, State, Relation,
  Payment, RequestTypes, InsuranceTypes, RequestFor, PreAuthStatus, RejectReasons, FollowUpActDesc,
  IdentificationNoType, RequestCategory, CertificationType, ServiceType, LevelOfService, CertificationAction,
  RejectReasonsMsg, IdNoType, Prefixes, IdentificationCodeType, ProviderTypes, PerUnitTypes, CommunicationTypes
} from '../../preauthorization/models/preauth-common.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  sex: Sex[] = [
    { code: 'M', name: 'Male' },
    { code: 'F', name: 'Female' },
    { code: 'U', name: 'Unknown' }
  ];

  suffixes: Suffix[] = [
    { code: 1, name: 'Sr.' },
    { code: 2, name: 'Jr.' },
    { code: 3, name: 'II' },
    { code: 4, name: 'III' }
  ];

  prefixes: Prefixes[] = [
    { code: 1, name: 'Mr' },
    { code: 2, name: 'Mrs' },
    { code: 3, name: 'Dr' },
    { code: 4, name: 'Ms' }
  ];

  relations: Relation[] = [
    { code: '1', name: 'Spouse' },
    { code: '4', name: 'Grandfather or Grandmother' },
    { code: '5', name: 'Grandson or Granddaughter' },
    { code: '7', name: 'Nephew or Niece' },
    { code: '9', name: 'Adopted Child' },
    { code: '10', name: 'Foster Child' },
    { code: '15', name: 'Ward' },
    { code: '17', name: 'Stepson or Stepdaughter' },
    { code: '19', name: 'Child' },
    { code: '20', name: 'Employee' },
    { code: '21', name: 'Unknown' },
    { code: '22', name: 'Handicapped Dependent' },
    { code: '23', name: 'Sponsored Dependent' },
    { code: '24', name: 'Dependent of a Minor Dependent' },
    { code: '29', name: 'Significant Other' },
    { code: '32', name: 'Mother' },
    { code: '33', name: 'Father' },
    { code: '34', name: 'Other Adult' },
    { code: '36', name: 'Emancipated Minor' },
    { code: '39', name: 'Organ Donor' },
    { code: '40', name: 'Cadaver Donor' },
    { code: '41', name: 'Injured Plaintiff' },
    { code: '43', name: 'Child Where Insured Has No Financial Responsibility' },
    { code: '53', name: 'Life Partner' },
    { code: 'G8', name: 'Other Relationship' },
  ];

  states: State[] = [
    { code: 1, name: 'New York' },
    { code: 2, name: 'MO' },
    { code: 3, name: 'Minnesota' }
  ];

  cities: City[] = [
    { code: 1, name: 'New York' },
    { code: 2, name: 'KANSAS CITY' },
    { code: 3, name: 'Young America' },
    { code: 4, name: 'Amboy' }
  ];

  payments: Payment[] = [
    { code: 1, name: 'Cash' },
    { code: 2, name: 'card' },
    { code: 3, name: 'Insurance' },
    { code: 4, name: 'Others' }
  ];

  insurancePlans: Plans[] = [
    { code: 1, name: 'Primary' },
    { code: 2, name: 'Secondary' },
    { code: 3, name: 'Medicare' },
    { code: 4, name: 'Medicade' },
    { code: 5, name: 'Company Insurance' },
    { code: 6, name: 'Others' }
  ];

  genders: Genders[] = [
    { code: 'M', name: 'Male' },
    { code: 'F', name: 'Female' },
    { code: 'U', name: 'Unknown' }
  ];

  requestTypes: RequestTypes[] = [
    { code: 2, name: 'Elective' },
    { code: 3, name: 'Urgent' },
    { code: 4, name: 'Emergency' }
  ];

  requestFor: RequestFor[] = [
    { code: 1, name: 'New Admission Service' },
    { code: 2, name: 'Additional Service' },
    { code: 3, name: 'Extension Only' }
  ];

  insuranceTypes: InsuranceTypes[] = [
    // { code: 1, name: 'primaryInsuranceDetail'},
    // { code: 2, name: 'secondaryInsuranceDetail'},
    // { code: 3, name: 'tertiaryInsuranceDetail'},
    { code: 1, name: 'Primary Insurance' },
    { code: 2, name: 'Secondary Insurance' },
    { code: 3, name: 'Tertiary Insurance' },
  ];

  preAuthStatuses: PreAuthStatus[] = [
    { code: 111, name: 'Approved' },
    { code: 222, name: 'Pending' },
    { code: 333, name: 'Denied' },
    { code: 444, name: 'Rejected' },
    { code: 555, name: 'Success' },
  ];

  rejectReasons: RejectReasons[] = [
    {
      code: '04',
      name: 'Authorized Quantity Exceeded'
    },
    {
      code: '41',
      name: 'Authorization/Access Restrictions'
    },
    {
      code: '96',
      name: 'Pre-existing Condition'
    },
    {
      code: '92',
      name: 'Service Inconsistent with Diagnosis'
    },
    {
      code: '80',
      name: 'No Response received'
    },
    {
      code: 'T4',
      name: 'Payer Name or Identifier Missing'
    },
    {
      code: 'T5',
      name: 'Certification Information Missing'
    },
    {
      code: 'E8',
      name: 'Requires Medical Review'
    },
    {
      code: '56',
      name: 'Inappropriate Date'
    },
    {
      code: '42',
      name: 'Unable to Respond at Current Time'
    },
    {
      code: '97',
      name: 'Invalid or Missing Provider Address'
    },
    {
      code: '98',
      name: 'Experimental Service or Procedure'
    },
    {
      code: '15',
      name: 'Required application data missing'
    },
    {
      code: '33',
      name: 'Input Errors'
    },
    {
      code: '35',
      name: 'Out of Network'
    },
    {
      code: '36',
      name: 'Testing not Included'
    },
    {
      code: '37',
      name: 'Request Forwarded To and Decision Response Forthcoming From an External Review Organization'
    },
    {
      code: '43',
      name: 'Invalid/Missing Provider Identification'
    },
    {
      code: '44',
      name: 'Invalid/Missing Provider Name'
    },
    {
      code: '45',
      name: 'Invalid/Missing Provider Specialty'
    },
    {
      code: '46',
      name: 'Invalid/Missing Provider Phone Number'
    },
    {
      code: '47',
      name: 'Invalid/Missing Provider State'
    },
    {
      code: '49',
      name: 'Provider is Not Primary Care Physician'
    },
    {
      code: '50',
      name: 'Provider Ineligible for Inquiries 1000084 Use if the provider is not authorized for requests.'
    },
    {
      code: '51',
      name: 'Provider Not on File'
    },
    {
      code: '52',
      name: 'Service Dates Not Within Provider Plan Enrollment'
    },
    {
      code: '53',
      name: 'Inquired Benefit Inconsistent with Provider Type'
    },
    {
      code: '57',
      name: 'Invalid/Missing Date(s) of Service'
    },
    {
      code: '60',
      name: 'Date of Birth Follows Date(s) of Service'
    },
    {
      code: '61',
      name: 'Experimental Service or Procedure'
    },
    {
      code: '69',
      name: 'Inconsistent with Patient’s Age'
    },
    {
      code: '70',
      name: 'Inconsistent with Patient’s Gender'
    },
    {
      code: '79',
      name: 'Invalid Participant Identification'
    },
    {
      code: '82',
      name: 'Not Medically Necessary'
    },
    {
      code: '83',
      name: 'Level of Care Not Appropriate'
    },
    {
      code: '84',
      name: 'Certification Not Required for this Service'
    },
    {
      code: '85',
      name: 'Certification Responsibility of External Review Organization'
    },
    {
      code: '86',
      name: 'Primary Care Service'
    },
    {
      code: '87',
      name: 'Exceeds Plan Maximums'
    },
    {
      code: '88',
      name: 'Non-covered Service 1409 Use for services not covered by the patient’s plan such as Worker’s Compensation or Auto Accident.'
    },
    {
      code: '89',
      name: 'No Prior Approval'
    },
    {
      code: '90',
      name: 'Requested Information Not Received'
    },
    {
      code: '91',
      name: 'Duplicate Request'
    },
  ];

  followUpActDesc: FollowUpActDesc[] = [
    {
      code: 'N',
      name: 'Resubmission Not Allowed'
    },
    {
      code: 'Y',
      name: 'Do Not Resubmit; We Will Hold Your Request and Respond Again Shortly'
    },
    {
      code: 'P',
      name: 'Please Resubmit Original Transaction'
    },
    {
      code: 'C',
      name: 'Please Correct and Resubmit'
    },
    {
      code: 'R',
      name: 'Resubmission Allowed'
    },
  ];

  identificationNoType: IdentificationNoType[] = [
    { code: '24', name: 'Employer’s Identification Number' },
    { code: '34', name: 'Social Security Number' },
    { code: '46', name: 'Electronic Transmitter Identification Number (ETIN)' },
    { code: 'PI', name: 'Payor Identification' },
    { code: 'XV', name: 'Health Care Financing Administration National PlanID' },
    { code: 'XX', name: 'Health Care Financing Administration National Provider Identifier' },
    { code: 'MI', name: 'Member Identification Number' },
    { code: 'ZZ', name: 'Mutually Defined' },
  ];

  identificationCodeType: IdentificationCodeType[] = [
    { code: '24', name: 'Employer’s Identification Number' },
    { code: '34', name: 'Social Security Number' },
    { code: '46', name: 'Electronic Transmitter Identification Number (ETIN)' },
    { code: 'PI', name: 'Payor Identification' },
    { code: 'XV', name: 'Health Care Financing Administration National PlanID' },
    { code: 'XX', name: 'Health Care Financing Administration National Provider Identifier' },
    { code: 'MI', name: 'Member Identification Number' },
    { code: 'ZZ', name: 'Mutually Defined' },
  ];

  requestCategory: RequestCategory[] = [
    { code: 'AR', name: 'Admission Review' },
    { code: 'HS', name: 'Health Services Review' },
    { code: 'SC', name: 'Specialty Care Review' }
  ];

  certificationType: CertificationType[] = [
    { code: '1', name: 'Appeal - Immediate' },
    { code: '2', name: 'Appeal - Standard' },
    { code: '3', name: 'Cancel' },
    { code: '4', name: 'Extension' },
    { code: 'I', name: 'Initial' },
    { code: 'R', name: 'Renewal' },
    { code: 'S', name: 'Revised' },
  ];

  serviceType: ServiceType[] = [

    { code: '1', name: 'Medical Care' },
    { code: '2', name: 'Surgical' },
    { code: '3', name: 'Consultation' },
    { code: '4', name: 'Diagnostic X-Ray' },
    { code: '5', name: 'Diagnostic Lab' },
    { code: '6', name: 'Radiation Therapy' },
    { code: '7', name: 'Anesthesia' },
    { code: '8', name: 'Surgical Assistance' },
    { code: '12', name: 'Durable Medical Equipment Purchase' },
    { code: '14', name: 'Renal Supplies in the Home' },
    { code: '15', name: 'Alternate Method Dialysis' },
    { code: '16', name: 'Chronic Renal Disease (CRD) Equipment' },
    { code: '17', name: 'Pre-Admission Testing' },
    { code: '18', name: 'Durable Medical Equipment Rental' },
    { code: '20', name: 'Second Surgical Opinion' },
    { code: '21', name: 'Third Surgical Opinion' },
    { code: '23', name: 'Diagnostic Dental' },
    { code: '24', name: 'Periodontics' },
    { code: '25', name: 'Restorative' },
    { code: '26', name: 'Endodontics' },
    { code: '27', name: 'Maxillofacial Prosthetics' },
    { code: '28', name: 'Adjunctive Dental Services' },
    { code: '33', name: 'Chiropractic' },
    { code: '34', name: 'Chiropractic Office Visits' },
    { code: '35', name: 'Dental Care' },
    { code: '36', name: 'Dental Crowns' },
    { code: '37', name: 'Dental Accident' },
    { code: '38', name: 'Orthodontics' },
    { code: '39', name: 'Prosthodontics' },
    { code: '40', name: 'Oral Surgery' },
    { code: '42', name: 'Home Health Care' },
    { code: '44', name: 'Home Health Visits' },
    { code: '45', name: 'Hospice' },
    { code: '46', name: 'Respite Care' },
    { code: '48', name: 'Hospital - Inpatient' },
    { code: '50', name: 'Hospital - Outpatient' },
    { code: '51', name: 'Hospital - Emergency Accident' },
    { code: '52', name: 'Hospital - Emergency Medical' },
    { code: '53', name: 'Hospital - Ambulatory Surgical' },
    { code: '54', name: 'Long Term Care' },
    { code: '56', name: 'Medically Related Transportation' },
    { code: '57', name: 'Air Transportation' },
    { code: '58', name: 'Cabulance' },
    { code: '59', name: 'Licensed Ambulance' },
    { code: '61', name: 'In-vitro Fertilization' },
    { code: '62', name: 'MRI/CAT Scan' },
    { code: '63', name: 'Donor Procedures' },
    { code: '64', name: 'Acupuncture' },
    { code: '65', name: 'Newborn Care' },
    { code: '67', name: 'Smoking Cessation' },
    { code: '68', name: 'Well Baby Care' },
    { code: '69', name: 'Maternity' },
    { code: '70', name: 'Transplants' },
    { code: '71', name: 'Audiology Exam' },
    { code: '72', name: 'Inhalation Therapy' },
    { code: '73', name: 'Diagnostic Medical' },
    { code: '74', name: 'Private Duty Nursing' },
    { code: '75', name: 'Prosthetic Device' },
    { code: '76', name: 'Dialysis' },
    { code: '77', name: 'Otological Exam' },
    { code: '78', name: 'Chemotherapy' },
    { code: '79', name: 'Allergy Testing' },
    { code: '80', name: 'Immunizations' },
    { code: '82', name: 'Family Planning' },
    { code: '83', name: 'Infertility' },
    { code: '84', name: 'Abortion' },
    { code: '85', name: 'AIDS' },
    { code: '86', name: 'Emergency Services' },
    { code: '93', name: 'Podiatry' },
    { code: '94', name: 'Podiatry - Office Visits' },
    { code: '95', name: 'Podiatry - Nursing Home Visits' },
    { code: '98', name: 'Professional (Physician) Visit - Office' },
    { code: '99', name: 'Professional (Physician) Visit - Inpatient' },

    { code: 'A0', name: 'Professional (Physician) Visit - Outpatient' },
    { code: 'A1', name: 'Professional (Physician) Visit - Nursing Home' },
    { code: 'A2', name: 'Professional (Physician) Visit - Skilled Nursing Facility' },
    { code: 'A3', name: 'Professional (Physician) Visit - Home' },
    { code: 'A4', name: 'Psychiatric' },
    { code: 'A6', name: 'Psychotherapy' },
    { code: 'A7', name: 'Psychiatric - Inpatient' },
    { code: 'A8', name: 'Psychiatric - Outpatient' },
    { code: 'A9', name: 'Rehabilitation' },
    { code: 'AB', name: 'Rehabilitation - Inpatient' },
    { code: 'AC', name: 'Rehabilitation - Outpatient' },
    { code: 'AD', name: 'Occupational Therapy' },
    { code: 'AE', name: 'Physical Medicine' },
    { code: 'AF', name: 'Speech Therapy' },
    { code: 'AG', name: 'Skilled Nursing Care' },
    { code: 'AI', name: 'Substance Abuse' },
    { code: 'AJ', name: 'Alcoholism' },
    { code: 'AK', name: 'Drug Addiction' },
    { code: 'AL', name: 'Vision (Optometry)' },
    { code: 'AR', name: 'Experimental Drug Therapy' },
    { code: 'BB', name: 'Partial Hospitalization (Psychiatric)' },
    { code: 'BC', name: 'Day Care (Psychiatric)' },
    { code: 'BD', name: 'Cognitive Therapy' },
    { code: 'BE', name: 'Massage Therapy' },
    { code: 'BF', name: 'Pulmonary Rehabilitation' },
    { code: 'BG', name: 'Cardiac Rehabilitation' },
    { code: 'BS', name: 'Invasive Procedures' },
  ];

  levelOfService: LevelOfService[] = [
    { code: '03', name: 'Emergency' },
    { code: 'U', name: 'Urgent' },
  ];

  certificationAction: CertificationAction[] = [
    { code: 'A1', name: 'Certified in total' },
    { code: 'A3', name: 'Not Certified' },
    { code: 'A4', name: 'Pended' },
    { code: 'A6', name: 'Modified' },
    { code: 'CT', name: 'Contact Payer' },
    { code: 'NA', name: 'No Action Required' }
  ];

  rejectReasonsMsg: RejectReasonsMsg[] = [
    {
      code: 'Bx27808041',
      name: 'CMWC/DME Therapist\'s First Name is missing or invalid.'
    },
    {
      code: 'Bx27808043',
      name: 'CMWC/DME Therapist\'s Last Name is missing or invalid.'
    },
    {
      code: 'Bx27808045',
      name: 'CMWC/DME Therapist\'s License Type is missing or invalid.'
    },
    {
      code: 'Bx27808047',
      name: 'CMWC/DME Therapist\'s License No. is missing or invalid.'
    },
    {
      code: 'Bx27808049',
      name: 'CMWC/DME Therapist\'s License State is missing or invalid.'
    },
    {
      code: 'Bx27808051',
      name: 'CMWC/DME Therapist\'s Phone No. is missing or invalid.'
    },
    {
      code: 'Bx27808053',
      name: 'CMWC/DME Therapist’s FAX No. is missing or invalid.'
    },
    {
      code: 'Bx27808063',
      name: 'CMWC/DME Referring Physician Last Name is missing or invalid.'
    },
    {
      code: 'Bx27808065',
      name: 'CMWC/DME Referring Physician License State is missing or invalid.'
    },
    {
      code: 'Bx27808067',
      name: 'CMWC/DME Referring Physician Military Spec Code or Referring Physician License Number is missing or invalid.'
    },
    {
      code: 'Bx27808071',
      name: 'CMWC/DME Out of State Referring Physician\'s First Name is missing or invalid.'
    },
    {
      code: 'Bx27808073',
      name: 'CMWC/DME Out of State Referring Physician’s Street Address is missing or invalid.'
    },
    {
      code: 'Bx27808075',
      name: 'CMWC/DME Out of State Referring Physician\'s City is missing or invalid.'
    },
    {
      code: 'Bx27808077',
      name: 'CMWC/DME Out of State Referring Physician\'s State is missing or invalid.'
    },
    {
      code: 'Bx27808079',
      name: 'CMWC/DME Out of State Referring Physician\'s Zip Code is missing or invalid.'
    },
    {
      code: 'Bx27808081',
      name: 'CMWC/DME Out of State Referring Physician\'s Phone Number is missing or invalid.'
    },
    {
      code: 'Bx27808099',
      name: 'A previously approved Assessment has been identified for the same Vendor No., Individual and Date.'
    },
    {
      code: 'Bx27808016',
      name: 'Missing or Invalid form name in 2000E.MSG01. Expected value is H1700 or SKISP or NFSS in (2nd to 6th Positions).'
    },
    {
      code: 'Bx27808134',
      name: 'NF Contract No. is not valid for the Date of Assessment.'
    },
    {
      code: 'Bx27808135',
      name: 'An X12 278 request must have all LAR fields populated if any one field is sent in LAR information.'
    },
    {
      code: 'Bx27808136',
      name: 'Referring Physician\'s Signature Date is a required field if Authorization Type is not Assessment Only.'
    },
    {
      code: 'Bx27808138',
      name: 'Referring Physician\'s Signature Date cannot be more than 29 calendar days prior to the current date.'
    },
    {
      code: 'Bx27808140',
      name: 'Referring Physician\'s Signature Date cannot be greater than the current date.'
    },
    {
      code: 'Bx27808142',
      name: 'Resident\'s LAR First Name must be up to 12 alphanumeric characters.'
    },
    {
      code: 'Bx27808143',
      name: 'Resident\'s LAR Last Name must be up to 18 alphanumeric characters.'
    },
    {
      code: 'Bx27808144',
      name: 'Resident\'s LAR Street Address must be up to 30 alphanumeric characters.'
    },
    {
      code: 'Bx27808145',
      name: 'Resident\'s LAR City must be up to 30 alphanumeric characters.'
    },
    {
      code: 'Bx27808146',
      name: 'Resident\'s LAR State must be present and valid.'
    },
    {
      code: 'Bx27808147',
      name: 'Resident\'s LAR Zip Code must be 5 or 9 numeric characters.'
    },
    {
      code: 'Bx27808148',
      name: 'Resident\'s LAR Phone Number must be exactly 10 numeric characters.'
    },
    {
      code: 'Bx27809103',
      name: 'Segment PWK (Additional Patient Information) must exist only once at Loop 2000E.'
    },
    {
      code: 'Bx27809104',
      name: 'Request Type (Loop 2000E.UM03) does not have one of these valid values- "A9" (Therapy), “56” (CMWC), “12” (DME).'
    },
    {
      code: 'Bx27809105',
      name: 'Type of Service Requested (Loop 2000F) is missing for a Therapy Request Type.'
    },
    {
      code: 'Bx27809110',
      name: `Only one occurrence of TRN is allowed
       at Loop 2000E AND Submitter Control Number in Loop 2000E TRN segment is a required field.`
    },
    {
      code: 'Bx27809111',
      name: `Duplicate combination of Submitter ID,
      Submitter Control Number and Attachment Control Number(s) submitted in the 278 X12 authorization request or exists in EDI.`
    },
    {
      code: 'Bx27809112',
      name: 'An X12 278 request must have a value of "AR" (Admission Review) in Loop 2000E.UM01 for CMWC and DME.'
    },
    {
      code: 'Bx27809113',
      name: 'An X12 278 request must have a value of “HS" (Health Services Review) in Loop 2000E.UM01 for Therapy.'
    },
    {
      code: 'Bx27809115',
      name: 'An X12 278 request must have the value "I" in Loop 2000E.UM02 (Certification Type Code).'
    },
    {
      code: 'Bx27809117',
      name: 'An X12 278 request must have the below values in Loop 2000E PWK segment:PWK01=M1, PWK02=EL, PWK05=AC'
    },
    {
      code: 'Bx27809119',
      name: 'EDI must reject (R) a 5010 X12 278 transaction when an invalid edit code is received from Careforms service.'
    },
    {
      code: 'Bx27809120',
      name: `EDI must reject (R) a 5010 X12 278 transaction when an edit is received without
       a service line reference from Careforms service.`
    },
    {
      code: 'Bx27809121',
      name: `This CMWC/DME request cannot be processed because the person does not have a Daily Care Service Authorization for
       the submitted Provider No. as of the Date of Assessment. Correct the CMWC/DME Date of Assessment or
       submit the necessary paperwork to establish the Daily Care Service Authorization before resubmitting the NFSS form.`
    },
    {
      code: 'Bx27809122',
      name: `The CMWC/DME request cannot be processed because the person does not have a Daily Care Service Authorization for
       the submitted Provider No. as of the date that submission of the NFSS form was attempted. 
       Submit the necessary paperwork to establish the Daily Care Service Authorization before resubmitting the NFSS form.`
    },
    {
      code: 'Bx27808042',
      name: 'Therapist\'s First Name is missing or invalid on a Therapy request type.'
    },
    {
      code: 'Bx27808044',
      name: 'Therapist\'s Last Name is missing or invalid on a Therapy request type.'
    },
    {
      code: 'Bx27808046',
      name: 'Therapist\'s License Type is missing or invalid on a Therapy request type.'
    },
    {
      code: 'Bx27808048',
      name: 'Therapist\'s License No. is missing or invalid on a Therapy request type.'
    },
    {
      code: 'Bx27808050',
      name: 'Therapist\'s License State is missing or invalid on a Therapy request type.'
    },
    {
      code: 'Bx27808052',
      name: 'Therapist\'s Phone No. is missing or invalid on a Therapy request type.'
    },
    {
      code: 'Bx27808054',
      name: 'Therapist’s FAX No. is missing or invalid on a Therapy request type.'
    },
    {
      code: 'Bx27808064',
      name: 'Referring Physician Last Name is missing or invalid on a Therapy request type.'
    },
    {
      code: 'Bx27808066',
      name: 'Referring Physician License State is missing or invalid on a Therapy request type.'
    },
    {
      code: 'Bx27808068',
      name: 'Referring Physician Military Spec Code or Referring Physician License Number is missing or invalid on a Therapy request type.'
    },
    {
      code: 'Bx27808072',
      name: 'Out of State Referring Physician\'s First Name is missing or invalid on a Therapy request.'
    },
    {
      code: 'Bx27808074',
      name: 'Out of State Referring Physician\'s Street Address is missing or invalid on a Therapy request.'
    },
    {
      code: 'Bx27808076',
      name: 'Out of State Referring Physician\'s City is missing or invalid on a Therapy request.'
    },
    {
      code: 'Bx27808078',
      name: 'Out of State Referring Physician\'s State is missing or invalid on a Therapy request.'
    },
    {
      code: 'Bx27808080',
      name: 'Out of State Referring Physician\'s Zip Code is missing or invalid on a Therapy request.'
    },
    {
      code: 'Bx27808082',
      name: 'Out of State Referring Physician\'s Phone Number is missing or invalid on a Therapy request.'
    },
    {
      code: 'Bx27808083',
      name: 'Supplier\'s Business Name is missing or invalid.'
    },
    {
      code: 'Bx27808084',
      name: 'Supplier\'s Representative First Name is missing or invalid.'
    },
    {
      code: 'Bx27808085',
      name: 'Supplier\'s Representative Last Name is missing or invalid.'
    },
    {
      code: 'Bx27808086',
      name: 'Supplier\'s Street Address is missing or invalid.'
    },
    {
      code: 'Bx27808087',
      name: 'Supplier\'s City is missing or invalid.'
    },
    {
      code: 'Bx27808088',
      name: 'Supplier\'s State is missing or invalid.'
    },
    {
      code: 'Bx27808089',
      name: 'Supplier\'s Zip Code is missing or invalid.'
    },
    {
      code: 'Bx27808090',
      name: 'Supplier\'s Phone No. is missing or invalid.'
    },
    {
      code: 'Bx27808091',
      name: 'Supplier\'s Fax No. is missing or invalid.'
    },
    {
      code: 'Bx27808092',
      name: 'Therapy Frequency: No. of times per week is missing or invalid.'
    },
    {
      code: 'Bx27808093',
      name: 'Therapy Length of Treatment is missing or invalid.'
    },
    {
      code: 'Bx27808094',
      name: 'No. of times per day the therapist provides treatment is missing or invalid on a Therapy request.'
    },
    {
      code: 'Bx27808137',
      name: 'Referring Physician\'s Signature Date is a required field if Authorization Type is New or Restart.'
    },
    {
      code: 'Bx27808139',
      name: 'Referring Physician\'s Signature Date cannot be more than 29 calendar days prior to the current date.'
    },
    {
      code: 'Bx27808141',
      name: 'Referring Physician\'s Signature Date cannot be greater than the current date.'
    },

  ];

  idNoType: IdNoType[] = [
    { code: '24', name: 'Employer’s Identification Number' },
    { code: '34', name: 'Social Security Number' },
    { code: '46', name: 'Electronic Transmitter Identification Number (ETIN)' },
    { code: 'PI', name: 'Payor Identification' },
    { code: 'XV', name: 'Health Care Financing Administration National PlanID' },
    { code: 'XX', name: 'Health Care Financing Administration National Provider Identifier' },
    { code: 'MI', name: 'Member Identification Number' },
    { code: 'ZZ', name: 'Mutually Defined' },
  ];

  providerTypes: ProviderTypes[] = [
    { code: 'AD', name: 'Admitting' },
    { code: 'AS', name: 'Assistant Surgeon' },
    { code: 'AT', name: 'Attending' },
    { code: 'CO', name: 'Consulting' },
    { code: 'CV', name: 'Covering' },
    { code: 'OP', name: 'Operating' },
    { code: 'OR', name: 'Ordering' },
    { code: 'OT', name: 'Other Physician' },
    { code: 'PC', name: 'Primary Care Physician' },
    { code: 'PE', name: 'Performing' },
    { code: 'RF', name: 'Referring' },
  ];

  perUnitTypes: PerUnitTypes[] = [
    { code: 'd', name: 'day' },
    { code: 'm', name: 'month' },
    { code: 'w', name: 'week' },
  ];

  communicationTypes: CommunicationTypes[] = [
    { code: '1', name: 'email' },
    { code: '2', name: 'telephone' },
    { code: '3', name: 'fax' },
  ];

  constructor(
    public httpClient: HttpClient,
    public datePipe: DatePipe
  ) { }


  /* CommunicationTypes Details*/
  getCommunicationTypes() {
    return this.communicationTypes;
  }

  /* Gender Details*/
  getGenders() {
    // getGenders(): Observable<Genders[]> {
    // return this.httpClient.get<Genders[]>(this.apiUrl + '/eligibilityDetailHistory');
    return this.genders;
  }

  /* Suffix Details*/
  getSuffixes() {
    return this.suffixes;
  }

  /* Suffix Details*/
  getPrefixes() {
    return this.prefixes;
  }

  /* Insurance Plan Details*/
  getPlans() {
    return this.insurancePlans;
  }

  /* City Details*/
  getPayments() {
    return this.payments;
  }

  /* Relations Details*/
  getRelations() {
    return this.relations;
  }

  /* City Details*/
  getCities() {
    return this.cities;
  }

  /* State Details*/
  getStates() {
    return this.states;
  }

  /* RequestType Details*/
  getRequestTypes() {
    return this.requestTypes;
  }

  /* RequestFor Details*/
  getRequestFor() {
    return this.requestFor;
  }

  /* InsuranceTypes Details*/
  getInsuranceTypes() {
    return this.insuranceTypes;
  }

  /* PreAuthStatus Details*/
  getPreAuthStatus() {
    return this.preAuthStatuses;
  }

  /* RejectReasons Details*/
  getRejectReasons() {
    return this.rejectReasons;
  }

  /* FollowUpActDesc Details*/
  getFollowUpActDesc() {
    return this.followUpActDesc;
  }

  /* IdentificationNoType Details*/
  getIdentificationNoType() {
    return this.identificationNoType;
  }

  /* RequestCategory Details*/
  getRequestCategory() {
    return this.requestCategory;
  }

  /* CertificationType Details*/
  getCertificationType() {
    return this.certificationType;
  }

  /* ServiceType Details*/
  getServiceType() {
    return this.serviceType;
  }

  /* LevelOfService Details*/
  getLevelOfService() {
    return this.levelOfService;
  }

  /* CertificationAction Details*/
  getCertificationAction() {
    return this.certificationAction;
  }

  /* RejectReasonsMsg Details*/
  getRejectReasonsMsg() {
    return this.rejectReasonsMsg;
  }

  /* IdNoType Details*/
  getIdNoType() {
    return this.idNoType;
  }

  /* requestingProviderTypes Details*/
  getProviderTypes() {
    return this.providerTypes;
  }

  /* PerUnitTypes Details*/
  getPerUnitTypes() {
    return this.perUnitTypes;
  }

}
