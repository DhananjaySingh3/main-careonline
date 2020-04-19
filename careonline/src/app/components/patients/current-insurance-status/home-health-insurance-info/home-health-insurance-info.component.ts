import { Component, OnInit } from '@angular/core';
import { HomeHealthEpisodeInfo } from 'src/app/class-modals/form';


@Component({
  selector: 'app-home-health-insurance-info',
  templateUrl: './home-health-insurance-info.component.html',
  styleUrls: ['./home-health-insurance-info.component.css']
})
export class HomeHealthInsuranceInfoComponent implements OnInit {
  displayedColumns: string[] = [
    'episodeId', 'homeHealthAgencyName', 'serviceStartDate', 'serviceEndtDate', 'admissionStatus'
  ];

  dataSource: HomeHealthEpisodeInfo[] = [
    // tslint:disable-next-line: max-line-length
    { episodeId: '02/02/2020', homeHealthAgencyName: 'Home Care Pvt. Ltd.', serviceStartDate: '02/02/2020', serviceEndtDate: '02/12/2020', admissionStatus: 'Discharged' }
  ];


  constructor() { }

  ngOnInit() {
  }

}
