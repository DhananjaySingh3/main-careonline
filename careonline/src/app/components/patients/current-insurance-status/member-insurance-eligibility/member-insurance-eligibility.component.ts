import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { InsuranceEligibility, ResponseReceivedForm, Form } from 'src/app/class-modals/form';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatRadioChange } from '@angular/material';
import { EligibilityCheckService } from 'src/app/services/eligibility-check.service';
import { PatientService } from 'src/app/services/patient.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-member-insurance-eligibility',
  templateUrl: './member-insurance-eligibility.component.html',
  styleUrls: ['./member-insurance-eligibility.component.css']
})
export class MemberInsuranceEligibilityComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'statusVerifiedDate', 'insurancePlanType', 'insurancePlanName', 'startDate', 'endtDate', 'eligibility', 'viewDetails'
  ];

  @Output() change: EventEmitter<MatRadioChange>;
  @Input() myInsuranceList: ResponseReceivedForm[];

  private getEligibilitySubscription: Subscription;
  private getPdfFileSubscription: Subscription;

  sendFormDataForEligibilityCheck: Form;
  insuranceDatReceivedList: any[];
  insuranceListForMatTable: MatTableDataSource<any>;

  constructor(
    public eligibilityCheckService: EligibilityCheckService,
    public patientService: PatientService,
  ) {
    // this.dataSource = new MatTableDataSource(this.data);
    /* This is for instant page refresh using Subject in service */
    this.patientService.refreshPage().subscribe(() => {
      this.getCurrentInsurance();
    });
  }

  ngOnInit() {

    this.getCurrentInsurance();
  }

  getCurrentInsurance() {
    setTimeout(() => {
      this.getEligibilitySubscription = this.patientService.getEligibilityData().subscribe((insuranceListData) => {
        if (insuranceListData) {
          console.log('Response Data received for Eligibility insurance list');
          console.log(insuranceListData);
          this.insuranceDatReceivedList = { ...insuranceListData };
          this.insuranceDatReceivedList = insuranceListData;
          this.insuranceListForMatTable = new MatTableDataSource(this.insuranceDatReceivedList);
          console.log('Response Data received for Eligibility insurance list prepare for mat table');
          console.log(this.insuranceListForMatTable);
        }

      }, (error) => {
        console.log(error);
      });
    });
  }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: ResponseReceivedForm) {

  //   if (row) {
  //     // return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  //     console.log(row);
  //   }
  // }

  onViewDetails(row) {

    this.getPdfFileSubscription = this.patientService.getPdfFileStream(row).subscribe((response) => {
      if (response) {
        console.log(response);
        const blob = new Blob([response], { type: response.type });

        // const dataURL = window.URL.createObjectURL(blob);
        const dataURL = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = dataURL;
        // link.download = 'Filename.pdf';
        document.body.appendChild(link);
        link.target = '_blank';
        link.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(dataURL);
        }, 1000);
      } else {
        console.log('No response');
      }

    }, (error) => {
      console.log(error);
    });
  }

  ngOnDestroy() {
    // this.getEligibilitySubscription.unsubscribe();
  }

}