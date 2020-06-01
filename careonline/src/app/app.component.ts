import { Component, OnInit, ElementRef, OnDestroy, OnChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormGroup } from '@angular/forms';
import {
  Router, NavigationStart, NavigationEnd,
  NavigationCancel, NavigationError, Event
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form: FormGroup;


  // constructor(public dialog: MatDialog,
  //    private elementRef: ElementRef,
  //    private _router: Router,
  //    ) { }

  showLoadingIndicator = true;


  // Inject the Angular Router
  constructor(
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private router: Router,

  ) {
    // Subscribe to the router events observable
    this.router.events.subscribe((routerEvent: Event) => {

      // On NavigationStart, set showLoadingIndicator to ture
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      // On NavigationEnd or NavigationError or NavigationCancel
      // set showLoadingIndicator to false
      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel) {
        this.showLoadingIndicator = false;
      }

    });
  }

  ngOnInit() {
    // By appending or modal we are showing our modal as direct child of our body element
    // document.body.appendChild(this.elementRef.nativeElement);
  }

}
