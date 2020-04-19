import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentInsuranceStatusComponent } from './current-insurance-status.component';

describe('CurrentInsuranceStatusComponent', () => {
  let component: CurrentInsuranceStatusComponent;
  let fixture: ComponentFixture<CurrentInsuranceStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentInsuranceStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentInsuranceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
