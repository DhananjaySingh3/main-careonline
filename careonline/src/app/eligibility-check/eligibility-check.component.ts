import { Component, OnInit, ElementRef, OnDestroy, OnChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-eligibility-check',
    templateUrl: './eligibility-check.component.html',
    styleUrls: ['./eligibility-check.component.css']
})
export class EligibilityCheckComponent implements OnInit, OnDestroy {

    form: FormGroup;


    constructor(public dialog: MatDialog, private elementRef: ElementRef) { }


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
