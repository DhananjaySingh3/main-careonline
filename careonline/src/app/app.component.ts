import { Component, OnInit, ElementRef, OnDestroy, OnChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form: FormGroup;


  constructor(public dialog: MatDialog, private elementRef: ElementRef) { }

  ngOnInit() {
    // By appending or modal we are showing our modal as direct child of our body element
    // document.body.appendChild(this.elementRef.nativeElement);
  }

}
