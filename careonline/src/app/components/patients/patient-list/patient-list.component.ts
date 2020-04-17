import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { EligibilityCheckService } from '../../../services/eligibility-check.service';
import { PatientService } from '../../../services/patient.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { Form } from '../../../class-modals/form';
import { MatTableDataSource } from '@angular/material';

import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { PatientComponent } from '../patient/patient.component';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})

export class PatientListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  patientList: Form[];
  patientListForMatTable: MatTableDataSource<Form>;
  displayedColumns: string[] = [
    'mrnNumber', 'suffix', 'lastName', 'firstName',
    'middleName', 'dob', 'insureddob', 'gender', 'actions'
  ];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  searchKey: string;

  constructor(
    // public httpClient: HttpClient,
    public eligibilityCheckService: EligibilityCheckService,
    public patientDataService: PatientService,
    public toasterService: SnackbarService,
    public dialog: MatDialog,

  ) { }


  ngOnInit() {
    // for sql api
    this.eligibilityCheckService.getFormData().subscribe((patientData) => {
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

    /*
     // For firebase
     this.patientDataService.getPatient().subscribe(list => {
       this.patientListFbArray = list.map((items) => {
         // const genderName = this.genderService.getGenderName(items.payload.val().gender);
         // const genderName = this.genderService.getGenderName(items.payload.val()['gender']);
         return {
           // genderName,
           $key: items.key,
           ...items.payload.val()
         };
       });
       this.patientDataListForMatTable = new MatTableDataSource(this.patientListFbArray);
       this.patientDataListForMatTable.sort = this.sort;
       this.patientDataListForMatTable.paginator = this.paginator;
     });
     */
  }

  applyFilter(filterValue: string) {
    this.patientListForMatTable.filter = filterValue.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilterTop();
  }

  applyFilterTop() {
    this.patientListForMatTable.filter = this.searchKey.trim().toLowerCase();
  }

  onCreatePatient() {
    // this.patientDataService.clearFormData();
    const config = new MatDialogConfig();
    config.disableClose = true; // does not allow to close popup on clicking ESC or outside popup
    config.autoFocus = false; // does not allow popup to focus on any field or icon
    config.hasBackdrop = true;
    config.width = '60%';
    // config.id = 'stacked-dialog';
    // config.position.top = '50px';
    // config.position.left = '50px';
    config.data = { heading: 'Edit Clicked' }; // name: 'Djay' name can be accessed in Patientcomponent
    this.dialog.open(PatientComponent, config);
    // closing of this dialod is mentioned in Patientcomponent
  }

  // onClose() {
  //   this.patientDataService.form.reset();
  //   this.patientDataService.clearFormValues();
  //   this.dialogRef.close();
  //   this.toasterService.success(':: Submitted Successfully');
  // }

  onEditPatient(row: Form) {
    setTimeout(() => {
      this.patientDataService.populatePatientFormData(row);
      const config = new MatDialogConfig();
      config.disableClose = true; // does not allow to close popup on clicking ESC or outside popup
      config.autoFocus = false; // does not allow popup to focus on any field or icon
      config.hasBackdrop = true;
      config.width = '60%';
      // config.position = {top: '50px', left: '50px'};
      // config.id = 'stacked-dialog';
      // name: 'Djay' name can be accessed in Patientcomponent
      config.data = { heading: 'Eligibility Check Details', form: row };

      this.dialog.open(PatientComponent, config)
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
