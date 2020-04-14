import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatToolbar } from '@angular/material/toolbar';
import { FormGroup } from '@angular/forms';
import { EligibilityCheckService } from '../../../services/eligibility-check.service';
import { Form } from 'src/app/class-modals/form';

export interface DialogData {
  form: FormGroup;
}


@Component({
  selector: 'app-stacked-modal',
  templateUrl: './stacked-modal.component.html',
  styleUrls: ['./stacked-modal.component.css']
})
export class StackedModalComponent implements OnInit {

  form: FormGroup;
  formData = new Form();
  getFormDataResponseObject: Form;
  postFormDataResponseObject: Form;

  constructor(
    public dialogRef: MatDialogRef<StackedModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private eligibilityCheckService: EligibilityCheckService
  ) { }

  ngOnInit() {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick() {
    console.log('Form: ' + this.form);
    console.log('Mat Data:' + this.data);
    // this.formData.gender = 'Male';
    this.eligibilityCheckService.postFormData(this.formData).subscribe((response) => {
      if (response) {
        // start spinner
        this.postFormDataResponseObject = response;
        // stop spinner
      } else {
        console.log(this.data);
      }
    });


  }

}
