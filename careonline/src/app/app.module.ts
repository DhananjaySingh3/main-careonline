import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EligibilityCheckService } from './services/eligibility-check.service';
import { PatientService } from './services/patient.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MAT_LABEL_GLOBAL_OPTIONS,
  MAT_DATE_LOCALE,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { MainModalComponent } from './components/main-modal/main-modal.component';
import { StackedModalComponent } from './components/main-modal/stacked-modal/stacked-modal.component';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientComponent } from './components/patients/patient/patient.component';
import { GenderService } from './services/gender.service';
import { SnackbarService } from './services/snackbar.service';
import { PatientListComponent } from './components/patients/patient-list/patient-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MainModalComponent,
    StackedModalComponent,
    PatientsComponent,
    PatientComponent,
    PatientListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    GenderService,
    PatientService,
    SnackbarService,
    EligibilityCheckService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'auto' } },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent],
  entryComponents: [PatientComponent, PatientsComponent, MainModalComponent, StackedModalComponent]
})
export class AppModule { }
