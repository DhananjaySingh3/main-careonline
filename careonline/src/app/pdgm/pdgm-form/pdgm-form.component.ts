import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PDGMService } from '../services/pdgm.service';
import { PdgmToolEpisodeDetailsModel, PdgmAdmissionSourceModel, ClinicalGroupingModel} from '../models/pdgm.model';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'pdgm-form',
    templateUrl: './pdgm-form.component.html',
    styleUrls: ['./pdgm-form.component.css'],
})

export class PdgmFormComponent implements OnInit {

    panelOpenState = false;
    oasisDetails = [];
    pdgmToolData: any = [];
    isLoadingResults = true;
    oasisQuestion1Data:any;
    m1800OasisData: any;
    m1810OasisData: any;
    m1820OasisData: any;
    m1830OasisData: any;
    m1840OasisData: any;
    m1860OasisData: any;

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
        this.getOasisDetails();
        this.getPdgmToolData(this.modelData);
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

    closeModel() {
        this.dialogRef.close();
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

    insertPdgmForm() {

    }

}