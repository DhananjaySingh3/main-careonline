import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PDGMService } from '../services/pdgm.service';
import { PdgmToolEpisodeDetailsModel, PdgmAdmissionSourceModel, ClinicalGroupingModel } from '../models/pdgm.model';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'pdgm-form',
    templateUrl: './pdgm-form.component.html',
    styleUrls: ['./pdgm-form.component.css'],
})

export class PdgmFormComponent implements OnInit {

    panelOpenState: boolean = false;
    oasisDetails:any = [];
    pdgmToolData: any = [];
    isLoadingResults : boolean = true;
    oasisQuestion1Data: any = [];
    functionScore: string;
    m1800OasisData: any = [];
    m1810OasisData: any = [];
    m1820OasisData: any = [];
    m1830OasisData: any = [];
    m1840OasisData: any = [];
    m1850OasisData: any = [];
    m1860OasisData: any = [];
    pdgmToolPosition3Data: any = [];
    position3HippsCode: string = '';
    selectedTimings: string = "";
    selectedSource: string = "";
    visitTimings: string[] = ['Early Visits', 'Late Visits'];
    admissionSource: string[] = ['Community', 'Institutional']

    constructor(public dialog: MatDialog,
        public dialogRef: MatDialogRef<PdgmFormComponent>,
        @Inject(MAT_DIALOG_DATA) public modelData: any,
        private _pdgmService: PDGMService,
        private _datePipe: DatePipe) {
        this.pdgmToolData = new PdgmToolEpisodeDetailsModel;
    }

    ngOnInit() {
        this.pdgmToolData[0] = new PdgmToolEpisodeDetailsModel;
        this.pdgmToolData[1] = new PdgmAdmissionSourceModel;
        this.pdgmToolData[2] = new ClinicalGroupingModel;
        this.getPdgmToolData(this.modelData);
        this.getpdgmToolPosition3OasisData(this.modelData);
    }

    getPdgmToolData(request) {
        this._pdgmService.getPdgmToolData(request).subscribe(result => {
            this.pdgmToolData = result;
            this.pdgmToolData[0].dob = this._datePipe.transform(this.pdgmToolData[0].dob, 'dd/MM/yyyy')
            this.pdgmToolData[0].episodeStartDate = this._datePipe.transform(this.pdgmToolData[0].episodeStartDate, 'dd/MM/yyyy')
            this.pdgmToolData[0].episodeEndDate = this._datePipe.transform(this.pdgmToolData[0].episodeEndDate, 'dd/MM/yyyy')
            if (this.pdgmToolData[1].earlyVisits == true) {
                this.selectedTimings = "Early Visits"
            }
            if (this.pdgmToolData[1].lateVisits == true) {
                this.selectedTimings = "Late Visits"
            }
            if (this.pdgmToolData[1].community == true) {
                this.selectedSource = "Community"
            }
            if (this.pdgmToolData[1].institutional == true) {
                this.selectedSource = "Institutional"
            }
            this.isLoadingResults = false;
        })
    }

    getpdgmToolPosition3OasisData(request) {
        this._pdgmService.getpdgmToolPosition3OasisData(request).subscribe(result => {
            this.pdgmToolPosition3Data = result;
            for (let i = 0; i <= this.pdgmToolPosition3Data[0].m1033List.length - 1; i++) {
                if(this.pdgmToolPosition3Data[0].m1033List[i].flag != true){
                    this.pdgmToolPosition3Data[0].m1033List[i].functionalPoint = '';
                }
            } for (let i = 0; i <= this.pdgmToolPosition3Data[0].m1810List.length - 1; i++) {
                if(this.pdgmToolPosition3Data[0].m1810List[i].flag != true){
                    this.pdgmToolPosition3Data[0].m1810List[i].functionalPoint = '';
                }
            } for (let i = 0; i <= this.pdgmToolPosition3Data[0].m1800List.length - 1; i++) {
                if(this.pdgmToolPosition3Data[0].m1800List[i].flag != true){
                    this.pdgmToolPosition3Data[0].m1800List[i].functionalPoint = '';
                }
            } for (let i = 0; i <= this.pdgmToolPosition3Data[0].m1820List.length - 1; i++) {
                if(this.pdgmToolPosition3Data[0].m1820List[i].flag != true){
                    this.pdgmToolPosition3Data[0].m1820List[i].functionalPoint = '';
                }
            } for (let i = 0; i <= this.pdgmToolPosition3Data[0].m1830List.length - 1; i++) {
                if(this.pdgmToolPosition3Data[0].m1830List[i].flag != true){
                    this.pdgmToolPosition3Data[0].m1830List[i].functionalPoint = '';
                }
            }
            for (let i = 0; i <= this.pdgmToolPosition3Data[0].m1840List.length - 1; i++) {
                if(this.pdgmToolPosition3Data[0].m1840List[i].flag != true){
                    this.pdgmToolPosition3Data[0].m1840List[i].functionalPoint = '';
                }
            }
            for (let i = 0; i <= this.pdgmToolPosition3Data[0].m1850List.length - 1; i++) {
                if(this.pdgmToolPosition3Data[0].m1850List[i].flag != true){
                    this.pdgmToolPosition3Data[0].m1850List[i].functionalPoint = '';
                }
            }
            for (let i = 0; i <= this.pdgmToolPosition3Data[0].m1860List.length - 1; i++) {
                if(this.pdgmToolPosition3Data[0].m1860List[i].flag != true){
                    this.pdgmToolPosition3Data[0].m1860List[i].functionalPoint = '';
                }
            }
            this.oasisQuestion1Data = this.pdgmToolPosition3Data[0].m1033List;
            this.m1800OasisData = this.pdgmToolPosition3Data[0].m1800List;
            this.m1810OasisData = this.pdgmToolPosition3Data[0].m1810List;
            this.m1820OasisData = this.pdgmToolPosition3Data[0].m1820List;
            this.m1830OasisData = this.pdgmToolPosition3Data[0].m1830List;
            this.m1840OasisData = this.pdgmToolPosition3Data[0].m1840List;
            this.m1850OasisData = this.pdgmToolPosition3Data[0].m1850List;
            this.m1860OasisData = this.pdgmToolPosition3Data[0].m1860List;
            if (this.pdgmToolPosition3Data.length == 2) {
                this.position3HippsCode = this.pdgmToolPosition3Data[1].hippscode;
                this.functionScore = this.pdgmToolPosition3Data[1].functionScore;
            } else {
                this.functionScore = '';
                this.position3HippsCode = 'HIPPS CODE';
            }
        })
    }

    closeModel() {
        this.dialogRef.close();
    }


    insertPdgmForm() {

    }

}