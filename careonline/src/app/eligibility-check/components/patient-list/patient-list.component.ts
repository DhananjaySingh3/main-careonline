import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { SnackbarService } from '../../../services/snackbar.service';

import { MatTableDataSource } from '@angular/material';

import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { PatientFormDataRequest } from '../../../eligibility-check/models/patient-data.model';
import { EligibilityCheckService } from '../../../eligibility-check/services/eligibility-check.service';
import { PatientFormComponent } from '../patient-form/patient-form.component';
import { PatientFormService } from '../../../eligibility-check/services/patient-form.service';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /*To hold Patient List receiced from api as Form model defined */
  patientList: PatientFormDataRequest[];
  patientListForMatTable: MatTableDataSource<PatientFormDataRequest>;

  displayedColumns: string[] = [
    'mrnNumber', 'suffix', 'lastName', 'firstName', 'middleName', 'dob', 'gender', 'actions'];
  resultsLength = 0;
  isLoadingResults = true;

  searchKey: string;

  constructor(
    // public httpClient: HttpClient,
    public eligibilityCheckService: EligibilityCheckService,
    public patientFormService: PatientFormService,
    // public toasterService: SnackbarService,
    public dialog: MatDialog,

  ) { }

  ngOnInit() {
    /* Fetching Patient List from read api */
    this.eligibilityCheckService.getPatientList().subscribe((patientData) => {
      this.patientList = patientData;
      this.patientListForMatTable = new MatTableDataSource(this.patientList);
      this.patientListForMatTable.sort = this.sort;
      this.patientListForMatTable.paginator = this.paginator;
      // Disallowing user to search data which is not on the page but it is in the array of the subscribe
      this.isLoadingResults = false;
      this.patientListForMatTable.filterPredicate = (data, filter) => {
        return this.displayedColumns.some((ele) => {
          return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
        });
      };
    });
  }

  /*Filter table data only from the visible data in the current page */
  applyFilter(filterValue: string) {
    this.patientListForMatTable.filter = filterValue.trim().toLowerCase();
  }

  /*Clear the search/Filter field starts*/
  onSearchClear() {
    this.searchKey = '';
    this.applyFilterTop();
  }

  applyFilterTop() {
    this.patientListForMatTable.filter = this.searchKey.trim().toLowerCase();
  }
  /*Clear the search/Filter field ends*/

  /*Edit Patient onto Patient List Data Table*/
  onEditPatient(row: PatientFormDataRequest) {
    /*On Edit Patient sending selected patient data to service so that it can be used for getCurrentInsu..()*/
    this.eligibilityCheckService.getSelecPatData(row);
    /*On Edit Patient sending selected patient data to service so that it can be used for getCurrentInsu..()*/
    setTimeout(() => {
      this.patientFormService.populatePatientFormData(row);
      const config = new MatDialogConfig();
      config.disableClose = true; // does not allow to close popup on clicking ESC or outside popup
      config.autoFocus = false; // does not allow popup to focus on any field or icon
      config.hasBackdrop = true;
      config.width = '65%';
      // config.position = {top: '50px', left: '50px'};
      config.data = { heading: 'Member Eligibility Details', selectedPatientData: row };

      /*Sending Selected Patient data as form and heading to PatientFormComponent*/
      this.dialog.open(PatientFormComponent, config)
        .afterClosed().subscribe(result => {
          console.log('Close or X button clicked so:  false will come: ' + result);
          // this.toasterService.success(':: Submitted Successfully');
          if (result) {
            // [mat-dialog-close]="true" shuld be placed on eligibility button to get result=true
            // else result=undefined will come
            console.log('Check eligibilty button is clicked so TRUE will come: ' + result);
          }
        });
    });


  }

}
