import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PDGMService } from '../services/pdgm.service';
import { PdgmToolEpisodeDetailsModel, PdgmAdmissionSourceModel, ClinicalGroupingModel, OasisDetailsPdgmModel } from '../models/pdgm.model';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
    selector: 'app-oasis-details',
    templateUrl: './oasis-details.component.html',
    styleUrls: ['./oasis-details.component.css']
})

export class OasisDetailsComponent implements OnInit {

    oasisDetails = [];
    oasisQuestion1Data :any;
    m1800OasisData: any;
    m1810OasisData: any;
    m1820OasisData: any;
    m1830OasisData: any;
    m1840OasisData: any;
    m1860OasisData: any;
    saveOasisDetailsData: any ={};

    constructor(public dialog: MatDialog,
        public dialogRef: MatDialogRef<OasisDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public modelData: any,
        private _pdgmService: PDGMService) {

    }
    ngOnInit() {
        this.getOasisDetails();
        this.saveOasisDetailsData.OASISItemContributed = new OasisDetailsPdgmModel();
    }

    getOasisDetails() {
        this.oasisQuestion1Data = this._pdgmService.getOasisDetailpart1();
        this.m1800OasisData = this._pdgmService.getM1800OasisOptions();
        this.m1810OasisData = this._pdgmService.getM1810OasisOptions();
        this.m1820OasisData = this._pdgmService.getM1820OasisOptions();
        this.m1830OasisData = this._pdgmService.getM1830OasisOptions();
        this.m1840OasisData = this._pdgmService.getM1840OasisOptions();
        this.m1860OasisData = this._pdgmService.getM1860OasisOptions();
    }

    closeModel() {
        this.dialogRef.close();
    }
    m1800ChangeEvent(event, headerDetails){
       // let selectedQuestionId = headerDetails.oasisCode;
        if (headerDetails.oasisCode == 'M1800') {
            for (let i = 0; i <= headerDetails.oasisOptions.length - 1; i++) {
                if (headerDetails.oasisOptions[i].id == event.id) {
                    headerDetails.oasisOptions[i].flag = true;
                } else {
                    headerDetails.oasisOptions[i].flag = false;
                }
            }
            this.saveOasisDetailsData.OASISItemContributed.m1800 = headerDetails.oasisOptions;
        }
    }

    selectionChangeEvent(event, headerDetails) {
       
        if (headerDetails.oasisCode == 'M1810') {
            for (let i = 0; i <= headerDetails.oasisOptions.length - 1; i++) {
                if (headerDetails.oasisOptions[i].id == event.id) {
                    headerDetails.oasisOptions[i].flag = true;
                } else {
                    headerDetails.oasisOptions[i].flag = false;
                }
            }
            this.saveOasisDetailsData.OASISItemContributed.m1810 = headerDetails.oasisOptions;
        }
        if (headerDetails.oasisCode == 'M1820') {
            for (let i = 0; i <= headerDetails.oasisOptions.length - 1; i++) {
                if (headerDetails.oasisOptions[i].id == event.id) {
                    headerDetails.oasisOptions[i].flag = true;
                } else {
                    headerDetails.oasisOptions[i].flag = false;
                }
            }
            this.saveOasisDetailsData.OASISItemContributed.m1820 = headerDetails.oasisOptions;
        }
        if (headerDetails.oasisCode == 'M1830') {
            for (let i = 0; i <= headerDetails.oasisOptions.length - 1; i++) {
                if (headerDetails.oasisOptions[i].id == event.id) {
                    headerDetails.oasisOptions[i].flag = true;
                } else {
                    headerDetails.oasisOptions[i].flag = false;
                }
            }
            this.saveOasisDetailsData.OASISItemContributed.m1830 = headerDetails.oasisOptions;
        }
        if (headerDetails.oasisCode == 'M1840') {
            for (let i = 0; i <= headerDetails.oasisOptions.length - 1; i++) {
                if (headerDetails.oasisOptions[i].id == event.id) {
                    headerDetails.oasisOptions[i].flag = true;
                } else {
                    headerDetails.oasisOptions[i].flag = false;
                }
            }
            this.saveOasisDetailsData.OASISItemContributed.m1840 = headerDetails.oasisOptions;
        }
        if (headerDetails.oasisCode == 'M1850') {
            for (let i = 0; i <= headerDetails.oasisOptions.length - 1; i++) {
                if (headerDetails.oasisOptions[i].id == event.id) {
                    headerDetails.oasisOptions[i].flag = true;
                } else {
                    headerDetails.oasisOptions[i].flag = false;
                }
            }
            this.saveOasisDetailsData.OASISItemContributed.m1850 = headerDetails.oasisOptions;
        }
        if (headerDetails.oasisCode == 'M1860') {
            for (let i = 0; i <= headerDetails.oasisOptions.length - 1; i++) {
                if (headerDetails.oasisOptions[i].id == event.id) {
                    headerDetails.oasisOptions[i].flag = true;
                } else {
                    headerDetails.oasisOptions[i].flag = false;
                }
            }
            this.saveOasisDetailsData.OASISItemContributed.m1860 = headerDetails.oasisOptions;
        }


        console.log(this.saveOasisDetailsData);
    }


    saveOasisData() {
       // this.saveOasisDetailsData
       this.saveOasisDetailsData.OASISItemContributed.mrnNumber = this.modelData.mrnNumber;
       this._pdgmService.saveOasisDetailsData(this.saveOasisDetailsData).subscribe((result) => {
           debugger
       })

    }

}
