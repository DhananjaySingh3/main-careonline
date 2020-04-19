import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InsuranceEligibility } from 'src/app/class-modals/form';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatRadioChange } from '@angular/material';


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

  ELEMENT_DATA: InsuranceEligibility[] = [
    // tslint:disable-next-line: max-line-length
    { insurancePlanType: 'Primary', insurancePlanName: 'Medicare', startDate: '02/02/2020', endtDate: '31/12/2020', eligibility: 'Eligible', viewDetails: false },
    // tslint:disable-next-line: max-line-length
    { insurancePlanType: 'Secondary', insurancePlanName: 'Company Insurance', startDate: '02/02/2020', endtDate: '31/12/2020', eligibility: 'Eligible', viewDetails: false }
  ];

  initialSelection = [];
  allowMultiSelect = false;
  dataSource = new MatTableDataSource<InsuranceEligibility>(this.ELEMENT_DATA);
  selection = new SelectionModel<InsuranceEligibility>(this.allowMultiSelect, this.initialSelection);


  constructor() { }

  ngOnInit() {
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: InsuranceEligibility): string {
    if (row) {
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
    }
  }



}
