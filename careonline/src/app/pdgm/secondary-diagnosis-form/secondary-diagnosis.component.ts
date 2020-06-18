import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PDGMService } from '../services/pdgm.service';
import { EligibilityToasterService } from '../../eligibility-check/services/eligibility-toaster.service';

@Component({
    selector: 'app-secondary-diagnosis',
    templateUrl: './secondary-diagnosis.component.html',
    styleUrls: ['./secondary-diagnosis.component.css']
})

export class SecondaryDiagnosisFormComponent implements OnInit {

    secondaryCodeForm = this._formBuilder.group({
        secondaryDiagnosisCode: this._formBuilder.array([
            this._formBuilder.control('')
        ])
    });

    get secondaryDiagnosisCode() {
        return this.secondaryCodeForm.get('secondaryDiagnosisCode') as FormArray;
    }
    constructor(private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<SecondaryDiagnosisFormComponent>,
        @Inject(MAT_DIALOG_DATA) public modelData: any,
        private _pdgmService: PDGMService,
        private _toasterService: EligibilityToasterService) {
    }

    ngOnInit() {

    }

    addCode() {
        this.secondaryDiagnosisCode.push(this._formBuilder.control(''));
    }

    saveSecondaryCode() {
        this.secondaryCodeForm.value.primaryDiagnosisCode = this.modelData.primaryDiagnosisCode;
        this.secondaryCodeForm.value.mrnNumber = this.modelData.mrnNumber;
        this._pdgmService.saveSecondaryCodeData(this.secondaryCodeForm.value).subscribe((result) => {
            if (result.ackn == "Success") {
                this.dialogRef.close();
                this._toasterService.success('Saved Successfully');
            } else {
                this._toasterService.warn('Saved Failed');
            }
        })
    }


}
