import { Component, OnInit, ElementRef, OnDestroy, OnChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MainModalComponent } from './components/main-modal/main-modal.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'careonline';
  form: FormGroup;


  constructor(public dialog: MatDialog, private elementRef: ElementRef) { }


  openDialog(): void {
    // this.service.initializeFormGroup();
    const config = new MatDialogConfig();
    config.disableClose = true; // does not allow to close popup on clicking ESC or outside popup
    config.autoFocus = false; // does not allow popup to focus on any field or icon
    config.hasBackdrop = true;
    config.id = 'main-dialog';
    config.width = '50%';

    // config.position.top = '50px';
    // config.position.left = '50px';
    config.data = {
      formDataReceived: this.form,
      mainModalTitle: 'Member Eligibility Details'
    };
    // receive data from angjs-1 via messsage or post message and put in the form
    // send that form data to MainModalComponent

    const dialogRef = this.dialog.open(MainModalComponent, config
      // {
      // height: '400px',
      // width: '600px',
      // data: {name: this.name, animal: this.animal}
      // }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.form = result;
    });
  }

  ngOnInit() {
    // By appending or modal we are showing our modal as direct child of our body element
    // document.body.appendChild(this.elementRef.nativeElement);
  }

  // Called once each time angular is about to remove this component, Ex: Changing pages (routes)
  ngOnDestroy() {
    // We must delete our modal from the body when we move away from the modules component
    // this.elementRef.nativeElement.remove();
  }

}
