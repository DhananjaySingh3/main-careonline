import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PreAuthFormModelResponse, PreAuthFormModelRequest } from '../../preauthorization/models/pre-auth-form.model';


@Injectable({
  providedIn: 'root'
})
export class PreAuthFormService {
  formData: PreAuthFormModelResponse;


  constructor(
    public httpClient: HttpClient,
    public datePipe: DatePipe,
  ) { }

  /*On Edit Patient receiving selected patient data so that it can be used*/
  getSelecPatData(form: PreAuthFormModelResponse) {
    this.formData = form;
    this.formData = { ...form };
  }

  /*Populate Pre Authorization Data*/
/*
  populatePreAuthFormData(patient: PreAuthFormModelResponse) {
    const selectedPatData: PreAuthFormModelResponse = {
      id: patient.id,
      mrnNumber: patient.mrnNumber,
      currenttimdate: patient.currenttimdate === '' ? '' : this.datePipe.transform(patient.currenttimdate, 'M/d/yyyy'),

      preAuthDemographics: {
        mrnNumber: patient.preAuthDemographics.mrnNumber ? (patient.preAuthDemographics.mrnNumber) : null,
        firstName: patient.preAuthDemographics.firstName ? (patient.preAuthDemographics.firstName) : null,
        lastName: patient.preAuthDemographics.lastName ? (patient.preAuthDemographics.lastName) : null,
        middleName: patient.preAuthDemographics.middleName ? (patient.preAuthDemographics.middleName) : null,
        suffix: patient.preAuthDemographics.suffix ? (patient.preAuthDemographics.suffix) : null,
        gender: patient.preAuthDemographics.gender ? (patient.preAuthDemographics.gender) : null,
        dob: patient.preAuthDemographics.dob ? (patient.preAuthDemographics.dob === '' ? '' :
          this.datePipe.transform(patient.preAuthDemographics.dob, 'M/d/yyyy')) : null,
        ssn: patient.preAuthDemographics.ssn ? (patient.preAuthDemographics.ssn) : null,
      },

      insuranceDetailPreAuth: {
        mrnNumber: patient.insuranceDetailPreAuth.mrnNumber ?
          (patient.insuranceDetailPreAuth.mrnNumber) : null,
        insuranceTypeSelcted: patient.insuranceDetailPreAuth.insuranceTypeSelcted ?
          (patient.insuranceDetailPreAuth.insuranceTypeSelcted) : null,
        primaryInsuranceDetail: {
          ssn: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.ssn)
            : null,
          mop: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.mop)
            : null,
          patientRelationInsured: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.patientRelationInsured)
            : null,
          id: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.id)
            : null,
          insuredlastName: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insuredlastName)
            : null,
          insuredfirstName: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insuredfirstName)
            : null,
          insuredmiddleName: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insuredmiddleName)
            : null,
          insureddob: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insureddob === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.primaryInsuranceDetail.insureddob, 'M/d/yyyy'))
            : null,
          insuredsex: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insuredsex)
            : null,
          eligibility: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.eligibility)
            : null,
          eligibilityCheckSelected: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.eligibilityCheckSelected)
            : null,
          policyNumber: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.policyNumber)
            : null,
          statusVerifiedDate: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.statusVerifiedDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.primaryInsuranceDetail.statusVerifiedDate, 'M/d/yyyy'))
            : null,
          group_name: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.group_name)
            : null,
          insurancePlanName: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insurancePlanName)
            : null,
          insurancePlanType: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insurancePlanType)
            : null,
          insuranceAddress: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.insuranceAddress)
            : null,
          city: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.city)
            : null,
          state: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.state)
            : null,
          zipcode: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.zipcode)
            : null,
          endDate: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.endDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.primaryInsuranceDetail.endDate, 'M/d/yyyy'))
            : null,
          startDate: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.startDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.primaryInsuranceDetail.startDate, 'M/d/yyyy'))
            : null,
          mrnNumber: patient.insuranceDetailPreAuth.primaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.primaryInsuranceDetail.mrnNumber)
            : null,
        },
        secondaryInsuranceDetail: {
          ssn: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.ssn)
            : null,
          mop: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.mop)
            : null,
          patientRelationInsured: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.patientRelationInsured)
            : null,
          id: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.id)
            : null,
          insuredlastName: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insuredlastName)
            : null,
          insuredfirstName: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insuredfirstName)
            : null,
          insuredmiddleName: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insuredmiddleName)
            : null,
          insureddob: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insureddob === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insureddob, 'M/d/yyyy'))
            : null,
          insuredsex: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insuredsex)
            : null,
          eligibility: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.eligibility)
            : null,
          eligibilityCheckSelected: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.eligibilityCheckSelected)
            : null,
          policyNumber: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.policyNumber)
            : null,
          statusVerifiedDate: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.statusVerifiedDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.secondaryInsuranceDetail.statusVerifiedDate, 'M/d/yyyy'))
            : null,
          group_name: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.group_name)
            : null,
          insurancePlanName: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insurancePlanName)
            : null,
          insurancePlanType: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insurancePlanType)
            : null,
          insuranceAddress: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.insuranceAddress)
            : null,
          city: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.city)
            : null,
          state: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.state)
            : null,
          zipcode: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.zipcode)
            : null,
          endDate: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.endDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.secondaryInsuranceDetail.endDate, 'M/d/yyyy'))
            : null,
          startDate: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.startDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.secondaryInsuranceDetail.startDate, 'M/d/yyyy'))
            : null,
          mrnNumber: patient.insuranceDetailPreAuth.secondaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.secondaryInsuranceDetail.mrnNumber)
            : null,
        },
        tertiaryInsuranceDetail: {
          ssn: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.ssn)
            : null,
          mop: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.mop)
            : null,
          patientRelationInsured: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.patientRelationInsured)
            : null,
          id: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.id)
            : null,
          insuredlastName: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insuredlastName)
            : null,
          insuredfirstName: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insuredfirstName)
            : null,
          insuredmiddleName: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insuredmiddleName)
            : null,
          insureddob: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insureddob === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insureddob, 'M/d/yyyy'))
            : null,
          insuredsex: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insuredsex)
            : null,
          eligibility: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.eligibility)
            : null,
          eligibilityCheckSelected: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.eligibilityCheckSelected)
            : null,
          policyNumber: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.policyNumber)
            : null,
          statusVerifiedDate: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.statusVerifiedDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.statusVerifiedDate, 'M/d/yyyy'))
            : null,
          group_name: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.group_name)
            : null,
          insurancePlanName: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insurancePlanName)
            : null,
          insurancePlanType: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insurancePlanType)
            : null,
          insuranceAddress: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.insuranceAddress)
            : null,
          city: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.city)
            : null,
          state: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.state)
            : null,
          zipcode: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.zipcode)
            : null,
          endDate: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.endDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.endDate, 'M/d/yyyy'))
            : null,
          startDate: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.startDate === '' ? '' :
              this.datePipe.transform(patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.startDate, 'M/d/yyyy'))
            : null,
          mrnNumber: patient.insuranceDetailPreAuth.tertiaryInsuranceDetail ?
            (patient.insuranceDetailPreAuth.tertiaryInsuranceDetail.mrnNumber)
            : null,
        },
      },

      providerDetail: {
        id: patient.providerDetail.id ? (patient.providerDetail.id) : null,
        requestingProviderIDNumber: patient.providerDetail.requestingProviderIDNumber ?
          (patient.providerDetail.requestingProviderIDNumber) : null,
        requestingAgency: patient.providerDetail.requestingAgency ? (patient.providerDetail.requestingAgency) : null,
        providerName: patient.providerDetail.providerName ? (patient.providerDetail.providerName) : null,
        providerTaxIDNumber: patient.providerDetail.providerTaxIDNumber ?
          (patient.providerDetail.providerTaxIDNumber) : null,
        phoneNumber: patient.providerDetail.phoneNumber ? (patient.providerDetail.phoneNumber) : null,
        extension: patient.providerDetail.extension ? (patient.providerDetail.extension) : null,
        faxNumber: patient.providerDetail.faxNumber ? (patient.providerDetail.faxNumber) : null,
      },

      admissionDetail: {
        id: patient.admissionDetail.id ? (patient.admissionDetail.id) : null,
        mrnNumber: patient.admissionDetail.mrnNumber ? (patient.admissionDetail.mrnNumber) : null,
        requestType: patient.admissionDetail.requestType ? (patient.admissionDetail.requestType) : null,
        admissionDate: patient.admissionDetail.dischargeDate ? (patient.admissionDetail.admissionDate === '' ? '' :
          this.datePipe.transform(patient.admissionDetail.admissionDate, 'M/d/yyyy')) : null,
        dischargeDate: patient.admissionDetail.dischargeDate ? (patient.admissionDetail.dischargeDate === '' ? '' :
          this.datePipe.transform(patient.admissionDetail.dischargeDate, 'M/d/yyyy')) : null,
        referringPhysician: patient.admissionDetail.referringPhysician ?
          (patient.admissionDetail.referringPhysician) : null,
        primaryDiagnosis: patient.admissionDetail.primaryDiagnosis ? (patient.admissionDetail.primaryDiagnosis) : null,
        primaryDiagnosisDescription: patient.admissionDetail.primaryDiagnosisDescription ?
          (patient.admissionDetail.primaryDiagnosisDescription) : null,
      },

      requestFor: {
        id: patient.requestFor.id ? (patient.requestFor.id) : null,
        mrnNumber: patient.requestFor.mrnNumber ? (patient.requestFor.mrnNumber) : null,
        newadmissionService: patient.requestFor.newadmissionService ? (patient.requestFor.newadmissionService) : null,

        additionalServices: {
          id: patient.requestFor.additionalServices ? (patient.requestFor.additionalServices.id) : null,
          previousAuthorizationNumber: patient.requestFor.additionalServices ?
            (patient.requestFor.additionalServices.previousAuthorizationNumber) : null,
          numberOfServiceCompletedTillDate: patient.requestFor.additionalServices ?
            (patient.requestFor.additionalServices.numberOfServiceCompletedTillDate) : null,
          fromDate: patient.requestFor.additionalServices ? (patient.requestFor.additionalServices.fromDate === '' ? '' :
            this.datePipe.transform(patient.requestFor.additionalServices.fromDate, 'M/d/yyyy')) : null,
          toDate: patient.requestFor.additionalServices ? (patient.requestFor.additionalServices.toDate === '' ? '' :
            this.datePipe.transform(patient.requestFor.additionalServices.toDate, 'M/d/yyyy')) : null,
          serviceflag: patient.requestFor.additionalServices ? (patient.requestFor.additionalServices.serviceflag) : null,
        },

        extension: {
          id: patient.requestFor.extension ? (patient.requestFor.extension.id) : null,
          previousAuthorizationNumber: patient.requestFor.extension ?
            (patient.requestFor.extension.previousAuthorizationNumber) : null,
          fromDate: patient.requestFor.extension ? (patient.requestFor.extension.fromDate === '' ? '' :
            this.datePipe.transform(patient.requestFor.extension.fromDate, 'M/d/yyyy')) : null,
          toDate: patient.requestFor.extension ? (patient.requestFor.extension.toDate === '' ? '' :
            this.datePipe.transform(patient.requestFor.extension.toDate, 'M/d/yyyy')) : null,
          serviceflag: patient.requestFor.extension ? (patient.requestFor.extension.serviceflag) : null,
        }
      },

      requestService: {
        id: patient.requestService.id ? (patient.requestService.id) : null,
        mrnNumber: patient.requestService.mrnNumber ? (patient.requestService.mrnNumber) : null,

        homeHealthAide: {
          id: patient.requestService.homeHealthAide ? (patient.requestService.homeHealthAide.id) : null,
          mrnNumber: patient.requestService.homeHealthAide ? (patient.requestService.homeHealthAide.mrnNumber) : null,
          revenueCode: patient.requestService.homeHealthAide ? (patient.requestService.homeHealthAide.revenueCode)
            : null,
          visits: patient.requestService.homeHealthAide ? (patient.requestService.homeHealthAide.visits) : null,
          units: patient.requestService.homeHealthAide ? (patient.requestService.homeHealthAide.units) : null,
          homeHealthAide: patient.requestService.homeHealthAide ? (patient.requestService.homeHealthAide.homeHealthAide)
            : null,
        },

        medicalSocialWork: {
          id: patient.requestService.medicalSocialWork ? (patient.requestService.medicalSocialWork.id) : null,
          mrnNumber: patient.requestService.medicalSocialWork ? (patient.requestService.medicalSocialWork.mrnNumber) : null,
          revenueCode: patient.requestService.medicalSocialWork ? (patient.requestService.medicalSocialWork.revenueCode)
            : null,
          visits: patient.requestService.medicalSocialWork ? (patient.requestService.medicalSocialWork.visits) : null,
          units: patient.requestService.medicalSocialWork ? (patient.requestService.medicalSocialWork.units) : null,
          medicalSocialWork: patient.requestService.medicalSocialWork ? (patient.requestService.medicalSocialWork.medicalSocialWork)
            : null,
        },

        occupationTherapy: {
          id: patient.requestService.occupationTherapy ? (patient.requestService.occupationTherapy.id) : null,
          mrnNumber: patient.requestService.occupationTherapy ? (patient.requestService.occupationTherapy.mrnNumber) : null,
          revenueCode: patient.requestService.occupationTherapy ? (patient.requestService.occupationTherapy.revenueCode)
            : null,
          visits: patient.requestService.occupationTherapy ? (patient.requestService.occupationTherapy.visits) : null,
          units: patient.requestService.occupationTherapy ? (patient.requestService.occupationTherapy.units) : null,
          occupationTherapy: patient.requestService.occupationTherapy ? (patient.requestService.occupationTherapy.occupationTherapy)
            : null,
        },

        skilledNursing: {
          id: patient.requestService.skilledNursing ? (patient.requestService.skilledNursing.id) : null,
          mrnNumber: patient.requestService.skilledNursing ? (patient.requestService.skilledNursing.mrnNumber) : null,
          revenueCode: patient.requestService.skilledNursing ? (patient.requestService.skilledNursing.revenueCode)
            : null,
          visits: patient.requestService.skilledNursing ? (patient.requestService.skilledNursing.visits) : null,
          units: patient.requestService.skilledNursing ? (patient.requestService.skilledNursing.units) : null,
          skilledNursing: patient.requestService.skilledNursing ? (patient.requestService.skilledNursing.skilledNursing)
            : null,
        },

        physicalTherapy: {
          id: patient.requestService.physicalTherapy ? (patient.requestService.physicalTherapy.id) : null,
          mrnNumber: patient.requestService.physicalTherapy ? (patient.requestService.physicalTherapy.mrnNumber) : null,
          revenueCode: patient.requestService.physicalTherapy ? (patient.requestService.physicalTherapy.revenueCode)
            : null,
          visits: patient.requestService.physicalTherapy ? (patient.requestService.physicalTherapy.visits) : null,
          units: patient.requestService.physicalTherapy ? (patient.requestService.physicalTherapy.units) : null,
          physicalTherapy: patient.requestService.physicalTherapy ? (patient.requestService.physicalTherapy.physicalTherapy)
            : null,
        },

        speechPathology: {
          id: patient.requestService.speechPathology ? (patient.requestService.speechPathology.id) : null,
          mrnNumber: patient.requestService.speechPathology ? (patient.requestService.speechPathology.mrnNumber) : null,
          revenueCode: patient.requestService.speechPathology ? (patient.requestService.speechPathology.revenueCode)
            : null,
          visits: patient.requestService.speechPathology ? (patient.requestService.speechPathology.visits) : null,
          units: patient.requestService.speechPathology ? (patient.requestService.speechPathology.units) : null,
          speechPathology: patient.requestService.speechPathology ? (patient.requestService.speechPathology.speechPathology)
            : null,
        }

      },

    };
   // this.preAuthForm.setValue(selectedPatData);
  }
*/


}
