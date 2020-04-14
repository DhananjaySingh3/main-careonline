import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Form } from '../class-modals/form';


@Injectable({
  providedIn: 'root'
})
export class EligibilityCheckService {

  constructor(private httpClient: HttpClient) { }

  getFormData(): Observable<any> {
    return this.httpClient.get('');
  }

  postFormData(form: Form): Observable<any> {
    return this.httpClient.post('url', form);
  }

}
