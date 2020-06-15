import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PatientFormDataRequest } from '../pdgm/models/pdgm.model';
import { PDGMService } from '../pdgm/services/pdgm.service';
import { PdgmFormComponent } from '../pdgm/pdgm-form/pdgm-form.component';
import { OasisDetailsComponent } from '../pdgm/oasis-details/oasis-details.component';

@Component({
  selector: 'app-pdgm',
  templateUrl: './pdgm.component.html',
  styleUrls: ['./pdgm.component.css']
})
export class PdgmComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  patientListForMatTable: MatTableDataSource<PatientFormDataRequest>;

  displayedColumns: string[] = ['selectVal',
    'mrnNumber', 'patientName', 'oasisType', 'episodeDetails', 'aging', 'billableVisit', 'visitPdgm', 'hippsCode',
    'oasisKey', 'claimType', 'actions'];
  resultsLength = 0;
  isLoadingResults = true;

  constructor(private _pdgmService: PDGMService,
    public _pdgmDialogRef: MatDialog,
  ) { }

  ngOnInit() {
    this.getPdgmlist();
  }


  getPdgmlist() {
    this._pdgmService.getPdgmList().subscribe((result) => {
      this.patientListForMatTable = new MatTableDataSource(result);
      this.patientListForMatTable.sort = this.sort;
      this.patientListForMatTable.paginator = this.paginator;
      this.isLoadingResults = false;
    });
  }

  openPdgmForm(dialogConfig) {
    this._pdgmDialogRef.open(PdgmFormComponent, {
      width: '800px',
      hasBackdrop: true,
      data: dialogConfig
    })
      .afterClosed().subscribe(result => {

      })
  }

  openOasisDetailsModel(modelData) {
    this._pdgmDialogRef.open(OasisDetailsComponent, {
      width: '800px',
      hasBackdrop: true,
      data: modelData
    })
  }


}
