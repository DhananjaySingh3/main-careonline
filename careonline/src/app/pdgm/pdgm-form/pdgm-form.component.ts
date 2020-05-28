import { Component, OnInit, Inject, ViewChild, EventEmitter } from '@angular/core';
import {
    MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatTabGroup, MatTableDataSource,
    MatPaginator, MatSort
} from '@angular/material';
import { FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { PDGMService } from '../services/pdgm.service';

@Component({
    selector: 'pdgm-form',
    templateUrl: './pdgm-form.component.html',
    styleUrls: ['./pdgm-form.component.css']
})

export class PdgmFormComponent implements OnInit {

    panelOpenState = false;
    oasisDetails = [];
    constructor(public dialog: MatDialog,
        public dialogRef: MatDialogRef<PdgmFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _pdgmService: PDGMService) {

    }

    ngOnInit() {
        this.getOasisDetails();
    }

    closeModel() {
        this.dialogRef.close();
    }
    getOasisDetails() {
        debugger
        this.oasisDetails = this._pdgmService.getOasisQuestionDetails()
    }
    insertPdgmForm() {

    }

}