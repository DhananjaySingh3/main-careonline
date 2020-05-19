import { Component, OnInit, Inject, ViewChild, EventEmitter } from '@angular/core';
import {
  MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatTabGroup, MatTableDataSource,
  MatPaginator, MatSort
} from '@angular/material';

import {
  Sex, Suffix, Genders, Plans, City, State, Relation, Payment
} from '../../../eligibility-check/models/common.model';


import { FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DialogData } from '../../models/patient-form-dialog-data.model';
import { PatientFormService } from '../../services/patient-form.service';
import { EligibilityToasterService } from '../../services/eligibility-toaster.service';
import { CommonService } from '../../services/common.service';
import { EligibilityCheckService } from '../../services/eligibility-check.service';
import { CurrentInsuranceComponent } from '../patient-form/current-insurance/current-insurance.component';
import { InsuranceHistoryComponent } from '../patient-form/insurance-history/insurance-history.component';
import { StackedModalComponent } from '../stacked-modal/stacked-modal.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  /* Selected Patient's Data received via Dialog while opening from Patient List Component*/
  heading = this.data.heading;
  selectedPatientViaDialog = { ...this.data.selectedPatientData };
  /* Selected Patient's Data received via Dialog while opening from Patient List Component ends*/

  /* Patient's Form Spinner */
  isLoadingResults = true;
  /* Patient's Form Spinner ends*/

  /* Patient's Form Tabs */
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  tabs = [];
  selectedTab: string;
  selectedTabIndex: number;
  /* Patient's Form Tabs */
  ack = false;

  /* Common Data Source from api*/
  genders: Genders[];
  relations: Relation[];
  states: State[];
  cities: City[];
  payments: Payment[];
  insurancePlans: Plans[];
  suffixes: Suffix[];

  /* Common Data Source from api*/

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PatientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public patientFormService: PatientFormService,
    public commonService: CommonService,
    public toasterService: EligibilityToasterService,
    public eligibilityCheckService: EligibilityCheckService,
  ) {

  }

  ngOnInit() {
    this.commonMethods();
  }

  /* Common Methods */
  commonMethods() {
    this.genders = this.commonService.getGenders();
    this.cities = this.commonService.getCities();
    this.payments = this.commonService.getPayments();
    this.insurancePlans = this.commonService.getPlans();
    this.relations = this.commonService.getRelations();
    this.states = this.commonService.getStates();
    this.suffixes = this.commonService.getSuffixes();
  }
  /* Common methods */

  /* Common getters for drop down values */

  /* Common getters for drop down values */

  onClose() {
    // this.patientFormService.patientForm.reset();
    this.patientFormService.clearFormValues();
    this.dialogRef.close();
    //  this.toasterService.success(':: Submitted Successfully');
  }

  onNoClick(): void {
    this.dialogRef.close(false);
    //  this.patientFormService.patientForm.reset();
    this.patientFormService.clearFormValues();
  }

  onTabChanged(selectedTab) {
    this.selectedTabIndex = selectedTab.index;
    console.log(this.selectedTabIndex);
    //  this.insuranceDataHistory();
    this.patientFormService.clearFormValues();
  }

  onVerifyEligibilityClick(data) {
    if (this.patientFormService.patientForm.valid) {
      // if (!this.patientFormService.patientForm.get('$key').value) {
      //   // this.patientFormService.insertOrCreatePatient(this.patientFormService.patientForm.value);
      // } else {
      // this.toasterService.success(':: Submitted Successfully');
      this.patientFormService.updatePatient(this.patientFormService.patientForm.value);
      //  this.patientFormService.patientForm.reset();
      this.patientFormService.clearFormValues(); // initializeFormGroup() = clearFormData()
      this.toasterService.success(':: Submitted Successfully');
      this.onClose();
      // }
    }
  }

  onViewDetails(row) {

  }

  primarySelected(event) {
    event.stopPropagation();
    // this.primaryChecked = !this.primaryChecked;
    // console.log('Primary Insurance selected: ', event.target.value);

    this.selectedPatientViaDialog.
      insuranceDetailByPolicy.primaryInsuranceDetail.
      eligibilityCheckSelected = !this.selectedPatientViaDialog.insuranceDetailByPolicy
        .primaryInsuranceDetail.eligibilityCheckSelected;
    console.log(this.selectedPatientViaDialog.
      insuranceDetailByPolicy.primaryInsuranceDetail.
      eligibilityCheckSelected);
  }

  secondarySelected(event) {
    event.stopPropagation();
    // this.primaryChecked = !this.primaryChecked;
    // console.log('Primary Insurance selected: ', event.target.value);

    this.selectedPatientViaDialog.
      insuranceDetailByPolicy.secondaryInsuranceDetail.
      eligibilityCheckSelected = !this.selectedPatientViaDialog.insuranceDetailByPolicy
        .secondaryInsuranceDetail.eligibilityCheckSelected;
    console.log(this.selectedPatientViaDialog.
      insuranceDetailByPolicy.secondaryInsuranceDetail.
      eligibilityCheckSelected);
  }

  tertiarySelected(event) {
    event.stopPropagation();
    this.selectedPatientViaDialog.insuranceDetailByPolicy.tertiaryInsuranceDetail.
      eligibilityCheckSelected = !this.selectedPatientViaDialog.insuranceDetailByPolicy
        .tertiaryInsuranceDetail.eligibilityCheckSelected;
    console.log(this.selectedPatientViaDialog.
      insuranceDetailByPolicy.tertiaryInsuranceDetail.
      eligibilityCheckSelected);
  }

  get secondaryInsuranceDetail() {
    return this.patientFormService.patientForm.get('insuranceDetailByPolicy.secondaryInsuranceDetail').value.eligibilityCheckSelected;
  }

  get tertiaryInsuranceDetail() {
    return this.patientFormService.patientForm.get('insuranceDetailByPolicy.tertiaryInsuranceDetail').value.eligibilityCheckSelected;
  }

  get primaryInsuranceDetail() {
    return this.patientFormService.patientForm.get('insuranceDetailByPolicy.primaryInsuranceDetail').value.eligibilityCheckSelected;
  }


  onEligibilityCheck() {
    console.log('Data Received From Patient List: Start');
    console.log(this.selectedPatientViaDialog);
    console.log('Data Received From Patient List: Ends');
    // this.patientFormService.dataForEligibilityCheck(this.patientFormService.form.value);
    setTimeout(() => {
      const config = new MatDialogConfig();
      config.disableClose = true; // does not allow to close popup on clicking ESC or outside popup
      config.autoFocus = false; // does not allow popup to focus on any field or icon
      config.hasBackdrop = true;
      config.width = '40%';
      config.data = { heading: 'Verify Eligibility', selectedPatientData: this.selectedPatientViaDialog };
      const dialogRef = this.dialog.open(StackedModalComponent, config);
      // dialogRef.afterOpened().subscribe(result => {
      //   console.log('Dialog Opend:' + result);
      // });
      dialogRef.afterClosed().subscribe(result => {
        console.log('Stacked Dialog Closed: true / false will come ' + result);
        // this.toasterService.success(':: Submitted Successfully');
        // this.insuranceList = this.eligibilityCheckService.getEligibilityCheckData();
        console.log('Data received from stacked model to patient component start : Acknowlegement of eligi chk');
        // console.log(this.insuranceList);
        console.log('Data received from stacked model to patient component ends');
        // console.log(this.eligibilityCheckService.getEligibilityCheckData().value);
        // if (this.insuranceList) {
        //   this.ngOnInit();
        //   console.log('ngOnInit() was executed for patient component');
        // }
        if (result) {
          console.log('Confirm is clicked: ' + result);
          this.ack = result;
        }

      });
    });
  }


}
