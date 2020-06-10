import { Component, OnInit, ViewChild } from '@angular/core';

import { PreAuthService } from '../../../preauthorization/services/pre-auth.service';
import { PreAuthReadResponse } from '../../../preauthorization/models/read-pre-auth.model';
import { PreAuthFormService } from '../../../preauthorization/services/pre-auth-form.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { PreAuthFormModelResponse } from '../../../preauthorization/models/pre-auth-form.model';
import { PreAuthFormComponent } from '../../../preauthorization/components/pre-auth-form/pre-auth-form.component';
import { DeniedDialogComponent } from '../../../preauthorization/components/denied-dialog/denied-dialog.component';

@Component({
  selector: 'app-preauth-list',
  templateUrl: './preauth-list.component.html',
  styleUrls: ['./preauth-list.component.css']
})
export class PreauthListComponent implements OnInit {
  /* List Table Reated Starts */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /*To hold Patient List receiced from api as Form model defined */
  preAuthorizationList: PreAuthReadResponse[];
  preAuthListForMatTable: MatTableDataSource<PreAuthReadResponse>;

  displayedColumns: string[] = [
    'mrnNumber', 'patientName', 'admissionDate', 'admissionStatus', 'episodeType',
    'payorType', 'preAuthRequestForm', 'preauthFormStatus', 'formSentDate', 'formStatus', 'preAuthResponseForm',
    'formReceivedDate', 'actions'];
  resultsLength = 0;
  isLoadingResults = true;

  /* List Table Reated ends */

  /* Data received for selected patient as PreAuthformDetails starts*/
  preAuthformDetails: PreAuthFormModelResponse;
  /* Data received for selected patient as PreAuthformDetails ends*/

  constructor(
    public preAuthService: PreAuthService,
    public preAuthFormService: PreAuthFormService,
    public dialog: MatDialog,

  ) {


  }


  ngOnInit() {
    this.preAuthService.refreshPage().subscribe((message) => {
      this.isLoadingResults = true;
      console.log(message);
      this.getPreAuthorizationList();
      this.isLoadingResults = false;
    });

    this.getPreAuthorizationList();
    // this.preAuthService.refreshPage().unsubscribe();

  }

  /* Fetching PreAuthorization List starts*/
  getPreAuthorizationList() {
    this.preAuthService.getPreAuthorizationtList().subscribe((preAuthListData) => {
      if (preAuthListData) {
        this.preAuthorizationList = preAuthListData;
        this.preAuthListForMatTable = new MatTableDataSource(this.preAuthorizationList);

        this.preAuthListForMatTable.sort = this.sort;
        this.preAuthListForMatTable.paginator = this.paginator;

        this.isLoadingResults = false;

        this.preAuthListForMatTable.filterPredicate = (data, filter) => {
          return this.displayedColumns.some((ele) => {
            return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
          });
        };

      }
    },
      (error) => {
        this.isLoadingResults = false;
        console.log(error);
      }
    );
  }
  /* Fetching PreAuthorization List ends*/

  /* To open the Modal to show Pre Auth Form Details starts*/
  openPreAuthForm(selectedPatData: PreAuthReadResponse) {
    const config = new MatDialogConfig();
    config.disableClose = true; // does not allow to close popup on clicking ESC or outside popup
    config.autoFocus = false; // does not allow popup to focus on any field or icon
    config.hasBackdrop = true;
    config.width = '75%';

    config.data = { heading: 'Preauthorization Request Form', selectedPatientData: selectedPatData };

    this.dialog.open(PreAuthFormComponent, config).afterClosed().subscribe(result => {
      console.log('Close or X button clicked so:  false will come: ' + result);
      // this.toasterService.success(':: Submitted Successfully');
      if (result) {
        // [mat-dialog-close]="true" shuld be placed on eligibility button to get result=true
        // else result=undefined will come
        console.log('Check eligibilty button is clicked so TRUE will come: ' + result);
      }
    });

  }
  /* To open the Modal to show Pre Auth Form Details ends*/

  /* Fetching edited Patient's Form Data starts*/
  onEditPatient(row: PreAuthReadResponse) {
    this.openPreAuthForm(row);
  }
  /* Fetching edited Patient's Form Data ends*/

  onViewErrorDetails(row: PreAuthReadResponse) {
    setTimeout(() => {
      /* To open the Modal to show Pre Auth Form Details starts*/
      const config = new MatDialogConfig();
      config.disableClose = true; // does not allow to close popup on clicking ESC or outside popup
      config.autoFocus = false; // does not allow popup to focus on any field or icon
      config.hasBackdrop = true;
      config.width = '65%';

      config.data = { heading: 'Preauthorization Response Form', selectedPatientData: row };

      this.dialog.open(DeniedDialogComponent, config).afterClosed().subscribe(result => {
        console.log('Close or X button clicked so:  false will come: ' + result);
        // this.toasterService.success(':: Submitted Successfully');
        if (result) {
          // [mat-dialog-close]="true" shuld be placed on eligibility button to get result=true
          // else result=undefined will come
          console.log('Denied View Details button is clicked so TRUE will come: ' + result);
        }
      });
    });
  }

  /* Pre-auth Class ends*/
}
