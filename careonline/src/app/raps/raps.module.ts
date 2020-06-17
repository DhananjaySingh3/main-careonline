import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import {
  MAT_DIALOG_DEFAULT_OPTIONS, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MAT_LABEL_GLOBAL_OPTIONS,
  MAT_DATE_LOCALE, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,
} from '@angular/material';

import { RapsRoutingModule } from './raps-routing.module';
import { RapsComponent } from './raps.component';

@NgModule({
  declarations: [
    RapsComponent,

  ],
  imports: [
    CommonModule,
    RapsRoutingModule,
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

  ],
  entryComponents: [],
})
export class RapsModule {
  constructor() {
    console.log('RAPS Module Loaded');
  }
}
