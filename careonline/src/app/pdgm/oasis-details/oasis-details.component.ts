import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PDGMService } from '../services/pdgm.service';
import { PdgmToolEpisodeDetailsModel, PdgmAdmissionSourceModel, ClinicalGroupingModel, OasisDetailsPdgmModel } from '../models/pdgm.model';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { EligibilityToasterService } from '../../eligibility-check/services/eligibility-toaster.service';

@Component({
    selector: 'app-oasis-details',
    templateUrl: './oasis-details.component.html',
    styleUrls: ['./oasis-details.component.css']
})

export class OasisDetailsComponent implements OnInit {

    oasisDetails = [];
    oasisQuestion1Data: any;
    m1800OasisData: any;
    m1810OasisData: any;
    m1820OasisData: any;
    m1830OasisData: any;
    m1840OasisData: any;
    m1850OasisData: any;
    m1860OasisData: any;
    saveOasisDetailsData: any = {};

    constructor(public dialog: MatDialog,
        public dialogRef: MatDialogRef<OasisDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public modelData: any,
        private _pdgmService: PDGMService,
        private _toasterService: EligibilityToasterService) {

    }
    ngOnInit() {
        this.getOasisDetails();
        this.saveOasisDetailsData = new OasisDetailsPdgmModel();
    }

    getOasisDetails() {
        this.oasisQuestion1Data = this._pdgmService.getOasisDetailpart1();
        this.m1800OasisData = this._pdgmService.getM1800OasisOptions();
        this.m1810OasisData = this._pdgmService.getM1810OasisOptions();
        this.m1820OasisData = this._pdgmService.getM1820OasisOptions();
        this.m1830OasisData = this._pdgmService.getM1830OasisOptions();
        this.m1840OasisData = this._pdgmService.getM1840OasisOptions();
        this.m1850OasisData = this._pdgmService.getM1850OasisOptions();
        this.m1860OasisData = this._pdgmService.getM1860OasisOptions();
    }

    closeModel() {
        this.dialogRef.close();
    }

    m1033ChangeEvent(event, headerDetails) {
        this.saveOasisDetailsData.m1033List = headerDetails.oasisOptions;
    }

    m1800ChangeEvent(event, headerDetails) {
        if (headerDetails.oasisCode == 'M1800') {
            for (let i = 0; i <= headerDetails.oasisOptions.length - 1; i++) {
                headerDetails.oasisOptions[i].mrnNumber = this.modelData.mrnNumber;
                if (headerDetails.oasisOptions[i].id == event.id) {
                    headerDetails.oasisOptions[i].flag = true;
                } else {
                    headerDetails.oasisOptions[i].flag = false;
                }
            }
            this.saveOasisDetailsData.m1800List = headerDetails.oasisOptions;
        }
    }

    selectionChangeEvent(event, headerDetails) {
        if (headerDetails.oasisCode == 'M1810') {
            for (let i = 0; i <= headerDetails.oasisOptions.length - 1; i++) {
                headerDetails.oasisOptions[i].mrnNumber = this.modelData.mrnNumber;
                if (headerDetails.oasisOptions[i].id == event.id) {
                    headerDetails.oasisOptions[i].flag = true;
                } else {
                    headerDetails.oasisOptions[i].flag = false;
                }
            }
            this.saveOasisDetailsData.m1810List = headerDetails.oasisOptions;
        }
        if (headerDetails.oasisCode == 'M1820') {
            for (let i = 0; i <= headerDetails.oasisOptions.length - 1; i++) {
                headerDetails.oasisOptions[i].mrnNumber = this.modelData.mrnNumber;
                if (headerDetails.oasisOptions[i].id == event.id) {
                    headerDetails.oasisOptions[i].flag = true;
                } else {
                    headerDetails.oasisOptions[i].flag = false;
                }
            }
            this.saveOasisDetailsData.m1820List = headerDetails.oasisOptions;
        }
        if (headerDetails.oasisCode == 'M1830') {
            for (let i = 0; i <= headerDetails.oasisOptions.length - 1; i++) {
                headerDetails.oasisOptions[i].mrnNumber = this.modelData.mrnNumber;
                if (headerDetails.oasisOptions[i].id == event.id) {
                    headerDetails.oasisOptions[i].flag = true;
                } else {
                    headerDetails.oasisOptions[i].flag = false;
                }
            }
            this.saveOasisDetailsData.m1830List = headerDetails.oasisOptions;
        }
        if (headerDetails.oasisCode == 'M1840') {
            for (let i = 0; i <= headerDetails.oasisOptions.length - 1; i++) {
                headerDetails.oasisOptions[i].mrnNumber = this.modelData.mrnNumber;
                if (headerDetails.oasisOptions[i].id == event.id) {
                    headerDetails.oasisOptions[i].flag = true;
                } else {
                    headerDetails.oasisOptions[i].flag = false;
                }
            }
            this.saveOasisDetailsData.m1840List = headerDetails.oasisOptions;
        }
        if (headerDetails.oasisCode == 'M1850') {
            for (let i = 0; i <= headerDetails.oasisOptions.length - 1; i++) {
                headerDetails.oasisOptions[i].mrnNumber = this.modelData.mrnNumber;
                if (headerDetails.oasisOptions[i].id == event.id) {
                    headerDetails.oasisOptions[i].flag = true;
                } else {
                    headerDetails.oasisOptions[i].flag = false;
                }
            }
            this.saveOasisDetailsData.m1850List = headerDetails.oasisOptions;
        }
        if (headerDetails.oasisCode == 'M1860') {
            for (let i = 0; i <= headerDetails.oasisOptions.length - 1; i++) {
                headerDetails.oasisOptions[i].mrnNumber = this.modelData.mrnNumber;
                if (headerDetails.oasisOptions[i].id == event.id) {
                    headerDetails.oasisOptions[i].flag = true;
                } else {
                    headerDetails.oasisOptions[i].flag = false;
                }
            }
            this.saveOasisDetailsData.m1860List = headerDetails.oasisOptions;
        }
    }

    saveOasisData() {
        this.saveOasisDetailsData.mrnNumber = this.modelData.mrnNumber;
        this._pdgmService.saveOasisDetailsData(this.saveOasisDetailsData).subscribe((result) => {
            if(result.ackn == "Success"){
                this.dialogRef.close();
                this._toasterService.success('Saved Successfully');
            }           
        })
    }

}
