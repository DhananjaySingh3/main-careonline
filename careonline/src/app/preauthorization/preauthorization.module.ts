import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PreauthorizationRoutingModule } from './preauth-routing.module';
import { MaterialModule } from '../material.module';
import {
  MAT_DIALOG_DEFAULT_OPTIONS, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MAT_LABEL_GLOBAL_OPTIONS,
  MAT_DATE_LOCALE, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,
} from '@angular/material';
import { PreauthorizationComponent } from './preauthorization.component';
import { PreauthListComponent } from './components/preauth-list/preauth-list.component';
import { PreAuthFormComponent } from './components/pre-auth-form/pre-auth-form.component';
import { CommonService } from '../preauthorization/services/common.service';
import { PreAuthFormService } from '../preauthorization/services/pre-auth-form.service';
import { PreAuthService } from '../preauthorization/services/pre-auth.service';
import { SnackbarToasterService } from '../preauthorization/services/snackbar-toaster.service';
import { StackedModalComponent } from './components/stacked-modal/stacked-modal.component';
import { DeniedDialogComponent } from './components/denied-dialog/denied-dialog.component';
import { PreauthHistorylistComponent } from './components/preauth-historylist/preauth-historylist.component';
import { PreauthHistoryformComponent } from './components/preauth-historyform/preauth-historyform.component';



@NgModule({
  declarations: [
    PreauthorizationComponent,
    PreauthListComponent,
    PreAuthFormComponent,
    StackedModalComponent,
    DeniedDialogComponent,
    PreauthHistorylistComponent,
    PreauthHistoryformComponent,

  ],
  imports: [
    CommonModule,
    PreauthorizationRoutingModule,
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
    CommonService,
    PreAuthFormService,
    PreAuthService,
    SnackbarToasterService,

  ],
  entryComponents: [PreAuthFormComponent, StackedModalComponent, DeniedDialogComponent, PreauthHistorylistComponent]
})
export class PreauthorizationModule {
  constructor() {
    console.log('Preauthorization Module Loaded');
  }
}
