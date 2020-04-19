import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsDialogComponent } from './view-details-dialog.component';

describe('ViewDetailsDialogComponent', () => {
  let component: ViewDetailsDialogComponent;
  let fixture: ComponentFixture<ViewDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
