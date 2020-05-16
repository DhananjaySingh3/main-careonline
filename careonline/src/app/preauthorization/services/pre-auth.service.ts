import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PreAuthReadResponse } from '../../preauthorization/models/read-pre-auth.model';
import { PreAuthFormModelResponse } from '../../preauthorization/models/pre-auth-form.model';


@Injectable({
  providedIn: 'root'
})
export class PreAuthService {
  // formData: PatientFormDataRequest;
  readonly apiURL = 'http://localhost:8080/preAuthorization';
  // currentInsuranceList = new Subject<any[]>();


  constructor(
    private httpClient: HttpClient,

  ) { }


  /*To get list of Preauthorization data : http://localhost:8080/preAuthorization/preAuthList*/
  getPreAuthorizationtList(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/preAuthList');
  }
  /*Sending Patient data on PreAuth Form Click onto the table*/
  viewEditPatientData(form: PreAuthReadResponse): Observable<any> {
    return this.httpClient.post(this.apiURL + '/preauthview', { mrnNumber: form.preAuthDemographics.mrnNumber });
  }

  /*Drafting Edited Patient data*/
  saveAsDraftPatientData(form: PreAuthFormModelResponse): Observable<any> {
    return this.httpClient.post(this.apiURL + '/preauthSave', form);
  }

  /*Preauth Send Request Patient data*/
  sendRequestPatientData(form: PreAuthFormModelResponse): Observable<any> {
    return this.httpClient.post(this.apiURL + '/preauthSend', form);
  }

  /* Current Insurance Details*/
  // getCurrentInsuranceData(): Observable<any> {
  //   return this.httpClient.post(this.apiURL + '/eligibilityDetail', this.formData);
  // }

  // getPdfData(): Observable<any> {
  //   return this.httpClient.get(this.apiURL + '/viewDetail');
  // }

  /* History Insurance Details*/
  // getInsuranceHistoryData(): Observable<any> {
  //   return this.httpClient.post(this.apiURL + '/eligibilityDetailHistory', this.formData);
  // }

  // public getPdfFileStream(rowData) {
  //   // return this.httpClient.get('http://localhost:8080/checkEligibility/generate',  { responseType: 'blob' });
  //   const reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Content-Disposition': 'inline; filename=PatientEligiblityDetail.pdf'
  //   });

  //   return this.httpClient.post(this.apiURL + '/generate', rowData,
  //     { headers: reqHeader, responseType: 'blob' });
  // }

}
