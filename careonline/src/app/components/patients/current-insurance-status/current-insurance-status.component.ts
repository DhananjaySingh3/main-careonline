import { Component, OnInit, Input } from '@angular/core';
import { ResponseReceivedForm } from 'src/app/class-modals/form';

@Component({
  selector: 'app-current-insurance-status',
  templateUrl: './current-insurance-status.component.html',
  styleUrls: ['./current-insurance-status.component.css']
})
export class CurrentInsuranceStatusComponent implements OnInit {
  @Input() insuranceList: ResponseReceivedForm;

  myInsuranceList = new Array(this.insuranceList);

  constructor() { }

  ngOnInit() {
  }

}
