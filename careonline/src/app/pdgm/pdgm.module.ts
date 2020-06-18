import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdgmComponent } from './pdgm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PDGMRoutingModule } from './pdgm-routing.module';
import { MaterialModule } from '../material.module';
import {
  MAT_DIALOG_DEFAULT_OPTIONS, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MAT_LABEL_GLOBAL_OPTIONS,
  MAT_DATE_LOCALE, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,
} from '@angular/material';
import { PdgmFormComponent } from '../pdgm/pdgm-form/pdgm-form.component';
import { OasisDetailsComponent } from '../pdgm/oasis-details/oasis-details.component';
import { SecondaryDiagnosisFormComponent } from '../pdgm/secondary-diagnosis-form/secondary-diagnosis.component';
@NgModule({
  declarations: [PdgmComponent, PdgmFormComponent, OasisDetailsComponent, SecondaryDiagnosisFormComponent],
  imports: [
    CommonModule,
    PDGMRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [PdgmFormComponent, OasisDetailsComponent, SecondaryDiagnosisFormComponent]
})
export class PdgmModule { }
