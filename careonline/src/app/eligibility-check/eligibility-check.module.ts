import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EligibilityRoutingModule } from './eligibility-routing.module';
import { MaterialModule } from '../material.module';
import {
  MAT_DIALOG_DEFAULT_OPTIONS, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MAT_LABEL_GLOBAL_OPTIONS,
  MAT_DATE_LOCALE, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,
} from '@angular/material';
import { EligibilityCheckComponent } from '../eligibility-check/eligibility-check.component';
import { PatientListComponent } from '../eligibility-check/components/patient-list/patient-list.component';
import { EligibilityCheckService } from '../eligibility-check/services/eligibility-check.service';
import { EligibilityToasterService } from '../eligibility-check/services/eligibility-toaster.service';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PatientFormService } from '../eligibility-check/services/patient-form.service';
import { CommonService } from '../eligibility-check/services/common.service';
import { CurrentInsuranceComponent } from './components/patient-form/current-insurance/current-insurance.component';
import { InsuranceHistoryComponent } from './components/patient-form/insurance-history/insurance-history.component';
import { StackedModalComponent } from './components/stacked-modal/stacked-modal.component';




@NgModule({
  declarations: [
    EligibilityCheckComponent,
    PatientListComponent,
    PatientFormComponent,
    CurrentInsuranceComponent,
    InsuranceHistoryComponent,
    StackedModalComponent,

  ],
  imports: [
    CommonModule,
    EligibilityRoutingModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'auto' } },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: MatDialogConfig, useValue: {} },
    DatePipe,
    EligibilityCheckService,
    PatientFormService,
    CommonService,
    EligibilityToasterService
  ],
  entryComponents: [PatientFormComponent, StackedModalComponent]
})
export class EligibilityCheckModule {
  constructor() {
    console.log('Eligibility Check Module Loaded');
  }
}
