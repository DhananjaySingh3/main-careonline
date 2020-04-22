import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { InsuranceEligibility, ResponseReceivedForm } from 'src/app/class-modals/form';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatRadioChange } from '@angular/material';
import { EligibilityCheckService } from 'src/app/services/eligibility-check.service';


@Component({
  selector: 'app-member-insurance-eligibility',
  templateUrl: './member-insurance-eligibility.component.html',
  styleUrls: ['./member-insurance-eligibility.component.css']
})
export class MemberInsuranceEligibilityComponent implements OnInit {
  displayedColumns: string[] = [
    'insurancePlanType', 'insurancePlanName', 'startDate', 'endtDate', 'eligibility', 'viewDetails'
  ];

  @Output() change: EventEmitter<MatRadioChange>;
  @Input() myInsuranceList: ResponseReceivedForm[];

  // ELEMENT_DATA: InsuranceEligibility[] = [
  //   // tslint:disable-next-line: max-line-length
  //   { insurancePlanType: 'Primary', insurancePlanName: 'Medicare', startDate: '02/02/2020', endtDate: '31/12/2020', eligibility: 'Eligible', viewDetails: false },
  //   // tslint:disable-next-line: max-line-length
  //   { insurancePlanType: 'Secondary', insurancePlanName: 'Company Insurance', startDate: '02/02/2020', endtDate: '31/12/2020', eligibility: 'Eligible', viewDetails: false }
  // ];

  initialSelection = [];
  allowMultiSelect = false;
  // dataSource = new MatTableDataSource<InsuranceEligibility>(this.ELEMENT_DATA);
  // selection = new SelectionModel<InsuranceEligibility>(this.allowMultiSelect, this.initialSelection);
  // newDataSource: ResponseReceivedForm[] = null || [
  //   {
  //     insurancePlanType: this.insuranceList.insurancePlanType,
  //     insurancePlanName: this.insuranceList.insurancePlanName,
  //     startDate: this.insuranceList.startDate,
  //     endDate: this.insuranceList.endDate,
  //     eligibility: this.insuranceList.eligibility,
  //     viewDetails: false
  //   }
  // ];

  // arrayKeys = Object.keys(this.myInsuranceList);
  // data = this.arrayKeys.map((key) => {
  //   return {[key]: this.myInsuranceList[key]};
  // });

  // data = new ResponseReceivedForm();
  // array = [
  //   {
  //     insurancePlanType: this.myInsuranceList.insurancePlanType,
  //     insurancePlanName: this.myInsuranceList.insurancePlanName,
  //     startDate: this.myInsuranceList.startDate,
  //     endDate: this.myInsuranceList.endDate,
  //     eligibility: this.myInsuranceList.eligibility,
  //     viewDetails: false
  //   }
  // ];


  data = new Array(this.myInsuranceList);
  // data = [{...this.myInsuranceList}];
  ELEMENT_DATA: any | null;
  // ELEMENT_DATA.push(this.insuranceList);
  dataSource = new MatTableDataSource(this.data);

  //  insuranceList: any;

  //  dataSource: ResponseReceivedForm;

  constructor(
    public eligibilityCheckService: EligibilityCheckService,
  ) {
    // this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnInit() {
    // this.ELEMENT_DATA = this.eligibilityCheckService.getEligibilityCheckData();
    // console.log(this.insuranceList);
    // this.dataSource = new MatTableDataSource(this.data);
  }


  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ResponseReceivedForm) {

    // if (row) {
    //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
    // }
  }



}
