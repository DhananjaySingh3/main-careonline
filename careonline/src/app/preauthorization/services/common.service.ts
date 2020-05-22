import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {
  Sex, Suffix, Genders, Plans, City, State, Relation,
  Payment, RequestTypes, InsuranceTypes, RequestFor
} from '../../preauthorization/models/preauth-common.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  sex: Sex[] = [
    { code: 1, name: 'Male' },
    { code: 2, name: 'Female' },
    { code: 3, name: 'Others' }
  ];

  suffixes: Suffix[] = [
    { code: 1, name: 'Mr' },
    { code: 2, name: 'Mrs' },
    { code: 3, name: 'Dr' },
    { code: 4, name: 'J' }
  ];

  relations: Relation[] = [
    { code: 1, name: 'Mother' },
    { code: 2, name: 'Father' },
    { code: 3, name: 'Sibling' },
    { code: 4, name: 'Brother' },
    { code: 5, name: 'Sister' },
    { code: 6, name: 'Self' },
    { code: 7, name: 'self' },
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
    { code: 4, name: 'Medicacode' },
    { code: 5, name: 'Company Insurance' },
    { code: 6, name: 'Others' }
  ];

  genders: Genders[] = [
    { code: 1, name: 'Male' },
    { code: 2, name: 'female' },
    { code: 3, name: 'others' }
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

  constructor(
    public httpClient: HttpClient,
    public datePipe: DatePipe
  ) { }

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

}
