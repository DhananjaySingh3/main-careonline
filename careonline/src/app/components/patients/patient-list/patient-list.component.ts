import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { EligibilityCheckService } from '../../../services/eligibility-check.service';
import { PatientService } from '../../../services/patient.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { GenderService } from '../../../services/gender.service';
import { Form } from '../../../class-modals/form';
import { FormGroup, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { PatientComponent } from '../patient/patient.component';


/*
export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}
*/
export interface DialogData {
  form: FormGroup;
  // mainHeading: string;
}

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  patientList: Array<Form> = [];
  patientListForMatTable: MatTableDataSource<any>;
  displayedColumns: string[] = ['mrnNumber', 'lastName', 'firstName', 'middleName', 'dob', 'gender', 'actions'];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  searchKey: string;


  // For firebase
  patientListFbArray = [];
  patientDataListForMatTable: MatTableDataSource<any>;
  // For firebase ends

  /*
  displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: GithubIssue[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
*/

  constructor(
   // public httpClient: HttpClient,
    public genderService: GenderService,
    public eligibilityCheckService: EligibilityCheckService,
    public patientDataService: PatientService,
    public toasterService: SnackbarService,
    public dialog: MatDialog,
   // private elementRef: ElementRef,
   // public dialogRef: MatDialogRef<PatientsComponent>,
   // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }


  ngOnInit() {
    // for sql api
    this.eligibilityCheckService.getFormData().subscribe((patientData) => {
      this.patientList = patientData;
      this.patientListForMatTable = new MatTableDataSource(this.patientList);
      this.isLoadingResults = false;
      this.patientListForMatTable.sort = this.sort;
      this.patientListForMatTable.paginator = this.paginator;
      // Disallowing user to search data which is not on the page but it is in the array of the subscribe
      this.patientListForMatTable.filterPredicate = (data, filter) => {
        return this.displayedColumns.some((ele) => {
          return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
        });
      };
    });

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
  }



  ngAfterViewInit() {
    /*
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
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

  onEditPatient(row) {
    this.patientDataService.populatePatientFormData(row);
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
  }

}
