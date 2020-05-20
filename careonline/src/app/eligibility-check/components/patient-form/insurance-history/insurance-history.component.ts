import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA,
  MatTabGroup, MatTableDataSource, MatPaginator, MatSort
} from '@angular/material';
import { Subscription } from 'rxjs';
import { EligibilityCheckService } from '../../../services/eligibility-check.service';
import { PatientFormService } from '../../../services/patient-form.service';



@Component({
  selector: 'app-insurance-history',
  templateUrl: './insurance-history.component.html',
  styleUrls: ['./insurance-history.component.css']
})
export class InsuranceHistoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  resultsLength = 0;
  isLoadingResults = true;
  displayedColumns: string[] = [
    'statusVerifiedDate', 'lastName', 'firstName', 'insurancePlanType', 'insurancePlanName', 'eligibilityStartDate',
    'eligibilityEndDate', 'eligibility', 'actions'
  ];
  insuranceDatReceivedList: any[];
  insuranceListForMatTable: MatTableDataSource<any>;

  public getEligibilitySubscription: Subscription;
  public getPdfFileSubscription: Subscription;

  constructor(
    public eligibilityCheckService: EligibilityCheckService,

  ) { }

  ngOnInit() {
    this.insuranceDataHistory();
  }

  insuranceDataHistory() {
    setTimeout(() => {
      this.getEligibilitySubscription = this.eligibilityCheckService.getInsuranceHistoryData()
        .subscribe((insuranceListData) => {
          if (insuranceListData) {
            //  insuranceListData.push(this.selectedPatientDataReceivedViaDialog.firstName);
            console.log('Response Data received for Eligibility insurance list');
            console.log(insuranceListData);
            // insuranceListData.forEach(element => {
            //   element.firstName = this.selectedPatientDataReceivedViaDialog.firstName;
            //   element.lastName = this.selectedPatientDataReceivedViaDialog.lastName;
            // });
            this.insuranceDatReceivedList = { ...insuranceListData };
            this.insuranceDatReceivedList = insuranceListData;
            this.insuranceListForMatTable = new MatTableDataSource(this.insuranceDatReceivedList);
            this.insuranceListForMatTable.sort = this.sort;
            this.insuranceListForMatTable.paginator = this.paginator;
            // Disallowing user to search data which is not on the page but it is in the array of the subscribe
            this.isLoadingResults = false;
            console.log('Response Data received for Eligibility insurance list prepared for mat table');
            console.log(this.insuranceListForMatTable);
          }

        }, (error) => {
          console.log(error);
        });
    });
  }

  onViewDetails(row) {
    this.getPdfFileSubscription = this.eligibilityCheckService.getPdfFileStream(row).subscribe((response) => {
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


}
