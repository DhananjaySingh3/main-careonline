import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import {
  MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatTabGroup, MatTableDataSource,
  MatPaginator, MatSort, MatRadioButton
} from '@angular/material';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CommonService } from '../../../preauthorization/services/common.service';
import { PreAuthFormService } from '../../../preauthorization/services/pre-auth-form.service';
import { PreAuthService } from '../../../preauthorization/services/pre-auth.service';
import { DialogData } from '../../../preauthorization/models/preauth-dialog-data.model';
import { PreAuthResponse } from '../../../preauthorization/models/preauth-response.model';
import { PreauthHistoryList } from '../../../preauthorization/models/preauth-history-list.model';
import { PreAuthReadResponse } from '../../../preauthorization/models/read-pre-auth.model';
import { PreauthHistoryformComponent } from '../../../preauthorization/components/preauth-historyform/preauth-historyform.component';


@Component({
  selector: 'app-preauth-historylist',
  templateUrl: './preauth-historylist.component.html',
  styleUrls: ['./preauth-historylist.component.css']
})
export class PreauthHistorylistComponent implements OnInit {

  /* Selected Patient's Data received via Dialog while opening from preauthList Component*/
  heading = this.data.heading;
  selectedPatientViaDialog = { ...this.data.selectedPatientData };
  /* Selected Patient's Data received via Dialog while opening from preauthList Component ends*/

  /* List Table Reated Starts */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /*To hold Patient List receiced from api as Form model defined */
  preAuthHistoryList: PreauthHistoryList[];
  preAuthListForMatTable: MatTableDataSource<PreauthHistoryList>;

  displayedColumns: string[] = [
    'patientName', 'mrnNumber', 'enquiryId', 'requestSentDate', 'responseReceiveDate', 'responseType', 'authorizationStatus',
    'authorizationEffectiveNess', 'preAuthResponseForm'];
  resultsLength = 0;
  isLoadingResults = true;

  /* List Table Reated ends */

  editing = false;
  isReadonly = true;


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PreauthHistorylistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public preAuthFormService: PreAuthFormService,
    public commonService: CommonService,
    public preAuthService: PreAuthService,
    public datePipe: DatePipe,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.preAuthService.getPatientDataHistoryList(this.selectedPatientViaDialog).subscribe((preAuthListData) => {
        this.isLoadingResults = true;
        if (preAuthListData) {
          this.preAuthHistoryList = preAuthListData;
          this.preAuthListForMatTable = new MatTableDataSource(this.preAuthHistoryList);
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
    });
  }

  compareFn = (val1: string, val2: string) => {
    return (val1 === val2);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSubmit(formData) {
    console.log(formData);
  }

  onResponseFormView(row: PreauthHistoryList) {
    setTimeout(() => {
      /* To open the Modal to show Pre Auth Form Details starts*/
      const config = new MatDialogConfig();
      config.disableClose = true; // does not allow to close popup on clicking ESC or outside popup
      config.autoFocus = false; // does not allow popup to focus on any field or icon
      config.hasBackdrop = true;
      config.width = '65%';

      config.data = { heading: 'Preauthorization Response Form View', selectedPatientData: row };

      this.dialog.open(PreauthHistoryformComponent, config).afterClosed().subscribe(result => {
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

}
